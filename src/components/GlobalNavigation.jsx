import React from 'react';

function generateList(r) {
  return r.keys().map((link) => {
    let name = link.split("/")[1];
    if (name === "home") return;
    return (
      <a href={`${name}/`} 
        className="react-global-nav-link"
        key={name}
        >
        {name.replace(/^\w*?-/, "").toUpperCase()}
      </a>
    );
  });
};

const GlobalNavigation = () => {
  console.log("[GlobalNavigation] load...");
  return (
    <nav id='global-nav'>
      {generateList(require.context("@/", true, /index.html$/, "lazy"))}
    </nav>
  );
}

export default GlobalNavigation;
