<template>
  <div class="login-container">
    <div class="row">
      <div class="col-md-12">
        <div class="text-center m-b-md">
          <h3>Registration</h3>
          <small>We will send an email to validate before you can login. </small>
        </div>
        <div class="hpanel">
          <div class="panel-body">
              <div class="row">
                <div class="form-group col-md-12">
                  <label>Email Address</label>
                  <input type="text" v-model="email"  v-validate="'required|email'" :class="{'has-error': errors.has('register_email'),'form-control':true }" name="register_email">
                  <span v-show="errors.has('register_email')" class="has-error control-label">{{ errors.first('register_email') }}</span>
                </div>                
                <!-- <div class="form-group col-lg-12">
                  <label>Username</label>
                  <input type="" value="" id="" class="form-control" name="">
                </div> -->
                <div class="form-group col-md-12">
                  <label>Password</label>
                  <input type="password" v-model="password" v-validate="'required'" :class="{'has-error': errors.has('register_password'),'form-control':true }" name="register_password">
                  <span v-show="errors.has('register_password')" class="has-error control-label">{{ errors.first('register_password') }}</span>
                </div>

                <!-- <div class="form-group col-lg-6">
                  <label>Repeat Password</label>
                  <input type="password" value="" id="" class="form-control" name="">
                </div>
                <div class="form-group col-lg-6">
                  <label>Email Address</label>
                  <input type="" value="" id="" class="form-control" name="register_email">
                </div>
                <div class="form-group col-lg-6">
                  <label>Repeat Email Address</label>
                  <input type="" value="" id="" class="form-control" name="">
                </div>
                <div class="checkbox col-lg-12">
                  <input type="checkbox" class="i-checks" checked> Sigh up for our newsletter
                </div> -->
              </div>
              <div class="text-center">
                <button class="btn btn-success" @click="onRegister">Register</button>
                <button class="btn btn-default" @click="onCancel">Cancel</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from 'axios';

export default {
  data: function(){
    return {
      email: "",
      password: ""
    }
  },
  components: {

  },
  methods:{
    onCancel: function(event){
      this.$emit('cancel', event);
    },
    onRegister: function (e) {
      e.preventDefault();
      this.$validator.validateAll().then((ok) => {
        if (ok) {
          //console.log("baseUrl", $req.baseUrl);
          var url = $req.baseUrl + "/api/register";
          var elem = document.getElementById("login-app");
          alertify.parent(elem);
          alertify.logPosition("top right");

          axios.post(url,
            { email: this.register_email, password: this.register_password }
          ).then(function (res) {
            console.log("res:", res);
            if (res && res.data.result) {
              //successfully login
              //console.log(req.session.user);
              alertify.success("Successfully registered, please try login page");
              //window.location.replace($req.backUrl);
            } else {
              alertify.error("Register failed, please check inputs");
            }
          }).catch(function (error) {
            console.log("error:", error);
            alertify.error("There were some errors when trying to Register");
          });
        } else {
          
          alertify.log("Please correct input before submit");
        }
      });
    }
  },
  computed: {
  }
};
</script>