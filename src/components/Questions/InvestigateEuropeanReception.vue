<template>
  <div class="question-investigate-european-reception">
    <el-row class="visualization-header">
      <h2 class="visualization-title">Investigation & comparison of the European reception of Anglophone authors</h2>
      <div class="author-select-wrapper">
        <span class="choose-author-label">Choose author:</span>
        <el-select v-model="selectedAuthor" placeholder="Choose author" class="author-select">
          <el-option
            v-for="(author, idx) in authors"
            :key="idx"
            :label="author"
            :value="author">
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row class="map-container animated fadeIn fd1">
      <bronte-map v-if="selectedAuthor === 'Charlotte Brontë'" />
      <harriet-map v-if="selectedAuthor === 'Harriet Elisabeth Beecher Stowe'" />
      <may-alcott-map v-if="selectedAuthor === 'Louisa May Alcott'" />
      <wollstonecraft-map v-if="selectedAuthor === 'Mary Wollstonecraft'" />
    </el-row>
  </div>
</template>

<script>
import BronteMap from '../Graphs/BronteMap.vue'
import HarrietMap from '../Graphs/HarrietMap.vue'
import MayAlcottMap from '../Graphs/MayAlcottMap.vue'
import WollstonecraftMap from '../Graphs/WollstonecraftMap.vue'
import anglophoneReceptions from '../../datasets/anglophone_receptions.json';
export default {
  components: {
    BronteMap,
    HarrietMap,
    MayAlcottMap,
    WollstonecraftMap
  },
  data () {
    return {
      authors: Object.keys(anglophoneReceptions),
      selectedAuthor: null
    }
  },
  created () {
    this.selectedAuthor = this.authors[0]
  }
}
</script>

<style lang="less">
  .question-investigate-european-reception {
    .visualization-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .author-select-wrapper {
        .author-select {
          margin-left: 5px;
          width: 260px;
        }
      }
    }
  }
</style>
