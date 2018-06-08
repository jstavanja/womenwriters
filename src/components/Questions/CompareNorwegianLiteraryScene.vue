<template>
  <div class="question-compare-norwegian-literary-scene">
    <el-row class="visualization-header animated fadeIn">
      <h2 class="visualization-title">
        Compare the Norwegian literary scene of selected decades: e.g. 1850s, 1890s, 1910s
      </h2>
    </el-row>
    <el-row class="visualization-mode-toggle">
      <el-switch
        v-model="graphMode"
        active-text="show graph mode"
        inactive-text="show text mode"
        active-color="#4286f4"
        inactive-color="#00bfa5">
      </el-switch>
    </el-row>
    <el-row class="visualization" v-if="dataFetched">
      <el-row class="decades-comparison" :gutter="20">
        <el-col :span="8" class="animated fadeInLeft" v-for="(d, idx) in availableDecades" :key="d">
          <el-card>
            <img src="../../assets/literatura0.jpeg" class="animated fadeIn">
            <div class="year-number">{{d}}s popular genres</div>
            <compare-norwegian-literary-scene-graph :data="topGenres[d]" v-if="graphMode && dataFetched"/>
            <ul class="popular-genres" v-else>
              <li v-for="(genre, idx) in topGenres[d]" :key="idx" class="genre-wrapper">
                <span class="genre">{{ genre.genre }}</span>
                <span>-</span>
                <span class="popularity">{{ genre.popularity }}</span> {{ genre.popularity > 1 ? "documents" : "document" }}
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <loading-spinner center v-else></loading-spinner>
  </div>
</template>

<script>
import LoadingSpinner from '../Utils/LoadingSpinner'
import CompareNorwegianLiterarySceneGraph from '../Graphs/CompareNorwegianLiterarySceneGraph'
import axios from 'axios'
export default {
  components: {
    LoadingSpinner,
    CompareNorwegianLiterarySceneGraph
  },
  data () {
    return {
      topGenres: {
        1850: {},
        1890: {},
        1910: {}
      },
      availableDecades: [1850, 1890, 1910],
      graphMode: true,
      dataFetched: false
    }
  },
  created () {
    // get 1850 genres
      this.getGenres(1850)
      .then(() => this.getGenres(1890))
      .then(() => this.getGenres(1910))
      .then(() => this.dataFetched = true)
  },
  methods: {
    getGenres(decade) {
      const from = decade
      const to = decade + 9
      let topGenres = {
        1850: {},
        1890: {},
        1910: {}
      }
      // authors
      return axios.post('https://repository.huygens.knaw.nl/solr/wwpersonreceptions/select',
        `q=*:*&fq=date_i%3A%5B${from}%20TO%20${to}%5D&fq=publishLocation_ss%3A(%22Norway%22)&fq=type_s%3Aperson_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=25000&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json`)
        .then(res => res.data.response.docs)
        .then((authorWorksOfDecade) => {
          authorWorksOfDecade.forEach((work) => {
            if (work.genre_ss) {
              work.genre_ss.forEach((genre) => {
                if (topGenres[decade][genre]) {
                  topGenres[decade][genre]++
                } else {
                  topGenres[decade][genre] = 1
                }
              })
            }
          })
        })
        .then(() => {
          // publications
          return axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select',
            `q=*:*&fq=date_i%3A%5B${from}%20TO%20${to}%5D&fq=publishLocation_ss%3A(%22Norway%22)&fq=type_s%3Adocument_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=25000&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json`)
        })
        .then(res => res.data.response.docs)
        .then((publicationWorksOfDecade) => {
          publicationWorksOfDecade.forEach((work) => {
            if (work.genre_ss) {
              work.genre_ss.forEach((genre) => {
                if (topGenres[decade][genre]) {
                  topGenres[decade][genre]++
                } else {
                  topGenres[decade][genre] = 1
                }
              })
            }
          })
        }).then(() => {
          this.topGenres[decade] = Object.entries(topGenres[decade]).sort((a, b) => b[1] - a[1]).map((entry) => {
            return {
              genre: entry[0],
              popularity: entry[1]
            }
          })
          return true
        })
    }
  }
}
</script>

<style lang="less">
  .question-compare-norwegian-literary-scene {
    .visualization-mode-toggle {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }
    .decades-comparison {
      .el-card {
        border-radius: 5px;
        position: relative;
        img {
          border-radius: 5px;
          height: 100px;
          filter: blur(2px);
          width: 100%;
          object-fit: cover;
        }
        .year-number {
          font-size: 30px;
          font-weight: bold;
          color: white;
          position: absolute;
          top: 55px;
          left: 50%;
          width: 100%;
          text-align: center;
          transform: translateX(-50%);
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.74);
        }
        .popular-genres {
          list-style: none;
          padding: 0;
          font-size: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .genre-wrapper {
            display: flex;
            align-items: center;
            span {
              margin-right: 5px;
            }
            .genre {
              font-weight: bold;
            }
            .popularity {
              font-size: 30px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
