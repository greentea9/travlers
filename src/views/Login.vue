<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <p class="display-1 text--primary">
        계정 연동 로그인
      </p>
      <img style="margin:0 auto; cursor:pointer;" @click="login()" src="https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/kakao_account_login_btn_medium_narrow.png" />
    </v-card-text>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

  methods: {
    // 로그인 페이지 
      login(){
        var url = "https://kauth.kakao.com/oauth/authorize"
                                  +"?client_id=" + "f3a8d3b8920b89ea50f6648730fb0ef6"
                                  +"&redirect_uri=" + process.env.VUE_APP_KAKAO_REDIRECT_URI
                                  +"&response_type=code&scope=account_email,friends,talk_message";
        window.location.href = url;
      },
  }
}
</script>