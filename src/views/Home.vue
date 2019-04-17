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
    <!-- 首页content -->
    <div class="home_content">
      <div class="home_content_text">
        <img src="../assets/content/content_text_top.png" alt="报名需求多样化，组织流程简单化，后台审核精确化" width="910px" height="50px">
      </div>
      <div class="home_content_boxes">
        <div class="home_content_boxes1">
          <img src="../assets/participant/home.png" alt="Enroll在线活动报名平台">
        </div>
        <div class="home_content_boxes2">
          <img src="../assets/organizer/home.png" alt="Enroll在线活动组织平台">
        </div>
        <div class="home_content_boxes3">
          <img src="../assets/admin/home.png" alt="Enroll在线活动审核系统">
        </div>
      </div>
      <div class="home_content_bottom">
        <img src="../assets/content/content_text_bottom.png" style="margin:10px auto;" alt="报名需求多样化，组织流程简单化，后台审核精确化" width="550px" height="100px">
      </div>
    </div>

    <div class="home_bottom">
      <div class="home_bottom_content">
        <div class="home_bottom_github">
          Github地址：<a href="https://github.com/smallsunnyfox/Backend-EnrollSystem" target="_blank">Jfinal-后端</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/smallsunnyfox/Backend-EnrollSystem" target="_blank">Vue全家桶-前端</a><br><br>
          <a href="https://github.com/smallsunnyfox" target="_blank">Follow me in Github</a>
        </div>
        <div class="home_bottom_copyright">Copyright © 201577G0649 张世文</div>
      </div>
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
  box-shadow: 0 1px 2px rgba(0,0,0,.08);
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
  margin: 10px auto;
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
.home_content {
  width: 1000px;
  margin: 0 auto;
}
.home_content_text {
  width: 1000px;
  height: 50px;
}
.home_content_boxes {
  width: 1000px;
  height: 450px;
}
.home_content_boxes img {
  cursor: pointer;
  transition: all 0.5s;
}
.home_content_boxes img:hover {
  transform: scale(1.1);
}
.home_content_boxes1 {
  overflow: hidden;
  float: left;
  width: 320px;
  height: 400px;
  margin: 20px 17px 20px 0px;
  border: 1px solid #007aff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  transition-duration: 0.5s;
}
.home_content_boxes1:hover {
  margin-top: 5px;
  margin-bottom: 35px;
  box-shadow: 8px 8px 5px #888888;
  transition-duration: 0.5s;
}
.home_content_boxes2 {
  overflow: hidden;
  float: left;
  width: 320px;
  height: 400px;
  margin: 20px 17px 20px 0px;
  border: 1px solid #007aff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  transition-duration: 0.5s;
}
.home_content_boxes2:hover {
  margin-top: 5px;
  margin-bottom: 35px;
  box-shadow: 8px 8px 5px #888888;
  transition-duration: 0.5s;
}
.home_content_boxes3 {
  overflow: hidden;
  float: left;
  width: 320px;
  height: 400px;
  margin: 20px 0px;
  border: 1px solid #007aff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  transition-duration: 0.5s;
}
.home_content_boxes3:hover {
  margin-top: 5px;
  margin-bottom: 35px;
  box-shadow: 8px 8px 5px #888888;
  transition-duration: 0.5s;
}
.home_content_bottom {
  width:1000px;
  height:120px;
  margin: 10px auto;
  border: 1px solid #007aff;
  border-radius: 2px;
  transition-duration: 0.5s;
}
.home_content_bottom:hover {
  transition-duration: 0.5s;
  background: lightskyblue;
  box-shadow: 8px 8px 5px #888888;
}
.home_bottom {
  background: #26292e;
  margin-top: 40px;
  width: 100%;
  height: 150px;
  color: #fff;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}
.home_bottom_content {
  width: 1000px;
  height: 150px;
  margin: 0 auto 0 auto;
}
.home_bottom_github {
  width: 1000px;
  padding-top: 20px;
  height: 100px;
  text-align: center;
  color: rgba(255,255,255,.8);
  font-size: 18px;
}
.home_bottom_github a{
  color: rgba(255,255,255,.8);
  text-decoration: none;
}
.home_bottom_copyright {
  width: 1000px;
  height: 16px;
  text-align: center;
  color: rgba(255,255,255,.3);
  font-size: 12px;
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
