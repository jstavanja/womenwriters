<template>
  <nav class="header">
    <div class="navigation">
      <div class="navigation-left">
        <el-button class="btn-menu-open" type="primary" icon="el-icon-plus" circle></el-button>
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
export default {
  data() {
    return {
      predefinedQuestionSearchInput: ''
    }
  }
}
</script>

<style lang="less">
  nav.header {
    .navigation {
      display: flex;
      justify-content: space-between;
      .navigation-right, .navigation-left {
        display: flex;
        align-items: center;
      }
      .navigation-left {
        .brand {
          margin-left: 10px;
        }
      }
      .navigation-right {
        .predefined-question-search-input {
          min-width: 275px;
        }
      }
    }
  }
</style>
