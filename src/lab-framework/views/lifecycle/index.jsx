console.time("[TOTAL]");
console.time("[LAST]");

console.group("[LifeCYCLE]");
console.timeLog("[TOTAL]");
console.timeEnd("[LAST]");
console.log("%c[LifeCYCLE]", "color:red", "[module] compiling");
console.log(
  "%c[LifeCYCLE]",
  "color:red",
  "[document.readyStat]",
  document.readyState
);
console.groupEnd("[LifeCYCLE]");
console.time("[LAST]");

import React, {useEffect, useState, useRef} from 'react';
/** es6 not support static arrow props given */
class LifecycleMonitor {}
LifecycleMonitor.log = (...args) => {
    console.group("[LifeCYCLE]");
    console.timeEnd("[LAST]");
    console.timeLog("[TOTAL]");
    console.log("%c[LifeCYCLE]", "color:red", ...args);
    console.groupEnd("[LifeCYCLE]");
    console.time("[LAST]");
}

/** You need forcibly refresh page at this route to trigger listeners below */
document.addEventListener("DOMContentLoaded", () => {
  LifecycleMonitor.log("[document.Event] DOMContentLoaded FIRED");
});
document.addEventListener("readystatechange", () =>
  LifecycleMonitor.log("[document.readyState] Changed! => " + document.readyState)
);

window.onload = () => {
  LifecycleMonitor.log("[window] window.onload FIRED");
}
window.onunload = () => {
  LifecycleMonitor.log("[window] window.onunload FIRED");
};
window.onbeforeunload = () => {
  LifecycleMonitor.log("[window] window.onbeforeunload FIRED");
  // return false; /** prevent default navigation event */
  return true
}

const iframeFactroy = ({
  id = 'iframe',
  width = '60%',
  height = '60%',
  src = '../../index.html',
} = {}) => {
  LifecycleMonitor.log("[iframe] creating...");
  const iframe = document.createElement("iframe");
  iframe.id = id;
  iframe.width = width;
  iframe.height = height;
  iframe.src = src;
  iframe.onload = () => {
    LifecycleMonitor.log("[iframe] onload");
  }
  setTimeout(() => {
    // iframe.src = src;
    LifecycleMonitor.log("[iframe][setTimeout]", 'won\'t block');
  }, 5000)
  LifecycleMonitor.log("[iframe] created");
  return iframe
}
LifecycleMonitor.log("[react] compile react fucntional component");
const Lifecycle = () => {
  let iframe = iframeFactroy();
  let container = useRef(null);


  useEffect(()=>{
    LifecycleMonitor.log("[react] useEffect called");
    container.current.appendChild(iframe)
  })
  return (
    <>
      <section className="focus-center" ref={container} onLoad={()=>LifecycleMonitor.log('[section] loaded')}>
        <div>
          <code>F12</code> to open console to see monitor output
          <button onClick={() => {window.onunload = null;}}> cancel unload preventing</button>
        </div>
      </section>
    </>
  );
}

export default Lifecycle;
LifecycleMonitor.log("[file] end");
