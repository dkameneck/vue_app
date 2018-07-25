<template>
<div>
  <br>
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
      <tr v-for="(item, index) in lista" v-bind:key="index" class="tdHover">
        <td><input v-model.number="item.jed"/></td>
        <td @click="edit(index)">{{ index }}</td>
        <td @click="edit(index)">{{ item.jed * item.kupDev }}</td>
        <td @click="edit(index)">{{ item.jed * item.srDev }}</td>
        <td @click="edit(index)">{{ item.jed * item.prDev }}</td>
        <td @click="edit(index)">{{ item.promjena || 0 }} %</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
export default {
  props: {
    lista: Object
  },
  computed: {
    listaLen: function () {
      return this.lista.length
    }
  },
  methods: {
    edit (val) {
      this.$emit('editRow', val)
    },
    refresh () {
      this.$forceUpdate()
    }
  }
}

</script>
