<template>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <img :src="'stores/' + getStoreId + '/images/logo.jpg'" title="Test" class="img-responsive" />
                    <div id="logo"><h1><a v-bind:href="getURL('?store_id=') + getStoreId">{{getStoreName}}</a></h1>
                    </div>
                </div>
                <div class="col-sm-5">
                    <search-input></search-input>
                </div>
                <div class="col-sm-3">
                    <my-cart></my-cart>
                </div>
            </div>
        </div>
</template>

<script>
    import search_input from './search_input.vue';
    import my_cart from './my_cart.vue';
    export default {
        components: {
            "search-input": search_input,
            "my-cart": my_cart
        },
        methods: {
            getURL: function (URL) {
                return this.$store.state.baseURL + URL;
            }
        },
        computed: {
            getStoreName: function () {
                return this.$store.state.storeName;
            },
            getStoreId: function () {
                return this.$store.state.store_id;
            }
        }
    };
</script>