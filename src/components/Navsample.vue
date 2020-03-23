<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <router-link to="/" class="brand-logo">
        <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">keep</span>
            <span>Track</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn text class="mr-2">
                <span dark>Log In</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        <v-menu 
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
     <v-navigation-drawer v-model="toggleDrawer" 
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
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-card>
</template>


 