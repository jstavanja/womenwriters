<template>
  <el-popover
    placement="right-start"
    title="Title"
    width="400"
    trigger="click"
    content="this is content, this is content, this is content">
    <el-button class="btn-menu-open" type="primary" icon="el-icon-plus" circle slot="reference"></el-button>
    <ul class="navigation-links">
      <li>
        Questions list
      </li>
      <li>
        About the authors
      </li>
      <li>
        Original data website
      </li>
    </ul>
  </el-popover>
</template>

<script>
export default {

}
</script>

<style lang="less">

</style>
