<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view/>
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

<style>
@font-face {
    font-family: HypatiaSansPro;
    src: url(./assets/HypatiaSansPro-Regular.otf);
}
@font-face {
    font-family: HypatiaSansPro;
    src: url(./assets/HypatiaSansPro-Semibold.otf);
    font-weight: bold;
}
@font-face {
    font-family: HypatiaSansPro;
    src: url(./assets/HypatiaSansPro-Bold.otf);
    font-weight: bolder;
}

#app {
  font-family: HypatiaSansPro, sans-serif;

  max-width: 80vw;
  margin: 0 auto;
}
</style>
