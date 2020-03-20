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
                     <v-expansion-panel-header>{{ departments.name }}</v-expansion-panel-header>
                    <v-expansion-panel-content class="px-4 grey--text">
                        <div class="font-weight-bold">{{ departments.date }}</div>
                        <div>{{ departments.description }} </div> 
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>
<script>
 import Popupdep from '@/components/Popupdep'
 import {db} from '@/firebase'
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
                 snackbar: false
            }
        },
        created() {
            db.collectionGroup('departments').onSnapshot(res => {
                const changes = res.docChanges()

                changes.forEach(change => {
                    if(change.type === 'added') {
                        this.department.push({
                            ...change.doc.data()
                        })
                    }
                })
                
                
            })
        }
    }
</script>
<style lang="css" scoped>
    .team {
        width: 100%;
        min-height: 100%;
        background: #F5F5F5;

    }

</style>