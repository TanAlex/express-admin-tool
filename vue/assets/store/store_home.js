import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store =  new Vuex.Store({
    state:{
        hideViewCart: false,
        currentView: 'shop',
        page: 0
    },
    getters:{
        get_hide_viewCart: function (state) {
            return state.hideViewCart;
        },
        get_current_view: function (state) {
            return state.currentView;
        }
    },
    mutations:{
        page_set: function (state, page) {
            state.page = 1;
        },
        pageIncrease: function (state) {
            state.page++;
        },
        pageDecrease: function (state) {
            state.page--;
        }
        
    },
    actions:{
        // getProducts: function (context) {
        //     var data = {
        //         store_id: store_id,
        //         number_per_page: number_per_page,
        //         page: this.state.page,
        //         category_id: this.state.category_id,
        //         orderBy: this.state.orderBy,
        //         orderType: this.state.orderType,
        //         searchFor: this.state.searchFor
        //     };
        //     data.fields = "id,item_code,description,description_2,base_price,images,category_id,on_purchase,ordered,on_hand,taxRates";
        //     $.getJSON("/ajax/products/searchFor", data, function (respData) {
        //         var total = respData.total;
        //         var products = respData.products;
        //         products = productSanitize(products);
        //         context.commit("set_products", products);
        //         context.commit("set_product_total", total);
        //     });
        // }
    }
});

export default store;
