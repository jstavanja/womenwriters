<script>
import {HorizontalBar} from 'vue-chartjs'
export default {
  extends: HorizontalBar,
  props: ['data'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.data.map((el) => el.name),
      datasets: [
        {
          label: 'Number of translations',
          backgroundColor: '#009688',
          data: this.data.map((el) => el.translatedTimes)
        }
      ]
    })
  }
}
</script>

<style>

</style>
