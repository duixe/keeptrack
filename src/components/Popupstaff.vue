<template>
    <v-dialog 
      v-model="dialog"
      width="550"
      persistent 
      >
      <template v-slot:activator="{ on }">
          <v-btn
          absolute
          dark
          v-on="on"
          fab
          large
          bottom
          right
          class="secondarylight"
          style="right: 20em"
          >
          <v-icon>mdi-plus</v-icon>
          </v-btn>
      </template> 
      <v-card>
          <v-card-title
          class="headline grey lighten-2"
          primary-title
          >
          Add New Employee
        </v-card-title>
        <v-card-text>
         <v-form class="px-3" ref="form">
           <v-text-field 
           label="Name" 
           v-model="name"
           :rules="nameRules"
           required
           prepend-icon="perm_identity"
           >
           </v-text-field>
           <v-text-field 
           label="Position" 
           v-model="role" 
           required
           :rules="[v => !!v || 'position is required']"
           prepend-icon="class" 
           >
           </v-text-field>
           <v-select
              v-model="department"
              :items="items"
              :rules="[v => !!v || 'Department is required']"
              label="Department"
              required
              prepend-icon="supervised_user_circle"
            >
            </v-select>
           <v-text-field 
           label="Email" 
           v-model="email"
           :rules="emailRules"
           required
           prepend-icon="email"
           >
           </v-text-field>
           <v-file-input
            :rules="fileRules"
            @change="uploadImage"
            v-model="file"
            ref="upLoadval"
            accept="image/png, image/jpeg, image/jpg, image/bmp"
            placeholder="Pick an profile image"
            prepend-icon="mdi-camera"
            label="Profile image"
           ></v-file-input>
          <!-- date picker -->
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            max-width="290"
          >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDate"
              clearable
              label="Choose date"
              readonly
              required
              :rules="[v => !!v || 'date is required']"
              prepend-icon="event"
              @click:clear="date = null"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="dateMenu = false"
          ></v-date-picker>
        </v-menu>
      <!-- End of date picker -->
         </v-form>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary mr-2" flat @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="success"
            flat
            :loading="loading"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import {db, fb} from '@/firebase'
export default {
    data() {
      return {
        dialog: false,
        name: "",
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 100) || 'Name must be less than 100 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        fileRules: [
        value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
      ],
        department: null,
        items: [
          // 'Software Engineering',
          // 'Finance Department',
          // 'UI/UX Department',
          // 'Software Development',
        ],
        role: "",
        file: null,
        img_url:  null,
        date: null,
        dateMenu: false,
        loading: false
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true
          const employee = {
            name: this.name,
            email: this.email,
            role: this.role,
            department: this.department,
            profile_pic: this.img_url,
            date: format(parseISO(this.date), 'do MMM yyyy')
          }

          // New Code 👇
          const user = fb.auth().currentUser;
          db.collection('clients').doc(user.uid).collection('departments').get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data().name == employee.department) {
                db.collection('clients').doc(user.uid).collection('departments').doc(`${doc.id}`).collection('employees').add(employee)
                .then(() => {
                  console.log(this.img_url);
                }).catch(err => {
                  console.log("error: ", err);
                })
              }
              this.loading = false
              this.$emit('employeeAdded')
            })
          })

          // old code 👇
          // db.collection('departments').get()
          // .then(querySnapshot => {
          //     querySnapshot.forEach(doc => {
          //       if(doc.data().name == employee.department) {
          //         db.collection('departments').doc(`${doc.id}`).collection('employees').add(employee).then(() => {
          //           console.log(this.img_url);

                    
          //         }).catch(err => {
          //           console.log("error: ", err);
                    
          //         })
                 
                  
                  
          //       }
                
                
          //       this.loading = false
          //       this.$emit('employeeAdded')
          //     })
          // })

          // db.collection('departments').doc(`${this.department}`).collection('employees').add(employee).then(() => {
          //   this.loading = false
          //   this.$emit('employeeAdded')
          // })


          setTimeout(() => {
             this.$refs.form.reset() 
          }, 1000)          
         
          setTimeout(() => {
            this.dialog = false 
          }, 3000)
          
          
          
           
        }
      },
      uploadImage() {
        let storageRef = fb.storage().ref('profile_pic/'+this.file.name)
        
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
    },
    computed: {
      computedDate() {
        return this.date ? format(parseISO(this.date),  'do MMM yyyy') : ''
      },
    },
    created() {
      const user = fb.auth().currentUser;
      db.collection('clients').doc(user.uid).collection('departments').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.items.push( doc.data().name ))
      })
    }
  

}
</script>
<style lang="css" scoped>

</style>