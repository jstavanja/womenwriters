<template>
  <div id="app">
    <el-container>
      <!-- <el-header> -->
        <Header />
      <!-- </el-header> -->
      <el-main>
        <div class="main-content-wrapper animated fadeIn">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

@font-face {
    font-family: HypatiaSansPro;
    src: url(./assets/HypatiaSansPro-Regular.otf);
}
@font-face {
    font-family: HypatiaSansPro;
    font-weight: bold;
    src: url(./assets/HypatiaSansPro-Semibold.otf);
}
body {
  margin: 0;
}
#app {
  width: 100%;
  font-family: HypatiaSansPro, sans-serif;
  .el-main {
    margin-top: -120px;
    z-index: 15;
  }
  .main-content-wrapper {
    z-index: 15;
    box-shadow: 0 4px 8px rgba(3,27,77,0.2);
    border-radius: 10px;
    padding: 15px 30px;
    background-color: white;
  }
}

// Animation helper classes

.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@animation-delays: 10;
@animation-delay-step: .1; // delay in seconds

.animation-delays-loop (@i) when (@i > 0) {
    .fd@{i} {
        @animation-delay: @i * @animation-delay-step;
        animation-delay: ~"@{animation-delay}s";
    }
    .animation-delays-loop(@i - 1);
}
.animation-delays-loop(@animation-delays);

</style>
