<template>
<div>
  <p>{{ txt }}</p>
  <button @click="dev"><span v-if="fl">STOP</span><span v-else>START</span></button>
  <div style="max-width: 50%">
    <span>Interval(ms): </span><input v-model="int1" />
    <graph :g-data.sync="data1" type="line"/>
    <span>Interval(ms): </span><input v-model="int2" />
    <graph :g-data.sync="data2" type="area" />
  </div>
</div>
</template>
<script>
import Graph from './Graph'

export default {
  components: { Graph },
  data () {
    return {
      txt: 'Graphs',
      data1: [],
      data2: [],
      fl: false,
      int1: 2500,
      int2: 5000
    }
  },
  watch: {
    'data1': function () {
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
    'data2': function () {
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
        this[lista].push(response.data.split(' ')[0])
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
