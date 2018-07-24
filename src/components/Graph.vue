<template>
<div>
  <canvas id="graph" ref="graph"></canvas>
</div>
</template>
<script>
import Chart from 'chart.js'
export default {
  props: {
    gData: Object,
    type: String
  },
  data () {
    return {
      myChart: ''
    }
  },
  watch: {
    'gData.labels': function () {
      this.createGraph()
    }
  },
  methods: {
    createGraph () {
      var ctx = this.$refs.graph
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: this.gData,
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
  },
  mounted () {
    // console.log('Mounted Graph')
    this.createGraph()
  }
}
</script>
