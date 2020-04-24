const path = require("path");

let page_lists = [];
function importAll(prefix, r) {
  r.keys().forEach((key) => {
    page_lists.push({
      key,
      r,
      path: path.join(`views${prefix ? ("/" + prefix) : ''}`, key),
    });
  });
}

importAll(
  '',
  require.context("../views/", true, /index.jsx$/, "lazy")
);

export default page_lists;
