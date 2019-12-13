<template>
  <v-container class="align-center">
    <v-row>
      <v-col cols="12" md="8">
        <v-carousel height="450" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(tripImage, index) in tripImages" :key="index" height="100%">
            <v-img class="col" :src="tripImage.originImgUrl">
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="4">
        <h2>
          {{tripInfos.title}}
        </h2>
        <p>
          {{tripOverviews.overview}}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <ol>    
              <li>
                수용인원 - {{tripDeInfos.accomCount}}
              </li> 
              <li>
                유모차 대여정보 - {{tripDeInfos.chkBabyCarriage}}    
              </li> 
              <li>
                신용카드가능 정보 - {{tripDeInfos.chkCreditCard}}    
              </li> 
              <li>
                애완동물동반가능 정보 - {{tripDeInfos.chkPet}}    
              </li> 
              <li>
                체험가능 연령 - {{tripDeInfos.expAgeRange}}    
              </li> 
              <li>
                체험안내 - {{tripDeInfos.expGuide}}    
              </li> 
              <li>
                세계 문화유산 유무 - {{tripDeInfos.heritage1}}    
              </li> 
              <li>
                세계 자연유산 유무 - {{tripDeInfos.heritage2}}    
              </li> 
              <li>
                세계 기록유산 유무 - {{tripDeInfos.heritage3}}    
              </li> 
              <li>
                문의 및 안내 - {{tripDeInfos.infoCenter}}    
              </li> 
              <li>
                개장일 - {{tripDeInfos.openDate}}    
              </li>  
              <li>
                주차시설 - {{tripDeInfos.parking}}    
              </li> 
              <li>
                쉬는날 - {{tripDeInfos.restDate}}    
              </li> 
              <li>
                이용시기 - {{tripDeInfos.useSeason}}    
              </li>
              <li>
                이용시간 {{tripDeInfos.useTime}}    
              </li>      
            </ol>
          </v-card-text>
        </v-card>
      </v-col>

      <!--네이버지도-->
      <v-col cols="12" md="4">
        <v-card>
          <naver-maps :height="400" :mapOptions="mapOptions" :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']">
            <div>
              <v-card class="column">
              </v-card>
            </div>
            <!--------------------네이버 상세페이지-------------------------->
            <div>
              <naver-marker :lat="Number(tripInfos.mapy)" :lng="Number(tripInfos.mapx)" @load="onMarkerLoaded"/>       
            </div>
          </naver-maps>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-card color="light-green lighten-4 pb-4">
        <v-card-title>
          <span class="fad">댓글 {{commentscnt}}</span>
        </v-card-title>
        <div class="grey lighten-2 mx-4" v-for="(comment,index) in comments" :key="index">
          <v-row class="mx-1">
            <v-avatar size="36" class="ma-3">
              <v-img class="white--text align-end" :src="comment.profileImg" >
              </v-img>
            </v-avatar>
            <span class="cosize mx-3 mt-3">{{comment.nickname}}</span>
          </v-row>
          <v-row>
            <p style="line-height:1.5em" v-html="comment.commentText" class="mx-7"></p>
          </v-row>
          <v-row>
            <v-rating
              class="ml-6"
              :value= "comment.commentRating"
              color="amber"
              dense
              half-increments
              readonly
              size="23"
            ></v-rating>
          </v-row>
          <v-divider class="mt-6"></v-divider>              
        </div>
        <div class="text-center pt-4">
          <span >
            <v-icon x-large class="mdi mdi-chevron-down-circle-outline" v-on:click="appendComments()" :disabled="this.dataFull === true" :class="{disabled : dataFull}">
            </v-icon>
          </span>
        </div>
        <v-card-text>
          <v-textarea
            @keydown.enter.prevent
            autoGrow
            solo
            rowHeight="9"
            maxlength="300"
            name="input-title"
            label="댓글을 입력해 주세요"
          ></v-textarea>
          <v-row>
            <v-col cols="12" md="11">
            <v-rating
              v-model="rating"
              background-color="orange lighten-3"
              color="amber"
              class="ml-2"
            ></v-rating>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tripInfoURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_URI}`,
    tripImageURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_IMAGE_URI}`,
    tripOverviewURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_OVERVIEW_URI}`,
    tripDeInfoURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_DETAIL_INFO_URI}`,
    tripInfos:{},
    tripImages:[],
    tripOverviews:{},
    count: 1,
    map: null,
    isMap: false,
    commentscnt:"0",
    comments:[],
    commentsAll:[],
    cntComments: 3,
    totComments: 0,
    mapOptions: {
      lat: 37,
      lng: 127,
      zoom: 10,
      zoomControlOptions: {position: 'TOP_RIGHT'},
    },
  }),
  methods:{
    // 댓글 더보기 함수
    appendComments(){
      this.totComments = this.commentsAll.length;
      if(this.cntComments < this.totComments){
        this.cntComments += 3;
        let data = [];
        for(var i =0 ; i<this.cntComments ; i++){
          if(this.commentsAll[i] != null){
            data.push(this.commentsAll[i]);
          }else{
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
    this.tripInfos = {}
    // 여행지 일반 정보 받는 곳
    this.$http.get(`${this.tripInfoURL}/${this.$route.params.contentId}`).then((result)=>{
      this.mapOptions.lat = result.data.mapy
      this.mapOptions.lng = result.data.mapx
      this.tripInfos = result.data;
    })
    this.tripImages =[]
    // 여행지 이미지 정보 받는 곳
    this.$http.get(`${this.tripImageURL}/${this.$route.params.contentId}`).then((result) => {
      if(result.data[0].originImgUrl == null) {
        result.data[0].originImgUrl = "http://citytour.jeonnam.go.kr:8080/site/jeonnam/citytour/images/noimage.gif"
        this.tripImages = result.data
      }else{
        this.tripImages = result.data
      }
    }),
    this.tripOverviews ={}
    // 여행지 개요 정보 받는 곳
    this.$http.get(`${this.tripOverviewURL}/${this.$route.params.contentId}`).then((result) => {
      this.tripOverviews = result.data
    });
    this.tripDeInfos ={}
    // 여행지 상세 정보 받는 곳
    this.$http.get(`${this.tripDeInfoURL}/${this.$route.params.contentId}`).then((result) => {
      this.tripDeInfos = result.data
    });
  }
}
</script>

<style scoped>
  .align-center {
    text-align: center;
  }
  .col{
    color: aquamarine;
  }
  .align-left { 
    text-align: left; 
  }
</style>