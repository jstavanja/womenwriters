<template>
  <section class="visualization">
    <el-row>
      <h2 class="visualization-title">How many foreign writers were read in Norway before 1930?</h2>
    </el-row>
    <el-row class="graph-container">
      <test-graph :height="200"/>
    </el-row>
  </section>
</template>

<script>
import TestGraph from './Graphs/TestGraph'
export default {
  components: {
    TestGraph
  }
}
</script>

<style lang="less">
  .el-main {
    margin-top: -120px;
    z-index: 15;
  }
  .visualization {
    z-index: 15;
    box-shadow: 0 4px 8px rgba(3,27,77,0.2);
    border-radius: 10px;
    padding: 15px 30px;
    background-color: white;
    .graph-container {
      border-radius: 10px;
      border: 1px solid #1d1d1d;
    }
  }
</style>
