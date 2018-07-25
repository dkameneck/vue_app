<template>
  <div>
    <br>
    <span v-if="loading">Vuex loading...</span><span v-else>Vuex loaded!</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      stat: false,
      loading: true,
      lista: {}
    }
  },
  methods: {
    btnC () {
      setTimeout(this.prtin, 100)
    },
    prtin () {
      this.stat = !this.stat
    }
  },
  mounted () {
    var datum = moment().format('YYYY-MM-DD')
    var datum2 = moment().add(-1, 'days').format('YYYY-MM-DD')
    var url = 'https://cors-anywhere.herokuapp.com/http://api.hnb.hr/tecajn/v1?datum-od=' + datum2 + '&datum-do=' + datum
    this.$http.get(url).then(response => {
      response.data.forEach(x => {
        var jedinica = Number(x.Jedinica)
        var srednji = Number(x['Srednji za devize'].replace(',', '.'))
        var kupovni = Number(x['Kupovni za devize'].replace(',', '.'))
        var prodajni = Number(x['Prodajni za devize'].replace(',', '.'))

        // normalizacija
        if (Number(x.Jedinica) !== 1) {
          srednji = srednji / jedinica
          kupovni = kupovni / jedinica
          prodajni = prodajni / jedinica
          jedinica = 1
        }

        if (this.lista[x.Valuta]) {
          var jucer = this.lista[x.Valuta].srDev
          if (srednji && jucer) {
            var promjena = ((srednji - jucer) / jucer) * 100
          } else {
            promjena = 0
          }

          this.lista[x.Valuta] = {
            jed: jedinica,
            kupDev: kupovni,
            srDev: srednji,
            prDev: prodajni,
            promjena: promjena
          }
        } else {
          this.lista[x.Valuta] = {
            jed: jedinica,
            kupDev: kupovni,
            srDev: srednji,
            prDev: prodajni
          }
        }
      })
      this.$store.dispatch('setCurrencies', this.lista)
      this.loading = false
    })
  }
}
</script>
