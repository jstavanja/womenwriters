<template>
  <div class="question-how-many-women">
    <el-row class="animated fadeIn">
      <h2 class="visualization-title">How many foreign writers were read in Norway before 1930?</h2>
    </el-row>
    <el-row v-if="writersUnique" class="visualization-total">
      The number of all the writers is: <span class="number">{{ writersUnique.length }}</span>
    </el-row>
    <el-row class="graph-container animated fadeIn fd1" v-if="countriesLoaded">
      <how-many-women-graph :data="byCountry" :height="150"/>
    </el-row>
    <el-row v-else>Loading data.</el-row>
  </div>
</template>

<script>
import HowManyWomenGraph from '../Graphs/HowManyWomenGraph'
import axios from 'axios'

export default {
  components: {
    HowManyWomenGraph
  },
  data () {
    return {
      countriesLoaded: false,
      writersUnique: [],
      byCountry: {}
    }
  },
  created () {
    // authors
    axios.post('https://repository.huygens.knaw.nl/solr/wwpersonreceptions/select',
      'q=*:*&fq=person_gender_s%3A(%22FEMALE%22)&fq=date_i%3A%5B3%20TO%201929%5D&fq=publishLocation_ss%3A(%22Norway%22)&fq=type_s%3Aperson_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=25&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      .then((res) => res.data.response.docs)
      .then((writers) => {
        let foreignWriters = writers.filter((writer) => {
          if (writer.person_birthPlace_ss) {
            if (writer.person_birthPlace_ss[0] !== 'Norway') {
              if (this.byCountry[writer.person_birthPlace_ss[0]]) {
                this.byCountry[writer.person_birthPlace_ss[0]]++
              } else {
                this.byCountry[writer.person_birthPlace_ss[0]] = 1
              }
              return true
            }
          }
        })
        let writersUnique = {}
        foreignWriters.forEach((writer) => {
          writersUnique[writer.displayName_s] = writer
        })
        this.writersUnique.push(...Object.entries(writersUnique))
      })
      .then(() => {
        // documents
        return axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select',
          'q=*:*&fq=document_authorGender_ss%3A(%22FEMALE%22)&fq=date_i%3A%5B1268%20TO%201930%5D&fq=publishLocation_ss%3A(%22Norway%22)&fq=type_s%3Adocument_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=25000&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      })
      .then((res) => res.data.response.docs)
      .then((writers) => {
        let foreignWriters = writers.filter((writer) => {
          if (writer.document_locationSort_s) {
            if (writer.document_locationSort_s !== 'Norway') {
              if (this.byCountry[writer.document_locationSort_s]) {
                this.byCountry[writer.document_locationSort_s]++
              } else {
                this.byCountry[writer.document_locationSort_s] = 1
              }
              return true
            }
          }
        })

        let writersUnique = {}
        foreignWriters.forEach((writer) => {
          writersUnique[writer.document_authorName_ss] = writer
        })

        this.writersUnique.push(...Object.entries(writersUnique))
      })  
      .then(() => {
        this.countriesLoaded = true
      })
      
  }
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

</script>

<style lang="less">
  .question-how-many-women {
    .visualization-total {
      background: darken(white, 10%);
      border-radius: 4px;
      padding: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .number {
        margin-left: 5px;
        font-size: 30px;
        color: darken(#00bfa5, 20%);
        font-weight: bold;
      }
    }
  }
</style>
