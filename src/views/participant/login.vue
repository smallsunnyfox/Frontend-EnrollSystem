<template>
  <div class="login">
    <!-- 登录表格 -->
    <loginbox :title="title" :roleofuser="role"></loginbox>
    <!-- 背景视频 -->
    <div class="homepage-hero-module">
      <div class="video-container">
        <div :style="fixStyle" class="filter"></div>
        <video
          :style="fixStyle"
          autoplay
          loop
          muted
          playsinline
          class="fillWidth"
          v-on:canplay="canplay"
        >
          <source src="..\..\assets\participant\Tel-Aviv-Beach.mp4" type="video/mp4">浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="..\..\assets\participant\Tel-Aviv-Beach.jpg" alt="Night_Market">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import loginBox from '../../components/loginBox'
export default {
  name: 'login',
  data () {
    return {
      title: 'Enroll在线活动报名平台登录',
      role: 'participant',
      vedioCanPlay: false,
      fixStyle: ''
    }
  },
  methods: {
    // 检测浏览器是否支持播放背景视频
    canplay () {
      this.vedioCanPlay = true
    }
  },
  mounted: function () {
    // 随着窗口的改变控制视频的长宽
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial',
          left: '0px'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial',
          left: '0px'
        }
      }
    }
    window.onresize()
    // 数据渲染后自动聚焦到输入框
  },
  components: {
    loginbox: loginBox
  }
}
</script>

<style scoped>
.login {
  min-width: 650px;
}

.homepage-hero-module,
.video-container {
  min-width: 650px;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: -2;
  position: absolute;
}

.video-container .filter {
  z-index: -1;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
}

.video-container video.fillWidth {
  width: 100%;
}
</style>





