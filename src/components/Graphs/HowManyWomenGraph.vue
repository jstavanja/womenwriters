<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: ['data'],
  mounted () {
    let dataArr = Object.entries(this.data)
    const labels = dataArr.map((writer) => writer[0])
    const data = dataArr.map((writer) => writer[1])
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Number of authors per location',
          backgroundColor: '#009688',
          data: data
        }
      ]
    })
  }
}
</script>
