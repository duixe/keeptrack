<template>
  <div class="home">
    <!-- <v-container>
      <v-row justify="space-around" align="center" class="pt-10 mt-5">
        <v-col class="text-md-left" md="4" lg="5" style="position: relative;">
        <div class="duixe-container">
          <img :src="require('@/assets/3dhover2.png')" alt="kepptrack">
          <img :src="require('@/assets/3dhover2.png')" alt="kepptrack">
          <img :src="require('@/assets/3dhover3.png')" alt="kepptrack">
        </div>
        </v-col>
         <v-col class="text-center" md="8" lg="6">
          <h1 class="homeh1 mb-2">Manage and Track staff profile</h1>
          <h4 class="homeh4">Keep and manage Organization or Company's Departments and staff</h4>
          <v-row justify="center" class="mt-4">
            <v-col md="12" lg="12">
              <v-btn 
              dark 
              class="duixe mr-4" 
              router :to="goSign"
              >
                <v-icon left>person_add</v-icon>
                <span>Sign Up</span>
              </v-btn>
              <v-btn 
              outlined 
              class="mr-2" 
              color="duixe"
              router :to="goLog"
              >
                <span dark>Log In</span>
                <v-icon right>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container> -->
    <div class="wrapper">
      <div class="left">
        <div class="left-div">
          <h1 class="homeh1 mb-2">Cloudly Manage your Company's Data</h1>
          <h4 class="homeh4">store and manage your organization's department and staff profile, retrieve and edit them at your own time</h4>
          <v-row justify="center" class="mt-4">
            <v-col md="12" lg="12">
              <v-btn 
              dark 
              class="duixe mr-4" 
              router :to="goSign"
              >
                <v-icon left>person_add</v-icon>
                <span>Sign Up</span>
              </v-btn>
              <v-btn 
              outlined 
              class="mr-2 mb-xs-2"
              color="duixePrimary"
              dark 
              router :to="goLog"
              >
                <v-icon left>mdi-exit-to-app</v-icon>
                <span dark>Log In</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="right">
         <div class="right-div" style="position: relative;">
          <!-- <v-img :src="require('@/assets/smallbg.png')" class="bgsmall"></v-img> -->
        <div class="duixe-container">
          <img :src="require('@/assets/3dhover2.png')" alt="kepptrack">
          <img :src="require('@/assets/3dhover2.png')" alt="kepptrack">
          <img :src="require('@/assets/3dhover3.png')" alt="kepptrack">
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    data() {
      return {
        goSign: "/register",
        goLog: "/login"
        
      }
  }
}
</script>
<style lang="css" scoped>
  .home {
    width: 100%;
    height: 100%;
    overflow: hidden;
   /* background-image: linear-gradient(to right bottom, #051937, #043758, #015778, #0e7995, #2c9dae,); */
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100vh;
    position: relative;
    /* background-image: url(../assets/rightpng1.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    opacity: .2; */
  }

  .left::after {
    content: "";
    position: absolute;
    background: url(../assets/rightpng1.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    
    z-index: 1;  

  }

  .left-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 2.2rem 0 2.2rem;    
    opacity: 1 !important;
    z-index: 2;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100vh;
    /* clip-path: polygon(15% 0, 100% 0%, 100% 100%, 0% 100%); */
    background-image: linear-gradient(to left bottom, #051937, #043758, #015778, #0e7995, #2c9dae); 

  }

  @media only screen and (max-width: 56.25em){
        .right {
          display: none;
      }
    }

  @media only screen and(max-width: 320px;) {
    .duixe {
        margin-bottom: 1.2rem !important;
      }
  }

  /* .right-div {

  } */

  .bgsmall {
    max-width: 100%;
    position: absolute;
    /* transform: skew(25deg) scale(.8); */
    opacity: .45;
  }

  .homeh1 {
    font-family: 'Baloo 2', cursive;
    font-weight: 500;
    text-align: center; 
    text-transform: uppercase;
    line-height: 1.2;
    font-size: 2.8rem;
    color: #2C3F5A;
  }

  .homeh4 {
    font-family: 'Baloo 2', cursive;
    font-weight: 400;
    font-size: 1.7rem;
    color: #2C3F5A;
    line-height: 1.5rem
  }
  .duixe-container {
    position: relative;
    width: 17rem;
    height: 29rem;
    margin-top: 2.6rem;
    background: rgba(0, 0, 0, .15);
    transform: rotate(-30deg) skew(25deg) scale(.8);
  }
  .duixe-container img {
    position: absolute;
    width: 100%;
    transition: .5s;
  }

  .duixe-container img:nth-child(1) {
    /* transform: translate(4.3rem, -4.3rem);
    opacity: .65; */
    animation: animate1 2s ease-out 0s alternate infinite none running;
  }

  .duixe-container img:nth-child(2) {
    /* transform: translate(7.3rem, -7.3rem);
    opacity: .85; */
    animation: animate2 2s ease-in-out 0s alternate infinite none running;
  }

  .duixe-container img:nth-child(3) {
    /* transform: translate(10.3rem, -10.3rem);
    opacity: 1; */
      animation: animate3 2s ease-in-out 0s alternate infinite none running;
  }


  @keyframes animate3{
    0% {
      transform: translate(10.3rem, -10.3rem);
      opacity: 1;
    }
    50% {
      transform: translate(8.3rem, -8.3rem);
      opacity: 1;
    }
    100% {
      transform: translate(10.3rem, -10.3rem);
      opacity: 1;
    }
  }

   @keyframes animate2{
    0% {
      transform: translate(7.3rem, -7.3rem);
      opacity: .85;
    }
    65%{
      transform: translate(5.3rem, -5.3rem);
      opacity: .85;
    }
    100%{
      transform: translate(7.3rem, -7.3rem);
      opacity: .85;
    }
  
  }

  @keyframes animate1{
    0%{
       transform: translate(4.3rem, -4.3rem);
       opacity: .55;
    }
    50%{
       transform: translate(2.3rem, -2.3rem);
       opacity: .55;
    }
    100%{
       transform: translate(4.3rem, -4.3rem);
       opacity: .45;
    }
  }

  @media (max-width: 320px){
      .home {
        overflow-x: hidden;
      }
      .duixe-container {
          width: 9rem;
          height: 10rem;
          margin-top: 3.6rem;
          margin-left: 2rem;
          background: rgba(0, 0, 0, 0);
        }
  }

  @media (max-width: 375px){
      .home {
        overflow-x: hidden;
      }
      .duixe-container {
          width: 13rem;
          height: 15rem;
          margin-top: 3.6rem;
          margin-left: 2rem;
          background: rgba(0, 0, 0, 0);
        }
      .homeh1 {
        font-size: 2.1rem; 
      }

      .homeh4 {
        font-size: 1.5rem;
      }
  }

  @media (max-width: 425px){
      .home {
        overflow-x: hidden;
      }
      .duixe-container {
          width: 15rem;
          height: 17rem;
          margin-top: 3.6rem;
          margin-left: 2rem;
          background: rgba(0, 0, 0, 0);
        }
      .homeh1 {
        font-size: 2.4rem; 
      }

      .homeh4 {
        font-size: 1.6rem;
      }
  }

  @media (max-width: 1025px){
      .home {
        overflow-x: hidden;
      }
      .duixe-container {
          width: 13rem;
          height: 26rem;
          margin-top: 3.6rem;
          margin-left: 2rem;
          background: rgba(0, 0, 0, 0);
        }
  }
</style>

