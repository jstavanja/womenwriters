<template>
  <div class="map-harriet">
    <el-row v-if="loadErr">
      Map cannot be loaded. Please click this button to refresh: <el-button @click="tryDraw">Refresh</el-button>
    </el-row>
    <el-row class="graph-container animated fadeIn fd1">
		  <div id="map"></div>
    </el-row>
  </div>
</template>

<script>
import anglophoneReceptions from '../../datasets/anglophone_receptions.json';

export default {
  data () {
    return {
      loadErr: false
    }
  },
  mounted () {
		let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
    document.head.appendChild(recaptchaScript)
  },
  created () {
    const dataHeader = ['Country', 'Receptions']
    this.countriesArray = [dataHeader, ...Object.entries(anglophoneReceptions["Harriet Elisabeth Beecher Stowe"]).map((entry) => [entry[1].country, entry[1].receptions])]
    this.tryDraw()
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
    },
    tryDraw () {
      if (window.google) {
        google.charts.load('current', {
          'packages':['geochart'],
          'mapsApiKey': 'AIzaSyAWMQ35Ki6bgjtOQ8DXxKOthQATcfnVVd0'
        })
        google.charts.setOnLoadCallback(this.drawRegionsMap)
        this.loadErr = false
      } else {
        this.loadErr = true
      }
    }
  }
}
</script>

<style>

</style>
