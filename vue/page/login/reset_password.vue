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
                  <label>New Password</label>
                  <input type="password" v-model="new_password" v-validate="'required|twoPasswordMatch'" :class="{'has-error': errors.has('new_password'),'form-control':true }" name="new_password">
                  <span v-show="errors.has('new_password')" class="has-error control-label">{{ errors.first('new_password') }}</span>
                </div>
                <div class="form-group col-md-12">
                  <label>New Password Again</label>
                  <input type="password" v-model="new_password2" v-validate="'required|twoPasswordMatch'" :class="{'has-error': errors.has('new_password2'),'form-control':true }" name="new_password2">
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
  watch: {
    new_password(value) {
      this.$validator.validate('new_password2', this.new_password2);
    },
    new_password2(value) {
      this.$validator.validate('new_password', this.new_password);
    }
  },
  mounted: function(){
      this.$validator.extend('twoPasswordMatch', {
        getMessage: field => 'The two password fields must match',
        validate: value => this.new_password == this.new_password2
      });
  },
  methods:{
    onCancel: function(event){
      this.$emit('cancel', event);
    },
    onReset: function (e) {
      e.preventDefault();
      var self = this;

      this.$validator.validateAll().then((ok) => {
        if (ok) {
          //console.log("baseUrl", $req.baseUrl);
          var url = $req.baseUrl + "/api/reset_passwd";
          var elem = document.getElementById("login-app");
          alertify.parent(elem);
          alertify.logPosition("top right");

          axios.post(url,
            { email: $req.context.email, actCode: $req.context.actCode, password: this.new_password }
          ).then(function (res) {
            console.log("res:", res);
            if (res && res.data) {
              if (res.data.result){
                alertify.success("Successfully reset your password");
              
                setTimeout( self.$emit('cancel', "Successfully reset your password, try to login now"), 3000);
                //go back to login page
                //setTimeout(  window.location.replace($req.baseUrl + '/login'),  10000);
              }else{
                alertify.error("There were some errors when trying to reset password. "+ res.data.message);
              }              
            }else{
              alertify.error("There were some errors when trying to reset password.");
            }
          }).catch(function (error) {
            console.log("error:", error.response);
            alertify.error("There were some errors when trying to reset password");
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