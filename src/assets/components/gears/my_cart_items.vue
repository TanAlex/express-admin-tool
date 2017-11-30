<template>
        <ul id="cart_ul" data-role="listview" class="dropdown-menu pull-right">
            <li v-if="!cart_products.length" id="empty_li">
                <p class="text-center">Your shopping cart is empty!</p>
            </li>
            <li v-for="product in cart_products">
                <table class="table table-striped">
                    <tr>
                        <td class="text-center"><a href="javascript:void(0)"><img v-bind:src="product.images[0]" alt="product.description" title="product.description" class="product-img-thumbnail" /></a> </td>
                        <td class="text-left"><a href="javascript:void(0)" v-html="getDescription(product.description)"></a></td>
                        <td class="text-center">x</td>
                        <td class="text-right">{{product.qty}}</td>
                        <td class="text-right">${{getAmount(product)}} <div>{{getTaxTags(product)}}</div></td>
                        <td class="text-center"><button type="button" v-on:click="removeFromCart(product.id)" title="Remove" class="btn btn-danger btn-xs"><i class="fa fa-times"></i></button></td>
                    </tr>
                </table>
            </li>
            <li v-if="cart_products.length">
                <my-cart-total></my-cart-total>
            </li>
        </ul>
</template>

<script>
    import my_cart_total from '../../../assets/components/gears/my_cart_total.vue';
    export default{
        components: {
            "my-cart-total": my_cart_total
        },
        computed: {
            cart_products: function () {
                return this.$store.getters.get_cart_products;
            }
        },
        methods: {
            getDescription: function (description) {
                return escapeHtml(description);
            },
            getAmount: function (product) {
                var amount = "";
                if (product.base_price && product.qty) {
                    amount = parseFloat(product.base_price) * parseFloat(product.qty);
                    amount = parseFloat(amount).toFixed(2);
                }
                return amount;
            },
            getTaxTags: function (product) {
                var taxTags = "";
                if (product.base_price && product.qty && product.taxRates) {
                    product.taxRates.map(function (taxRate) {
                        _.each(taxRate, function (v, k) {
                            taxTags += " " + k;
                        });
                    });
                }
                return taxTags;
            },
            removeFromCart: function (product_id) {
                var cartProduct = _.findWhere(this.cart_products, {id: product_id});
                if (cartProduct && !_.isEmpty(cartProduct)) {
                    this.$store.commit("remove_cart_product", cartProduct);
                    alertify.error(cartProduct.description + "<br> is removed from cart!");
                }
            }
        }
    };
</script>