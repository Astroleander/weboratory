import React, { useState, useEffect } from 'react'
import FABG from '../components/FABG';
import Nav from '../components/GlobalNavigation.jsx'
const MainPage = () => {
  /** 路由表 */
  const [routes, setRoutes] = useState(undefined);
  useEffect(() => {
    if (!routes) setRoutes(loadLabViews(require.context('./views/', true, /index.jsx$/, 'lazy')));
    return () => {
    }
  }, [])
  return (
    <article id='algorithm-home' className='home'>
      <Nav />
      {routes && routes.map(views => <li key={views.path} onClick={() => go(views.path)}><a>{views.path}</a></li>)}
    </article>
  )
}


/**
 * TODO: router needs exstract out
 */

const loadLabViews = (r) => r.keys().map(path => {
  return {
    path: path.split('/')[1]
  }
})

/**
 * A simple route
 * @param {*} link -> the hash
 */
const go = (link) => {
  /** handle url */
  window.location.hash = link;
  /** [ 👇 notice ] pushState wouldn't trigger event listener */
  // window.history.pushState({}, null, location.pathname.split('#')[0] + '#' + link);
}

const loadComponent = (route, rule = (url) => url.split('#')[1] || '' + '/index.jsx') => {
  let modulePath = rule(route)
  let Component = React.lazy(() => import('./views/' + modulePath))

  return <React.Suspense fallback={<div>loading...</div>}>
    <Component></Component>
    <FABG components={['code', 'back']}></FABG>
  </React.Suspense>
}

export default function App(props) {
  /** 当前路由, 是 hash 值 */
  const [route, setRoute] = useState(location.hash);

  /** 利用原生 API 监听 hashchange */
  useEffect(() => {
    window.addEventListener('hashchange', handleHashchange);
    return () => {
      window.removeEventListener('hashchange', handleHashchange);
    }
  }, )

  const handleHashchange = (event) => {
    /** event 里是 url, 但是 location.hash 是现成的 hash */
    setRoute(location.hash);
  }

  return <>
    { route === '' && <MainPage></MainPage> }
    { route !== '' && loadComponent(route)}
  </>
}
