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
    // TODO: srediti grafove (line i area)
    createGraph () {
      var ctx = this.$refs.graph
      this.myChart = new Chart(ctx, {
        type: this.type,
        data: {
          labels: Object.keys(this.gData), // vrijeme / broj dohvata
          datasets: [{
            label: 'Number',
            data: this.gData, // vrijednost dohvata
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
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
