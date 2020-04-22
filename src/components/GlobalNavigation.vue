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
    this.generateList(require.context('@/', true, /index.html$/, 'lazy'))
  },
  methods: {
    generateList(r) {
      return r.keys().map(link => {
        let name = link.split("/")[1];
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