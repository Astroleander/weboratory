<template>
  <nav>
    <a v-for="name in names" :key="name"
      :href='`${name}/`' 
      class="vue-global-nav-link"
    >
      {{name.replace(/^\w*?-/, "").toUpperCase()}}
    </a> 
  </nav>
</template>

<script>
export default {
  data() {
    return {
      names: []
    }
  },
  created() {
    this.generateList()
  },
  methods: {
    generateList() {
      return ENTRIES.map(name => {
        console.log(name)
        if (name === "home") return;
        this.names.push(name);
      })
    }
  }
}
</script>

<style>
</style>

<style lang="scss" scoped>
</style>