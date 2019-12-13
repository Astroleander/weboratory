const view_routes = []

function importViews(requires) {
  requires.keys().forEach(key => {
    const fullPath = key.replace(/^\.\//, '/').replace(/\.vue$/,'');
    // let displayName = routePath.replace
    const shortPath = fullPath.split('/').slice(-1)[0];
    view_routes.push({
      name: shortPath,
      path: fullPath,
      meta: {
        route_string: fullPath,
        route_array: fullPath.replace(/\./g, '/').split('/').splice(1),
        show_name: fullPath.replace(/_/g, ' ').replace(/\./g, '/').split('/').splice(1)
      },
      component: () => requires(key)
    })
  });
}


importViews(require.context('@graphics/views', true, /\.vue$/, 'lazy'));

console.log(view_routes);
export default view_routes;