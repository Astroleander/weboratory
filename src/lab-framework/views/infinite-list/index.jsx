import React, { Suspense, useEffect, useState } from 'react'
import SolidScroll from './SolidScroll'

export default function Infinite() {
  return (
    <section>
      <Suspense fallback={<LoadComponent></LoadComponent>}>
        <DynamicComponents />
      </Suspense>
    </section>
  )
}
/** [ 📐 正则 ] require 被用于 webpack 预编译阶段, 不可抽出 */
const DynamicComponents = () => {
  return (
    <>
    {
        /** [ 📐 Reg ] just for practice: using one regExp to filter ./index.jsx */
        require.context('./', true, /^(?!^\.\/index\.jsx$).*\.jsx$/, 'lazy').keys().map((e,idx) => {
          const DynamicComponent = React.lazy(() => {
            return new Promise(r => {
              setTimeout(
                ()=>r(import('./' + e.slice(2)))
                ,1000 * (idx+1))
            })
          });
          return <DynamicComponent key={e}></DynamicComponent>
        })
    }
    </>
    )
}
const LoadComponent = () => {
  const style = {
    'height': '300px',
    'background':'#EEE',
    'textAlign':'center',
    'lineHeight': '300px',
    'fontSize': '3em',
    'fontWeight': 'Bold',
    'color': '#D0D0D0'
  }
  const [placeholder, setPlaceholder] = useState('load');
  useEffect(() => {
    const timer = setInterval(()=>{
      setPlaceholder(String(placeholder) + '.')
    }, 300)
    return () => {
      clearInterval(timer)
    };
  });
  return <section style={style}>
    {placeholder}
  </section>
}