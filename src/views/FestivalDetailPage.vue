<template>
  <v-container class="align-center">
    <v-row>
      <v-col cols="12" md="8">
        <v-carousel height="450" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(festivalImage, index) in festivalImages" :key="index" height="100%">
            <v-img :src="festivalImage.originImgUrl" class="col">
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            {{festivalBasics.title}}
          </v-card-title>
          <v-card-text>
            <p>
              {{festivalOverviews.overview}}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br>
    <br>      
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <ol>    
              <li>
                관람 가능연령 - {{festivalInfos.agelimit}}
              </li> 
              <li>
                예매처 - {{festivalInfos.bookingPlace}}    
              </li> 
              <li>
                할인정보 - {{festivalInfos.discountInfoFestival}}    
              </li> 
              <li>
                행사 장소 - {{festivalInfos.eventPlace}}    
              </li> 
              <li>
                행사장 위치 안내 - {{festivalInfos.placeInfo}}    
              </li> 
              <li>
                공연시간 - {{festivalInfos.playTime}}    
              </li> 
              <li>
                행사 프로그램 - {{festivalInfos.program}}    
              </li> 
              <li>
                주최자 정보 - {{festivalInfos.sponsor1}}    
              </li> 
              <li>
                주최자 연락처 - {{festivalInfos.sponsor1Tel}}    
              </li> 
              <li>
                주관사 정보 - {{festivalInfos.sponsor2}}    
              </li> 
              <li>
                주관사 연락처 - {{festivalInfos.sponsor2Tel}}    
              </li>  
              <li>
                부대행사 - {{festivalInfos.subEvent}}    
              </li> 
              <li>
                이용요금 - {{festivalInfos.useTimeFestival}}    
              </li>   
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <naver-maps :height="400" :mapOptions="mapOptions" :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']">
            <div v-for="(marker, index) in markersArray" :key="index" >
              <naver-marker :lat="Number(marker.mapy)" :lng="Number(marker.mapx)" @load="onMarkerLoaded" @click="onMarkerClicked(index)" />       
            </div>
          </naver-maps>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-col cols="12">
        <v-card color="light-green lighten-4 pb-4">
          <v-card-title>
            <span class="fad">댓글  {{commentscnt}}</span>
          </v-card-title>
          <div class="grey lighten-2 mx-4" v-for="(comment,index) in comments" :key="index">
            <v-row class="mx-1">
              <v-avatar size="36" class="ma-3">
                <v-img class="white--text align-end" :src="comment.commentUserImg" >
                </v-img>
              </v-avatar>
              <span class="cosize mx-3 mt-3">{{comment.commentUser}}</span>
            </v-row>
            <v-row>
              <p style="line-height:1.5em" v-html="comment.commentContent" class="mx-7"></p>
            </v-row>
            <v-row>
              <v-rating class="ml-6" :value= "comment.commentRating" color="amber" dense half-increments readonly size="23">
              </v-rating>
            </v-row>
            <v-divider class="mt-6">
            </v-divider>              
          </div>
          <div class="text-center pt-4">
            <span >
              <v-icon x-large class="mdi mdi-chevron-down-circle-outline" @click="appendComments()" :disabled="this.dataFull === true" :class="{disabled : dataFull}">
              </v-icon>
            </span>
          </div>
          <v-card-text>
            <v-textarea @keydown.enter.prevent autoGrow solo rowHeight="9" maxlength="300" name="input-title" label="댓글을 입력해 주세요">
            </v-textarea>
            <v-row>
              <v-col cols="12" md="11">
                <v-rating v-model="rating" background-color="orange lighten-3" color="amber" class="ml-2">
                </v-rating>
              </v-col>
              <v-col cols="12" md="1">
                <v-btn class="fad" outlined color="green">
                  등록
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </div>   
  </v-container>
</template>
<script>
export default {
  data: () => ({
    festivalBasicURL: `${process.env.VUE_APP_RECOMMENDATIN_FESTIVAL_URI}`,
    festivalImageURL: `${process.env.VUE_APP_RECOMMENDATIN_FESTIVAL_IMAGE_URI}`,
    festivalInfoURL: `${process.env.VUE_APP_RECOMMENDATIN_FESTIVAL_INFO_URI}`,
    festivalOverviewURL: `${process.env.VUE_APP_RECOMMENDATIN_FESTIVAL_OVERVIEW_URI}`,
    commentscnt:"0",
    cntComments: 3,
    totComments: 0,
    comments:[],
    commentsAll:[],
    festivalBasics: null,
    festivalImages: null,
    festivalInfos: null,
    festivalOverviews: null,
    count: 1,
    map: null,
    isMap: false,
    title:"",
    mapOptions: {
      lat: 37.286445,
      lng: 127.028845,
      zoom: 10,
      zoomControl: true,
      zoomControlOptions: {position: 'TOP_RIGHT'},
      mapTypeControl: true,
    },
  }),
  methods: {
    // 댓글 더보기 함수
    appendComments(){
      this.totComments = this.commentsAll.length;
      if(this.cntComments < this.totComments){
        this.cntComments += 3;
        let data = [];
        for(var i =0 ; i<this.cntComments ; i++){
          if(this.commentsAll[i] != null){
            //console.log(data);
            data.push(this.commentsAll[i]);
          } else {
            break;
          }
        }
        this.comments = data;
      } else {
        this.dataFull = true;
        alert('항목이 전부 출력 되었습니다!');
      }
    },
  },
  mounted() {
    // 스크립트 주기적 실행
    setInterval(() => this.count++, 1000);
  },

  created() {
    this.festivalBasics ={}
    // 축제 일반 정보 받는 곳
    this.$http.get(`${this.festivalBasicURL}/${this.$route.params.contentId}`).then((result) => {
      this.festivalBasics = result.data
    }),
    this.festivalImages =[]
    // 측제 이미지 정보 받는 곳
    this.$http.get(`${this.festivalImageURL}/${this.$route.params.contentId}`).then((result) => {
      if(result.data[0].originImgUrl == null) {
        result.data[0].originImgUrl = "http://citytour.jeonnam.go.kr:8080/site/jeonnam/citytour/images/noimage.gif"
        this.festivalImages = result.data
      }else{
        this.festivalImages = result.data
      }
    }),
    this.festivalInfos ={}
    // 축제 상세 정보 받는 곳
    this.$http.get(`${this.festivalInfoURL}/${this.$route.params.contentId}`).then((result) => {
      this.festivalInfos = result.data
    }),
    this.festivalOverviews ={}
    // 축제 개요 정보 받는 곳
    this.$http.get(`${this.festivalOverviewURL}/${this.$route.params.contentId}`).then((result) => {
      this.festivalOverviews = result.data
    })
  }
}
</script>
<style scoped>
  .align-center {
    text-align: center;
  }
  .align-left { text-align: left; }
  .col{
    color: aquamarine;
  }
</style>