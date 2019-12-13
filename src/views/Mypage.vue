<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="9">
          <v-card color="green lighten-4">
            <v-card-title class="headline">
              내 정보
              <v-card-text>
                닉네임:
                {{this.$store.state.profile.nickname}}
              </v-card-text>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="diglog"
                width="500">
              <template v-slot:activator="{ on }">
                <v-btn text color="green" v-on="on">
                  닉네임 변경
                </v-btn>
              </template>
              <v-card>
                <h2>
                  현재 닉네임: 블랙보리 
                </h2>
                <h3>
                  바꿀닉네임
                </h3>
                <input type="text" maxlength="6" size="50">
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="dialog = false">
                      확인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>    
          </v-card>
          <v-card color="green lighten-4">
            <v-card-title class="headline mt-2" >
              SNS 계정연동
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="logout()">로그아웃</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <div>
          <router-link to="/mymap">
          <v-btn text color="green">
            자세히보기
          </v-btn>
          </router-link>
          <naver-maps 
            :width="270" 
            :height="250" 
            :mapOptions="mapOptions"
            :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']">
            <div v-for="(marker, index) in markersArray" :key="index" >
              <naver-marker :lat="Number(marker.mapy)" :lng="Number(marker.mapx)" @load="onMarkerLoaded" @click="onMarkerClicked(index)" />       
            </div>
            <naver-info-window v-for="(marker, index) in markerObjArr" :key="index+'info'" 
              class="info-window"  :isOpen="marker.info" :marker="marker">
              <div class="info-window-container">
                <h3>{{marker.title}}</h3>
                <h5>{{marker.addr1}}</h5>
                <h6>{{marker.tel}}</h6>
                <v-img width="170" height="130" :src="marker.firstimage2"></v-img>
              </div>
            </naver-info-window>
          </naver-maps>
        </div>
      </v-row>
    </v-container>
    <v-container>
      <router-link to="/mypostsmanage">
        <v-btn class="elevation-0" text color="green">
          내글관리
        </v-btn>
      </router-link>
      <v-col cols="12">
        <h3>
          게시물
        </h3>
      </v-col>
      <v-simple-table height="300px" class="outline">
        <template :v-model="revSelet">
          <thead>
            <tr>
              <th class="text-left">제목</th>
              <th class="text-left">내용</th>
              <th class="text-left">별점</th>
              <th class="text-left">작성시간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rew , index) in reviews" :key="index">
              <td>{{ rew.title }}</td>
              <td>{{ rew.content }}</td>
              <td>{{ rew.starPoint }}</td>
              <td>{{ rew.timestamp }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-col cols="12">
        <h3>
          댓글
        </h3>
      </v-col>
      <v-simple-table height="300px">
        <template :v-model="commSelet">
          <thead>
            <tr>
              <th class="text-left">내용</th>
              <th class="text-left">별점</th>
              <th class="text-left">작성시간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(com , index) in commts" :key="index" >
              <td>{{ com.content }}</td>
              <td>{{ com.starPoint }}</td>
              <td>{{ com.times }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  
  name:'mypage',
  data () {
    return {
      dataURL: `${process.env.VUE_APP_KAKAO_SERVER_URI}`,
      slots: [
        'review',
        'comment'
      ],
      nickname: [],
      kakaoInArray: [],
      mapSearArr: [],
      addr1: "",
      addrArray: null,
      tel: "",
      markersArray: null,
      markerObjArr: [],
      count: 1,
      map: null,
      mapInfo: null,
      isMap: false,
      title:"",
      dialog: false,
      reviews: [],
      commts:[],
      list: '게시물',
      lists: ['게시물','댓글'],
      mapOptions: {
        lat: 37.286445,
        lng: 127.028845, // -180과 180사이
      }        
    }
  },
  created() {
    // 로그인 제어
    if(this.$store.state.isLogin == false){
      this.$router.push('/login');
      return;
    }
    // 게시글 목록 조회
    this.reviews = []
    this.$http.get(`${this.dataURL}/review`).then((result)=>{
      this.reviews = result.data;
    })
    // 댓글 목록 조회
    this.commts = []
    this.$http.get(`${this.dataURL}/commt`).then((result)=>{
      this.commts = result.data;
    })
    
    this.markersArray = [];
    this.addrArray = [];
    //맵 조회
    var mapUrl = "https://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList"
                            +"?ServiceKey=" + "1lYvAyiayWcV058nevQZ02ev2fGgO6S3gTqhzJJqTe0QWW5VVAduonEmVtP2ko%2BypbimuZsS5psHf4yLcMgj%2BA%3D%3D"
                            +"&mapX=" + "127.028706" + "&mapY=" + "37.277443" + "&radius=" + "5000"
                            +"&MobileOS=" + "ETC" + "&MobileApp=" + "traveler" + "&pageNo=" + "1" 
                            +"&numOfRows=" + "147"
    // 맵 정보 저장
    this.$http.get(mapUrl).then((result)=>{
      this.addrArray = result.data.response.body.items.item;
      this.markersArray = result.data.response.body.items.item;
    })
  },
  methods:{
    // 마커 저장 함수
    onMarkerLoaded(comp){
      this.markerObjArr.push(comp.marker);
    },
    // 마커 클릭 함수
    onMarkerClicked(index) {
      //console.log(this.markerObjArr[index]);

      this.markerObjArr.forEach(obj=>{
        this.$set(obj, "info", false);  
      });
      this.$set(this.markerObjArr[index], "info", true);
      
      this.isMap = true;
      this.addrArray.index = index
      var a = this.addrArray.index
      //console.log('ffff',this.addrArray[a].title);
      this.title = this.addrArray[a].title
      this.$set(this.markerObjArr[index], "title", this.addrArray[a].title);

      this.addrArray.index = index
      var b = this.addrArray.index
      //console.log('ffff',this.addrArray[b].addr1);
      this.addr1 = this.addrArray[b].addr1;
      this.$set(this.markerObjArr[index], "addr1", this.addrArray[b].addr1);

      this.addrArray.index = index
      var c = this.addrArray.index
      //console.log('ffff',this.addrArray[c].tel);             
      this.tel = this.addrArray[c].tel
      this.$set(this.markerObjArr[index], "tel", this.addrArray[c].tel);

      this.addrArray.index = index
      var d = this.addrArray.index
      //console.log('ffff',this.addrArray[d].firstimage2);             
      this.firstimage2 = this.addrArray[d].firstimage2
      this.$set(this.markerObjArr[index], "firstimage2", this.addrArray[d].firstimage2);
    },
    // 로그아웃 함수
    logout(){
      var config = {
        headers: {'Authorization': this.$store.state.kakaoAccessToken}
      };
      this.$http.post(`${process.env.VUE_APP_KAKAO_KAKAOAPI_URI}/logout`,{},config).then(()=>{
        // 로그인 상태변화 fales
        this.$store.commit("logout");
        this.$router.push('/');
      }) 
    },
    // 페이지 이동 함수
    navigateTo(path){
      if(this.$route.path != path){
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        this.$router.push(path);
      }
    },
  },
  mounted() {
    // 스크립트 주기적 실행
    setInterval(() => this.count++, 1000);
  },
};

</script>
