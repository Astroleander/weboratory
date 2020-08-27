import React from 'react';
import { HashRouter, Link } from "react-router-dom";

import view_list from './router/index.js'
console.log(view_list)

const linkMapping = (path) => {
  return path
    .substring(2)                                     // 去除开头的 './'
    .replace(/\/index.[j|t]sx$/, '')                  // 去除后缀
    .replace(/-/g, ' ')                               // 替换文件名中的 -               
    .replace(/^(es)|\s(\w)|^(\w)/g, (match) => {      // 替换大小写
      return match.toUpperCase()
    });
}

const AppFramework = () => {
  return (
    <>
      <section id='framework-home' className='home'>
        {
          view_list.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path}>{linkMapping(item.key)}</Link>
            </li>
          ))
        }
      </section>
    </>
  );
}

export default AppFramework;
