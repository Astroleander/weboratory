import React from 'react';
import { HashRouter, Link } from "react-router-dom";

import view_list from './router/index.js'

const AppFramework = () => {
  return (
    <>
      <article id='framework-home'>
        {() =>
          view_list.map((item, idx) => {
            <li key={idx}>
              <Link to={item.path}>{item.path.replace(/\//g, " - ")}</Link>
            </li>;
          })
        }
      </article>
    </>
  );
}

export default AppFramework;
