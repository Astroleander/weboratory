<template>
  <article id='laboratory-graphics'>
    <global-navigtion />
    <!-- Vue 和 React 有一点不同, Vue 的 tamplate 不能 flat,
     所以层级上无法做到和 React 一样灵活
     但是换句话说, Vue 的层级结构始终和路由是一致的
     -->
    <router-view />
  </article>
</template>

<script>
import GlobalNavigtion from '@/components/GlobalNavigation.vue'
export default {
  components: { GlobalNavigtion }
}
</script>

<style scoped lang='scss'>
</style>
