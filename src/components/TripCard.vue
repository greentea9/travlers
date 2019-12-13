<template>
  <v-card elevation="1" height="400" style="margin:10px;">
    <div class="xx">
      <v-img class="white--text align-end selectorimg" :src="trip.firstImage" height="100%">
        <span style="cursor:pointer" class="test ma-4" @click="notice()">{{trip.title}}</span>
      </v-img>
    </div>
    <div>
    <v-card-text class="target">
      {{trip.title}}
      <br>
        나에게서 {{recomDist[index]}} km 떨어져 있어요.
      <br>
      {{trip.addr1}}
      {{trip.addr2}}
    </v-card-text>
    </div>
  </v-card>
</template>
<script>
  export default {
    name: "trip-card",
    props: [
      "trip", "index", "recomDist"
    ],
    methods : {
      //상세 페이지로 이동 함수
      notice() {
        const contentid = Number(this.trip.contentId);
        this.$router.push({name: 'tripDetailPage', params: {contentId: contentid}});
      },
    },   
  }         
</script>
<style scoped="scoped">
  .target {
    display: inline-block;
    padding: 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 2;
    height: 6;
    text-align: left;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .test:hover {
    text-decoration: underline;    
  }
  .xx {
    height: 300px;
      
  }
</style>