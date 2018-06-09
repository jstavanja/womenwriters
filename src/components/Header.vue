<template>
  <nav class="header">
    <div class="navigation">
      <div class="navigation-left">
        <main-menu class="main-navigation-menu"/>
        <router-link to="/" class="brand" tag="h1">NEWWW Women Writers</router-link>
        <img src="../assets/girl1.svg" class="header-girl-image animated fadeInLeft">
        <img src="../assets/girl2.svg" class="header-girl-image animated fadeInLeft fd1">
        <img src="../assets/girl3.svg" class="header-girl-image animated fadeInLeft fd2">
        <img src="../assets/girl4.svg" class="header-girl-image animated fadeInLeft fd3">
      </div>
      <div class="navigation-right">
        <search />
      </div>
    </div>
  </nav>
</template>

<script>
import MainMenu from './MainMenu'
import Search from './Search'
export default {
  components: {
    MainMenu,
    Search
  }
}
</script>

<style lang="less">
  .el-header {
    padding: 0px;
  }
  nav.header {
    padding: 0 20px;
    height: 220px;
    background: linear-gradient(to bottom, #009688 0%,#00bfa5 100%);
    .navigation {
      display: flex;
      justify-content: space-between;
      .navigation-right, .navigation-left {
        display: flex;
        align-items: center;
      }
      .navigation-left {
        .brand {
          font-family: HypatiaSansPro;
          padding-top: 10px;
          font-size: 36px;
          margin-left: 20px;
          margin-right: 20px;
          color: white;
          cursor: pointer;
          transition: all .15s linear;

          &:hover {
            text-shadow: 2px 2px 4px rgba(255,255,255,0.55);
          }
        }
        .header-girl-image {
          width: 60px;
          height: 60px;
          margin: 0 5px;
        }
      }
      .navigation-right {
        .predefined-question-search-input {
          min-width: 275px;
          input {
            padding-top: 3px;
            font-family: HypatiaSansPro;
          }
        }
      }
    }
  }
</style>
