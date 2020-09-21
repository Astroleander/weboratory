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

const loadComponentCode = (path, name, component_code) => {
  for (const [rule, load] of loaderMapping) {
    if (rule.test(path)) {
      console.log(name, rule)
      return load(component_code, name);
    }
  }
}

const importComponent = (path, target, name) => {
  import(`./${path}`).then(m => {
    const component_code = m.default || m;
    let result = loadComponentCode(path, name, component_code)
    target.append(result)
  });
}

const importImageWrapper = (img, target, name) => {
  let result = loadComponentCode(img, name, img);
  target.append(result);
}

const createShowcase = (
  name, 
  {
    img = null
  } = {}
) => {
  const container = document.createElement('div');
  container.classList.add('showcase');

  if (!img) {
    const fragment_path = findFragmentPath(name);
    if (fragment_path) { importComponent(fragment_path, container, name); }  
  } else {
    importImageWrapper(img, container, name);
  }

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

  const card = document.createElement('a');
  card.id = `${name}-card`;
  card.className = 'fragment-card';
  card.href = name;
  card.append(showcase);
  card.append(navtitle);
  
  document.getElementById('catelogue').append(card);
});

/** Provide by HTML injecting */
Object.keys(QLINKS).forEach(name => {
  const {url, img} = QLINKS[name];

  const showcase = createShowcase(name, { img });
  const navtitle = createTitle(name);

  const card = document.createElement('a');
  card.id = `${name}-card`;
  card.className = 'fragment-card';
  card.href = url;
  card.target = "_blank"
  card.append(showcase);
  card.append(navtitle);
  
  document.getElementById('preferlink').append(card);
})