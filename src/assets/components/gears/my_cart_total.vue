<template>
    <div>
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td class="text-right"><strong>Sub-Total</strong></td>
                    <td class="text-right">${{cartSubTotal}}</td>
                </tr>

                <tr>
                    <td class="text-right"><strong>TAX</strong></td>
                    <td class="text-right">${{cartTaxes}}</td>
                </tr>

                <tr>
                    <td class="text-right"><strong>Total</strong></td>
                    <td class="text-right">${{cartTotal}}</td>
                </tr>
            </tbody>
        </table>
        <p class="text-right">
            <a v-if="!hideViewCart"  href="javascript:void(0)" v-on:click="set_view('cart')">
                <strong><i class="fa fa-shopping-cart"></i> View Cart</strong>
            </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <a href="checkout">
                <strong><i class="fa fa-share"></i> Checkout</strong>
            </a>&nbsp;
        </p>
    </div>
</template>

<script>
    export default{
        computed: {
            hideViewCart: function(){
                return this.$store.getters.get_hide_viewCart;
            },
            cart_products: function () {
                return this.$store.getters.get_cart_products;
            },
            cartSubTotal: function () {
                var subTotal = 0;
                this.cart_products.map(function (product) {
                    if (product && !_.isEmpty(product)) {
                        if (product.base_price && product.qty) {
                            subTotal += product.base_price * product.qty;
                        }
                    }
                });
                return parseFloat(subTotal).toFixed(2);
            },
            cartTaxes: function () {
                var taxes = 0;
                this.cart_products.map(function (product) {
                    if (product && !_.isEmpty(product)) {
                        if (product.base_price && product.qty && product.taxRates) {
                            product.taxRates.map(function (taxRate) {
                                _.each(taxRate, function (v) {
                                    taxes += product.base_price * product.qty * v;
                                });
                            });
                        }
                    }
                });
                return parseFloat(taxes).toFixed(2);
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
        },
        methods: {
            set_view: function (currentView) {
                this.$store.commit("set_current_view", currentView);
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