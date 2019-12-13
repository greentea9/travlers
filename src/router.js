import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
Vue.config.silent = true

export default new Router({
  mode:"history",
  routes: [
    {
      // 메인 페이지
      path: '/',
      name: 'home',
      component: Home
    },
    // 상세 검색 페이지
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    // 여행지 페이지
    {
      path: '/trip',
      name: 'trip',
      component: () => import('./views/Trip.vue')
    },
    // 코스 페이지
    {
      path: '/course',
      name: 'course',
      component: () => import('./views/Course.vue')
    },
    // 축제 페이지
    {
      path: '/festival',
      name: 'festival',
      component: () => import('./views/Festival.vue')
    },
    // 후기 게시판 페이지
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue')
    },
    // 마이 페이지 
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('./views/Mypage.vue')
    },
    // 추천 상세 페이지
    {
      path: '/recommendsDetail/:recommendStoreNo',
      name: 'recommendsDetail',
      component: () => import('./views/RecommendsDetail.vue')
    },
    //코스 상세 페이지
    {
      path: '/courseDetail/:courseStoreNo',
      name: 'courseDetail',
      component: () => import('./views/CourseDetail.vue')
    },
    //축제 상세 페이지
    {
      path: '/festivalDetail/:festivalStoreNo',
      name: 'festivalDetail',
      component: () => import('./views/FestivalDetail.vue')
    },
    // 글쓰기 추천 & 축제 페이지
    {
      path: '/write',
      name: 'write',
      component: () => import('./views/Write.vue')
    },
    //글쓰기 코스 페이지
    {
      path: '/writeCourse',
      name: 'writeCourse',
      component: () => import('./views/WriteCourse.vue')
    },
    //카카오 로그인 필요
    {
      path: '/kakaoredirect',
      name: 'kakaoredirect',
      component: () => import('./views/KakaoRedirect.vue')
    },
    //내글 상세 페이지
    {
      path: '/mypostsmanage',
      name: 'mypostsmanage',
      component: () => import('./views/MyPostsManage.vue')
    },
    // 로그인 페이지
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    // 내 주변 위치 상세 페이지
    {
      path: '/mymap',
      name: 'mymap',
      component: () => import('./views/Mymap.vue')
    },
    // 여행지 상세 페이지
    {
      path: '/trip/detail/:contentId',
      name: 'tripDetailPage',
      component: () => import('./views/TripDetailPage.vue')
    },
    // 코스 상세 페이지
    {
      path: '/course/detail/:contentId',
      name: 'courseDetailPage',
      component: () => import('./views/CourseDetailPage.vue')
    },
    // 축제 상세 페이지
    {
      path: '/festivalDetail/detail/:contentId',
      name: 'festivalDetailPage',
      component: () => import('./views/FestivalDetailPage.vue')
    },
  ]
})
