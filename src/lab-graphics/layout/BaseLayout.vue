<template>
  <article id='laboratory-graphics' class='content-container'>
    <router-view />
    <router-link to='/'>
      <div class='exit floating-button'>
        <p class='cross'> + </p>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {

}
</script>

<style>
</style>

<style lang="scss" scoped>
.content-container {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}
</style>