<template>
  <div class="home">
    <v-container>
      <v-row justify="space-around" align="center" class="pt-10 mt-5">
        <v-col class="text-md-left" md="4" lg="5">
          <v-img :src="require('@/assets/team2.svg')"></v-img>
        </v-col>
         <v-col class="text-md-center" md="8" lg="6">
          <h1>Manage and Track your staff</h1>
          <h4>A simple vue app for managing your staff</h4>
          <v-row justify="center">
            <v-col md="12" lg="12">
              <v-btn 
              dark 
              class="indigo mr-4" 
              router :to="goHome"
              >
                <v-icon left>mdi-exit-to-app</v-icon>
                <span>Sign Up</span>
              </v-btn>
              <v-btn outlined class="mr-2" color="indigo">
                <span dark>Log In</span>
                <v-icon right>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    data() {
      return {
        goHome: "/signup"
        
      }
  }
}
</script>
<style lang="css" scoped>
  .home {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right-bottom, rgba())

  }
</style>

