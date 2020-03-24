<template>
  <div class="about">
     <v-container
        class="fill-height"
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
                <v-toolbar-title>Sign Up</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    label="username"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    :rules="nameRules"
                    required
                  />

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
                  <v-file-input
                    :rules="fileRules"
                    @change="uploadImage"
                    v-model="file"
                    ref="upLoadval"
                    accept="image/png, image/jpeg, image/jpg, image/bmp"
                    placeholder="Pick a profile image"
                    prepend-icon="mdi-camera"
                    label="Profile image"
                ></v-file-input>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" router :to="goHome">Cancel</v-btn>
                <v-btn color="primary" @click="register">Sign UP</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>
<script>
import {fb, db} from '@/firebase'
export default {
    data() {
        return {
            username: "",
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 100 characters',
            ],
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
            fileRules: [
                value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
            ],
            file: null,
            img_url:  null,
            goHome: "/"
        }
    },
    methods: {
           register() {
              
                   fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                   .then(user => {
                     console.log(user.user.uid)
                     
                     return db.collection('clients').doc(user.user.uid).set({
                           username: this.username,
                           admin_pic: this.img_url

                       })
                       
                    
                   }).then(() => {
                     console.log("user_doc successfully created") 
                     this.$router.go({ path: this.$router.path})
                     })
                   .catch(err => {
                       let errCode = err.code
                       let errMessage = err.message

                       if (errCode == 'auth/weak-password') {
                          console.log("password is to weak");
                           
                       }else if(errCode == 'auth/email-already-in-use') {
                           alert("email already in use")
                       }else {
                           console.log(errMessage);
                       }
                       console.log(err);
                   }) 

            
            },
            uploadImage() {
                let storageRef = fb.storage().ref('admin_pic/'+this.file.name)
                
                let uploadTask = storageRef.put(this.file)

                uploadTask.on('state_changed', (snapshot) => {
                console.log(snapshot);
                
                
                }, (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                    
                }, () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.img_url = downloadURL
                    
                    
                    });
                });
        
            }
           
        }
}
</script>
<style lang="css" scoped>

</style>
