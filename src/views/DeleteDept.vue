<template>
    <v-row justify="center" class="pa-6" style="margin-top: 13rem">
        <v-card :loading="loading">
            <v-card-title class="warning headline" style="font-weight: bold; color:white;">Confirm Delete</v-card-title>
            <v-card-text class="mt-2"> 🤔 Deleting this Department will result in the deletion of all associated staff, 
                will you like to proceed?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn left color="green darken-1" text router :to="goDept">Cancel</v-btn>
            <v-btn color="error" text @click="deleteDepartment">Confirm Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</template>
<script>
// import {db} from '@/firebase'
// export default {
//     data() {
//         return {
//             dept_id: null,
//             name: null,
//             loading: false,
//             goDept: "/department",

//         }
//     },
//     beforeRouteEnter(to, from, next) {
//         db.collection('departments').get()
//         .then(querySnapshot => {
//             querySnapshot.forEach(doc => {
//                 if(doc.id == to.params.dept_id) {
//                     next(vm => {
//                         vm.dept_id = doc.id
//                         vm.name = doc.data().name
//                     })
//                 }
//             })
//         })
//     },
//     watch: {
//         '$route': 'getData'
//     },
//     methods: {
//         deleteDepartment() {
//             db.collection('departments').get()
//             .then(querySnapshot => {
//                 querySnapshot.forEach(doc => {
//                     if(doc.id == this.$route.params.dept_id) {
//                         this.loading = true
//                         setTimeout(() => (doc.ref.delete()), 2000)
//                         this.loading - false
//                         setTimeout(() => (this.$router.push("/department") ), 2500)
                        
//                     }
//                 })
//             })
//         },
//     }
// }
// </script>