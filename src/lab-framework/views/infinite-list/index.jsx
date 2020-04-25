import React, { Suspense, useEffect, useState } from 'react'
import SolidScroll from './SolidScroll'

export default function Infinite() {
  const data = new Array(200).fill(0).map((e,i) => i);
  return (
    <section>
      {        
        require.context('./', true, /^(?!^\.\/index\.jsx$).*\.jsx$/, 'lazy').keys().map((e,idx) => 
          <Suspense key={idx} fallback={<LoadComponent></LoadComponent>}>
            <DynamicComponent name={e} data={data} idx={idx}></DynamicComponent>
          </Suspense>
        )
      }
      {/* <Suspense fallback={<LoadComponent></LoadComponent>}>
        <DynamicComponents />
      </Suspense> */}
    </section>
  )
}
/** [ 📐 正则 ] require 被用于 webpack 预编译阶段, 不可抽出 */
const DynamicComponent = (props) => {
  const DynamicComponent = React.lazy(() => {
    return new Promise(r => {
      setTimeout(
        ()=>r(import('./' + props.name.slice(2)))
        ,1250 * (props.idx + 1))
    })
  });
  return <DynamicComponent data={props.data} key={props.name}></DynamicComponent>
}
const LoadComponent = () => {
  const style = {
    'height': '250px',
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