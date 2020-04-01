<template>
    <div class="team">
        <v-snackbar
            v-model="snackbar"
            :timeout="4000"
            top
            color="success"
         >
            <span>Employee added Successfully </span>
            <v-btn
            dark
            text
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </v-snackbar>
        <v-container-fluid pl="10">
            <v-row style="position: relative;
             background-image: linear-gradient(to right top, #051937, #043758, #015778, #0e7995, #2c9dae);"
            >

            <v-col cols="12" sm="8" offset-md="2" md="4">
                <v-img :src="require('@/assets/team3.svg')"
                height="200"
                width="200"
                style="opacity: .95"
                ></v-img>
            </v-col> 
            <v-col sm="4" offset-md="3" md="3" align="center">
                <h1 style="color: #F5F5F5; opacity: .90">STAFF</h1>
            </v-col>   
            
                <!-- <template v-slot:activator="{ on }">
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
                </template> -->
                
                <Popupstaff @employeeAdded="snackbar = true"/>
            </v-row>
        </v-container-fluid>
        <v-container class="my-8">
            <v-row justify="center" align="center" class="mb-3">
                <v-col cols="12" xs="12" sm="12" md="6">
                    <v-text-field
                    v-model="search"
                    label="Search Employee"
                    append-icon="search"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row v-if="staff.length != 0"> 
                <v-col xs="12" sm="6" md="4" lg="3" v-for="person in filteredStaff" :key="person.name">
                    <v-card class="text-center ma-3">
                      <v-responsive class="pt-4">
                          <v-avatar size="100" class="grey lighten-2">
                              <img :src="person.profile_pic" :alt="`${person.name}.png`">
                          </v-avatar>
                      </v-responsive>
                      <v-card-text>
                        <div class="sub-heading">{{ person.name }}</div>
                        <div class="grey--text">{{ person.role }}</div>
                      </v-card-text>
                      <v-card-actions  d-flex style="justify-content: center;">
                        <v-btn text color="grey">
                            <router-link
                            :to="{name: 'EditEmployee', params: {staff_id: person.id}}"
                            >
                               <v-icon small left>mdi-pencil</v-icon>
                               <span>Edit</span>
                            </router-link>
                        </v-btn>
                         <v-btn text color="grey" align="right">
                            <router-link
                            :to="{name: 'ViewEmployee', params: {staff_id: person.id}}"
                            >
                                <v-icon small left>mdi-account-circle</v-icon>
                                <span>view</span>
                            </router-link>
                        </v-btn>
                      </v-card-actions>
                    </v-card>            
                </v-col>
            </v-row>
            <v-row v-else class="my-3 text-center">
                <v-col col="12" xs="6" sm="6" md="6" lg="7" align="center">
                    <div style="width: 250px">
                        <v-img :src="require('@/assets/add.svg')"
                        width="100%"
                        style="opacity: .75"
                        >
                        </v-img>
                    </div>
                </v-col>
                <v-col xs="6" sm="6" md="6" lg="5" align="center">
                    <h3 class="mt-6 text-center" style="opacity: .55">Click the "+" button to add an employee</h3>
                </v-col>
    
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Popupstaff from '@/components/Popupstaff'
import {db, fb} from '@/firebase'
export default {
    name: "Team",
    components: { Popupstaff },
    data() {
        return {
            staff: [ 
                // {name: 'Emmanuel Akomaning', role: 'software Engineer', department: 'Software Engineer', avatar: '/avatar-1.png'},
                // {name: 'Nchana Enoch', role: 'database Manager', department: 'Software Engineer', avatar: '/avatar-2.png'},
                // {name: 'Olorunfunmi Joshua', role: 'accountant', department: 'Finance department', avatar: '/avatar-3.png'},
                // {name: 'Perez Gagbe', role: 'planning', department: 'PLanning Department', avatar: '/avatar-4.png'},
                // {name: 'Duixe Sunday', role: 'UI/UX', department: 'UI/UX Engineer', avatar: '/avatar-5.png'}
            ],
            routeItem: {
                routeView: "/viewemployee", 
                routeEdit: "/editemployee"
            },
            search:"",
            snackbar: false
        }
    },
    computed: {
        filteredStaff() {
            return this.staff.filter((staffs) => {
                return staffs.name.match(this.search)
            })
        }
    },
    created() {
            const user = fb.auth().currentUser;

            let docQuery = db.collection('clients').doc(user.uid).collection("departments")
           
             docQuery.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.collection('employees').onSnapshot(res => {
                        const changes = res.docChanges()
                            changes.forEach(change => {
                                if(change.type === 'added') {
                                    this.staff.push({
                                        ...change.doc.data(), 
                                        id:change.doc.id
                                    })
                                }
                            })   
                        
                        })
                     
                    })
                 
                })
            // db.collection('employees').onSnapshot(res => {
            //     const changes = res.docChanges()
            //         changes.forEach(change => {
            //             if(change.type === 'added') {
            //                 this.staff.push({
            //                     ...change.doc.data(), 
            //                     id:change.doc.id
            //                 })
            //             }
            //         })   
                
            //     })

                // db.collectionGroup('employees').onSnapshot(res => {
                // const changes = res.docChanges()

                //     changes.forEach(change => {
                //         if(change.type === 'added') {
                //             this.staff.push({
                //                 ...change.doc.data(), 
                //                 id:change.doc.id
                //             })
                //         }
                //     })   
                
                // })

            // let query = db.collectionGroup('employees')
            //     query.get().then((querySnapshot) => {
            //         querySnapshot.forEach((doc) => {
            //             if (doc.data().name == "Emmanuel Akomaning") {
            //                 console.log(doc.id, ' => ', doc.data());
            //             }

            //         });
            //     });
                
            

    }
}
</script>
<style lang="css" scoped>
    .team {
        width: 100vw;
        min-height: 100%;
        overflow-x: hidden;
        background: #F5F5F5;

    }

    a {
        text-decoration: none !important;
        color: inherit !important;
    }

</style>