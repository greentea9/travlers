<template>
  <v-card class="mx-auto">
    <v-toolbar color="indigo" dark="dark" fixed="fixed">
      <v-btn x-large="x-large" text="text" color="white" @click="isFestivalRecom = true, festivalReview = false">
        축제추천
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn x-large="x-large" text="text" color="white" @click="festivalReview = true, isFestivalRecom = false">
        축제후기
      </v-btn>
    </v-toolbar>
    <v-container fluid="fluid">
      <masonry :cols="{default: 4, 1000: 3, 848: 2, 576: 1}" :gutter="30" v-if="isFestivalRecom" v-model="isFestivalRecom">
        <div v-for="(festivalInfo, index) in festivalInfos" :key="index">
          <v-card elevation="3" style="margin:10px;">
            <v-img class="white--text align-end" :src="festivalInfo.firstImage">
              <span class="test ma-4" @click="toFestival(index)" style="cursor:pointer">
                {{festivalInfo.title}}
              </span>
            </v-img>
            <v-card-text class="target">
              연락처 - {{festivalInfo.tel}}
            </v-card-text>
          </v-card>
        </div>
      </masonry>
      <masonry :cols="{default: 4, 1000: 3, 848: 2, 576: 1}" :gutter="30" v-if="festivalReview" v-model="festivalReview">
        <div v-for="(tripInfo, index) in tripInfos" :key="index">
          <v-card elevation="3" style="margin:10px;">
            <v-img class="white--text align-end" :src="tripInfo.firstImage">
              <span class="test ma-4" style="cursor:pointer">
                {{tripInfo.title}}
              </span>
            </v-img>
            <v-card-text class="target">
              연락처 - {{tripInfo.tel}}
            </v-card-text>
          </v-card>
        </div>
      </masonry>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    dataFestivalURL: `${process.env.VUE_APP_RECOMMENDATIN_FESTIVAL_URI}`,
    tripInfoURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_URI}`,
    festivalInfos:null,
    tabBGColor:"",
    cntRecommends: 12,
    totRecommends: 0,
    dataFull: false,
    tab: null,
    isFestivalRecom: true,
    isFestivalReview: true,
    tripInfos: []
  }),
      
  methods: {
    // 댓글 더보기 함수
    appendRecommends() {
      this.totRecommends = this.itemsAll.length;
      if (this.cntRecommends < this.totRecommends) {
        this.cntRecommends += 12;
        let data = [];
      for (var i = 0; i < this.cntRecommends; i++) {
        if (this.itemsAll[i] != null) {
          data.push(this.itemsAll[i]);
        } else {
          break;
        }
      }
        this.items = data;
      } else {
          this.dataFull = true;
          alert('끝이에요!');
      }
    },
    // 축제 상세 페이지 이동 함수
    toFestival(index) {
      const contentid = Number(this.festivalInfos[index].contentId);
      this.$router.push({name: 'festivalDetailPage', params: {contentId: contentid}});
    }
  },
  created() {
    this.festivalInfos = [];
    // 축제 일반 정보 받는 곳
    this.$http.get(this.dataFestivalURL).then((result) => {
      this.festivalInfos = result.data;
    });
    this.tripInfos = {}
    // 축제 후기 정보 받는 곳(예정)
    this.$http.get(this.tripInfoURL).then((result)=>{
      this.tripInfos = result.data;
    })    
  }
}
</script>
<style scoped="scoped">
  .test:hover {
    text-decoration: underline;
  }
  .selectTrans {
    background-color: transparent;
  }
</style>