<template>
  <section class='hud'>
    <button class='float-button' :key='t' v-for='t in type_list' @click='$emit("on-type-change", t)'>
      {{ t.toUpperCase() }}
    </button>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const type_list = ref([
                                          "points", 
      "line strip",     "line loop",      "lines",
      "triangle strip", "triangle strip", "triangles",
    ]);
    return {
      type_list
    }
  },
};
</script>

<style lang="scss" scoped>
.hud {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  .float-button {
    background: transparent;
    color: white;
    border: 2px white solid;
  }
}
</style>
