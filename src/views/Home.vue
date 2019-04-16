<template>
  <div class="home">
    <!-- 首页header -->
    <div class="home_header">
      <div class="home_logobar">
        <img src="../assets/logoicon.png" alt height="70px" width="70px">
        <img src="../assets/logotext.png" alt class="logotext">
      </div>
    </div>
    <!-- 首页swiper -->
    <div class="home_swiper">
      <swiper :options="swiperOption">
        <!-- 首页swiper_slide for participant -->
        <swiper-slide>
          <div class="home_swiper_slide">
            <div class="slide_image"><img src="..\assets\participant\Tel-Aviv-Beach.jpg" alt="" width="1000px" height="550px"></div>
            <div class="slide_filter"></div>
            <div class="slide_content">
              <div class="slide_content_top">
                <img src="../assets/logoforp.png" alt height="350px" width="1000px">
              </div>
              <div class="slide_content_bottom">
                <div class="slide_content_bottom_button">
                  <router-link to="/participantLogin"><el-button plain class="login_button">登录</el-button></router-link>
                  <router-link to="/participantRegister"><el-button plain>注册</el-button></router-link>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <!-- 首页swiper_slide for organizer -->
        <swiper-slide>
          <div class="home_swiper_slide">
            <div class="slide_image"><img src="..\assets\organizer\Live-Music.jpg" alt="" width="1000px" height="550px"></div>
            <div class="slide_filter"></div>
            <div class="slide_content">
              <div class="slide_content_top">
                <img src="../assets/logoforo.png" alt height="350px" width="1000px">
              </div>
              <div class="slide_content_bottom">
                <div class="slide_content_bottom_button">
                  <router-link to="/organizerLogin"><el-button plain class="login_button">登录</el-button></router-link>
                  <router-link to="/organizerRegister"><el-button plain>注册</el-button></router-link>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <!-- 首页swiper_slide for admin -->
        <swiper-slide>
          <div class="home_swiper_slide">
            <div class="slide_image"><img src="..\assets\admin\Berlin-Underground.jpg" alt="" width="1000px" height="550px"></div>
            <div class="slide_filter"></div>
            <div class="slide_content">
              <div class="slide_content_top">
                <img src="../assets/logofora.png" alt height="350px" width="1000px">
              </div>
              <div class="slide_content_bottom">
                <div class="slide_content_bottom_button">
                  <router-link to="/adminLogin"><el-button plain>登录</el-button></router-link>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { initToken } from '../utils/auth'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'home',
  data () {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true
      },
      swiperSlides: [1, 2, 3]
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    // 登录主页面创建时初始化cookie
    initToken()
  }
}
</script>

<style scoped>
.home_header {
  width: 100%;
  height: 80px;
  border-bottom: 2px solid lightskyblue;
}
.home_logobar {
  margin: 5px auto;
  padding: 5px 0;
  width: 750px;
  height: 70px;
}
.logotext {
  width: 420px;
  height: 50px;
  margin: 10px 130px;
}
.home_swiper {
  width: 1000px;
  height: 550px;
  margin: 25px auto;
  border-radius: 5px;
  border: 1px solid #007aff;
  box-shadow: 10px 10px 5px #888888;
}
.home_swiper_slide {
  width: 1000px;
  height: 550px;
  position: relative;
}
.slide_image {
  width: 1000px;
  height: 550px;
  z-index: -1;
  position: absolute;
}
.slide_filter {
  z-index: 1;
  width: 1000px;
  height: 550px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
}
.slide_content {
  width: 1000px;
  height: 550px;
  z-index: 2;
  position: absolute;
}
.slide_content_top {
  width: 1000px;
  height: 350px;
}
.slide_content_bottom {
  width: 1000px;
  height: 200px;
}
.slide_content_bottom_button {
  margin-top: 65px;
  margin-left: 650px;
}
.login_button {
  margin-right: 20px;
}
</style>
<style>
.swiper-pagination-bullet {
  background: #fff;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #007aff;
}
</style>
