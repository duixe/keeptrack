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
          color="primary"
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
          Add New Department
        </v-card-title>
        <v-card-text>
         <v-form class="px-3" ref="form">
           <v-text-field 
           label="Name of Department" 
           v-model="name"
           :rules="nameRules"
           required
           prepend-icon="perm_identity"
           >
           </v-text-field>
           <v-textarea 
           label="Little Description" 
           v-model="description" 
           required
           :rules="[v => !!v || 'Description is required']"
           prepend-icon="edit" 
           >
           </v-textarea>
           <v-select
              v-model="status"
              :items="items"
              :rules="[v => !!v || 'status is required']"
              label="Active"
              required
              prepend-icon="supervised_user_circle"
            >
            </v-select>
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
            :loading = "loading"
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
        status: 'true',
        items:['true', 'false'],
        description: "",
        date: null,
        dateMenu: false,
        loading: false
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true
          const department = {
            name: this.name,
            description: this.description,
            isActive: this.status,
            date: format(parseISO(this.date), 'do MMM yyyy')
          }
          // new code 👇
          const user = fb.auth().currentUser;
          db.collection('clients').doc(user.uid).collection('departments').doc().set(department).then(() => {
            this.loading = false
            this.$emit('departmentAdded')
          })


          // old code 
          // db.collection('departments').doc().set(department).then(() => {
          //   this.loading = false
          //   this.$emit('departmentAdded')
          // })


          setTimeout(() => {
             this.$refs.form.reset() 
          }, 1000)          
         
          setTimeout(() => {
            this.dialog = false 
          }, 3000)
          
        }
      },
    },
    computed: {
      computedDate() {
        return this.date ? format(parseISO(this.date),  'do MMM yyyy') : ''
      },
    },
    created() {
      // db.collection('departments').doc('fUT2YgRjF27uBXdarABB').collection('employees').get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => console.log(doc.data()))
      // })
    }

}
</script>
<style lang="css" scoped>

</style>