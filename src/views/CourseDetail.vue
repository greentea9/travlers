<template>
   <div>
   <v-container>
     <!-- 코스 상세 컨테이너 -->
     <v-col cols="12">
        <v-card color="light-green lighten-5" >
          <v-card-title>
            <span class="fad">{{course.courseSubject}}</span>
          </v-card-title>
          <v-card-subtitle>
            <div class="fas">
              <v-btn class="ma-2" outlined color="green" @click="navigateTo('/WriteCourse')" >수정</v-btn>
              <v-btn class="ma-2" outlined color="green" @click="navigateTo('/WriteCourse')" >삭제</v-btn>
            </div>
          </v-card-subtitle>
          <v-row>
            <v-col cols="12" md="2" class="pl-10 pr-0">
              <v-card-subtitle class="pt-0 pr-0">
                <span class="fad4">작성자: {{course.courseUser}}</span>
              </v-card-subtitle>
            </v-col>
            <v-col cols="12" md="3"  class="pl-5">
              <v-card-subtitle class="pt-0 pl-0">
                <span class="fad4">날짜 : {{course.courseDate}}</span>
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="5" class="ml-10 mb-3">
              <v-img class="white--text align-end mx-1" :src="courseMap" height="425" >
              </v-img>
            </v-col>
            <v-col cols="12" md="6" class="ml-0 mb-3 px-0">
              <v-card color="light-green lighten-4" class="ml-3">
                <v-row>
                  <v-col cols="12" md="1" class="pt-7 pr-0 pb-0 mx-7">
                    <div class="mb-11 mt-5">
                      <v-icon x-large class="mdi mdi-numeric-1-circle-outline"></v-icon>
                    </div>
                    <div class="mb-12 pt-3">
                      <v-icon x-large class="mdi mdi-numeric-2-circle-outline"></v-icon>
                    </div>
                    <div class="mb-12 pt-2">
                      <v-icon x-large class="mdi mdi-numeric-3-circle-outline"></v-icon>
                    </div>
                    <div class="mb-11 pt-2">
                      <v-icon x-large class="mdi mdi-numeric-4-circle-outline"></v-icon>
                    </div>
                  </v-col>
                  <v-col cols="12" md="5" class="pl-0">
                    <div class="my-3" v-for="(courseArea,index) in courseAreas" :key="index">
                      <p class="fad2 my-5 py-6">
                        {{courseArea.courseArea}}
                      </p>
                    </div>
                    <!--div class="my-3">
                      <p class="fad2 my-8 pt-9">
                        두번째 지역
                      </p>
                    </div>
                    <div class="my-3">
                      <p class="fad2 my-8 pt-10">
                        세번째 지역
                      </p>
                    </div>
                    <div class="my-3">
                      <p class="fad2 my-8 pt-10">
                        네번째 지역
                      </p>
                    </div>-->
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <carousel :perPageCustom="[[1, 1],[768,2]]" :navigationEnabled="true" class="mx-7">
            <!--Slide v-for="(course,index) in courses" :key="index" >-->
              <v-img class="white--text align-end mx-1" :src="course.courseContentImg" height="400" >
              </v-img>
            <!--/Slide>-->
          </carousel>
          <div>
            <v-row>
              <v-col cols="12">
                <v-card color="light-green lighten-4" class="ml-3">
                  <v-card-text >
                    <p style="line-height:1.5em" v-html="course.courseContent"></p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-col cols="12">
              <v-card color="light-green lighten-4 pb-4">
                <v-card-title>
                  <span class="fad">댓글 {{commentscnt}}</span>
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
                    <v-btn  text v-on:click="appendComments()" :disabled="this.dataFull === ture" :class="{disabled : dataFull}">
                    <v-icon x-large class="mdi mdi-chevron-down-circle-outline">
                    </v-icon>
                    </v-btn>
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
          </div>
        </v-card>
     </v-col>
   </v-container>
  </div>
</template>

<script>
//import { Slide } from 'vue-carousel';
export default {
  name:'courseDetail',
  components: {
  //  Carousel,
  //  Slide,
        
  },
  data: () => ({
    courseMap:"https://picsum.photos/45/45",
    courseAreas:[{
      courseArea:"첫번째 지역"
    },
    {
      courseArea:"두번째 지역"
    },
    {
      courseArea:"세번째 지역"
    },
    {
      courseArea:"네번째 지역"
    }],
    commentscnt:"0",
    cntComments: 3,
    totComments: 0,
    course:{},
    comments:[],
    dataFull: false,
    dataURL:`${process.env.VUE_APP_INDIVIDUAL_COURSE_URI}`,
  }),

  methods:{
    // 수정 및 삭제 버튼 이동 함수
    navigateTo(path){
      if(this.$route.path != path){
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        this.$router.push(path);
      }
    },
    //코스 댓글 더보기 버튼 함수
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
  created(){
    //윈도우 위치 맨위쪽 고정
    window.scroll(0, 0);
    //코스 상세 데이터 가져오기
    this.$http.get(`${this.dataURL}/detail/${this.$route.params.courseStoreNo}`).then((result)=>{
      //console.log(result.data)
      this.course = result.data;
      let date = this.course.courseDate;
      let dateCut = date.toString().slice(0, 10);
      this.course.courseDate = dateCut;
      
    })
    //코스 댓글 데이터 가져오기
    this.$http.get(`${this.dataURL}/comment/${this.$route.params.courseStoreNo}`).then((result)=>{
      //console.log(result.data)
      //this.comments.push(result.data);
      this.commentsAll = result.data
      for(var i=0; i<3; i++){
        this.comments.push(result.data[i]);
      }
      
      //for(var i = 0 ; i<this.comments.length; i++){
      //  let date = this.comments[i].commentsDate;
      //  let dateCut = date.toString().slice(0, 10);
      //  this.comments[i].recommendDate = dateCut;
      //}
      //console.log(result.data)
      //console.log(this.commentsAll.length)
      this.commentscnt=this.commentsAll.length;
    })
  },
};
</script>