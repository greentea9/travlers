import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 추천 후기 상세 페이지로 넘길 번호
    recommendStoreNo:"",
    // 코스 후기 상세 페이지로 넘길 번호
    courseStoreNo:"",
    // 축제 후기 상세 페이지로 넘길 번호
    festivalStoreNo:"",
    //로그인 상태
    isLogin: false,
    //카카오 토큰
    kakaoAccessToken:"",
    //프로필
    profile:{},
    //맵 좌표
    logLatLng:{},
    makrLatLag:{},
    // 맵 보여주기 위한 것
    map:true,
    //메인,상세검색
    keywords:[],
    //상세 검색 테이블 탭
    toggle_one:0,
    // 지역 검색
    areas:[{data:'서울전체',done:false ,title:'서울'}, 
    {data:'강남구',done:false ,title:'서울'},
    {data: '강동구',done:false ,title:'서울'} , 
    {data:'강북구',done:false ,title:'서울'},
    {data:'강서구',done:false ,title:'서울'},
    {data:'관악구',done:false ,title:'서울'},
    {data:'광진구',done:false ,title:'서울'},
    {data:'구로구',done:false ,title:'서울'},
    {data:'금천구',done:false ,title:'서울'},
    {data:'노원구',done:false ,title:'서울'},
    {data:'도봉구',done:false,title:'서울'},
    {data:'동대문구',done:false,title:'서울'},
    {data:'동작구',done:false,title:'서울'},
    {data:'마포구',done:false,title:'서울'},
    {data:'서대문구',done:false,title:'서울'},
    {data:'서초구',done:false,title:'서울'},
    {data:'성동구',done:false,title:'서울'},
    {data:'성북구',done:false,title:'서울'},
    {data:'송파구',done:false,title:'서울'},
    {data:'양천구',done:false,title:'서울'},
    {data:'영등포구',done:false,title:'서울'},
    {data:'용산구',done:false,title:'서울'},
    {data:'은평구',done:false,title:'서울'},
    {data:'종로구',done:false,title:'서울'},
    {data:'중구',done:false,title:'서울'},
      {data:'중랑구',done:false,title:'서울'}
    ],
    //지역 상세
    regions:[
      {title:'서울', goo:['서울전체', '강남구', '강동구' , '강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']}, 
      {title:'경기', goo:['경기전체','가평군','덕양구 고양시','일산동구 고양시', '일산서구','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','성남시분당구','성남시수정구','성남시중원구','수원시 권선구','수원시 영통구','수원시 장안구','수원시 팔달구','시흥시','안산시 단원구','안산시 상록구','안성시','안양시 동안구','안양시 만안구','양주시','양평군','여주시','연천군','오산시','용인시 기흥구','용인시 수지구','용인시 처인구','의왕시','의정부시','이천시','파주시','평택시','포천시','하남시','화성시']}, 
      {title:'인천', goo:['인천전체','강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구']}, 
      {title:'강원', goo:['강원전체','강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','정선군','철원군','춘천시','태백시','평창군','홍천군','화천군','횡성군']},
      {title:'대전', goo:['대전전체','대덕구','동구','서구','유성구','중구']},
      {title:'세종', goo:['세종전체','세종시']},
      {title:'충북', goo:['충북전체','괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','증평군','진천군','청주시 상당구','청주시 서원구','청주시 청원구','청주시 흥덕구','충주시']},
      {title:'충남', goo:['충남전체','계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','예산군','천안시 동남구','천안시 서북구','청양군','태안군','홍성군']},     
      {title:'부산', goo:['부산전체','강서구','금정구','기장군','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구']},
      {title:'울산', goo:['울산전체','남구','동구','북구','울주군','중구']},
      {title:'경남', goo:['경남전체','거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시','창녕군','창원시 마산합포구','창원시 마산회원구','창원시 성산구','창원시 의창구','창원시 진해구','통영시','하동군','함안군','함양군','합천군']},
      {title:'경북', goo:['경북전체','경산시','경주시','고령군','구미시','군위군','김천시','문경시','봉화군','상주시','성주군','안동시','영덕군','영양군','영주시','영천시','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군','포항시 남구','포항시 북구']},
      {title:'대구', goo:['대구전체','남구','달서구','달성군','동구','북구','서구','수성구','중구']},
      {title:'광주', goo:['광주전체','광산구','남구','동구','북구','서구']},
      {title:'전남', goo:['전남전체','강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군','여수시','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군']},
      {title:'전북', goo:['전북전체','고창군','군산시','김제시','남원시','무주군','부안군','순창군','완주군','익산시','임실군','장수군','전주시 덕진구','전주시 완산구','정읍시','진안군']},
      {title:'제주', goo:['제주전체','서귀포시','제주시']},
      {title:'전국', goo:['전국전체']},    
    ],
    // 테마 상세
    themes:[{data:'#가족과함께',done:false},{data:'#연인과함께',done:false},
    {data:'#친구와함께',done:false},{data:'#반려동물과',done:false},{data:'#아이동반',done:false},
    {data:'#힐링캠프',done:false},{data:'#산으로',done:false},{data:'#바다로',done:false},
    {data:'#기차여행',done:false},{data:'#레져여행',done:false},{data:'#맛집여행',done:false},{data:'#1박2일',done:false}
    ],
  },
  mutations: {
     //메인페이지, 상세검색페이지 이동 함수
    navToGoo(state, payload) {   
      state.areas=[];   
      state.regions[payload].goo.forEach((value) =>{
        state.areas.push({data:value, done:false, title:state.regions[payload].title});
      });
      for(var i=0; i<state.areas.length; i++){
        for (var j=0; j<state.keywords.length; j++){
          if(state.areas[i].data == state.keywords[j].data && state.areas[i].title == state.keywords[j].title){
            state.areas[i].done= true;
          }else if(state.areas[i].data == state.keywords[j].data && state.keywords[j].title ==""){
            state.areas[i].done= true;
          }
        }
      }
    },
    //상세 검색 이동시 지역 값 받는 함수
    toggleOne(state, payload){
      state.toggle_one = payload;
    },
    // 상세 검색에서 구 선택시 넘기는 함수
    btnKey(state, payload){
      if(state.keywords.length == 0){
        if(payload == 0){
          state.keywords.push(
            {data:state.areas[payload].data, done:false, title:""});
          state.areas[payload].done = !state.areas[payload].done;
          let set = new Set(state.keywords);
          state.keywords= [...set];
        }else{
          state.keywords.push(
            state.areas[payload]);
          state.areas[payload].done = !state.areas[payload].done;
          let set = new Set(state.keywords);
          state.keywords= [...set];
        }
      }else{
        for(var i= 0; i<state.keywords.length; i++){
          if(state.areas[payload].data == state.keywords[i].data && state.areas[payload].title == state.keywords[i].title){
            state.keywords.splice(i, 1);
            i--;   
            state.areas[payload].done = !state.areas[payload].done;
            break;          
          }else if(state.areas[payload].data == state.keywords[i].data && state.keywords[i].title == ""){
            state.keywords.splice(i, 1);
            i--;   
            state.areas[payload].done = !state.areas[payload].done;
            break;     
          }else if(state.areas[payload].done == false){
            if(payload == 0){
              state.keywords.push(
                {data:state.areas[payload].data, done:false, title:""});
              state.areas[payload].done = !state.areas[payload].done;
              let set = new Set(state.keywords);
              state.keywords= [...set];
            }else{
              state.keywords.push(
                state.areas[payload]);
              state.areas[payload].done = !state.areas[payload].done;
              let set = new Set(state.keywords);
              state.keywords= [...set];
            }
            break;
          }
        }
      }  
    },
    // 상세 검색에서 테마 선택시 넘기는 함수
    btnKey2(state, payload){
      if(state.keywords.length == 0){
      state.keywords.push(
        {data:state.themes[payload].data, done:false, title:""});

        state.themes[payload].done = !state.themes[payload].done;
        
      let set = new Set(state.keywords);
      state.keywords= [...set];
      }else{
        for(var i= 0; i<state.keywords.length; i++){
          if(state.themes[payload].data == state.keywords[i].data){
    
            state.keywords.splice(i, 1);
            i--;   
            state.themes[payload].done = !state.themes[payload].done;
          
            break;          
          }else if(state.themes[payload].done == false){
    
            state.keywords.push(
              {data:state.themes[payload].data, done:false, title:""});
      
              state.themes[payload].done = !state.themes[payload].done;
            
            let set = new Set(state.keywords);
            state.keywords= [...set];
            break;
          }
        }
      }
    },
    // 추천 후기 상세로 이동시 필요한 함수
    navToRe(state, payload){
      state.recommendStoreNo = payload;
      //console.log(state.recommendStoreNo)
    },
    // 코스 후기 상세로 이동시 필요한 함수
    navToCo(state, payload){
      state.courseStoreNo = payload;
      //console.log(state.courseStoreNo)
    },
    // 축제 후기 상세로 이동시 필요한 함수
    navToFe(state, payload){
      state.festivalStoreNo = payload;
      //console.log(state.courseStoreNo)
    },
    //로그인 상태 변환 함수
    login: function (state) {
      state.isLogin = true;
    },
    //로그아웃 상태 변환 함수
    logout: function (state) {
      state.isLogin = false;
      state.kakaoAccessToken = "";
      state.profile = {};
    },
    //카카오 토큰 저장 함수
    accessToken: function (state, payload) {
      state.kakaoAccessToken = payload;
      //console.log(state.kakaoAccessToken)
    },
    // 프로필 저장 함수
    profile: function(state, payload){
      state.profile.id = payload.id;
      state.profile.accountEmail = payload.kakao_account.email;
      state.profile.nickname = payload.properties.nickname;
      state.profile.thumbnail = payload.kakao_account.profile.thumbnail_image_url;
    },
    // 맵 좌표 저장 함수
    setLogLatLng: function (state, payload){ // 좌표값 설정
      state.logLatLng.lat = payload.lat;
      state.logLatLng.lng = payload.lng;
    },
    // 맵 마커 저장 함수
    onMarkerLoaded: function(state, payload){
      state.makrLatLag.lat = payload.lat;
      state.makrLatLag.lng = payload.lng;
    },
    // 맵 상태 함수
    onload: function(state){
      state.map = true;
    },
  },
  actions: {

  }
})
