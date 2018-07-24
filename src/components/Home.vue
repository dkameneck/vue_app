<template>
  <div>
    <br>
    <button @click="btnC">Button</button>
    <span v-if="stat">This is home!</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stat: false
    }
  },
  methods: {
    btnC () {
      setTimeout(this.prtin, 1500)
    },
    prtin () {
      this.stat = !this.stat
    }
  }
}
</script>
