<template>
    <div id="cart" class="btn-group btn-block">
        <button type="button" data-toggle="dropdown" data-loading-text="Loading..." class="btn btn-inverse btn-block btn-lg dropdown-toggle"><i class="fa fa-shopping-cart"></i> <span id="cart-total">{{cartItemTotal}} item(s) ${{cartTotal}}</span></button>
        <my-cart-items></my-cart-items>
    </div>
</template>

<script>
    import my_cart_items from '../../../assets/components/gears/my_cart_items.vue';

    export default{
        components: {
            "my-cart-items": my_cart_items,
        },
        computed: {
            cart_products: function () {
                return this.$store.getters.get_cart_products;
            },
            cartItemTotal: function () {
                var itemTotal = 0;
                this.cart_products.map(function (product) {
                    if (product && !_.isEmpty(product)) {
                        if (product.qty) {
                            itemTotal += product.qty;
                        }
                    }
                });
                return parseInt(itemTotal);
            },
            cartTotal: function () {
                var total = 0;
                this.cart_products.map(function (product) {
                    if (product && !_.isEmpty(product)) {
                        if (product.base_price && product.qty) {
                            if (product.taxRates) {
                                total += product.base_price * product.qty;
                                product.taxRates.map(function (taxRate) {
                                    _.each(taxRate, function (v) {
                                        total += product.base_price * product.qty * v;
                                    });
                                });
                            }
                        }
                    }
                });
                return parseFloat(total).toFixed(2);
            }
        }
    };
</script>