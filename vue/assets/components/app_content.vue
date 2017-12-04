<template>
    <div class="container">
        <!-- render the currently active component/page here -->
        <keep-alive>
            <component :is="currentView"></component>
        </keep-alive>
    </div>
</template>

<script>
    import shop from '../../assets/components/app_content_shop.vue';
    import cart from '../../assets/components/app_content_cart.vue';
    export default {
        components: {
            "shop": shop,
            "cart": cart
        },
        methods:{

        },
        computed: {
            currentView: function () {
                return this.$store.getters.get_current_view;
            }
        }
    };
</script>