<template>
  <div class="question-how-many-translations">
    <el-row class="animated fadeIn">
		  <h2 class="visualization-title">How many translations are there into Norwegian, and from which countries?</h2>
    </el-row>
    <el-row class="graph-container animated fadeIn fd1">
		  <div id="map"></div>
    </el-row>
    <el-row v-if="sortedCountries.length > 0" class="countries-list animated fadeIn fd1">
      <h3 class="all-countries-title">
        ... as a list
      </h3>
      <ul class="countries">
        <li class="country" v-for="(country, idx) in sortedCountries" :key="idx">
          <div class="country-name">{{ country[0] }}</div><div class="text-wrapper">was exported <div class="country-score"><div class="number">{{ country[1] }}</div></div>  time<p v-if="country[1] > 1">s</p>.</div>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      sortedCountries: []
    }
  },
	mounted() {
		let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
    document.head.appendChild(recaptchaScript)
	},
  created () {
    axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select',
      'q=*:*&fq=relationType_s%3A(%22isTranslationOf%22)&fq=authorGender_ss%3A(%22FEMALE%22)&fq=language_ss%3A(%22Norwegian%22)&fq=type_s%3Adocument_reception&facet.field=relationType_s&facet.field=authorName_ss&facet.field=authorGender_ss&facet.field=date_i&facet.field=publishLocation_ss&facet.field=language_ss&facet.field=genre_ss&facet.field=source_ss&facet.field=documentType_s&rows=1000&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      .then((res) => res.data.response.docs)
      .then((works) => {

        let countriesUnique = {}
        works.forEach((work) => {
          if (work.document_locationSort_s in countriesUnique) {
            countriesUnique[work.document_locationSort_s]++
          } else {
            countriesUnique[work.document_locationSort_s] = 1
          }
        })

        const dataHeader = ['Country', 'Count']
        this.countriesList = {}

        for (const [key, value] of Object.entries(countriesUnique)) {
          if (key === 'United Kingdom') {
            this.countriesList['England'] += value
          } else {
            this.countriesList[key] = value
          }
        }

        this.countriesArray = [dataHeader, ...Object.entries(this.countriesList)]
        this.sortedCountries = Object.entries(this.countriesList).filter((el) => el[0] !== "undefined").sort((a, b) => b[1] - a[1])
        
        google.charts.load('current', {
          'packages':['geochart'],
          'mapsApiKey': 'AIzaSyAWMQ35Ki6bgjtOQ8DXxKOthQATcfnVVd0'
        });
        google.charts.setOnLoadCallback(this.drawRegionsMap);
        
      })
  },
  methods: {
    drawRegionsMap () {
      let data = google.visualization.arrayToDataTable(this.countriesArray);

      let options = {
        colorAxis: {colors: ['#8DE2DA', '#00635A']},
        defaultColor: '#EFFCF4'
      }

      let chart = new google.visualization.GeoChart(document.getElementById('map'));
      chart.draw(data, options);
    }
  }
}
</script>

<style lang="less">
	#map {
		width: 75%;
		margin: 0 auto;
  }
  
  .countries-list {
    .all-countries-title {
      margin: 30px auto 20px;
      display: table;
    }
    .countries {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .country {
        box-sizing: border-box;
        width: 80%;
        border: 1px solid #aaa;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        background-color: #f7f7f7;
        margin-top: 10px;

        &:hover {
          background-color: white;
          border-color: #ccc;
          box-shadow: 0 2px 4px rgba(3,27,77,0.05);
        }
        .country-name {
          font-weight: bold;
          font-size: 20px;
        }
        .text-wrapper {
          display: flex;
          align-items: center;
        }
        .country-score {
          border: 1px solid #bbb;
          min-width: 19px;
          min-height: 19px;
          margin-left: 6px;
          margin-right: 6px;
          border-radius: 50%;
          display: inline;
          line-height: 20px;
          text-align: center;
          padding: 4px;
          font-weight: bold;
          color: #00bfa5;
        }
      }
    }
  }
</style>
