<template>
  <div id="app">
    <el-container>
      <!-- <el-header> -->
        <Header />
      <!-- </el-header> -->
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

<style lang="scss">
$--color-primary: black;
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
}
</style>
