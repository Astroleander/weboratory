import React from 'react';

function generateList() {
  return ENTRIES.map((name) => {
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
      {generateList()}
    </nav>
  );
}

export default GlobalNavigation;
