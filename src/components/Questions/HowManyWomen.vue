<template>
  <div class="question-how-many-women">
    <el-row class="animated fadeIn">
      <h2 class="visualization-title">How many foreign writers were read in Norway before 1930?</h2>
    </el-row>
    <el-row class="graph-container animated fadeIn fd1">
      <test-graph :height="150"/>
    </el-row>
  </div>
</template>

<script>
import TestGraph from '../Graphs/TestGraph'
import axios from 'axios'
export default {
  components: {
    TestGraph
  },
  created () {
    axios.post('https://repository.huygens.knaw.nl/solr/wwpersonreceptions/select',
      'q=*:*&fq=authorGender_ss%3A(%22FEMALE%22)&fq=date_i%3A%5B3%20TO%201929%5D&fq=publishLocation_ss%3A(%22Norway%22)&fq=type_s%3Aperson_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=25&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      .then((res) => res.data.response.docs)
      .then((writers) => {
        let foreignWriters = writers.filter((writer) => {
          if (writer.person_birthPlace_ss) {
            return writer.person_birthPlace_ss[0] !== 'Norway'
          }
        })

        let writersUnique = {}
        foreignWriters.forEach((writer) => {
          writersUnique[writer.authorName_ss] = writer
        })

        console.log(writersUnique)
      })
  }
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

</script>

<style lang="less">

</style>
