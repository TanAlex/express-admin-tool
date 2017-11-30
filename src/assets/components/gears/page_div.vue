<template>
    <div id="page_div" class="row">
        <div class="col-sm-6 text-left">
            <span>Showing {{currentStartProduct}} to {{currentEndProduct}} of {{getProductTotal}} ({{page}} page of {{total_pages}} Pages)</span>
        </div>
        <div class="col-sm-6 text-right">
            <div>
                <a href="javascript:void(0)"  title="Prev" class="prev" v-on:click="prev_page"><img src="images/prev.png" v-on:click="prev_page"/>Prev</a>
                <span style="display:inline-block; width: 5px;"></span>
                <a href="javascript:void(0)" title="Next" class="next" v-on:click="next_page">Next</a><a href="javascript:void(0)" title="Next" class="next"><img src="images/next.png" v-on:click="next_page"/></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
     computed: {
         getProductTotal: function () {
             return this.$store.getters.get_product_total;
         },
         currentStartProduct: function () {
             var starting = this.$store.getters.get_current_product - number_per_page + 1;
             if(starting > 0) {
                 return starting;
             } else {
                 return 1;
             }
         },
         currentEndProduct: function () {
             var ending = this.$store.getters.get_current_product;
             if(ending < this.getProductTotal) {
                 return ending;
             } else {
                 return this.getProductTotal;
             }
         },
         total_pages: function() {
             return this.$store.getters.get_total_pages;
         },
         page: function() {
             return this.$store.getters.get_current_page;
         }
     },
     methods: {
         prev_page: function () {
             if (this.page > 1) {
                 this.$store.commit("pageDecrease");
                 this.$store.dispatch("getProducts");
             }
         },
         next_page: function () {
             if (this.page < this.total_pages) {
                 this.$store.commit("pageIncrease");
                 this.$store.dispatch("getProducts");
             }
         }
     }
    };
</script>