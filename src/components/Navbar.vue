<template>
    <nav>
        <v-app-bar fixed app dark class="secondary px-xl-10 px-lg-9 px-md-6">
            <v-app-bar-nav-icon v-if="isLoggedIn" class="" @click="toggleDrawer = !toggleDrawer"></v-app-bar-nav-icon>
            <router-link to="/" class="brand-logo">
                <v-toolbar-title class="text-capitalize" color="white">
                    <span class="font-weight-light">keep</span>
                    <span style="font-family: font-family: 'Baloo 2', cursive !important; font-weight: 600;">Track</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn v-if="isLoggedIn" text class="mr-2" @click="logout">
                <span dark>Log out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
            <v-btn v-if="isLoggedIn" icon>
                <v-icon>dashboard</v-icon>
            </v-btn>
            <v-menu 
            v-if="!isLoggedIn"
            offset-y
            origin="center center"
            transition="scale-transition"
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                     </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="item in items"
                     :key="item.key"
                    router :to="item.route"
                    
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer v-if="isLoggedIn" v-model="toggleDrawer" 
        app 
        temporary
        dark
        class="primary"
        style="background-image: linear-gradient(to right top, #051937, #043758, #015778, #0e7995, #2c9dae)"
        >
            <v-list-item class="mt-8 mb-6">
                <v-list-item-avatar>
                  <v-img :src="admin_pic"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>@{{ admin_username}}</v-list-item-title>
                  <v-list-item-subtitle>{{ admin_email }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item 
            v-for="drawItem in drawItems"
            :key="drawItem.text"
            router :to="drawItem.route"
            >
                 <v-list-item-icon>
                     <v-icon>{{ drawItem.icon}}</v-icon>
                 </v-list-item-icon>
                 <v-list-item-content>
                     <v-list-item-title>{{ drawItem.text}}</v-list-item-title>
                 </v-list-item-content>
            </v-list-item>

        </v-navigation-drawer>
    </nav>
</template>
<script>
import {fb, db} from '@/firebase'
    export default {
        data() {
            return {
                goHome: "/",
                items: [
                    { title: 'Log In', key: "login", route: "/login" },
                    { title: 'Sign Up', key: "signup", route: "/register" },
                    
                ],
                drawItems: [
                    { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
                    { icon: 'supervised_user_circle', text: 'Departments', route: '/department' },
                    { icon: 'mdi-account-box', text: 'Staff', route: '/team' },
                ],
                toggleDrawer: false,
                isLoggedIn: false,
                currentUser: false,
                admin_pic: "",
                admin_email: null,
                admin_username: null
            }
        },
        created() {
            if (fb.auth().currentUser) {
                const user = fb.auth().currentUser
                this.isLoggedIn = true
                this.currentUser = fb.auth().currentUser.email


                db.collection('clients').get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.id == user.uid) {
                            this.admin_pic = doc.data().admin_pic
                            this.admin_username = doc.data().username
                            this.admin_email = user.email
                            
                        }
                    })
                })
            }
        },
        methods: {
            logout() {
                fb.auth().signOut().then(() => {
                    this.$router.go({ path: this.$router.path})
                })
            }
        } 
    }
</script>
<style lang="css" scoped>
    a {
        text-decoration: none !important;
        color: inherit !important;
    }
</style>