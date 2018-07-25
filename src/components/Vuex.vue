<template>
<div>
  <br>
  <input v-model="qry" @keyup="filter" /> Valuta
  <input type="checkbox" v-model="pos" @change="filter" />Positive change only
  <Table :lista="finalData" @editRow="del" ref="tabla"/>
  <button @click="prev" :disabled="pgNum === 0">Previous</button>
  <button @click="next" :disabled="pgNum >= countP - 1">Next</button>
</div>
</template>
<script>
import Table from './Table'

export default {
  components: { Table },
  data () {
    return {
      pom: {},
      qry: '',
      pomL: {},
      pos: false,
      pgNum: 0
    }
  },
  computed: {
    currencies () {
      return this.$store.getters.currencies
    },
    countP () {
      return Math.ceil(Object.keys(this.pomL).length / 3)
    },
    finalData () {
      var pomL = {}
      var start = this.pgNum * 3
      var end = start + 3
      var pomPag = Object.keys(this.pomL)
      if (end > pomPag.length) {
        end = pomPag.length
      }
      pomPag = pomPag.slice(start, end)
      Object.keys(this.currencies).forEach(x => {
        if (pomPag.includes(x)) {
          pomL[x] = this.currencies[x]
        }
      })
      return pomL
    }
  },
  methods: {
    del (val) {
      if (confirm('Brisanje valute: ' + val + ' iz Vuexa!!')) {
        this.pom = this.currencies
        delete this.pom[val]
        this.$store.dispatch('setCurrencies', this.pom)
        this.pomL = this.currencies
        this.pgNum = 0
        // this.$refs.tabla.refresh()
      }
    },
    filter () {
      var novi = {}
      Object.keys(this.currencies).filter(x => {
        if (this.pos) {
          if ((x.includes(this.qry)) && (Number(this.currencies[x].promjena) > 0)) {
            novi[x] = this.currencies[x]
          } else if (this.qry === '' && (Number(this.currencies[x].promjena) > 0)) {
            novi[x] = this.currencies[x]
          }
        } else if (x.includes(this.qry)) {
          novi[x] = this.currencies[x]
        } else if (!this.pos && this.qry === '') {
          novi[x] = this.currencies[x]
        }
      })
      this.pomL = novi
      this.$refs.tabla.refresh()
    },
    next () {
      this.pgNum++
    },
    prev () {
      this.pgNum--
    }
  },
  mounted () {
    this.pomL = this.currencies
    this.$refs.tabla.refresh()
  }
}
</script>
