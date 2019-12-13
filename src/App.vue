<template>
  <v-app style="background-color:white">
     <v-card app flat>   
    <v-toolbar  flat color="white"> 
      <v-toolbar-title>
        <a @click = "navigateTo('/')" class="toolbar-title">
        <b>
          여행어때
          </b>
         </a>             
      </v-toolbar-title> 

        <div class="search_box">
          <input type="text" class="search_txt" name="" placeholder="search">
            <a class="search_btn" href="#">
              <i class="fas fa-search" @click="navigateTo('/search')"></i>
            </a>
        </div>
        <v-spacer></v-spacer>

      <v-toolbar-items v-for="(menu, i) in menus" :key="i" @click="navigateTo(menu.path)">
        <v-btn v-text="menu.text" color="white" class="toolbar-items elevation-0"></v-btn>
      </v-toolbar-items>

    </v-toolbar>
     </v-card>
      
    <!-- Sizes your content based upon application components -->
    <v-content>
      <router-view/>
    </v-content>
    
      <v-footer color="wheat">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="black--text ml-4">
              본 웹사이트는 TRAVELER에서 제공하는 데모사이트입니다. 
              copyright ⓒ TRAVELERS. Some Rights Reserved. <br>
              This website has been designed based on the TRAVELERS.
              주소: 경기도 수원시 팔달구 중부대로 100 /대표전화 : 031-000-0000
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
 
  </v-app>
</template>

 <script>
  export default {
  name: 'App',
  components: {

  },
  data: () => ({
    menus:[
      /* https://cdn.materialdesignicons.com/4.1.95/ */
      { text: '여행지', path:"/trip" },
      { text: '추천코스', path:"/course" },
      { text: '축제', path:"/festival" },
      { text: '후기', path:"/blog" },
      { text: '마이페이지', path:"/mypage"}
    ]
  }),
  methods:{
    navigateTo(path){
      if(this.$route.path != path){
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        this.$router.push(path);
        
      }
    }
  }

};
 </script>
