<template>
<div>
  ss
  {{$route.params.id}}
  <div style="margin: 0px auto">
    <graph :g-data.sync="data" type="line" />
  </div>
</div>
</template>
<script>
import moment from 'moment'
import Graph from './Graph.vue'

export default {
  components: {
    Graph
  },
  data () {
    return {
      data: {
        labels: [], // datumi
        datasets: {
          label: 'Value',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1,
          fill: true
        }
      }
    }
  },
  mounted () {
    var end = moment().format('YYYY-MM-DD')
    var start = moment().add(-30, 'days').format('YYYY-MM-DD')
    var url = 'https://cors-anywhere.herokuapp.com/http://api.hnb.hr/tecajn/v1?valuta=' + this.$route.params.id + '&datum-od=' + start + '&datum-do=' + end
    this.$http.get(url).then(response => {
      response.data.forEach(x => {
        console.log(x)
        this.data.labels.push(x['Datum primjene'])
        this.data.datasets.data.push(x['Kupovni za devize'])
      })
    })
  }
}
</script>
