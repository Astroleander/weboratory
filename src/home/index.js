import './styles/index.scss';
import { loaderMapping } from "./loader";

const showcaseMap = new Map();
require.context('./', false, /fragment/,'lazy').keys()
  .filter(v => v.substring(2).includes('.'))
  .forEach(key => {
    key = key.substring(2);
    showcaseMap.set(key.toLowerCase().substring(8).replace(/\..*/, ''), key);
  });

const findFragmentPath = (name) => {
  const keys = Array.from(showcaseMap.keys());
  for (let index = 0; index < Array.from(keys).length; index++) {
    if (name.includes(keys[index])) {
      return showcaseMap.get(keys[index]);
    }
  } 
}

const importComponent = (path, target, name) => {
  import(`./${path}`).then(m => {
    const component_code = m.default || m;

    for (const [rule, load] of loaderMapping) {
      if (rule.test(path)) {
        let result = load(component_code, name);
        target.append(result);
      }
    }
  });
}

const createShowcase = (name) => {
  const container = document.createElement('div');
  container.classList.add('showcase');
  
  const fragment_path = findFragmentPath(name);
  if (fragment_path) { importComponent(fragment_path, container, name); }

  return container;
}

const createTitle = (name) => {
  const group = document.createElement('div');
  const primary = document.createElement('a');
  primary.classList.add('link');
  primary.innerHTML = name.replace(/^\w*?-/, '').toUpperCase();
  group.append(primary)
  group.classList.add('title');
  return group;
}

/** Provide by DefinePlugin */
ENTRIES.forEach(name => {
  const showcase = createShowcase(name);
  const navtitle = createTitle(name);

  const card = document.createElement('p');
  card.id = `${name}-card`;
  card.className = 'fragment-card';
  card.href = name;
  card.append(showcase);
  card.append(navtitle);
  
  document.getElementById('catelogue').append(card);
});