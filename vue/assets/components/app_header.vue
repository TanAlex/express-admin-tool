<template>
    <div>
        <header-top></header-top>

        <header>
            <header-bar></header-bar>
         </header>

        <div class="container">
            <nav-menu></nav-menu>
        </div>
    </div>
</template>

<script>
    import header_top from '../../assets/components/gears/header_top.vue';
    import header_bar from '../../assets/components/gears/header_bar.vue';
    import nav_menu from '../../assets/components/gears/nav_menu.vue';
    export default {
        components: {
             "header-top": header_top,
             "header-bar": header_bar,
             "nav-menu": nav_menu,
        },
        methods:{

        },
        computed: {

        }
    };
</script>