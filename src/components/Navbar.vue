<template>
    <nav>
        <v-toolbar app dark class="indigo">
            <v-app-bar-nav-icon v-if="isLoggedIn" class="" @click="toggleDrawer = !toggleDrawer"></v-app-bar-nav-icon>
            <router-link to="/" class="brand-logo">
                <v-toolbar-title class="text-uppercase" color="white">
                    <span class="font-weight-light">keep</span>
                    <span>Track</span>
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
        </v-toolbar>
        <v-navigation-drawer v-if="isLoggedIn" v-model="toggleDrawer" 
        app 
        temporary
        >
            <v-list-item class="mt-8 mb-6">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>John Leider</v-list-item-title>
                  <v-list-item-subtitle>Admin</v-list-item-subtitle>
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
import {fb} from '@/firebase'
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
                currentUser: false
            }
        },
        created() {
            if (fb.auth().currentUser) {
                this.isLoggedIn = true
                this.currentUser = fb.auth().currentUser.email
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