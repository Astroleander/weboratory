<template>
  <!-- <transition mode='out-in' > -->
    <router-view />
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'LaboratoryGraphics',
}
</script>

<style>
</style>

<style lang="scss" scoped>
.v-enter,.v-leave-to {
  opacity: 0;
}
.v-enter-active, .v-leave-active {
  transition: all .3s;
}
#laboratory-graphics {
  width: 100%;
}
</style>