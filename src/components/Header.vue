<template>
  <nav class="header">
    <div class="navigation">
      <div class="navigation-left">
        <main-menu class="main-navigation-menu"/>
        <h1 class="brand">NEWW Women Writers</h1>
      </div>
      <div class="navigation-right">
        <el-input
          class="predefined-question-search-input"
          placeholder="Search for a predefined question ..."
          v-model="predefinedQuestionSearchInput">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
  </nav>
</template>

<script>
import MainMenu from './MainMenu'
export default {
  data() {
    return {
      predefinedQuestionSearchInput: ''
    }
  },
  components: {
    MainMenu
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
    background: linear-gradient(to bottom, #d931f7 0%,#f785ed 100%);
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      0 calc(100% - 30vw)
    );
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
          margin-left: 10px;
          color: white;
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
