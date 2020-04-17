const path = require("path");

let page_lists = [];
function importAll(prefix, r) {
  r.keys().forEach((key) => {
    page_lists.push({
      key,
      r,
      path: path.join(`snippet${prefix ? "/" + prefix : null}`, key),
    });
  });
}

importAll(
  '',
  require.context("../views/", true, /.js$/, "lazy")
);

export default page_lists;
