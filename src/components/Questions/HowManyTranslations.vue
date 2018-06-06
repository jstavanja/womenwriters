<template>
  <div class="question-how-many-translations">
    <el-row class="animated fadeIn">
		<h2 class="visualization-title">How many translations are there into Norwegian, and from which countries?</h2>
    </el-row>
    <el-row class="graph-container animated fadeIn fd1">
		<div id="map"></div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
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
	  console.log(works)
        let countriesUnique = {}
        works.forEach((work) => {
			if(work.document_locationSort_s in countriesUnique)
				countriesUnique[work.document_locationSort_s]++;
			else
				countriesUnique[work.document_locationSort_s] = 1;
        })
		
		let countriesArray = []
		for (const [key, value] of Object.entries(countriesUnique)) {
			console.log(key, value);
		}
        console.log(countriesArray)
		
		google.charts.load('current', {
		  'packages':['geochart'],
		  'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
		});
		google.charts.setOnLoadCallback(drawRegionsMap);
      })
  }
  
}

function drawRegionsMap() {
  let data = google.visualization.arrayToDataTable([
    ['Country', 'Count'],
    ['England', 98],
    ['United States', 24],
    ['Germany', 12],
	['Ireland', 8],
    ['Canada', 7],
    ['France', 5],
    ['Sweden', 5],
    ['Switzerland', 5],
    ['Italy', 2],
    ['Austria', 1]
  ]);

  let options = {
	colorAxis: {colors: ['#8DE2DA', '#00635A']},
	defaultColor: '#EFFCF4'
  };

  let chart = new google.visualization.GeoChart(document.getElementById('map'));
  chart.draw(data, options);
}

</script>

<style lang="less">
	#map {
		width: 75%;
		margin: 0 auto;
	}
</style>
