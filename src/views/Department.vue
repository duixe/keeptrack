<template>
    <div class="team">
         <v-snackbar
            v-model="snackbar"
            :timeout="4000"
            top
            color="success"
         >
            <span>you've added a new department to your collection</span>
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
                <h1 style="color: #F5F5F5; opacity: .90">Departments</h1>
            </v-col>   
            <!-- <v-tooltip bottom>
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
                <span>Add new Department</span>
            </v-tooltip>       -->
            <Popupdep @departmentAdded="snackbar = true"/>
            </v-row>
        </v-container-fluid>
        <v-container class="my-8">
            <v-expansion-panels class="pa-4">
                <v-expansion-panel v-for="departments in department" :key="departments.name">
                     <v-expansion-panel-header style="font-weight: bold;">{{ departments.name }}</v-expansion-panel-header>
                    <v-expansion-panel-content class="px-4 grey--text">
                        <div class="font-weight-bold">{{ departments.date }}</div>
                        <div class="mb-3">{{ departments.description }} </div> 
                        
                        <v-list three-line>
                            <v-subheader v-if="departmentStaff">Department staff</v-subheader>
                            <template v-for="departmentStaffs in departmentStaff">
                                <!-- <v-subheader :ke>
                                    Department staff
                                </v-subheader> -->
                                <v-list-item 
                                v-if="departments.name == departmentStaffs.department"
                                :key="departmentStaffs.name"
                                >
                                    <v-list-item-avatar>
                                        <v-img :src="departmentStaffs.profile_pic"></v-img> 
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ departmentStaffs.name }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ departmentStaffs.role }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider :key="departmentStaffs.name"></v-divider>
                            </template>
                        </v-list>
                        <!-- <li v-for="departmentStaffs in departmentStaff" :key="departmentStaffs.name">
                            <p v-if="departmentStaffs.department == departments.name">{{ departmentStaffs.name }}</p>
                        </li> -->
                        <v-container>
                            <v-row>
                                <v-col cols="12" xs="12" sm="12" justify='center' align="center">
                                        <v-btn
                                        color="success"
                                        class="mr-3"
                                        small
                                        flat
                                        left
                                        >
                                        <router-link :to="{name: 'EditDept', params: {dept_id: departments.name}}">
                                            <v-icon small left>edit</v-icon>
                                            <span>Edit</span>
                                        </router-link>
                                        </v-btn>
                                        <v-btn
                                        disabled
                                        color="warning"
                                        small
                                        flat
                                        >
                                        <router-link :to="{name: 'DeleteDept', params: {dept_id: departments.name}}">
                                            <v-icon small left>delete</v-icon>
                                            <span>Delete</span>
                                        </router-link>
                                        </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>
<script>
 import Popupdep from '@/components/Popupdep'
 import {db, fb} from '@/firebase'
    export default {
        components: { Popupdep },
        data() {
            return {
                department: [ 
                    // {name: 'Planning Department', numofStaff: '6', date: '12th Feb, 2017', status: 'not-active', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'},
                    // {name: 'Finance Department', numofStaff: '4', date: '07th Feb, 2014', status: 'active', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'},
                    // {name: 'UI/UX Department', numofStaff: '3', date: '12th Feb, 2016', status: 'not-active', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'},
                    // {name: 'Software Development', numofStaff: '24', date: '12th Feb, 2017', status: 'active', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'}   
                ],
                departmentStaff: [],
                snackbar: false
            }
        },
        created() {
            const user = fb.auth().currentUser
            // new created client
            db.collection('clients').doc(user.uid).collection("departments").onSnapshot(res => {
                const changes = res.docChanges()

                changes.forEach(change => {
                    if(change.type === 'added') {
                        this.department.push({
                            ...change.doc.data()
                        })
                    }
                })
            })



            // db.collection('departments').onSnapshot(res => {
            //     const changes = res.docChanges()

            //     changes.forEach(change => {
            //         if(change.type === 'added') {
            //             this.department.push({
            //                 ...change.doc.data()
            //             })
            //         }
            //     })
                
                
            // });

            

            var query = db.collectionGroup('employees')
                query.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.departmentStaff.push({...doc.data(), id:doc.id })
                    });
                    
                });
        }
    }
</script>
<style lang="css" scoped>
    .team {
        width: 100vw;
        overflow-x: hidden;
        min-height: 100%;
        background: #F5F5F5;

    }

     a {
        text-decoration: none !important;
        color: inherit !important;
    }

</style>