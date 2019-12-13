<template>
  <v-container fluid="fluid"> 
    <h1 @click="aa()">TRIP 추천</h1>
    <carousel :perPageCustom="[[1, 1],[576, 2],[768, 3]]" :navigationEnabled="true">
      <slide v-for="(tripInfo,index) in tripInfos" :key="index" class="thumbnail-wrappper">
        <trip-card :trip="tripInfo" :index="index" @navigateTo="navigateTo" :recomDist="recomDist"></trip-card>
      </slide>
    </carousel>
    <h1>TRIP 후기</h1>
    <carousel :perPageCustom="[[1, 1],[576, 2],[768, 3]]" :navigationEnabled="true">
      <slide v-for="(tripInfo ,index) in tripInfos" :key="index" class="thumbnail-wrappper">
        <trip-card :trip="tripInfo" :index="index"></trip-card>
      </slide>
    </carousel>
  </v-container>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import TripCard from '../components/TripCard';
export default {
  components: {
    Carousel,
    Slide,
    TripCard
  },
  name: "trip-recom",
  props: {
    tripInfos: Array
  },
  data: () => ({
    //위치가반 URL주소
    tripInfoURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_URI}`,
    tripImageURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_IMAGE_URI}`,
    tripOverviewURL: `${process.env.VUE_APP_RECOMMENDATIN_TRIP_OVERVIEW_URI}`,
    tripInfos: null,
    tripInfo: null,
    myMapx: "", //내 위치(경도) longitude
    myMapy: "", //내 위치(위도) latitude
    recomDist:[]
  }),
  created() {
    let handle = this;
    function getLocation() {
      if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function (position) {
          handle.myMapx = position.coords.latitude
          handle.myMapy = position.coords.longitude
        }, 
        function (error) {
          // eslint-disable-next-line
          console.error(error);
        }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        });
      } else {
        alert('방문객님의 브라우저가 GPS를 지원하지 않으므로 이용불가능한 서비스가 존재합니다');
      }
    }
    getLocation();
    //여행지 일반 정보 받는 곳           
    this.$http.get(this.tripInfoURL).then((result) => {
      this.tripInfos = result.data
      function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 3959; // the earth's radius in miles
        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad();
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
      }
      Number.prototype.toRad = function () {
          return this * Math.PI / 180;
      }
      for (var i = 0; i < this.tripInfos.length; i++) {
        var coords_1 = { // 7 Edwards Road Woburn, MA 01801
            lat: this.myMapy,
            long: this.myMapx
        };
        var coords_2 = {
            // 75 State Street Boston, MA 02109
            lat: this.tripInfos[i].mapx,
            long: this.tripInfos[i].mapy
        }
        var dist = calculateDistance(
            parseFloat(coords_1.lat),
            parseFloat(coords_1.long),
            parseFloat(coords_2.lat),
            parseFloat(coords_2.long)
        );
        this.recomDist.push((Math.floor(dist * 10) / 10 * 1).toFixed(1))
      }
    });         
  },
}
</script>
<style scoped="scoped">
  .tar {
    margin: 10px;
  }
  .thumbnail-wrappper {
    width: 25%;
  }
</style>