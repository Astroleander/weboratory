let page_lists = [];
function importAll(prefix, r) {
  r.keys().forEach(key => {
    page_lists.push({
      key,
      r,
      path: `snippet${prefix? '/'+prefix: null}/${key.substring(2)}`
    })
  });
}

importAll('leetcode', require.context('@/snippet/algorithm/leetcode', true, /.[j|t]s$/, 'lazy'));
importAll('ds', require.context('@/snippet/algorithm/ds', true, /.ts$/, 'lazy'));
// console.log(page_lists)
export default page_lists