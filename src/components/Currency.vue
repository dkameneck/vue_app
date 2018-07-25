<template>
<div>
  <template v-if="loaded">
    <graph :g-data.sync="gdata" type="line" />
  </template>
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
      gdata: {
        labels: [],
        datasets: [{
          label: 'Kupovni',
          data: [],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Srednji',
          data: [],
          borderColor: [
            'rgb(46, 162, 175)'
          ],
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Prodajni',
          data: [],
          borderColor: [
            'rgb(226, 126, 0)'
          ],
          borderWidth: 1,
          fill: false
        }]
      },
      loaded: false
    }
  },
  mounted () {
    var end = moment().format('YYYY-MM-DD')
    var start = moment().add(-30, 'days').format('YYYY-MM-DD')
    var url = 'https://cors-anywhere.herokuapp.com/http://api.hnb.hr/tecajn/v1?valuta=' + this.$route.params.id + '&datum-od=' + start + '&datum-do=' + end
    this.$http.get(url).then(response => {
      response.data.forEach(x => {
        this.gdata.labels.push(x['Datum primjene'])
        this.gdata.datasets[0].data.push(Number(x['Kupovni za devize'].replace(',', '.')))
        this.gdata.datasets[1].data.push(Number(x['Srednji za devize'].replace(',', '.')))
        this.gdata.datasets[2].data.push(Number(x['Prodajni za devize'].replace(',', '.')))
      })
      this.loaded = true
    })
  }
}
</script>
