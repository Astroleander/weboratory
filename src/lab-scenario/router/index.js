

const view_list = [];
function importViews(r) {
  r.keys().forEach(key => {
    view_list.push({
      name: key.split('/')[1],
      path: `views${key.substring(1)}`
    })
  });
}
importViews(require.context('@/lab-scenario/views/', true, /index.jsx$/));

console.log(view_list)
export default view_list