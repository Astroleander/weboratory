const path = require('path');

let page_lists = [];
function importAll(prefix, r) {
  r.keys().forEach(key => {
    page_lists.push({
      key,
      r,
      path: path.join(`snippet${prefix? '/'+prefix: null}`, key)
    })
  });
}

importAll('leetcode', require.context('@/snippet/algorithm/leetcode', true, /.js$/, 'lazy'));

export default page_lists