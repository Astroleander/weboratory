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
const GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;

export function CodeSample(props: any) {
  const { children } = props;
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
            <pre className={props.long ? "" : "short"}>{c.trimStart()}</pre>
            <pre style={outputStyle}>{JSON.stringify(result)}</pre>
          </div>);
        })
      }
    </>
  )
}

export function MultCodeSample(props: any) {
  const { children } = props;
  if (!children) return null;
  
  const [prev, setTrigger] = useState(props);
  if (props !== prev) {
    setTrigger(props)
  }

  const [result, setResult] = useState<string[]>([]);
  'none of any result ...'
  useEffect(() => {
    const params = ["set", "update", ...Object.keys(props), children];
    const asyncExec = async () => {
      try {
        const func = new GeneratorFunction(...params);
        const gen = func();

        let is_gen_done = false;
        while (!is_gen_done) {
          const { value, done } = await gen.next();
          if (!value) return;

          setResult(p => {
            return p.concat([value]);
          });
          is_gen_done = done;
        }
        setResult(p => p)
      } catch (e) {
        console.error(e);
        setResult(['LAB ERROR: live function is broken']);
      }
    }
    asyncExec();
  }, [prev]);

  return (
    <>
      {
        React.Children.map(children ,(c) => {
          return (<div>
            <pre className={props.long ? "" : "short"}>{c.trimStart()}</pre>
            {
              result.map((each, idx) =>
                <pre style={outputStyle} key={idx}>
                  {JSON.stringify(each)}
                </pre>
              )
            }
          </div>);
        })
      }
    </>
  );
}

export default CodeSample;