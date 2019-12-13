<template>
  <v-container fluid mt-3>
    <!--메인 상단 이미지-->
    <section>       
      <v-parallax src="assets/plane.jpg" height="600">
        <v-layout column align-center justify-center class="white--text">                    
        </v-layout>
      </v-parallax>
    </section>

    <!--여행지 카드 시작-->
    <section>
      <v-layout column wrap class="my-12">
        <v-flex xs12>
          <v-container grid-list-xl class="my-10">
            <v-text><h3>추천여행지</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--첫번째 카드-->
              <v-flex xs12 md4  v-for="(mainrecommend,index) in mainrecommends" :key="index">
                <v-card  class="mx-auto elevation-5" max-width="330">
                  <v-img class="white--text align-end" height="200px" :src='mainrecommend.firstImage'>
                  </v-img>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">{{mainrecommend.title}}</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <!--세번째 카드 지역별검색,테마검색-->
              <v-flex xs12 md4>
                <v-card flat class="mx-auto elevation-5" max-width="350">                  
                  <v-card-title primary-title>
                    <div>지역별검색</div>
                  </v-card-title>
                  <v-card-text>
                    <div class="regional_search_wrapper">
                      <a @click = "navigateTo('/search',index)"  v-text="region.title" v-for="(region, index) in this.$store.state.regions" :key="index"></a>
                    </div>
                  </v-card-text>
                  <v-card-title primary-title>
                    <div>테마검색</div>
                  </v-card-title>
                  <v-card-text>
                    <v-btn class="theme_button" v-text="theme.data" v-for="(theme,index) in this.$store.state.themes" :key="index" @click="nevToTheme()"></v-btn> 
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <!--여행지 카드 끝-->

    <!--추천코스 카드 시작-->
    <section>
      <v-layout column wrap class="my-12">
        <v-flex xs12>
          <v-container grid-list-xl class="my-12">
            <hr class="my-10">
            <v-text><h3>추천코스</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--첫번째 카드-->
              <v-flex xs12 md4 v-for="(maincourse,index) in maincourses" :key="index">
                <v-card flat class="mx-auto elevation-10" max-width="330">
                    <v-img class="white--text align-end" height="200px" :src="maincourse.firstImage">
                    </v-img>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">{{maincourse.title}}</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <!--추천코스 카드 끝-->

      <!--축제 카드 시작-->
    <section>
      <v-layout column wrap class="my-12">
        <v-flex xs12>
          <v-container grid-list-xl class="my-12">
            <hr class="my-10">
            <v-text><h3>축제</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--축제달력-->
              <v-flex xs12 md12>
                <v-card flat>
                  <!--월-->
                  <v-card-title primary-title class="layout justify-center">
                    <v-icon @click="preButton">mdi-chevron-left</v-icon>
                    <div class="headline text-center mx-3">
                      {{calmonth}}월                                   
                    </div>
                    <v-icon @click="nextButton">mdi-chevron-right</v-icon>                                           
                  </v-card-title>
                  <!--일-->
                  <v-tabs show-arrows grow v-model="active_tab">
                    <v-tab v-for="(day,index) in days" :key="index" class="cal_tabs" @click="getFestival(index)" >
                    {{day}}일
                    </v-tab>                 
                  </v-tabs> 
                </v-card>              
              </v-flex> 
              <template>
                <!--첫번째 카드-->
                <v-flex xs12 md4 v-for="(mainfestival,index) in mainfestivals" :key="index" class="my-5">
                  <v-card class="mx-auto" max-width="330">
                    <v-img class="white--text align-end" height="200px" :src='mainfestival.firstImage'>                 
                    </v-img>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">
                        {{mainfestival.eventStartDate}}~{{mainfestival.eventEndDate}}
                      </div>
                    </v-card-title>
                    <v-card-text style="float:centered">
                      축제명:{{mainfestival.title}}
                      <div style="float:right">
                        지역:{{mainfestival.addr1}}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>    
              </template>       
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <!--축제 카드 끝-->

    <!--후기 카드 시작-->
    <section>
      <v-layout column wrap class="my-12">
        <v-flex xs12>
          <v-container grid-list-xl class="my-12">
            <hr class="my-10">
            <v-text><h3>후기 검색결과</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--첫번째 카드-->
              <v-flex xs12 md4>
                <div><h3 style="text-align:center">추천지 후기</h3></div>
                <v-carousel hide-delimiters>
                  <v-carousel-item v-for="(recommend,i) in recommends" :key="i">
                    <v-card  class="mx-auto my-10" max-width="330" style="background-color:rgb(24, 77,56)">
                      <v-img height="200px" :src="recommend.recommendContentImg">
                      </v-img>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">{{recommend.recommendSubject}}</div>
                      </v-card-title>                              
                      <v-card-text>                 
                        {{recommend.recommendDate}}
                      </v-card-text> 
                      <div style="float:right">
                      <v-card-text>
                        작성자:{{recommend.recommendUserId}}                  
                      </v-card-text>
                      </div>   
                      <v-card-text>                 
                        <v-rating
                          :value= "recommend.recommendAvgrating"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        >
                        </v-rating>
                      </v-card-text>                  
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
              <!--두번째 카드-->
              <v-flex xs12 md4>
                <div><h3 style="text-align:center">코스 후기</h3></div>
                <v-carousel hide-delimiters>
                  <v-carousel-item v-for="(course,i) in courses" :key="i">
                    <v-card  class="mx-auto my-10" max-width="330" style="background-color:rgb(24, 77,56)">
                      <v-img height="200px" :src="course.courseContentImg">
                      </v-img>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">{{course.courseSubject}}</div>
                      </v-card-title>                              
                      <v-card-text>                 
                        {{course.courseDate}}
                      </v-card-text> 
                      <div style="float:right">
                        <v-card-text>
                          작성자:{{course.courseUserId}}                  
                        </v-card-text>
                      </div>   
                      <v-card-text>                 
                        <v-rating
                        :value= "course.courseAvgrating"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                      </v-card-text>                  
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
              <!--세번째 카드-->
              <v-flex xs12 md4>
                <div><h3 style="text-align:center">축제 후기</h3></div>
                <v-carousel hide-delimiters>
                  <v-carousel-item v-for="(festival,i) in festivals" :key="i">
                    <v-card  class="mx-auto my-10" max-width="330" style="background-color:rgb(24, 77,56)">
                      <v-img height="200px" :src="festival.festivalContentImg">
                      </v-img>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">{{festival.festivalSubject}}</div>
                      </v-card-title>                              
                      <v-card-text>                 
                        {{festival.festivalDate}}
                      </v-card-text> 
                      <div style="float:right">
                        <v-card-text>
                          작성자:{{festival.festivalUserId}}                  
                        </v-card-text>
                      </div>   
                      <v-card-text>                 
                        <v-rating
                        :value= "festival.festivalAvgrating"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        ></v-rating>
                      </v-card-text>                  
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <!--후기 카드 끝-->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dataURL:`${process.env.VUE_APP_MAIN_RECOMMEND_URI}`,
    coursedataURL:`${process.env.VUE_APP_MAIN_COURSE_URI}`,
    festivaldataURL:`${process.env.VUE_APP_MAIN_FESTIVAL_URI}`,
    mainfestivaldataURL:`${process.env.VUE_APP_MAIN_MAINFESTIVAL_URI}`,
    mainrecommenddataURL:`${process.env.VUE_APP_MAIN_MAINRECOMMEND_URI}`,
    maincoursedataURL:`${process.env.VUE_APP_MAIN_MAINCOURSE_URI}`,
    recommends:[],
    courses:[],
    festivals:[],
    mainfestivals:[],
    mainrecommends:[],
    maincourses:[],
    active_tab: null,
    day : null,
    today:null,
    calmonth:null,
    days:null,
    year:null,
    todayDate:null,
    specificDate:"",
    specificMonth:"",
    specificDay:"",
    waitrecommend:[],
    waitcourse:[],
    regions:['서울', '경기', '인천', '강원','대전','세종','충북','충남','부산','울산','경남','경북','대구','광주',
    '전남','전북','제주','전국'
    ],
     items: [
          {
            title:'수원화성에서',
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            name:'박정은',
            date:'2019.11.26'
          },
          {
            title:'Fast development',
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            name:'박정은',
            date:'2019.11.26'
          },
          {
            title:'bird',
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            name:'박정은',
            date:'2019.11.26'
          },
          {
            title:'planet',
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            name:'박정은',
            date:'2019.11.26'
          },
        ],
  }),
  methods:{
    // 지역 선택시 상세 페이지로 이동 함수
    navigateTo(path,index){
      if(this.$route.path != path){
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        this.$router.push(path);
      }
    this.$store.commit('navToGoo', index);
    this.$store.commit('toggleOne', index);
    },
    // 테마 선택 시 상세 페이지로 이동 함수
    nevToTheme(){
      this.$router.push('/search');
    },
    // 달력에 '월' 이동 함수
    preButton(){
        this.today = this.$moment(this.today, "MM").subtract(1, 'M');
        this.calmonth= this.$moment(this.today, "MM").format("M");
        this.days = this.$moment(this.today , "MM").daysInMonth();
        this.year = this.today.year();                  
    },
    // 당력에  월의 '다음' 버튼 함수
    nextButton(){
        this.today = this.$moment(this.today, "MM").add(1, 'M');
        this.calmonth=this.$moment(this.today, "MM").format("M");
        //this.calmonth = this.calmonth+1;
        this.days = this.$moment(this.today , "MM").daysInMonth();
        this.year = this.today.year();

    },
    // 축제 정보 받는 함수
    getFestival(index){
      this.specificMonth = this.$moment(this.today,"MM").format("MM");
      if(index < 9){
        this.specificDay = "0" + (index+1).toString();
      }else{
        this.specificDay = (index+1).toString();
      }
      this.specificDate = this.year.toString() + this.specificMonth.toString() + this.specificDay;
      this.mainfestivals=[]
      this.$http.get(`${this.mainfestivaldataURL}/${this.specificDate}`).then((result)=>{
        this.mainfestivals = result.data;
      })
    }
  },

  created(){
    this.today = this.$moment();
    this.calmonth = 1 +this.$moment().month();
    this.days = this.$moment().daysInMonth();
    this.year = this.today.year();
    this.active_tab = this.$moment().date()-1;
    this.todayDate = this.$moment().format('YYYYMMDD');

    //recommends 후기
    this.recommends=[]
    this.$http.get(this.dataURL).then((result)=>{
      this.recommends = result.data
      for(var i=0; i<this.recommends.length; i++){
        let date = this.recommends[i].recommendDate;
        let dateCut = date.toString().slice(0, 10);
        this.recommends[i].recommendDate = dateCut;
      }
      this.recommends.forEach(recommend => {
        this.$http.get(`${this.dataURL}/${recommend.recommendNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(recommend, "recommendContentImg", result.data.recommendContentImg);
        });
      });
    })
    
    //course 후기
    this.courses=[]
    this.$http.get(this.coursedataURL).then((result)=>{
      this.courses = result.data
      for(var i=0; i<this.courses.length; i++){
        let date = this.courses[i].courseDate;
        let dateCut = date.toString().slice(0, 10);
        this.courses[i].courseDate = dateCut;
      }
      this.courses.forEach(course => {
        this.$http.get(`${this.coursedataURL}/${course.courseNo}`).then((result) => {

          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(course, "courseContentImg", result.data.courseContentImg);
        });
      });
    })
    //festival 후기
    this.festivals=[]
    this.$http.get(this.festivaldataURL).then((result)=>{
      this.festivals = result.data
      for(var i=0; i<this.festivals.length; i++){
        let date = this.festivals[i].festivalDate;
        let dateCut = date.toString().slice(0, 10);
        this.festivals[i].festivalDate = dateCut;
      }
      this.festivals.forEach(festival => {
        this.$http.get(`${this.festivaldataURL}/${festival.festivalNo}`).then((result) => {
          // 배열 내부의 객체에 속성을 바로 설정하면 화면에 적용되지 않으므로 Vue.set 메소드를 이용하여 속성에 값을 설정한다.
          this.$set(festival, "festivalContentImg", result.data.festivalContentImg);
        });
      });
    })
    //main에 festival
    this.mainfestivals=[]
    this.$http.get(`${this.mainfestivaldataURL}/${20190413}`).then((result)=>{
      //this.todayDate
      this.mainfestivals = result.data;
    })
    //main에 recommend
    this.$http.get(this.mainrecommenddataURL).then((result)=>{
      this.waitrecommend = result.data;    
      for(var i=0; i<2; i++){
        this.mainrecommends.push(this.waitrecommend[i]);        
      }
    })

    //main에 course
    this.$http.get(this.maincoursedataURL).then((result)=>{
      this.waitcourse = result.data;    
      for(var i=3; i<6; i++){
        this.maincourses.push(this.waitcourse[i]);        
      }
    })
  }
};
</script>
