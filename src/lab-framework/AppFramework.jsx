import React from 'react';
import { HashRouter, Link } from "react-router-dom";

import view_list from './router/index.js'
console.log(view_list)
const AppFramework = () => {
  return (
    <>
      <section id='framework-home' className='home'>
        {
          view_list.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path}>{item.path.replace(/\//g, " - ")}</Link>
            </li>
          ))
        }
      </section>
    </>
  );
}

export default AppFramework;
