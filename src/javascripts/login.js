import Vue from 'vue';
//import VeeValidate from 'vee-validate';


// import store from "../assets/store/store_home.js";
// import app_header from '../assets/components/app_header.vue';
// import app_content from '../assets/components/app_content.vue';

//Vue.use(VeeValidate);
var home = new Vue({
  el: '#login-app',
  //store: store,
  components: {
    // "app-header": app_header,
    // "app-content": app_content,
  },
  data: function(){
    return {
      help_message: "Please use Email and Password to login",
      username: "",
      password: ""
    }
  },
  methods:{
    onLogin: function(e) {
      e.preventDefault();
      console.log("username:", this.username);
      console.log("password:", this.password);
    }
  }
});