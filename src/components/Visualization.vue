<template>
  <section class="visualization">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
</script>

<style lang="less">
  .el-main {
    margin-top: -120px;
    z-index: 15;
  }
  .visualization {
    .graph-container {
      border-radius: 10px;
      border: 1px solid #1d1d1d;
    }
  }
</style>
