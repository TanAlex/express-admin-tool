<template>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
            <tr>
                <td class="text-center">Image</td>
                <td class="text-left">Product Name</td>
                <td class="text-left">Quantity</td>
                <td class="text-right">Unit Price</td>
                <td class="text-right">Taxes</td>
                <td class="text-right">Total</td>
            </tr>
            </thead>

            <tbody>
            <tr v-for="product in cart_products">
                <td class="text-center"> <a href="javascript:void(0)"><img v-bind:src="product.images[0]" class="product-img-thumbnail" /></a> </td>
                <td class="text-left"><a href="javascript:void(0)">{{product.description}}</a>                                                 </td>
                <td class="text-left">
                    <div class="input-group btn-block" style="max-width: 100px;">
                        <input type="number" :value="product.qty" size="1" class="form-control" />
                    <div class="input-group-btn">
                        <button type="button" data-toggle="tooltip" title="Remove" class="btn btn-danger" v-on:click="removeFromCart(product.id)"><i class="fa fa-times-circle"></i></button>
                    </div></div></td>
                <td class="text-right">{{product.base_price}}</td>
                <td class="text-right">{{getTaxTags(product)}}</td>
                <td class="text-right">${{getAmount(product)}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
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