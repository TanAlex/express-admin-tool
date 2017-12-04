import Vue from 'vue';
import VeeValidate from 'vee-validate';
import axios from 'axios';


// import store from "../assets/store/store_home.js";
import registerPanel from './login/register.vue';
// import app_content from '../assets/components/app_content.vue';

//Vue.use(VeeValidate, { events: 'blur' });
Vue.use(VeeValidate);

var home = new Vue({
  el: '#login-app',
  //store: store,
  components: {
    "panel-register": registerPanel
  },
  data: function () {
    return {
      help_message: "Please use Email and Password to login",
      activeView: "LoginView",
      username: "",
      password: ""
    }
  },
  methods: {
    onLogin: function (e) {
      e.preventDefault();
      this.$validator.validateAll().then((ok) => {
        if (ok) {
          //console.log("baseUrl", $req.baseUrl);
          var url = $req.baseUrl + "/api/login";
          alertify.logPosition("top right");
          axios.post(url,
            { username: this.username, password: this.password }
          ).then(function (res) {
            console.log("res:", res);
            if (res && res.data.result) {
              //successfully login
              //console.log(req.session.user);
              alertify.success("Successfully login, redirecting you to site");
              console.log("successfully logged in, will redirect you to ", $req.backUrl);
              window.location.replace($req.backUrl);
            } else {
              alertify.error("Login failed, please check inputs");
            }
          }).catch(function (error) {
            console.log("error:", error);
            alertify.error("There were some errors when trying to login");
          });
        } else {
          var elem = document.getElementById("login-app");
          alertify.parent(elem);


          alertify.log("Please correct input before submit");
        }
      });
    },
    navToView: function (newViewName) {
      if ('RegisterView LoginView ForgetPasswordView'.toLowerCase().indexOf(newViewName.toLowerCase()) > -1) {
        this.activeView = newViewName;
        console.log("newViewName:", newViewName);
      } else {
        console.log(newViewName + " doesn't exist, can't navTo");
      }
    },
    onToRegisterView: function (e) {
      this.navToView("RegisterView");
    },
    onToLoginView: function (e) {
      this.navToView("LoginView");
    },
    onToForgetPasswordView: function (e) {
      this.navToView("ForgetPasswordView");
    },
  }
});