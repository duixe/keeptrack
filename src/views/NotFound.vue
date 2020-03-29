<template>
    <div class="nofound">
       <v-container class="fill-height">
           <v-row 
           align="center"
           justify="center"
           >
           <div class="d-block text-center"><h2>The page you're looking for could not be found</h2></div>
            <v-col 
            cols="12"
            sm="9"
            md="7"
            lg="8"
            >
                <v-img :src="require('@/assets/oops1.png')"></v-img>
            </v-col>
           </v-row>
       </v-container>
        <div class="d-block mb-3 text-center">
            <v-btn 
            dark
            @click="$router.go(-1)"
            class="duixePrimary"
            >
            <v-icon left>arrow_back</v-icon>
            <span>go back</span>
           </v-btn>
           </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="css" scoped>
    .nofound {
        width: 100%;
        min-height: 100vh;
        background-color: #E1E8F6;
        overflow: hidden;
    }
</style>