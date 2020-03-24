<template>
     <v-container>
         <v-snackbar
            v-model="snackbar"
            :timeout="4000"
            top
            color="success"
          >
            <span>Department added Successfully </span>
            <v-btn
            dark
            text
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </v-snackbar>
         <v-row justify="center" align="center">
            <v-col col="12" xs="12" sm="12" md="8" lg="8">
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
                <v-btn color="secondary mr-2" flat router :to="goDept">Cancel</v-btn>
                <v-btn
                    color="success"
                    flat
                    :loading = "loading"
                    @click="updateDept"
                 >
                    update
                </v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
   </v-container>
</template>
<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import {db, fb} from '@/firebase'
export default {
    data() {
      return {
        dept_id: null,
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
        snackbar: false,
        loading: false,
        goDept: "/department"
      }
    },
    beforeRouteEnter(to, from, next) {
        db.collectionGroup('departments').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc.data().name == to.params.dept_id) {
                    next(vm => {
                        vm.dept_id = doc.id
                        vm.name = doc.data().name
                        vm.description = doc.data().description
                        vm.status = doc.data().status
                        // vm.file = doc.data().profile_pic


                    })
                }
            })
        })
    },
    watch: {
        '$route': 'getData'
    },
    methods: {
      getData() {
          db.collectionGroup('employees').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.data().name == this.$route.params.dept_id) {
                        // this.dept_id = doc.data().id
                        this.name = doc.data().name
                        this.status = doc.data().status
                        this.description = doc.data().description
                        this.dateMenu = doc.data().date
                        
                    }
                })
            })
      },
      updateDept() {
        if (this.$refs.form.validate()) {
          this.loading = true
          const dept = {
            name: this.name,
            status: this.status,
            description: this.description,
            date: format(parseISO(this.date), 'do MMM yyyy')
          }
         const user = fb.auth().currentUser;
         db.collection('clients').doc(user.uid).collection('departments').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.data().name == this.$route.params.dept_id) {
                        doc.ref.update(dept)
                        this.snackbar = true
                        
                        
                    }
                })
            })


          setTimeout(() => {
             this.$refs.form.reset() 
          }, 1000)          
         setTimeout(() => {
             this.$router.push("/department") 
          }, 2000)  
        
          
          
           
        }
      },
    },
    computed: {
        computedDate() {
            return this.date ? format(parseISO(this.date),  'do MMM yyyy') : ''
        },
    },
}
</script>