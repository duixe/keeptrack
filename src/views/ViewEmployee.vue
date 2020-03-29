<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img
      v-if="profile_pic"
      height="250"
      :src="`${profile_pic}`"
    ></v-img>

    <v-card-title>{{ name }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
         • {{ role }}
      </div>

      <div>{{ name }} belongs to {{ dept }} department, with the position ({{ role }})</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Contact</v-card-title>

    <v-card-text>
      <div class="sendmail"><a :href="'mailto:'+email">{{ email }}</a></div>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions class="mt-3">
      <v-btn
        dark
        small
        color="green"
        router :to="goTeam"
      >
      <v-icon small left>arrow_back</v-icon>
        <span>Back</span>
      </v-btn>
      <v-btn
        dark
        small
        color="red"
        @click="dialog=true"
      >
      <v-icon small left>delete</v-icon>
        <span>Delete</span>
      </v-btn>
    </v-card-actions>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
        <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template> -->
        <v-card>
            <v-card-title class="error headline" style="font-weight: bold; color:white;">Confirm Delete</v-card-title>
            <v-card-text class="mt-2">Are you sure you want to delete this staff ?</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog=false">Cancel</v-btn>
            <v-btn color="error" text @click="deleteEmployee">Confirm Delete</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
  </v-card>
</template>
<script>
import {db, fb} from '@/firebase'
export default {
    data() {
        return {
            staff_id: null,
            name: null,
            role: null,
            dept: null,
            email: null,
            profile_pic: null,
            loading: false,
            goTeam: "/team",
            dialog: false

        }
    },
    beforeRouteEnter(to, from, next) {
        db.collectionGroup('employees').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if(doc.id == to.params.staff_id) {
                    next(vm => {
                        vm.staff_id = doc.id
                        vm.name = doc.data().name
                        vm.role = doc.data().role
                        vm.dept = doc.data().department
                        vm.email = doc.data().email
                        vm.profile_pic = doc.data().profile_pic


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
                    if(doc.id == this.$route.params.staff_id) {
                        this.name = doc.data().name
                        this.role = doc.data().role
                        this.dept = doc.data().department
                        this.email = doc.data().email
                        this.profile_pic = doc.data().profile_pic

                    }
                })
            })
        },
        deleteEmployee() {
            db.collectionGroup('employees').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.id == this.$route.params.staff_id) {
                        this.dialog = false
                        this.loading = true
                        let storageRef = fb.storage()
                        let imgRef = storageRef.refFromURL(`${doc.data().profile_pic}`)
                        imgRef.delete().then(function() {
                            // File deleted successfully
                          }).catch(function(error) {
                            console.log('there was an error', error);
                            
                          });
                        setTimeout(() => (doc.ref.delete()), 2000)

                        // this.loading - false
                        setTimeout(() => (this.$router.push("/team") ), 2500)
                        
                    }
                })
            })
        },
        // this method shows a loading bar on the card (not necessary)
        loadFirst() {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        }
    }
}
</script>
<style lang="css" scoped>
  .sendmail a {
    padding: .5rem;
    text-decoration: none;
    transition: all .3s ease-in-out
  }

  .sendmail a:hover {
    background-color: #2C3F5A;
    color: #fff;
    border-radius: 2px;
  }
</style>