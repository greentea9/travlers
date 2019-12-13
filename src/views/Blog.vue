<template>
  <div>
   <v-container>
     <!-- 추천 후기 컨테이너 -->
     <v-col cols="12">
        <v-card color="light-green lighten-5" >
          <v-card-title>
            <span class="fad">추천지 후기 게시판</span>
          </v-card-title>
          <v-card-subtitle>
            <v-btn class="ma-2 fas" outlined color="green" @click="naviWr('/write')" >글쓰기</v-btn>
          </v-card-subtitle>
          <v-row class="px-10 pb-4">
            <v-tab v-for="(recommend,index) in recommends" :key="index" @click="naviReDe(index)">
              <v-card elevation="3" height="430" width="400" style="margin:10px;" >  
                  <v-img class="white--text align-end" :src="recommend.recommendContentImg" height="250" width="400">
                  </v-img>
                <v-card-title>{{ recommend.recommendSubject }}</v-card-title>
                <v-card-subtitle class="text-right"> 작성자 : {{recommend.recommendUser}}</v-card-subtitle>
                <v-card-text class="target2">
                  {{ recommend.recommendContent }}
                </v-card-text>
                <v-row
                  align="center"
                  class="mx-0 px-2 py-2" 
                >
                  <v-rating
                    :value= "recommend.recommendAvgrating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div class="grey--text ml-1 mr-8">{{ recommend.recommendAvgrating }} (413)</div>
                  <div class="grey--text text-right ml-5">{{ recommend.recommendDate }} </div>
                </v-row>
              </v-card>
            </v-tab>
          </v-row>
          <div class="text-center pb-4">
            <span >
              <v-btn  text v-on:click="appendRecommends()" :disabled="this.dataFull === ture" :class="{disabled : dataFull}">
              <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
              </v-icon>
              </v-btn>
            </span>
          </div>
        </v-card>
     </v-col>
     <!-- 코스 후기 컨테이너 -->
     <v-col cols="12">
       <v-card color="light-green lighten-5" >
        <v-card-title>
          <span class="fad">코스 후기 게시판</span>
        </v-card-title>
        <v-card-subtitle>
          <v-btn class="ma-2 fas" outlined color="green" @click="naviWr('/writeCourse')">글쓰기</v-btn>
        </v-card-subtitle>
        <v-row class="px-10 pb-4">
            <v-tab v-for="(course,index) in courses" :key="index"  @click="naviCoDe(index)">
              <v-card elevation="3" height="677" width="400" style="margin:10px;" >  
                <v-img class="white--text align-end" :src="course.courseContentImg" height="250" width="400">
                </v-img>
                <v-card-title>{{ course.courseSubject }}</v-card-title>
                <v-card-subtitle class="text-right"> 작성자 : {{course.courseUser}}</v-card-subtitle>
                <v-card-text class="target2">
                  {{ course.courseContent }}
                </v-card-text>
                <v-row
                  align="center"
                  class="mx-0 px-2" 
                >
                  <v-rating
                    :value= "course.courseAvgrating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div class="grey--text ml-1 mr-8">{{ course.courseAvgrating }} (413)</div>
                  <div class="grey--text text-right ml-5">{{ course.courseDate }} </div>
                </v-row>
                <v-img class="white--text align-end mt-2" :src="course.courseContentImg" height="250" width="400">
                </v-img>
              </v-card>
            </v-tab>
          </v-row>
          <div class="text-center pb-4">
            <span >
              <v-btn text v-on:click="appendRecommends2()" :disabled="this.dataFullCourses === ture" :class="{disabled : dataFullCourses}">
              <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
              </v-icon>
              </v-btn>
            </span>
          </div>
       </v-card>
     </v-col>
     <!-- 축제 후기 컨테이너? -->
     <v-col cols="12">
       <v-card color="light-green lighten-5" >
          <v-card-title>
            <span class="fad">축제 후기 게시판</span>
          </v-card-title>
          <v-card-subtitle>
            <v-btn class="ma-2 fas" outlined color="green" @click="naviWr('/Write')">글쓰기</v-btn>
          </v-card-subtitle>
          <v-row class="px-10 pb-4">
            <v-tab v-for="(festival,index) in festivals" :key="index" @click="naviFeDe(index)">
              <v-card elevation="3" height="430" width="400" style="margin:10px;" >  
                <v-img class="white--text align-end" :src="festival.festivalContentImg" height="250" width="400">
                </v-img>
                <v-card-title>{{ festival.festivalSubject }}</v-card-title>
                <v-card-subtitle class="text-right"> 작성자 : {{festival.festivalUser}}</v-card-subtitle>
                <v-card-text class="target2">
                  {{ festival.festivalContent }}
                </v-card-text>
                <v-row
                  align="center"
                  class="mx-0 px-2 py-2" 
                >
                  <v-rating
                    :value= "festival.festivalAvgrating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div class="grey--text mx-1">{{ festival.festivalAvgrating }} (413)</div>
                  <div class="grey--text text-right ml-8">{{ festival.festivalDate }} </div>
                </v-row>
              </v-card>
            </v-tab>
          </v-row>
          <div class="text-center pb-4">
            <span >
              <v-btn  text v-on:click="appendRecommends3()" :disabled="this.dataFullFestivals === ture" :class="{disabled : dataFullFestivals}">
              <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
              </v-icon>
              </v-btn>
            </span>
          </div>
        </v-card>
     </v-col>
   </v-container>
  </div>
</template>

<script>
export default {
  components: {
    //RecommendsDetail
  },
  data: () => ({
      recommends:[],
      cntRecommends: 3,
      totRecommends: 0,
      dataFull: false,
      courses:[],
      cntCourses: 3,
      totCourses: 0,
      dataFullCourses: false,
      festivals:[],
      cntFestivals: 3,
      totFestivals: 0,
      dataFullFestivals: false,
      dataURL:`${process.env.VUE_APP_INDIVIDUAL_RECOMMEND_URI}`,
      dataCURL:`${process.env.VUE_APP_INDIVIDUAL_COURSE_URI}`,
      dataFURL:`${process.env.VUE_APP_INDIVIDUAL_FESTIVAL_URI}`,
      }),
  methods:{
    //추천지 더보기 버튼
    appendRecommends(){
      //console.log(this.recommends)
      this.totRecommends = this.recommendsAll.length;
      if(this.cntRecommends < this.totRecommends){
        this.cntRecommends += 3;
        let data = [];
        for(var i =0 ; i<this.cntRecommends ; i++){
          if(this.recommendsAll[i] != null){
            //console.log(data);
            data.push(this.recommendsAll[i]);
          } else {
            break;
          }
        }
        this.recommends = data;
      } else {
        this.dataFull = true;
        alert('항목이 전부 출력 되었습니다!');
      }
    },
    //코스 더보기 버튼
    appendRecommends2(){
      this.totCourses = this.coursesAll.length;
      if(this.cntCourses < this.totCourses){
        this.cntCourses += 3;
        let data2 = [];
        for(var i =0 ; i<this.cntCourses ; i++){
          if(this.coursesAll[i] != null){
            //console.log(data);
            data2.push(this.coursesAll[i]);
          } else {
            break;
          }
        }
        //console.log(data2)
        this.courses = data2;
      } else {
        this.dataFullCourses = true;
        alert('항목이 전부 출력 되었습니다!');
      }
    },
    //축제 더보기 버튼
    appendRecommends3(){
      this.totFestivals = this.festivalsAll.length;
      if(this.cntFestivals < this.totFestivals){
        this.cntFestivals += 3;
        let data2 = [];
        for(var i =0 ; i<this.cntFestivals ; i++){
          if(this.festivalsAll[i] != null){
            //console.log(data);
            data2.push(this.festivalsAll[i]);
          } else {
            break;
          }
        }
        //console.log(data2)
        this.festivals = data2;
      } else {
        this.dataFullFestivals = true;
        alert('항목이 전부 출력 되었습니다!');
      }
    },
    //글쓰기 버튼 이동 함수
     naviWr(path){
      this.$router.push(path);
    },
    //추천 상세 페이지 이동 함수
    naviReDe(index){
      /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
      this.$store.commit('navToRe',this.recommends[index].recommendNo);
      const recommendDetailNo = this.$store.state.recommendStoreNo;
      //console.log(path)
      this.$router.push({name:'recommendsDetail' ,params:{recommendStoreNo: recommendDetailNo}});
      //console.log(this.recommends[index])
    },
    //코스 상세 페이지 이동 함수
    naviCoDe(index){
      /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
      this.$store.commit('navToCo',this.courses[index].courseNo);
      const courseDetailNo = this.$store.state.courseStoreNo;
      //console.log(this.courses[index].courseNo)
      this.$router.push({name:'courseDetail' ,params:{courseStoreNo: courseDetailNo}});
      //console.log(this.recommends[index])
    },
    //축제 상세 페이지 이동 함수
    naviFeDe(index){
      /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
      this.$store.commit('navToFe',this.festivals[index].festivalNo);
      const festivalDetailNo = this.$store.state.festivalStoreNo;
      //console.log(path)
      this.$router.push({name:'festivalDetail' ,params:{festivalStoreNo: festivalDetailNo}});
      //console.log(this.recommends[index])
    },
  },
  created(){
    //윈도우 위치 맨위쪽 고정
    window.scroll(0, 0);
    // 추천지 후기 게시판 
    this.recommends=[]
    this.recommendsAll=[]
    this.$http.get(this.dataURL).then((result)=>{
      for(var i=0; i<3; i++){
        this.recommends.push(result.data[i]);
        let date = this.recommends[i].recommendDate;
        let dateCut = date.toString().slice(0, 10);
        this.recommends[i].recommendDate = dateCut;
      }
      this.recommendsAll = result.data
      for(i=0; i<this.recommendsAll.length; i++){
        let date = this.recommendsAll[i].recommendDate;
        let dateCut = date.toString().slice(0, 10);
        this.recommendsAll[i].recommendDate = dateCut;
      }
      this.recommends.forEach(recommend => {
        this.$http.get(`${this.dataURL}/${recommend.recommendNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(recommend, "recommendContentImg", result.data.recommendContentImg);
          //this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
        });
      });
      this.recommendsAll.forEach(recommendAll => {
        this.$http.get(`${this.dataURL}/${recommendAll.recommendNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
          //this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
        });
      });
    })
    // 코스 후기 게시판
    this.courses=[]
    this.coursesAll=[]
    this.$http.get(this.dataCURL).then((result)=>{
      //console.log(result)
      for(var i=0; i<3; i++){
        this.courses.push(result.data[i]);
        let date = this.courses[i].courseDate;
        let dateCut = date.toString().slice(0, 10);
        this.courses[i].courseDate = dateCut;
      }
      this.coursesAll = result.data
      for(i=0; i<this.coursesAll.length; i++){
        let date = this.coursesAll[i].courseDate;
        let dateCut = date.toString().slice(0, 10);
        this.coursesAll[i].courseDate = dateCut;
      }
      this.courses.forEach(course => {
        //console.log(this.course.courseNo)
        this.$http.get(`${this.dataCURL}/${course.courseNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(course, "courseContentImg", result.data.courseContentImg);
          //this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
        });
      });
      this.coursesAll.forEach(courseAll => {
        this.$http.get(`${this.dataCURL}/${courseAll.courseNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(courseAll, "courseContentImg", result.data.courseContentImg);
          //this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
        });
      });
      //console.log(this.courses)
    })
    // 축제 후기 게시판
    this.festivals=[]
    this.festivalsAll=[]
    this.$http.get(this.dataFURL).then((result)=>{
      //console.log(result)
      for(var i=0; i<3; i++){
        this.festivals.push(result.data[i]);
        //console.log(this.festivals[i])
        let date = this.festivals[i].festivalDate;
        let dateCut = date.toString().slice(0, 10);
        this.festivals[i].festivalDate = dateCut;
      }
      this.festivalsAll = result.data
      for(i=0; i<this.festivalsAll.length; i++){
        let date = this.festivalsAll[i].festivalDate;
        let dateCut = date.toString().slice(0, 10);
        this.festivalsAll[i].festivalDate = dateCut;
      }
      this.festivals.forEach(festival => {
        //console.log(this.course.courseNo)
        this.$http.get(`${this.dataFURL}/${festival.festivalNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(festival, "festivalContentImg", result.data.festivalContentImg);
          //this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
        });
      });
      this.festivalsAll.forEach(festivalAll => {
        this.$http.get(`${this.dataFURL}/${festivalAll.festivalNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(festivalAll, "festivalContentImg", result.data.festivalContentImg);
          //this.$set(recommendAll, "recommendContentImg", result.data.recommendContentImg);
        });
      });
      //console.log(this.festivals)
    })
    
  }
};

</script>