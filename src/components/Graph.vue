<template>
<div>
  <canvas id="graph" ref="graph"></canvas>
</div>
</template>
<script>
import Chart from 'chart.js'
export default {
  props: {
    gData: Array,
    type: String
  },
  data () {
    return {
      myChart: ''
    }
  },
  watch: {
    'gData': function () {
      this.createGraph()
    }
  },
  methods: {
    createGraph () {
      var ctx = this.$refs.graph
      var datasets = []
      if (this.type === 'area') {
        datasets = [{
          label: 'Number',
          data: this.gData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1,
          fill: true
        }]
      } else {
        datasets = [{
          label: 'Number',
          data: this.gData,
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          fill: false
        }]
      }
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(this.gData),
          datasets
        },
        options: {
          events: ['click'],
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    }
  }
}
</script>
