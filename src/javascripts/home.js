import Vue from 'vue';
import store from "../assets/store/store_home.js";
import app_header from '../assets/components/app_header.vue';
import app_content from '../assets/components/app_content.vue';


var home = new Vue({
    el: '#home',
    store: store,
    components: {
        "app-header": app_header,
        "app-content": app_content,
    }
});