<template>
    <div  class="row">
        <div v-for="product in products" class="product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div class="product-thumb">
                <div class="image">
                    <a class="product_link" href=""><img alt="" v-bind:src="product.images[0]" title="product.description" class="img-responsive product-img" /></a>
                </div>
                <div>
                    <div class="caption">
                        <h4><a class="product_link" href="">{{product.description}} </a></h4>
                        <p>{{product.description_2}} </p>
                        <p class="price">
                            <span class="price-new">$ {{product.base_price}}</span>
                            <span class="price-tax">SKU:  {{product.item_code}}</span>
                            <span class="price-tax">ID:  {{product.id}}</span>
                        </p>
                    </div>
                    <div class="button-group">
                        <button type="button" v-on:click="addToCart(product)"><i class="fa fa-shopping-cart"></i> <span class="hidden-xs hidden-sm hidden-md">Add to Cart</span></button>
                        <button type="button" data-toggle="tooltip" title="Add to Wish List" v-on:click="addToWish(product)"><i class="fa fa-heart"></i>Add to Wish</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        computed: {
            products: function () {
                return this.$store.getters.get_products;
            },
            cartProducts: function () {
                return this.$store.getters.get_cart_products;
            },
            wishProducts: function () {
                return this.$store.getters.get_wish_products;
            }
        },
        methods: {
            addToCart: function (product) {
                var qty = 1;
                var product_id = parseInt(product.id);
                var cartProduct = _.findWhere(this.cartProducts, {id: product_id});
                if (cartProduct && !_.isEmpty(cartProduct)) {
                    if (cartProduct.qty) {
                        cartProduct.qty = parseFloat(cartProduct.qty) + parseFloat(qty);
                    } else {
                        cartProduct.qty = qty;
                    }
                    this.$store.commit("refresh_cart_products");
                } else {
                    product.qty = qty;
                    this.$store.commit("add_product_to_cart", product);
                }
                alertify.success(product.description + "<br> is added to cart!");
            },
            addToWish: function (product) {
                var product_id = parseInt(product.id);
                var wishProduct = _.findWhere(this.wishProducts, {id: product_id});
                if (wishProduct && !_.isEmpty(wishProduct)) {
                    alertify.success(product.description + "<br> is already in wish list!");
                } else {
                    this.$store.commit("add_product_to_wish", product);
                    alertify.success(product.description + "<br> is added to wish list!");
                }
            }
        }
    };
</script>