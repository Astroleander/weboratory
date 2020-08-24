let page_lists = [];
function importAll(prefix, r) {
  r.keys().forEach((key) => {
    page_lists.push({
      key,
      r,
      path: `views${prefix ? ("/" + prefix) : ''}/${key.substring(2)}`,
    });
  });
}

importAll('',  require.context("../views/", true, /index\.jsx$/, "lazy"));
importAll('',  require.context("../views/", false, /\.jsx$/, "lazy"));

export default page_lists;
