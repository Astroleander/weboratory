import React, { useEffect, useState } from 'react'

const runStyle = {
  color: '#212121',
  marginTop: '24px'
}

const outputStyle = {
  padding: '12px',
  background: '#EAEAEA',
  borderRadius: '2px',
}

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
export default function CodeSample(props: any) {
  const children = props.children;
  if (!children) return null;
  const [prev, setTrigger] = useState(props);
  if (props !== prev) {
    setTrigger(props)
  }

  const [result, setResult] = useState('waiting for result ...');
  useEffect(() => {
    const params = ["set", "update", ...Object.keys(props), children];
    const asyncExec = async () => {
      try {
        let func = new AsyncFunction(...params);
        let result = await func(setResult, setResult, ...Object.values(props));
        if (result !== null || result !== undefined) { setResult(result); }
        else {
          setResult('done but nothing return');
        }  
      } catch (e) {
        console.error(e);
        setResult('LAB ERROR: live function is broken');
      }
    }
    asyncExec();
  }, [prev])

  return (
    <>
      {
        React.Children.map(children ,(c) => {
          return (<div>
            <pre className={props.long ? "" : "short"}>{c}</pre>
            <pre style={outputStyle}>{JSON.stringify(result)}</pre>
          </div>);
        })
      }
    </>
  )
}
