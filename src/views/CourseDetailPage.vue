<template>
  <v-container>
    <!-- 코스 목록 라인 -->
    <carousel :perPageCustom="[[1, 1],[576, 2],[768, 4]]" :navigationEnabled="false">
      <slide v-for="(courseList, index) in courseLists" :key="index">
        <v-card style="margin:10px;" height="100" @click="toImage(index)" data-tooltip-text = "클릭하면 이미지가 나옵니다">
          <v-card-title >
            {{courseList.subName}}
          </v-card-title>
        </v-card>
      </slide>
    </carousel>
    <!-- 코스 총거리 및 시간 -->
    <v-card>
      <v-row>
        <v-col cols="12" md="6">
          <h3>
            총 거리 --
            {{coursesDisTimes.distance}}
          </h3>
        </v-col>
        <v-col cols="12" md="6">
          <h3>
            총 시간 --
            {{coursesDisTimes.takeTime}}
          </h3>
        </v-col>
      </v-row>  
    </v-card>
    <!-- 각 코스 이미지와 코스 여행 소감 설명 -->
    <v-card>
      <v-row>
        <v-col cols="12" md="6">
          <v-img :src="selectImage" height="450"></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <h3>
            {{selectSummary}}
          </h3>
        </v-col>
      </v-row>
    </v-card>
    <!-- 네이버지도 -->
    <v-col cols="12">
      <naver-maps :height="400" :mapOptions="mapOptions" :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']">
        <div>
          <v-card class="column"></v-card>
        </div>
        <div>
          <naver-marker
            :lat="Number(courseInfos.mapy)"
            :lng="Number(courseInfos.mapx)"
            @load="onMarkerLoaded"/>
        </div>
      </naver-maps>
    </v-col>
    <!-- 댓글라인 -->
    <v-col cols="12">
      <v-card color="light-green lighten-4 pb-4">
        <v-card-title>
          <span class="fad">댓글
            {{commentscnt}}
          </span>
        </v-card-title>
        <div class="grey lighten-2 mx-4" v-for="(comment,index) in comments" :key="index">
          <v-row class="mx-1">
            <v-avatar size="36" class="ma-3">
              <v-img class="white--text align-end" :src="comment.commentUserImg"></v-img>
            </v-avatar>
              <span class="cosize mx-3 mt-3">
                {{comment.commentUser}}
              </span>
          </v-row>
          <v-row>
            <p style="line-height:1.5em" v-html="comment.commentContent" class="mx-7"></p>
          </v-row>
          <v-row>
            <v-rating class="ml-6" :value="comment.commentRating" color="amber" dense="dense" half-increments="half-increments" readonly="readonly" size="23"></v-rating>
          </v-row>
          <v-divider class="mt-6"></v-divider>
        </div>
        <div class="text-center pt-4">
          <span>
            <v-icon x-large="x-large" class="mdi mdi-chevron-down-circle-outline" @click="appendComments()" :disabled="this.dataFull === true" :class="{disabled : dataFull}"></v-icon>
          </span>
        </div>
        <v-card-text>
          <v-textarea @keydown.enter.prevent="keydown.enter.prevent" autoGrow="autoGrow" solo="solo" rowHeight="9" maxlength="300" name="input-title" label="댓글을 입력해 주세요">
          </v-textarea>
          <v-row>
            <v-col cols="12" md="11">
              <v-rating v-model="rating" background-color="orange lighten-3" color="amber" class="ml-2"></v-rating>
            </v-col>
            <v-col cols="12" md="1">
              <v-btn class="fad" outlined="outlined" color="green">
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
      tripCoursesInfoURL: `${process.env.VUE_APP_RECOMMENDATIN_COURSE_URI}`,
      tripCoursesListURL: `${process.env.VUE_APP_RECOMMENDATIN_COURSE_LIST_URI}`,
      tripCoursesDisTimeURL: `${process.env.VUE_APP_RECOMMENDATIN_COURSE_DISTIME_URI}`,
      coursesInfos: null,
      coursesLists: null,
      coursesDisTimes: null,
      commentscnt: "0",
      cntComments: 3,
      totComments: 0,
      comments: [],
      commentsAll: [],
      count: 1,
      map: null,
      isMap: false,
      mapOptions: {
        lat: 37.286445,
        lng: 127.028845,
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: {
          position: 'TOP_RIGHT'
        },
        mapTypeControl: true
      },
      selectImage: "",
      selectSummary: ""
    }),
    methods: {
      // 댓글 더보기 함수
      appendComments() {
        this.totComments = this.commentsAll.length;
        if (this.cntComments < this.totComments) {
          this.cntComments += 3;
          let data = [];
          for (var i = 0; i < this.cntComments; i++) {
            if (this.commentsAll[i] != null) {
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
      // 코스 클릭 시 이미지 및 설명 함수
      toImage(index) {
        for (var i = 0; i < this.courseLists.length; i++) {
          if (i == index && this.courseLists[index].subDetailImg != null) {
              this.selectImage = this.courseLists[index].subDetailImg
          } else if (this.courseLists[index].subDetailImg == null) {
              this.selectImage = "http://citytour.jeonnam.go.kr:8080/site/jeonnam/citytour/images/noimage.gif"
          }
          if (i == index && this.courseLists[index].subDetailOverview != null) {
            this.selectSummary = this.courseLists[index].subDetailOverview
            if (this.courseLists[index].subDetailOverview == null) {
              this.selectSummary = "앗! 내용이 없네요"
            }
          }
        }
      }
    },
    created() {
      window.scroll(0,0)
      this.courseInfos = {}
      // 코스 일반정보 받는 곳
      this.$http.get(`${this.tripCoursesInfoURL}/${this.$route.params.contentId}`).then((result) => {
        this.courseInfos = result.data;
        this.mapOptions.lat = result.data.mapy
        this.mapOptions.lng = result.data.mapx
      })
      this.courseLists = []
      // 코스 리스트 받는 곳
      this.$http.get(`${this.tripCoursesListURL}/${this.$route.params.contentId}`).then((result) => {
        this.selectImage = result.data[0].subDetailImg
        this.selectSummary = result.data[0].subDetailOverview
        this.courseLists = result.data
      });
      this.coursesDisTimes = {}
      // 코스 총 거리 및 시간 받는 곳
      this.$http.get(`${this.tripCoursesDisTimeURL}/${this.$route.params.contentId}`).then((result) => {
        this.coursesDisTimes = result.data
      });
    }
  }
</script>