import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import cls from 'classnames';

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
        if (result !== null || result !== undefined) { 
          setResult(result); 
        } else {
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
          return (<div className='fragment'>
            <pre className={props.format ? "" : "short"}>{c.trimStart()}</pre>
            <pre className={styles.output}>{JSON.stringify(result)}</pre>
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
    const params = ["set", "next", ...Object.keys(props), children];
    const asyncExec = async () => {
      try {
        const func = new GeneratorFunction(...params);
        const gen = func(setResult, (newone:string) => setResult(p => p.concat([newone])));

        let is_gen_done = false;
        while (!is_gen_done) {
          const { value, done } = await gen.next();
          if (value === undefined) return;

          setResult(p => {
            return p.concat([value]);
          });
          is_gen_done = done;
        }
        setResult(p => p);
      } catch (e) {
        console.error(e);
        setResult(['LAB ERROR: live function is broken: ' + String(e)]);
      }
    }
    asyncExec();
  }, [prev]);

  return (
    <>
      {
        React.Children.map(children ,(c) => {
          return (<div className='fragment'>
            <pre className={props.format !== undefined && !props.format ? "short" : ""}>{c.trimStart()}</pre>
            {
              result.map((each, idx) =>
                <pre className={styles.output} key={idx}>
                  {JSON.stringify(each) || ' '}
                </pre>
              )
            }
          </div>);
        })
      }
    </>
  );
}

type RegProps = { regexp: RegExp, tests: Array<string> };
export function RegSample(props: React.PropsWithChildren<RegProps>) {
  const { tests, regexp } = props;

  useEffect(() => {
    0
  }, [regexp]);
  return (
  <section className={styles.regWrapper}>
    <pre className={styles.reg}>{ regexp.toString() }</pre>
    <div className={styles.tests}>
      {
        tests.map((each, idx) =>
          <pre 
            className={regexp.test(each) ? cls(styles.output, styles.regTrue) :  cls(styles.output, styles.regFalse)}
            key={idx}
          >
            {each}
          </pre>
        )
      }
    </div>
  </section>
  );
};

export default CodeSample;