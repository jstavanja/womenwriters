<template>
  <div class="question-how-many-women">
    <el-row>
      <h2 class="visualization-title">How many foreign writers were read in Norway before 1930?</h2>
    </el-row>
    <el-row class="graph-container">
      <test-graph :height="150"/>
    </el-row>
  </div>
</template>

<script>
import TestGraph from '../Graphs/TestGraph'
export default {
  components: {
    TestGraph
  }
}
</script>

<style lang="less">

</style>
