<template>
  <div class="login">
    <v-snackbar
            v-model="snackbar"
            :timeout="4000"
            top
            color="success"
         >
            <span>{{ msg }}</span>
            <v-btn
            dark
            text
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </v-snackbar>
     <v-container
        class="fill-height pt-6"
        style="margin-top: 6.2rem"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            xs="12"
            sm="11"
            md="4"
          >
            <v-card class="elevation-12 pb-2">
              <v-toolbar
                class="secondarylight"
                dark
                flat
              >
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginform">
                 <v-text-field
                    id="email"
                    label="email"
                    prepend-icon="mail"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passRules.required, passRules.min]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show = !show"
                    prepend-icon="lock"
                   ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn dark class="secondarylight" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
              <v-divider></v-divider>
              <p class="text-center ma-3">
                <a @click="dialog=true">Forgot your password ?</a>
              </p>
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="350">
                <!-- <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                </template> -->
                <v-card>
                    <v-card-title class="warning headline" style="font-weight: bold; color:white;">Reset Password</v-card-title>
                    <v-card-text class="mt-2">
                      Enter Email used for registering this account
                      <v-text-field
                      id="email"
                      label="email"
                      type="text"
                      v-model="emailres"
                      :rules="emailRules"
                      required
                    />
                      </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog=false">Cancel</v-btn>
                    <v-btn color="error" text @click="resetPass">Send pass reset</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>
<script>
import {fb} from '@/firebase'
export default {
  data() {
        return {
            // name: "",
            // nameRules: [
            //     v => !!v || 'Name is required',
            //     v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            // ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            show: false,
            password: "",
            passRules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            loading: false,
            goHome: "/",
            emailres: null,
            dialog: false,
            snackbar: false,
            msg: ""
        }
    },
    methods: {
      login() {
        if (this.$refs.loginform.validate()) {

          this.loading = true
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.go({ path: this.$router.path})
                this.loading = false
            }).catch(err => {
                console.log(err.message);
                this.msg = err.message
                this.snackbar = true
                this.loading = false
            })
          
        }
          
            
      },
      resetPass() {
        const auth = fb.auth()

        auth.sendPasswordResetEmail(this.emailres).then(() => {
          console.log("email sent");
          
        }).catch(err => {
          console.log(err);
          
        })

      }  
           
    }
}
</script>
<style lang="css" scoped>
  a {
    text-decoration: none !important;
    color: grey !important;
  }
</style>
