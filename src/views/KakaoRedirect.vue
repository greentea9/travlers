<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
 
  methods:{
    // 토큰 변환 함수
    getParameterByName(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
  },
  created(){
    var code = this.getParameterByName("code");
    // 변수에 토큰 저장 
    var data = "grant_type=authorization_code" +
                "&client_id=" + "f3a8d3b8920b89ea50f6648730fb0ef6" +
                "&redirect_uri=" + process.env.VUE_APP_KAKAO_REDIRECT_URI +
                "&code=" + code;
    // 카카오로 토큰 보내는 것
    this.$http.post("https://kauth.kakao.com/oauth/token", data).then(result=>{
      // 토큰 저장 
      this.$store.commit("accessToken", result.data.access_token);
      // 토큰을 헤더로 저장
      var config = {
          headers: {'Authorization': result.data.access_token}
      };
      // 프로핑 받기
      this.$http.get(`${process.env.VUE_APP_KAKAO_KAKAOAPI_URI}/profile`, config).then(result=>{
        // 받은 프로필 저장
        this.$store.commit("profile", result.data);
        // 로그인 정보 저장
        this.$http.post(`${process.env.VUE_APP_KAKAO_KAKAOAPI_URI}/login`, this.$store.state.profile).then(()=>{
        // 로그인 성공 true
        this.$store.commit("login");
        // 로그인 성공시 초기화면 이동
        this.$router.push("/");
        })
      });
    });
  }
}
</script>