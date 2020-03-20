<template>
    <div class="dashboard">
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
                <h1 style="color: #F5F5F5; opacity: .90">MY DASHBOARD</h1>
            </v-col>   
                    
            <!-- <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="primary"
            style="right: 20em"
            >
            <v-icon>mdi-plus</v-icon>
            </v-btn> -->
            </v-row>
        </v-container-fluid>
        <v-container class="my-8">
            <!-- <h2 class="grey--text">DASHBOARD</h2> -->
            <v-row class="mb-3">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text class="mr-4" @click="arrangeBy('name')" v-on="on">
                            <v-icon left small>mdi-folder</v-icon>
                            <span class="caption text-lowercase">by department</span>
                        </v-btn>
                    </template>
                    <span>Order by Department name</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text @click="arrangeBy('date')" v-on="on">
                            <v-icon left small>mdi-calendar-today</v-icon>
                            <span class="caption text-lowercase">by date</span>
                        </v-btn>
                    </template>
                    <span>Order by Date Created</span>
                </v-tooltip>
            </v-row>
            <v-card flat v-for="depDetail in depDetails" :key="depDetail.name">
                <v-row :class="`pa-3 dash-class ${depDetail.status}`"
                style="margin-left: 0"
                >
                    <v-col xs="12" md="6">
                        <div class="caption grey--text">Name of Department</div>
                        <div>{{ depDetail.name}}</div>
                    </v-col>
                    <v-col xs="6" sm="4" md="2">
                        <div class="caption grey--text">Total num of staff</div>
                        <div>{{ depDetail.numofStaff }}</div>
                    </v-col>
                        <v-col xs="6" sm="4" md="2">
                        <div class="caption grey--text">Date Created</div>
                        <div>{{ depDetail.date }}</div>
                    </v-col>
                    <v-col xs="2" sm="4" md="2">
                        <div align="right">
                            <v-chip :class="`${depDetail.status} white--text caption my-2`">{{ depDetail.status }}</v-chip>
                        </div>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import {db} from '@/firebase'
export default {
    data() {
        return {
            depDetails: [ 
                // {name: 'Planning Department', numofStaff: '6', date: '12th Feb, 2017', status: 'not-active'},
                // {name: 'Finance Department', numofStaff: '4', date: '07th Feb, 2014', status: 'active'},
                // {name: 'UI/UX Department', numofStaff: '3', date: '12th Feb, 2016', status: 'not-active'},
                // {name: 'Software Development', numofStaff: '24', date: '12th Feb, 2017', status: 'active'} 

            ]
        }
    },
    methods: {
        arrangeBy(args) {
            this.depDetails.sort((x, y) =>  x[args] < y[args] ? -1 : 1)
        }
    },
    created() {
        db.collection('departments').onSnapshot(res => {
            const changes = res.docChanges()

            changes.forEach(change => {
                if(change.type === 'added') {
                    this.depDetails.push({
                        ...change.doc.data()
                    })
                }
            })
        })
    }
}
</script>
<style lang="css" scoped>
    .dashboard {
        width: 100%;
        min-height: 100%;
        background: #F5F5F5;

    }

    .dash-class.not-active{
        border-left: 4px solid #2C9DAE;
    }

    .dash-class.active {
        border-left: 4px solid #051937;
    }

    .v-chip.not-active{
        background: #2C9DAE !important;
    }

    .v-chip.active {
        background: #051937 !important;
    }
</style>