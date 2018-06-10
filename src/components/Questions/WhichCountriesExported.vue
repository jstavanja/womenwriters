<template>
  <div class="question-which-countries-exported">
    <el-row class="animated fadeIn">
		  <h2 class="visualization-title">Which countries exported most female authorships to Norway?</h2>
    </el-row>
    <el-row class="graph-container animated fadeIn fd1">
		  <div id="map"></div>
    </el-row>
    <el-row v-if="countriesLoaded" class="countries-list animated fadeIn fd1">
      <h3 class="all-countries-title">
        ... as a list
      </h3>
      <ul class="countries">
        <li class="country" v-for="(country, idx) in sortedCountries" :key="idx">
          <div class="country-name">{{ country[0] }}</div><div class="text-wrapper">was exported <div class="country-score"><div class="number">{{ country[1] }}</div></div>  time<p v-if="country[1] > 1">s</p>.</div>
        </li>
      </ul>
    </el-row>
    <loading-spinner :centered="true" v-else></loading-spinner>
  </div>
</template>

<script>
import LoadingSpinner from '../Utils/LoadingSpinner'
import axios from 'axios'
export default {
  components: {
    LoadingSpinner
  },
  data () {
    return {
      sortedCountries: [],
      countriesLoaded: false
    }
  },
	mounted() {
		let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
    document.head.appendChild(recaptchaScript)
	},
  created () {
    axios.post('https://repository.huygens.knaw.nl/solr/wwdocumentreceptions/select', 'q=*:*&fq=type_s%3Adocument_reception&fq=%7B!parent%20which%3Dtype_s%3Adocument_reception%7Dperson_gender_s%3A(%22FEMALE%22)&fq=publishLocation_ss%3A(%22Norway%22)&facet.field=document_authorName_ss&facet.field=publishLocation_ss&rows=27437&facet.limit=-1&facet.sort=count&&start=0&facet=on&wt=json')
      .then((res) => res.data.response.docs)
      .then((works) => {
        let countriesUnique = {}
        works.forEach((work) => {
          let location = work.document_locationSort_s
          let allLocations = [location]

          if (location) {
            if (location !== 'Norway') {
              // filter all weird one string combinations
              if (location.includes('ITA')) {
                allLocations = ['Italy']
              } 
              if (location === 'Scotland' || location === 'Great Britain') {
                allLocations = ['England']
              }
              if (location.includes('CZE')) {
                allLocations = ['Czech Republic']
              } 
              if (location === 'England Germany') {
                allLocations = ['England', 'Germany']
              }
              if (location === 'Denmark Norway') {
                allLocations = []
              }
              if (location === 'England United States') {
                allLocations = ['England', 'United States']
              } 
              if (location === 'Finland Sweden') {
                allLocations = ['Finland', 'Sweden']
              }
              if (location === 'United Kingdom United States') {
                allLocations = ['England', 'United States']
              }
              
              allLocations.forEach(location => {
                if (location in countriesUnique) {
                  countriesUnique[location]++
                } else {
                  countriesUnique[location] = 1
                }
              })
            }
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
        
      }).then(() => {
        this.countriesLoaded = true
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
  html {
    color: #444;
  }

  .graph-container {
    border: 0 !important;
  }

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
          color: #008c79;
        }
      }
    }
  }
</style>
