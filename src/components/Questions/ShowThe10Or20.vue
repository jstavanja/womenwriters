<template>
  <div class="question-show-the-10-or-20">
    <el-row class="page-header animated fadeIn">
      <h2 class="visualization-title">Show the 10 or 20 most translated authors into Norwegian</h2>
      <el-switch
        v-model="is10"
        active-text="10 people"
        inactive-text="20 people"
        active-color="#4286f4"
        inactive-color="#00bfa5">
      </el-switch>
    </el-row>
    <div class="visualization" v-if="first10or20.length > 0">
      <el-row class="podium-winners">
        <el-col :span="8">
          <div class="grid-content second-place">
            <div class="podium-part animated slideInUp fd3">
              <img src="../../assets/silver-medal.svg" alt="silver medal image" class="winner-icon">
              <div class="information">
                <div class="person-name">
                  {{ first10or20[1].name }}
                </div>
                <div class="text-wrapper">
                  translated
                  <div class="person-score">
                    {{ first10or20[1].translatedTimes }}
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
                  {{ first10or20[0].name }}
                </div>
                <div class="text-wrapper">
                  translated
                  <div class="person-score">
                    {{ first10or20[0].translatedTimes }}
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
                  {{ first10or20[2].name }}
                </div>
                <div class="text-wrapper">
                  translated
                  <div class="person-score">
                    {{ first10or20[2].translatedTimes }}
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
          <li class="person" v-for="(person, idx) in people" :key="idx">
            <div class="person-name">{{ person.name }}</div><div class="text-wrapper">translated <div class="person-score"><div class="number">{{ person.translatedTimes }}</div></div> times.</div>
          </li>
        </ul>
      </el-row>
    </div>
    <div class="loading-spinner" v-else>
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      first10or20: [],
      is10: true
    }
  },
  computed: {
    people () {
      return this.is10 ? this.first10or20.slice(3,10) : this.first10or20.slice(3,20)
    }
  },
  created () {
    axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select', 'q=*:*&fq=publishLocation_ss%3A(%22Norway%22)&fq=type_s%3Adocument_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=2384&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      .then(response => response.data.response.docs)
      .then(data => {
        let allTranslated = data.filter(publication => {
          if (publication.document_language_ss) {
            if (publication.document_language_ss[0]) {
              return publication.document_language_ss[0] !== 'Norwegian'
            }
            return publication.document_language_ss !== 'Norwegian'
          }
          return false
        })
        let authors = allTranslated.map(obj => obj.document_authorName_ss ? obj.document_authorName_ss[0] : undefined).filter(el => el !== undefined)
        
        // builds {Branko: 4, Jozko: 2, Zofka: 3} 
        let s = authors.reduce(function(m,v){
          m[v] = (m[v]||0)+1
          return m
        }, {})

        // we make a structure like: [{"name":"Branko","translatedTimes":4}, ...] 
        let a = []
        for (let k in s) {
          a.push( { name:k, translatedTimes:s[k] } )
        }

        a.sort((a,b) => b.translatedTimes - a.translatedTimes)

        const first10or20 = a.slice(0, 20)
        this.first10or20 = first10or20
      })
  }
}
</script>

<style lang="less">
  html {
    color: #444;
  }
  
  .question-show-the-10-or-20 {
    width: 100%;
    position: relative;
    .page-header {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .loading-spinner {
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
