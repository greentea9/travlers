<template>
  <!-- 글쓰기 코스 컨테이너 -->
  <v-col cols="12">
    <v-card class="pa-5" color="light-green lighten-5" >
      <v-card color="grey lighten-2" >
        <v-card-title>
          <span class="fad pb-1">글쓰기</span>
        </v-card-title>
        <v-card-subtitle class="pb-0">
          <v-row>
            <v-col cols="12" md="1" class="pt-5 pr-0 pb-0">
              <span class="fad2">항목</span>
            </v-col>
            <v-col cols="12" md="3" class="pl-0 py-0">
              <v-overflow-btn
                class="my-2"
                :items="category"
                label="항목을 선택해 주세요"
              ></v-overflow-btn>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-subtitle class="py-0 ">
          <v-row>
            <v-col cols="12" md="1" class="pt-6 pr-0">
              <span class="fad2">제목</span>
            </v-col>
            <v-col cols="12" md="6" class="pl-0 py-0">
              <v-textarea
                @keydown.enter.prevent
                autoGrow
                rowHeight="9"
                maxlength="30"
                name="input-title"
                label="제목을 입력해 주세요"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <v-card-subtilte>
          <v-row>
            <v-col cols="12" md="4" class="pt-4 pl-5 mb-7">
              <v-card elevation="3" height="250" width="400" style="margin:10px;" >  
                <v-img class="white--text align-end" :src="courseImg" height="250" width="400">
                </v-img>
              </v-card>
            </v-col>
            <v-col cols="12" md="1" class="pt-4 px-0 mb-7">
            </v-col>
            <v-col cols="12" md="1" class="pt-4 pr-0 mb-7">
              <div class="mb-11">
                <v-icon x-large class="mdi mdi-numeric-1-circle-outline"></v-icon>
              </div>
              <div class="mb-12">
                <v-icon x-large class="mdi mdi-numeric-2-circle-outline"></v-icon>
              </div>
              <div class="mb-12">
                <v-icon x-large class="mdi mdi-numeric-3-circle-outline"></v-icon>
              </div>
              <div class="mb-11">
                <v-icon x-large class="mdi mdi-numeric-4-circle-outline"></v-icon>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="pt-1 px-0 mb-7">
              <div>
                <v-textarea
                    @keydown.enter.prevent
                    autoGrow
                    solo
                    rowHeight="9"
                    maxlength="20"
                    name="input-title"
                    label="첫번 째 지역을 입력해 주세요">
                </v-textarea>
              </div>
              <div>
                <v-textarea
                    @keydown.enter.prevent
                    autoGrow
                    solo
                    rowHeight="9"
                    maxlength="20"
                    name="input-title"
                    label="두번 째 지역을 입력해 주세요">
                </v-textarea>
              </div>
              <div>
                <v-textarea
                    @keydown.enter.prevent
                    autoGrow
                    solo
                    rowHeight="9"
                    maxlength="20"
                    name="input-title"
                    label="세번 째 지역을 입력해 주세요">
                </v-textarea>
              </div>
              <div>
                <v-textarea
                    @keydown.enter.prevent
                    autoGrow
                    solo
                    rowHeight="9"
                    maxlength="20"
                    name="input-title"
                    label="네번 째 지역을 입력해 주세요">
                </v-textarea>
              </div>
            </v-col>
          </v-row>
        </v-card-subtilte>
        <vue-editor v-model="content" :editorToolbar="customToolbar" class="edit2 mx-3 pb-12" @text-change="changed">
        </vue-editor>
        <v-card-subtitle class="pb-0">
          <v-row>
            <v-col cols="12" md="1" class="pt-6 pr-0 pb-0">
              <span class="fad2">태그 달기</span>
            </v-col>
            <v-col cols="12" md="11" class="pl-0 py-2">
              <v-textarea
                @keydown.enter.prevent
                autoGrow
                solo
                rowHeight="9"
                maxlength="62"
                name="input-title"
                label="태그와 태그는 쉼표로 구분하며, 60자까지 입력하실 수 있습니다."
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <div class="text-center">
          <span >
            <v-btn class="mx-4 mb-4" outlined color="green" @click="navigateTo('/blog')">
              확인
            </v-btn>
            <v-btn class="mx-4 mb-4" outlined color="green" @click="navigateToBack()">
              취소
            </v-btn>
          </span>
        </div>
        <!-- 텍스트 입력 부분 -->
        <!--<v-textarea solo autoGrow class="ma-4" name="myeditor" id="myeditor" rows="15" cols="143">
        </v-textarea>-->
        <!--iframe src="smartedit2/SmartEditor2Skin.html" width=600 height=500></iframe>-->
        <!--<textarea name="myeditor" id="myeditor">
        </textarea>-->
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { VueEditor } from "vue2-editor";
//import $ from "jquery"
//const nhn = window.nhn;

export default {
  components:{
    VueEditor
  },
  data: () => ({
    category: ['코스 후기'],
    content:"",
    customToolbar: [[{'header':[false,1,2,3,4,5,6]}],["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }],[{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],['image']],
    courseImg:"https://picsum.photos/45/45",
  }),
  methods: {
    //글 내용 추출
    changed(){
      //console.log(this.content);
    },
    //뒤로가기 함수
    navigateToBack(){
      window.history.back();
    },
    //확인 버튼 시 이동 함수
    navigateTo(path){
      if(this.$route.path != path){
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        this.$router.push(path);
      }
    },    
  },

  mounted(){
    /*
    console.log(nhn);
    console.log(document.getElementById("myeditor"));

    var myEditors = [];
    nhn.husky.EZCreator.createInIFrame({
      oAppRef: myEditors,
      elPlaceHolder:"myeditor",
      sSkinURI:"/smartedit2/SmartEditor2Skin.html",
      fCreator:"createSEditor2"
    });
    */
  },

  created(){
    //윈도우 위치 맨위쪽 고정
    window.scroll(0, 0);
   // $.getScript("/assets/js/HuskyEZCreator.js", function(){
     // var myEditors = [];
      /* eslint-disable */
     // console.log(nhn);
      /* eslint-disable */
      //nhn.husky.EZCreator.createInIFrame({
        //oAppRef: myEditors,
        //elPlaceHolder:"myeditor",
        //sSkinURI:"/components/smartedit2/SmartEditor2Skin_ko_KR.html",
        //fCreator:"createSEditor2"
      //});
      /*
      $(document).on('click','.savebtn',function(){
        var var2 = myEditors.getById["myeditor"].exec("UPDATE_CONTENTS_FIELD",[]);
        this.contents = $('#myeditor').val();
        alert(this.contents);
        this.onSubmitBtnClick();
      });
      */
    //});  
  }
};
</script>