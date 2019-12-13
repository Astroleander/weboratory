<template>
  <span ref='container' tabindex="0">
    <!-- 😕 v-show 必须绑定在本组件的数据上 -->
    <button v-if='show' class='delete-button-in-button' @click='needsDelete'>+</button>
    <slot />
  </span>
</template>

<script>
import * as THREE from 'three'

export default {
  props: {
    'withDeleteButton': Boolean,
    'id': [String, Number],
  },
  data() {
    return {
      show: this.withDeleteButton
    }
  },
  mounted() {
  },
  methods: {
    needsDelete() {
      this.$emit('deleted', this.id || this.$slots.default[0].text.trim())
    }
  }
}
</script>

<style lang="scss" scoped>
/** 定义在 span 上有一个好处, 这个样式极其容易被覆盖, 我们可以轻易地在外部改写组件 */
span {
  min-width: 3em;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  /** inline-flex 没办法和 text-overflow 良好合作 */
  // display: inline-flex;
  
  flex-wrap: nowrap;
  justify-items: center;
  align-items: center;
  border-radius: 4px;
  color: white;
  background: #009588;
  overflow: hidden;
  cursor: pointer;
  &:hover, &:focus {
    background: #4db6ac;
  }
  &:active {
    background: #00695c;
  }
  // 通过 em 我们可以使 按钮的边距 始终相较于 按钮本身大小 合适
  padding: 0.1em 0.6em 0.1em 0.6em;
}
.delete-button-in-button {
  padding: 0;
  color: white;
  background: transparent;
  outline: none;
  border: none;
  // margin: 0.2em;
  text-align: center;
  width: 1em;
  height: 1em;
  line-height: 1em;
  font-size: 1em;
  font-family: 'Roboto';
  border-radius: 999px;
  transform: rotate(45deg);
  box-shadow: none;
  &:hover {
    background: white;
    color: #00695c;
  }
  &:active {
    background: #FFFFFF33;
    color: #EEE;
  }
}
</style>

<style>
</style>