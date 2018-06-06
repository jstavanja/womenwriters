<template>
  <div class="question-were-read-abroad">
    <el-row class="page-header animated fadeIn">
      <h2 class="visualization-title">Were Norwegian women authors read abroad?</h2>
    </el-row>
    <div class="visualization">
      <h3 class="visualization-subtitle">... YES. Who were the top 20 most translated authors from Norwegian to any foreign language?</h3>
      <div class="visualization" v-if="mostRead.length > 0">
        <el-row class="podium-winners">
          <el-col :span="8">
            <div class="grid-content second-place">
              <div class="podium-part animated slideInUp fd3">
                <img src="../../assets/silver-medal.svg" alt="silver medal image" class="winner-icon">
                <div class="information">
                  <div class="person-name">
                    {{ mostRead[1].name }}
                  </div>
                  <div class="text-wrapper">
                    translated into other languages
                    <div class="person-score">
                      {{ mostRead[1].translatedTimes }}
                    </div>
                    times.
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content first-place">
              <div class="podium-part animated slideInUp fd1">
                <img src="../../assets/champion.svg" alt="winner image" class="winner-icon">
                <div class="information">
                  <div class="person-name">
                    {{ mostRead[0].name }}
                  </div>
                  <div class="text-wrapper">
                    translated into other languages
                    <div class="person-score">
                      {{ mostRead[0].translatedTimes }}
                    </div>
                    times.
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content third-place">
              <div class="podium-part animated slideInUp fd5">
                <img src="../../assets/bronze-medal.svg" alt="bronze medal image" class="winner-icon">
                <div class="information">
                  <div class="person-name">
                    {{ mostRead[2].name }}
                  </div>
                  <div class="text-wrapper">
                    translated into other languages
                    <div class="person-score">
                      {{ mostRead[2].translatedTimes }}
                    </div>
                    times.
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="podium">
          <el-col :span="8">
            <div class="grid-content second-place">
              <div class="podium-part animated slideInUp fd3">
                <div class="animated pulse infinite fd1" style="color: #008c79;">
                  2nd
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content first-place">
              <div class="podium-part animated slideInUp fd1">
                <div class="animated pulse infinite fd2" style="color: #008c79;">
                  1st
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content third-place">
              <div class="podium-part animated slideInUp fd5">
                <div class="animated pulse infinite fd3" style="color: #008c79;">
                  3rd
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="others-list animated fadeIn fd5">
          <h3 class="others-title">
            Honorable mentions
          </h3>
          <ul class="others">
            <li class="person" v-for="(person, idx) in mostRead.slice(3, 20)" :key="idx">
              <div class="person-name">{{ person.name }}</div><div class="text-wrapper">translated into other languages <div class="person-score"><div class="number">{{ person.translatedTimes }}</div></div> times.</div>
            </li>
          </ul>
        </el-row>
      </div>
      <div class="loading-spinner" v-else>
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      mostRead: []
    }
  },
  created () {
    axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select', 'q=*:*&fq=type_s%3Adocument_reception&fq=document_authorGender_ss%3A(%22FEMALE%22)&&facet.field=document_authorName_ss&facet.field=publishLocation_ss&rows=27437&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      .then(res => res.data.response.docs)
      .then(receptions => {
        return receptions.filter((r) => {
          return r.publishLocation_ss !== 'Norway' && r.document_locationSort_s === 'Norway'
        })
      })
      .then((translatedNorwegianWomen) => {
        return translatedNorwegianWomen.map((obj) => obj.document_authorName_ss[0])
      })
      .then((translatedNorwegianWomenNameArray) => {
        // builds {Branko: 4, Jozko: 2, Zofka: 3} 
        return translatedNorwegianWomenNameArray.reduce(function(m,v){
          m[v] = (m[v]||0)+1
          return m
        }, {})
      })
      .then((nameAndTimesTranslatedObj) => {
        // we make a structure like: [{"name":"Branko","translatedTimes":4}, ...]  so we can sort
        let a = []
        for (let k in nameAndTimesTranslatedObj) {
          a.push( { name:k, translatedTimes:nameAndTimesTranslatedObj[k] } )
        }
        a.sort((a,b) => b.translatedTimes - a.translatedTimes)
        this.mostRead = a.slice(0, 20)
      })
  }
}
</script>

<style lang="less">
  html {
    color: #444;
  }

  .question-were-read-abroad {
    width: 100%;
    position: relative;
    .loading-spinner, .page-header, .visualization-subtitle {
      display: flex;
      justify-content: center;
    }
    .podium-winners {
      max-width: 80%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      z-index: 1000;
      .grid-content {
        box-sizing: border-box;
        background: white;
        padding-left: 10px;
        padding-right: 10px;
        &.second-place {
          padding-top: 20%;
        }
        &.third-place {
          padding-top: 40%;
        }
        .podium-part {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .winner-icon {
            height: 80px;
            border-radius: 50%;
            border: 1px solid #00bfa5;
            margin-bottom: 20px;
          }
          .information {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            .text-wrapper {
              display: flex;
              align-items: center;
            }
            .person-name {
              font-size: 20px;
              font-weight: bold;
              color: darken(#00bfa5, 10%);
            }
            .person-score {
              border: 1px solid #bbb;
              min-width: 19px;
              min-height: 19px;
              margin-left: 6px;
              margin-right: 6px;
              border-radius: 50%;
              border: 1px solid darken(white, 30%);
              display: inline;
              line-height: 20px;
              text-align: center;
              padding: 4px;
              font-weight: bold;
              color: #008c79;
            }
          }
        }
      }
    }
    .podium {
      max-width: 80%;
      margin: 0 auto;
      padding-top: 200px;
      .grid-content {
        box-sizing: border-box;
        height: 250px;
        background: white;
        padding-left: 10px;
        padding-right: 10px;

        &.first-place {
          .podium-part {
            font-size: 30px;
          }
        }
        &.second-place {
          padding-top: 20%;
          .podium-part {
            font-size: 22px;
          }
        }
        &.third-place {
          padding-top: 40%;
          .podium-part {
            font-size: 16px;
          }
        }

        .podium-part {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: HypatiaSansPro, sans-serif;
          height: 100%;
          border: 4px solid #008c79;
          font-weight: bold;
        }
      }
    }
    .others-list {
      .others-title {
        margin: 30px auto 20px;
        display: table;
      }
      .others {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .person {
          box-sizing: border-box;
          width: 70%;
          border: 1px solid #bbb;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          background-color: #f7f7f7;
          margin-top: 9px;
          height: 42px;

          &:hover {
            background-color: white;
            border-color: #ccc;
            box-shadow: 0 2px 4px rgba(3,27,77,0.05);
          }
          .person-name {
            font-weight: bold;
            font-size: 20px;
          }
          .text-wrapper {
            display: flex;
            align-items: center;
          }
          .person-score {
            border: 1px solid #bbb;
            min-width: 19px;
            min-height: 19px;
            margin-left: 6px;
            margin-right: 6px;
            border-radius: 50%;
            border: 1px solid darken(white, 30%);
            display: inline;
            line-height: 20px;
            text-align: center;
            padding: 4px;
            font-weight: bold;
            color: #008c79;
          }
        }
      }
    }
  }
</style>
