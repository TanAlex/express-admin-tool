<template>
    <nav id="top">
        <div class="container">
            <div id="top-links" class="nav pull-right">
                <ul class="list-inline">
                    <li><a href="getURL(contact)"><i class="fa fa-phone"></i></a> <span class="hidden-xs hidden-sm hidden-md">{{getPhone}}</span></li>
                    <li class="dropdown"><a href="getURL(account)" title="My Account" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> <span class="hidden-xs hidden-sm hidden-md">My Account</span> <span class="caret"></span></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="getURL(register)">Register</a></li>
                            <li><a href="getURL(login)">Login</a></li>
                        </ul>
                    </li>
                    <li><a href="getURL(wishlist)" title="Wish List" id="wishlist-total" ><i class="fa fa-heart"></i> <span class="hidden-xs hidden-sm hidden-md">Wish List ({{getWishItemNumbers}})</span></a></li>
                    <li><a href="getURL(cart)" title="Shopping Cart"><i class="fa fa-shopping-cart"></i> <span class="hidden-xs hidden-sm hidden-md">Shopping Cart ({{getCartItemTotal}})</span></a></li>
                    <li><a href="getURL(checkout)" title="Checkout"><i class="fa fa-share"></i> <span class="hidden-xs hidden-sm hidden-md">Checkout</span></a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        computed: {
            getURL: function (URL) {
                return this.$store.state.baseURL + URL;
            },
            getPhone: function () {
                return this.$store.state.phone;
            },
            getWishItemNumbers: function () {
                return this.$store.state.wishProducts.length;
            },
            getCartItemTotal: function () {
                var itemTotal = 0;
                this.$store.getters.get_cart_products.map(function (product) {
                    if (product && !_.isEmpty(product)) {
                        if (product.qty) {
                            itemTotal += product.qty;
                        }
                    }
                });
                return parseInt(itemTotal);
            },
        }
    };
</script>