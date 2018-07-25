<template>
<div>
  <button @click="dev"><span v-if="fl">STOP</span><span v-else>START</span></button>
  <span>Interval(ms): </span><input v-model="int1" />
  line
  <graph :g-data.sync="data1" />
  <span>Interval(ms): </span><input v-model="int2" />
  area
  <graph :g-data.sync="data2" />
</div>
</template>
<script>
import Graph from './Graph'

export default {
  components: { Graph },
  data () {
    return {
      fl: false,
      int1: 2500,
      int2: 5000,
      data1: {
        labels: [],
        datasets: [{
          label: 'Number',
          data: [],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1,
          fill: false
        }]
      },
      data2: {
        labels: [],
        datasets: [{
          label: 'Number',
          data: [],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1,
          fill: true
        }]
      }
    }
  },
  watch: {
    'data1.labels': function () {
      if (this.fl) {
        if (Number(this.int1) > 0) {
          setTimeout(() => {
            this.getRandom('data1')
          }, parseInt(this.int1))
        } else {
          this.int1 = 3000
        }
      }
    },
    'data2.labels': function () {
      if (this.fl) {
        if (Number(this.int2) > 0) {
          setTimeout(() => {
            this.getRandom('data2')
          }, parseInt(this.int2))
        } else {
          this.int2 = 5000
        }
      }
    }
  },
  methods: {
    getRandom (lista) {
      this.$http.get('http://numbersapi.com/random/math').then(response => {
        this[lista].datasets[0].data.push(Number(response.data.split(' ')[0]))
        this[lista].labels = Object.keys(this[lista].datasets[0].data)
      }).catch(() => {
        this.fl = false
      })
    },
    dev () {
      if (this.fl) {
        this.fl = false
      } else {
        this.getRandom('data1')
        this.getRandom('data2')
        this.fl = true
      }
    }
  }
}
</script>
