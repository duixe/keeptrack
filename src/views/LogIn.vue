<template>
  <div class="about">
     <v-container
        class="fill-height pt-6"
        style="margin-top: 6.7rem"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
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
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
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
            goHome: "/"
        }
    },
    methods: {
      login() {
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                console.log(`you are logged as ${user.email}`)  
                this.$router.go({ path: this.$router.path})
            }).catch(err => {
                console.log(err.message);
            })
      }  
           
    }
}
</script>
