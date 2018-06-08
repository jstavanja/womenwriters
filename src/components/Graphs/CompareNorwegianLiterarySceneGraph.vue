<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['data'],
  mounted () {
    const labels = this.data.map((genre) => genre.genre)
    let data = this.data.map((genre) => genre.popularity)
    let colors = []
    data.forEach(datapoint => {
      let r = Math.floor(Math.random() * 200)
      let g = Math.floor(Math.random() * 200)
      let b = Math.floor(Math.random() * 200)
      let randomColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'
      colors.push(randomColor)
    })

    // Overwriting base render method with actual data.
    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Popularity of genre (frequency)',
          backgroundColor: colors,
          data: data
        }
      ]
    })
  }
}
</script>
