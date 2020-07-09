
const views = new Map();

const importAll = (r) => r.keys().forEach(r);
importAll(require.context('./', true, /index\.js$/));

export function registerView(view, code, name) {
  /* 指定的文件或模块 __不会加载__ */
  const excludedList = [
  ];
  if (!views.has(code) && !excludedList.find(match => match.name && match.name === name || match.code && match.code === code)) {
    views.set(code, view);
  }
  return view;
}
export default views;
