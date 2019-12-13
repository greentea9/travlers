<template>
  <v-container>
    <!-- 툴바 -->
    <v-card color="basil">
      <!-- 탭 바 -->
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow="grow">
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- 코스 추천 탭 아이템 -->
        <v-tab-item>
          <v-container fluid="fluid">
            <v-row>
              <v-col cols="12" md="4" v-for="(courseInfo,index) in courseInfos" :key="index">
                <v-card class="mx-auto" width="400">
                  <v-img class="white--text align-end " :src="courseInfo.firstImage">
                    <span style="cursor:pointer" class="test ma-4" @click="toCourseDetail(index)">
                      {{courseInfo.title}}
                    </span>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <!-- 코스 후기 탭 아이템 -->
        <v-tab-item>
          <v-container fluid="fluid">
            <v-row>
              <v-col cols="12" md="4" v-for="(courseInfo,index) in courseInfos" :key="index">
                <v-card class="mx-auto" width="400">
                  <v-img class="white--text align-end " height="200px" :src="courseInfo.firstImage">
                    <span style="cursor:pointer" class="test ma-4" @click="toCourseDetail(index)">
                      {{courseInfo.title}}
                    </span>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        tab: null,
        dataCourseURL: `${process.env.VUE_APP_RECOMMENDATIN_COURSE_URI}`,
        dataCourseListURL: `${process.env.VUE_APP_RECOMMENDATIN_COURSE_LIST_URI}`,
        courseInfos: null,
        courseListInfos: [],
        items: ['Course추천', 'Course후기']
      }
    },
    methods: {
      // 코스 상세 페이지로 이동 함수
      toCourseDetail(index) {
        const contentid = Number(this.courseInfos[index].contentId);
        this.$router.push({
          name: 'courseDetailPage',
          params: {
            contentId: contentid
          }
        });
      }
    },
    created() {
      this.courseInfos = [];
      this.$http.get(this.dataCourseURL).then((result) => {
        //this.$store.commit('listCourseTitle', result.data.contentId)
        this.courseInfos = result.data;
      });
    }
  }
</script>

<style>
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
.test:hover {
  text-decoration: underline;
}
.au {
  overflow: auto;
  color: red;
}
</style>