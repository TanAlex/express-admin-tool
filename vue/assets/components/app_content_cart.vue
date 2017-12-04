<template>
    <div id="checkout-cart" class="container">
        <h1>Shopping Cart</h1>
        <my-cart-table></my-cart-table>

        <div class="col-sm-4 col-sm-offset-8">
            <my-cart-total></my-cart-total>
        </div>

    </div>
</template>

<script>
    import my_cart_table from '../../assets/components/gears/my_cart_table.vue';
    import my_cart_total from '../../assets/components/gears/my_cart_total.vue';

    export default{
        components:{
            "my-cart-table": my_cart_table,
            "my-cart-total": my_cart_total
        },
        computed: {

        },
        methods: {

        }
    };
</script>