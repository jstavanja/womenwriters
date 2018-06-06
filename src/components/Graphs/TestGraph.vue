<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['France', 'England', 'Sweden'],
      datasets: [
        {
          label: 'Number of authors per country',
          backgroundColor: '#009688',
          data: [2, 2, 2]
        }
      ]
    })
  }
}
</script>
