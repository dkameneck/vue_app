<template>
<div>
<!-- prije izvlacenja u komponentu
  <div style="margin-left: 100px">
  <table>
    <thead>
      <tr>
        <th>Jedinica</th>
        <th>Valuta</th>
        <th>Kupovni za devize</th>
        <th>Srednji za devize</th>
        <th>Prodajni za devize</th>
        <th>Promjena</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in lista" v-bind:key="index">
        <td><input v-model.number="item.jed"/></td>
        <td @click="test(index)">{{ index }}</td>
        <td @click="test(index)">{{ item.jed * item.kupDev }}</td>
        <td @click="test(index)">{{ item.jed * item.srDev }}</td>
        <td @click="test(index)">{{ item.jed * item.prDev }}</td>
        <td @click="test(index)">{{ item.promjena || 0 }} %</td>
      </tr>
    </tbody>
  </table>
  </div> -->
  <template v-if="finished">
    <Table :lista="lista" @editRow="test"/>
  </template>
</div>
</template>
<script>
import moment from 'moment'
import Table from './Table'
export default {
  components: { Table },
  data () {
    return {
      lista: {},
      finished: false
    }
  },
  methods: {
    test (id) {
      this.$router.push('/currency/' + id)
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
      // this.$forceUpdate() forsira re render na trenutnoj stranici
      this.finished = true // osigurava renderiranje tablice nakon postavljanja podataka
    })
  }
}
</script>
