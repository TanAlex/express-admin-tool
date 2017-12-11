<template>
  <div class="login-container">
    <div class="row">
      <div class="col-md-12">
        <div class="text-center m-b-md">
          <h3>Reset Password</h3>
          <small>We will send an email to validate before you can reset password. </small>
        </div>
        <div class="hpanel">
          <div class="panel-body">
              <div class="row">
                <div class="form-group col-md-12">
                  <label>Email Address</label>
                  <input type="text" v-model="email"  v-validate="'required|email'" :class="{'has-error': errors.has('register_email'),'form-control':true }" name="register_email">
                  <span v-show="errors.has('register_email')" class="has-error control-label">{{ errors.first('register_email') }}</span>
                </div>                
              </div>
              <div class="text-center">
                <button class="btn btn-success" @click="onResetEmail">Send Confirmation Email</button>
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
    onResetEmail: function (e) {
      e.preventDefault();
      this.$validator.validateAll().then((ok) => {
        if (ok) {
          //console.log("baseUrl", $req.baseUrl);
          var url = $req.baseUrl + "/api/send_reset_email";
          var elem = document.getElementById("login-app");
          alertify.parent(elem);
          alertify.logPosition("top right");

          axios.post(url,
            { email: this.email }
          ).then(function (res) {
            console.log("res:", res);
            if (res && res.data.result) {
              //successfully login
              //console.log(req.session.user);
              alertify.success("Successfully send email, please check your inbox");
              //window.location.replace($req.backUrl);
            } else {
              alertify.error("There were some errors when trying to send reset password email");
            }
          }).catch(function (error) {
            console.log("error:", error.response);
            var message = "";
            if (error.response && error.response.data) message = error.response.data.message;
            alertify.error("There were some errors when trying to send reset password email");
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