<template>
  <section class='home'>
    <search-bar @updated='handleUpdated' :default-list='getKeywordSet'>
    </search-bar>
    <div class='list'>
      <template v-for="(view, idx) in getListViewFilter">
        <li :key="idx">
          <router-link :to="{ path: view.path, name: view.name }">
            {{ generateName(view) }}
          </router-link>
        </li>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    /** 要用 vue 中正确地使用 import 需要 syntax-dynamic-import 的支持 */
    SearchBar: ()=> import('@/components/SearchBar.vue')
  },
  mounted() {
    import('./router/view').then(module => {
      console.log(module.default);
      this.view_list = module.default;
    })
  },
  data() {
    return {
      keyword_set: new Set(),
      view_list: [],
      selected: [],
    }
  },
  computed: {
    getKeywordSet: function() {
      console.log('[getKeywordSet] start!', this.view_list)
      this.view_list.forEach(view => {
        let size = view.meta.show_name.length;
        return view.meta.show_name.forEach((word, idx) => {
          if (idx !== size - 1 ) {
            /** 文件路径的解析规则 */
            this.keyword_set.add(word);
          }
        });
      })
      console.log('[getKeywordSet] done!', [...this.keyword_set])
      return [...this.keyword_set]
    },
    getListViewFilter: function() {
      /** copy result to filter seq */
      let result = this.view_list;
      for (const idx in this.selected) {
        if (!result) return []
        // result.filter(e => {
        //   console.log('[result]', e.path, selected[idx], e.path.search(selected[idx]))
        // });
        result = result.filter(e => e.path.toLowerCase().search(this.selected[idx].toLowerCase()) + 1);
      }
      return result
    }
  },
  methods: {
    handleUpdated: function(selected) {
      this.selected = selected;
    },
    generateName: function(view) {
      let size = view.meta.show_name.length;
      let last;
      return view.meta.show_name.map((word, idx) => {
        if (idx !== size - 1 ) {
          /** 文件路径的解析规则 */
          return `[${word}] `
        } else {
          /** 文件名的解析规则 */
          return `${word.replace(/(.+?)\./, '[$1] ').replace(/\./g, ' . ').replace(/-/g, ' - ')}`
        } 
      }).join('');
    },

  },
}
</script>

<style>

</style>