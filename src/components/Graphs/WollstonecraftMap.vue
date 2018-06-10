<template>
  <div class="map-wollstonecraft">
    <el-row class="graph-container animated fadeIn fd1">
		  <div id="map"></div>
    </el-row>
  </div>
</template>

<script>
import anglophoneReceptions from '../../datasets/anglophone_receptions.json';

export default {
  mounted () {
		let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js')
    document.head.appendChild(recaptchaScript)
  },
  created () {
    const dataHeader = ['Country', 'Receptions']
    this.countriesArray = [dataHeader, ...Object.entries(anglophoneReceptions["Mary Wollstonecraft"]).map((entry) => [entry[1].country, entry[1].receptions])]
    google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': 'AIzaSyAWMQ35Ki6bgjtOQ8DXxKOthQATcfnVVd0'
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);
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

<style>

</style>
