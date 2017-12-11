import Vue from 'vue';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import alertify from 'alertify.js';


// import store from "../assets/store/store_home.js";
import registerPanel from './login/register.vue';
import forgotPasswordPanel from './login/forgot_password.vue';
import resetPasswordPanel from './login/reset_password.vue';

//Vue.use(VeeValidate, { events: 'blur' });
Vue.use(VeeValidate);

new Vue({
  el: '#login-app',
  //store: store,
  components: {
    "panel-register": registerPanel,
    "panel-forget-password": forgotPasswordPanel,
    "panel-reset-password": resetPasswordPanel
  },
  data: function () {
    return {
      help_message: "Please use Email and Password to login",
      infoMessage: "",
      showMessage: false,
      context: undefined,
      activeView: "LoginView",
      username: "",
      password: ""
    }
  },
  mounted: function(){
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      this.context = $req.context;
      console.log($req.context);
      if ($req.context && $req.context && $req.context.action == "activate"  ){
        if (! $req.context.code) {
          this.infoMessage = "There is no actcode provided, can't activate your account";
        }else{
          this.infoMessage = $req.context.result.message;
        }
        this.showMessage = true;
        alertify.success("successfully called activate");
      }else if ($req.context && $req.context && $req.context.action == "resetpassword"  ){
        if ($req.context.result && $req.context.result.OK){
          this.navToView('ResetPasswordView');
          //set email and code etc.
        }else{
          this.infoMessage = $req.context.result.message;
        }
        this.showMessage = true;
      }  
    })
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
    navToView: function (newViewName , message) {
      if ('RegisterView LoginView ForgetPasswordView ResetPasswordView'.toLowerCase().indexOf(newViewName.toLowerCase()) > -1) {
        this.activeView = newViewName;
        console.log("newViewName:", newViewName);

        if (typeof message != "undefined"){
          this.infoMessage = message;
          this.showMessage = true;
        }else{
          this.showMessage = false;
        }
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