<template>
  <v-container fluid mt-3>

    <!--메인 상단 이미지-->
    <section>
      <v-layout column align-center class="my-10">
        <v-flex xs12> 
          <v-card style="border:1px solid">                                       
            <table>
              <tr>
                <th>
                  <v-btn-toggle  v-model="toggle_one"  color="deep-purple accent-3">
                    <v-btn 
                    v-for="(region, index) in this.$store.state.regions" 
                    :key="index" 
                    @click="navToGoo(index)" >
                      {{region.title}}
                    </v-btn>
                  </v-btn-toggle>
                </th>              
              </tr>
            </table>
            <hr>
            <v-card-text class="detail_search_goo">
              <div 
              v-for="(area,index) in this.$store.state.areas" 
              :key="index" 
              >
                <a class="detail_city" :class="{green :area.done}" @click="btnKey(index)">
                  {{area.data}}
                  <span>
                    <v-icon v-show="area.done">mdi-check</v-icon>
                  </span>
                </a>             
              </div>
            </v-card-text>
            <hr>
            <v-card-text class="detail_search_goo" >
              <td >테마여행</td>
              <td  v-for="(theme,index) in this.$store.state.themes" :key="index" @click.stop="btnKey2(index)">
                <a class="detail_city" :class="{green :theme.done}">
                  {{theme.data}}
                  <span >
                    <v-icon v-show="theme.done">mdi-check</v-icon>
                  </span>
                </a>                
              </td>
            </v-card-text>
            <hr>
            <v-card-text class="detail_search_goo">
              <td >선택한 키워드</td>
              <td  v-for="(keyword,index) in this.$store.state.keywords" :key="index" class="detail_city">
                <a>{{keyword.title}}&nbsp;</a><a>{{keyword.data}}</a>
                <v-icon @click="remOneKey(value,index);">mdi-close</v-icon>              
              </td>
            </v-card-text>
          </v-card>
        </v-flex>
          <div style="text-align:center;" class="my-8">
            <v-btn style="background-color:rgb(39, 174, 96)" @click="findinfo();">검색</v-btn>
            <v-btn @click.stop="remKey()">초기화</v-btn>
          </div>
      </v-layout>
    </section>
    <!--여행지 카드 시작-->
    <section>
      <v-layout column wrap class="my-12">
        <v-flex>
          <v-container grid-list-xl class="my-10">
            <v-text><h3>검색결과</h3></v-text>
            <hr class="my-10">
            <v-text><h3>추천지 검색결과</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--첫번째 카드-->
              <v-flex xs12 md4 v-for="(recKeyword,index) in recKeywords" :key="index">
                <v-card flat class="mx-auto" max-width="330">
                  <v-img class="white--text align-end" height="200px" :src="recKeyword.firstImage">
                  </v-img>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">{{recKeyword.title}}</div>
                  </v-card-title>
                  <v-card-text>
                    {{recKeyword.addr1}}
                  </v-card-text>
                </v-card>
              </v-flex>                         
            </v-layout>
            <div style="text-align:center;" class="my-8"> 
              <v-btn  text v-on:click="appendComments()" :disabled="this.dataFull === ture" style="text:align-center">
                <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
                </v-icon>
              </v-btn>
            </div>                
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
            <v-text><h3>코스 검색결과</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--첫번째 카드-->
              <v-flex xs12 md4 v-for="(corKeyword,index) in corKeywords" :key="index">
                <v-card flat class="mx-auto" max-width="330">
                  <v-img class="white--text align-end" height="200px" :src="corKeyword.firstImage">
                  </v-img>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">{{corKeyword.title}}</div>
                  </v-card-title>
                  <v-card-text>
                    {{corKeyword.addr1}}
                  </v-card-text>
                </v-card>
              </v-flex>                         
            </v-layout>
            <div style="text-align:center;" class="my-8"> 
              <v-btn  text v-on:click="appendComments()" :disabled="this.dataFull === ture" style="text:align-center">
                <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
                </v-icon>
              </v-btn>
            </div>   
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
            <v-text><h3>축제 검색결과</h3></v-text>
            <v-layout row wrap align-center class="my-10">
              <!--첫번째 카드-->
              <v-flex xs12 md4 v-for="(fesKeyword,index) in fesKeywords" :key="index" class="my-5">
                <v-card class="mx-auto" max-width="330">
                  <v-img class="white--text align-end" height="200px" :src='fesKeyword.firstImage'>                 
                  </v-img>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">
                      {{fesKeyword.eventStartDate}}~{{fesKeyword.eventEndDate}}
                    </div>
                  </v-card-title>
                  <v-card-text style="float:centered">
                    축제명:{{fesKeyword.title}}
                    <div style="float:right">
                      지역:{{fesKeyword.addr1}}
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>    
            </v-layout>
            <div style="text-align:center;" class="my-8"> 
              <v-btn  text v-on:click="appendComments()" :disabled="this.dataFull === ture" style="text:align-center">
                <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
                </v-icon>
              </v-btn>
            </div>   
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
                        ></v-rating>
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
                      size="14">
                      </v-rating>
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
                          size="14">
                          </v-rating>
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

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.js"></script>
<script>

export default {
  data: () => ({
    dataURL:`${process.env.VUE_APP_MAIN_RECOMMEND_URI}`,
    coursedataURL:`${process.env.VUE_APP_MAIN_COURSE_URI}`,
    festivalURL:`${process.env.VUE_APP_MAIN_FESTIVAL_URI}`,
    mainrecommenddataURL:`${process.env.VUE_APP_MAIN_MAINRECOMMEND_URI}`,
    maincoursedataURL:`${process.env.VUE_APP_MAIN_MAINCOURSE_URI}`,
    festivaldataURL:`${process.env.VUE_APP_MAIN_MAINFESTIVAL_URI}`,
    recKeywords:[],
    corKeywords:[],
    fesKeywords:[],
    recommends:[],
    courses:[],
    festivals:[],
    toggle_one:null,
    keywords:[],
    calmonth:null,
    days:null,
    datas:[],
    temp:[],
    cntComments: 3,
    dataFull: false,
  }),
  methods:{
    //도시 버튼 누르면 구가 나오게
    navToGoo(index){   
      this.$store.commit('navToGoo',index);
    },

    //구 버튼 누르면 선택한 키워드로
    btnKey(index){
      this.$store.commit('btnKey',index);    
    },

    //테마여행 버튼 누르면 선택한 키워드로
    btnKey2(index){
      this.$store.commit('btnKey2',index);
    },
    //초기화버튼
    remKey(){
      for(var i=0; i<this.$store.state.areas.length; i++){
        for (var j=0; j<this.$store.state.keywords.length; j++){
          if(this.$store.state.areas[i].data == this.$store.state.keywords[j].data ){
            this.$store.state.areas[i].done= false;
          }         
        }
      }

      for(var i=0; i<this.$store.state.themes.length; i++){
        for (var j=0; j<this.$store.state.keywords.length; j++){
          if(this.$store.state.themes[i].data == this.$store.state.keywords[j].data ){
            this.$store.state.themes[i].done= false;
          }         
        }
      }
      this.$store.state.keywords=[];
    },
    //선택한키워드 하나 지우기
    remOneKey(value,index){     
      for(var i=0; i<this.$store.state.areas.length; i++){
        if(this.$store.state.keywords[index].data == this.$store.state.areas[i].data){
          this.$store.state.areas[i].done = false;
        }
      }
      for(var i=0; i<this.$store.state.themes.length; i++){
        if(this.$store.state.keywords[index].data == this.$store.state.themes[i].data){
          this.$store.state.themes[i].done = false;
        }
      }
      this.$store.state.keywords.splice(index, 1);
    },
    //더보기 버튼
    appendComments(){
      this.datas=[];
      if(this.cntComments < this.comments.length){
        this.cntComments += 3;
        for(var i = 0 ; i<this.cntComments ; i++){
          if(this.comments[i] != null){
            this.datas.push(this.comments[i]);
          } else {
            break;
          }
        }       
      }else {
        this.dataFull = true;
        alert('항목이 전부 출력 되었습니다!');
        this.datas = this.comments;
      }
    },
    //검색버튼
    findinfo(){
      //추천지검색
      this.recKeywords = [];
      for(var i=0; i<this.$store.state.keywords.length; i++){
        this.$http.get(`${this.mainrecommenddataURL}/${this.$store.state.keywords[i].data}`).then((result)=>{
          this.temp = [];
          this.temp = result.data;
          for(var i=0; i<this.temp.length; i++){
            this.recKeywords.push(this.temp[i]);
          }        
        })       
      }     
      //코스검색
      this.corKeywords = [];
      for(var i=0; i<this.$store.state.keywords.length; i++){
        this.$http.get(`${this.maincoursedataURL}/${this.$store.state.keywords[i].data}`).then((result)=>{
        this.temp = [];
        this.temp = result.data;
          for(var i=0; i<this.temp.length; i++){
            this.corKeywords.push(this.temp[i]);
          }        
        })       
      }
      //축제검색
      this.fesKeywords=[];
      for(var i=0; i<this.$store.state.keywords.length; i++){
        this.$http.get(`${this.festivaldataURL}/${this.$store.state.keywords[i].data}`).then((result)=>{
        this.temp = [];
        this.temp = result.data;
          for(var i=0; i<this.temp.length; i++){
            this.fesKeywords.push(this.temp[i]);
            }        
        })       
      }
    },
  },
  created(){

    window.scrollTo(0, 0);
    this.calmonth = 1 +this.$moment().month();
    this.days = this.$moment().daysInMonth();
    this.toggle_one = this.$store.state.toggle_one;

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
          this.$set(course, "courseContentImg", result.data.courseContentImg);
        });
      });
    })

    //festival 후기
    this.festivals=[]
    this.$http.get(this.festivalURL).then((result)=>{    
      this.festivals = result.data
      for(var i=0; i<this.festivals.length; i++){  
        let date = this.festivals[i].festivalDate;
        let dateCut = date.toString().slice(0, 10);
        this.festivals[i].festivalDate = dateCut;
      }
      this.festivals.forEach(festival => {
        this.$http.get(`${this.festivalURL}/${festival.festivalNo}`).then((result) => {
          this.$set(festival, "festivalContentImg", result.data.festivalContentImg);
        });
      });
    })
  }
};
</script>
