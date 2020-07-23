import React, { useState, useEffect } from 'react';
import FABG from '../components/FABG';
import Nav from '../components/GlobalNavigation.jsx';

/* 导航表 */
const useRouter = (pages) => {
  const loadLabViews = (r) => r.keys().map(path => ({
      path: path.split('/')[1]
  }));

  /**
   * A simple route
   * @param {*} link -> the hash
   */
  const go = (link) => {
    /** handle url */
    window.location.hash = link;
    /** [ 👇 notice ] pushState() wouldn't trigger event listener */
    // window.history.pushState({}, null, location.pathname.split('#')[0] + '#' + link);
  }

  /** 路由表 */
  const [routes, setRoutes] = useState(undefined);

  /* [ hook ] 确保只允许一次的 state 更改函数, 可以不依赖于初始项 */
  useEffect(() => {
    if (!routes) setRoutes(loadLabViews(pages));
  }, []);

  return [routes, go];
}

/* 主页，渲染导航表 */
const MainPage = () => {
  const [routes, route] = useRouter(require.context('./views/', true, /index.jsx$/, 'lazy'));

  return (
    <article id='algorithm-home' className='home'>
      {routes && <Nav />}
      {routes && routes.map(views => <li key={views.path} onClick={() => route(views.path)}><a>{views.path}</a></li>)}
    </article>
  )
}

/* 采用一种最弱智的 stack 管理办法, 有点像早期安卓的栈顶模式 */
const useHistory = (init) => {
  const [stack, setStack] = useState(init);
  const pushHistory = (path) => {
    if (stack[stack.length - 2] === path) {
      stack.pop();
      setStack(stack);
    } else {
      stack.push(path);
      setStack(stack)
    }
  };
  const popHistory = () => {
    stack.pop();
    setStack(stack);
  }
  return [stack, pushHistory , popHistory];
};

/* 简易路由 */
const useRoute = (hash) => {
  const [route, setRoute] = useState(location.hash);
  const [history, pushHistory, popHistory] = useHistory([location.hash]);

  /* load jsx component */
  const loadComponent = (route, rule = (url) => url.split('#')[1] || '' + '/index.jsx') => {
    let modulePath = rule(route)
    let Component = React.lazy(() => import('./views/' + modulePath))
  
    return <React.Suspense fallback={<div>loading...</div>}>
      <Component />
      <FABG />
    </React.Suspense>
  }
  /** 利用原生 API 监听 hashchange */
  const handleHashchange = (event) => {
    /* 一个完整的路由应该有完善的栈管理规则，但是我懒得这么搞了，只单纯在这个数组里进行栈顶判断 */
    pushHistory(location.hash);
    /* event 里是 url, 但是 location.hash 是现成的 hash */
    setRoute(location.hash);
    console.log(history);
  };

  useEffect(() => {
    window.addEventListener('hashchange', handleHashchange);
    return () => {
      window.removeEventListener('hashchange', handleHashchange);
    }
  });

  return route === '' ? <MainPage /> : loadComponent(route);
};

/* LAB-React 单页 直接被 👆 简易路由 接管 */
export default function App() {
  /** 当前路由, 是 hash 值 */
  return useRoute(location.hash);
}
