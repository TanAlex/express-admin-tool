<template>
  <div class="login-container">
    <div class="row">
      <div class="col-md-12">
        <div class="text-center m-b-md">
          <h3>Reset Password</h3>
          <small>Please reset your password </small>
        </div>
        <div class="hpanel">
          <div class="panel-body">
              <div class="row">
                <!-- <div class="form-group col-md-12">
                  <label>Old Password</label>
                  <input type="password" v-model="old_password" v-validate="'required'" :class="{'has-error': errors.has('old_password'),'form-control':true }" name="old_password">
                  <span v-show="errors.has('old_password')" class="has-error control-label">{{ errors.first('old_password') }}</span>
                </div> -->
                <div class="form-group col-md-12">
                  <label>Password</label>
                  <input type="password" v-model="new_password" v-validate="'required'" :class="{'has-error': errors.has('new_password'),'form-control':true }" name="new_password">
                  <span v-show="errors.has('new_password')" class="has-error control-label">{{ errors.first('new_password') }}</span>
                </div>
                <div class="form-group col-md-12">
                  <label>Password</label>
                  <input type="password" v-model="new_password2" v-validate="'required'" :class="{'has-error': errors.has('new_password2'),'form-control':true }" name="new_password2">
                  <span v-show="errors.has('new_password2')" class="has-error control-label">{{ errors.first('new_password2') }}</span>
                </div>                               
              </div>
              <div class="text-center">
                <button class="btn btn-success" @click="onReset">Set New Password</button>
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
      new_password2: "",
      new_password: ""
    }
  },
  components: {

  },
  methods:{
    onCancel: function(event){
      this.$emit('cancel', event);
    },
    onReset: function (e) {
      e.preventDefault();
      this.$validator.validateAll().then((ok) => {
        if (ok) {
          //console.log("baseUrl", $req.baseUrl);
          var url = $req.baseUrl + "/api/send_reset_email";
          var elem = document.getElementById("login-app");
          alertify.parent(elem);
          alertify.logPosition("top right");

          axios.post(url,
            { email: this.email, password: this.password }
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
            console.log("error:", error);
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