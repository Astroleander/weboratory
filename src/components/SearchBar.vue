<template>
  <nav class="search-bar">
    <section class="filter">
      <input class="input" tabindex="0" type="search" ref='input' v-model.lazy='inputFilter' v-focus/>
      <button class='tag delete' @click='clearTags'> + </button>
      <div class='tag-list'>
        <tag class='tag' 
          v-for='(each, idx) in selected' :key="idx"
          @click.native='onDelete(each)'>
          {{each}}
        </tag>
      </div>
    </section>
    <section class="selector">
      <tag class='tag mini' 
        v-for='each in selector' :key='each'
        @click.native='onSelect(each)'
      >{{each}}</tag>
    </section>
  </nav>
</template>

<script>
export default {
  components: {
    /** 要用 vue 中正确地使用 import 需要 syntax-dynamic-import 的支持 */
    tag: () => import('@/components/buttons/ButtonNormal.vue')
  },
  props: ['defaultList'],
  mounted() {
    console.log(this.defaultList)
  },
  data() {
    return {
      selected: [],
      selector: this.defaultList,
    }
  },
  computed: {
    inputFilter: {
      get() {
        /** 永远在框里显示空白 */
        return '';
      },
      set(newValue) {
        /** 
         * 校验新值不是已存在的, 并且不能含空格 
         *   然后把新值压进数组
         *
         *   🙄 这里的完整性不仅是规范上的问题
         *   我们获取 tag 标识符的渠道之一是从 vdom 的 slot 中直接取到的 text,
         *   我们 **对这个 text 进行了 trim 操作 **
         *   所以 tag 的输出肯定是不带空格的 这边任何空格肯定匹配不上
         *
         *   ⚠ 这里并没有进行过滤校验操作, 只是保证添加的过滤词是有效的
         *   ⚠ 其实 v-input 还有 .trim 修饰符, 但是我想在输入空格时也触发 set, 所以得自己写
         */
        if (!newValue || !newValue.trim()) {
          this.selected = []
        }
        else if (!this.selected.includes(newValue)) {
          this.selected.push(...newValue.split(' ').filter(x => x !== ''));
          /** 每次更新以后申请父级元素重新过滤 */
        }
        this.needsUpdate();
      }
    }
  },
  methods: {
    needsUpdate() {
      this.$emit('updated', this.selected);
    },
    onDelete(idf) {
      this.selected = this.selected.filter(el => idf !== el);
      this.needsUpdate();
    },
    onSelect(tag) {
      this.inputFilter = tag;
      this.needsUpdate();
    },
    clearTags() {
      /**
       * 无法实现的功能: 在点击删除按钮时没有视觉副作用地清空 input 栏
       * 
       * 除非用一堆原生事件监听来完成整个流程
       * 或者用 vue 封一个组件
       */

      /** 💊 .lazy 会早于这个触发, 导致更改无效 */
      // this.$refs.input.innerHTML = '';
      /** 💊 inputFilter 是我们重写了 getter/setter 的计算属性, 改了没用*/
      // this.inputFilter = ' ';
      this.selected = [];
      this.needsUpdate();
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
  },

}
</script>

<style>

</style>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
}
.filter {
  display: flex;
  align-items: center;
  padding: 0.2em 0.2rem;
  height: 3rem;
  .input {
    display: inline-block;
    height: 2rem;
    width: 20%;
    min-width: 200px;
    border-radius: 999px;
    box-shadow: 0px 0px 2px #424242; 
    padding: 0.2rem 1.2rem;
    font-size: 1rem;
    border: none;
    outline: none;
    transition: width 1s ease-in-out;
    &:focus {
      box-shadow: 0px 0px 3px #212121; 
    }
  }

  .delete {
    width: 1.4rem;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 1.4rem;
    border-radius: 4px;
    outline: none;
    border: none;
    color: white;
    background: #757575;
    border-radius: 999px;
    transform: rotate(45deg);
    &:hover, &:focus {
      background: #bdbdbd;
    }
    &:active {
      background: #212121;
    }
  }
  .tag {
    margin: 0 5px;
  }
  .tag-list {
    padding: 0.2em;
    display: flex;
    align-items: center;
    overflow: auto;
  }
  .tag-list::-webkit-scrollbar {
    width: 2px;
    height: 4px;
  }
  .tag-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .tag-list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 999px;
    &:hover {
      background: #555;
    }
  }
}
.selector {
  .tag {
    margin: 0 3px;
    background: #424242;
    &:hover, &:focus {
      background: #7e7e7e;
    }
    &:active {
      background: #212121;
    }
  }
  .mini {
    font-size: 0.8em;
  }
}
</style>