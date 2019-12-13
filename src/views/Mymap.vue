<template>
  <div>
    <naver-maps
      :height="1300"
      :width="1400"
      :mapOptions="mapOptions"
      :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']">
      <div>
        <v-card class="column">
          <v-card-title>
            <!-- 왼쪽 구현할 구간 -->
          </v-card-title>
        </v-card>
      </div>
      <!-- 맵 마커 띄우는 곳 -->
      <div v-for="(marker, index) in markersArray" :key="index" >
        <naver-marker :lat="Number(marker.mapy)" :lng="Number(marker.mapx)" @load="onMarkerLoaded" @click="onMarkerClicked(index)" />       
      </div>
      <!-- 정보창 띄우는 곳 -->
      <naver-info-window v-for="(marker, index) in markerObjArr" :key="index+'info'" 
        class="info-window"  :isOpen="marker.info" :marker="marker">
        <div class="info-window-container">
          <h3>{{marker.title}}</h3>
          <h5>{{marker.addr1}}</h5>
          <h6>{{marker.tel}}</h6>
          <v-img width="150" height="130" :src="marker.firstimage2"></v-img>
        </div>
      </naver-info-window>
    </naver-maps>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        addr1: "",
        addrArray: null,
        tel: "",
        markersArray: null,
        markerObjArr: [],
        count: 1,
        map: null,
        mapInfo: null,
        isMap: false,
        title:"",
        mapOptions: {
          lat: 37.286445,
          lng: 127.028845,
          zoom: 10,
          zoomControl: true,
          zoomControlOptions: {position: 'TOP_RIGHT'},
          mapTypeControl: true,
        
        },
      }
    },
    methods: {
      //마커 로드 함수
      onMarkerLoaded(comp){
        this.markerObjArr.push(comp.marker);
      },
      // 마커 클릭 함수
      onMarkerClicked(index) {
        //console.log(this.markerObjArr[index]);

        this.markerObjArr.forEach(obj=>{
          this.$set(obj, "info", false);  
        });
        this.$set(this.markerObjArr[index], "info", true);
        
        this.isMap = true;
        this.addrArray.index = index
        var a = this.addrArray.index
        //console.log('ffff',this.addrArray[a].title);
        this.title = this.addrArray[a].title
        this.$set(this.markerObjArr[index], "title", this.addrArray[a].title);

        this.addrArray.index = index
        var b = this.addrArray.index
        //console.log('ffff',this.addrArray[b].addr1);
        this.addr1 = this.addrArray[b].addr1;
        this.$set(this.markerObjArr[index], "addr1", this.addrArray[b].addr1);

        this.addrArray.index = index
        var c = this.addrArray.index
        //console.log('ffff',this.addrArray[c].tel);             
        this.tel = this.addrArray[c].tel
        this.$set(this.markerObjArr[index], "tel", this.addrArray[c].tel);

        this.addrArray.index = index
        var d = this.addrArray.index
        //console.log('ffff',this.addrArray[d].firstimage2);             
        this.firstimage2 = this.addrArray[d].firstimage2
        this.$set(this.markerObjArr[index], "firstimage2", this.addrArray[d].firstimage2);
       
     
      },
    },
    mounted() {
      // 스크립트 주기적 실행
      setInterval(() => this.count++, 1000);
    },
    created() {
      this.markersArray = [];
      this.addrArray = [];

      var mapUrl = "https://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList"
                              +"?ServiceKey=" + "1lYvAyiayWcV058nevQZ02ev2fGgO6S3gTqhzJJqTe0QWW5VVAduonEmVtP2ko%2BypbimuZsS5psHf4yLcMgj%2BA%3D%3D"
                              +"&mapX=" + "127.028706" + "&mapY=" + "37.277443" + "&radius=" + "5000"
                              +"&MobileOS=" + "ETC" + "&MobileApp=" + "traveler" + "&pageNo=" + "1" 
                              +"&numOfRows=" + "147"
      this.$http.get(mapUrl).then((result)=>{
        this.addrArray = result.data.response.body.items.item;
        this.markersArray = result.data.response.body.items.item;
      })
    }
  }
</script>
