<template>
    <nav id="menu" class="navbar">
        <div class="navbar-header"><span id="category" class="visible-xs">Menu</span>
            <button type="button" class="btn btn-navbar navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"><i class="fa fa-bars"></i></button>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">
                <li>
                    <a href="javascript:void(0)" v-on:click="set_view('shop')">Shop</a>
                </li>
                <li>
                    <a href="javascript:void(0)" v-on:click="set_view('cart')">My Cart</a>
                </li>
                <li class="dropdown">
                    <a href="javascript:void(0)">My Account</a>
                </li>
                <li class="dropdown">
                    <a href="javascript:void(0)">Check Out</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        methods:{
            set_view: function (currentView) {
                this.$store.commit("set_current_view", currentView);
                if(currentView == "cart") {
                    this.$store.commit("set_hide_viewCart", true);
                } else {
                    this.$store.commit("set_hide_viewCart", false);
                }
            }
        },
        computed: {
            getStoreId: function () {
                return this.$store.state.store_id;
            }
        }
    };
</script>