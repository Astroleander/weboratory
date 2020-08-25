import React, { useState, useEffect } from 'react';
import * as All from './';
import CodeSample from '@/components/CodeSample/index.tsx';
import styles from './index.module.css';
import { Sub } from '../../components/CodeSection';

const initVal = () => [Number.MAX_SAFE_INTEGER, BigInt(Number.MAX_SAFE_INTEGER)]
export const BigInt_Sample = () => {
  const [number, setNumber] = useState(initVal());
  return (
    <>
      <div className={"inline-hgroup"}>
        <button onClick={e => setNumber(p => [p[0] * 2,p[1] * 2n] )}> * 2</button>
        <button onClick={e => setNumber(p => [p[0] / 2,p[1] / 2n] )}> / 2</button>
        <span>click "*" symbol times to overflow safe value</span>
      </div>
      <div className={styles.bigcase}>
        <p className={styles.number}>number:{number[0]}</p>
        <p className={styles.number}>bigint:{number[1].toString()}</p>
        <CodeSample number={number[0]}>
          {`return number === number + 1`}
        </CodeSample>
        <CodeSample bigint={number[1]}>
          {`return bigint === bigint + 1n`}
        </CodeSample>
        <CodeSample>
          {`
            return Number(5n / 2n); // bigint can't be serialize
          `}
        </CodeSample>
        <CodeSample>
          {`
            return Number(5 / 2);
          `}
        </CodeSample>
      </div>
    </>
  );
};

export const AllSettled = () => {
  return <>
    <CodeSample>
    {/* javascript */`
      const fetchDelay = async (n) => await new Promise((res,rej) => setTimeout(() => n < 2000 ? res(n) : rej(n), n));
      return await Promise.allSettled([fetchDelay(1000), fetchDelay(2000), fetchDelay(3000)]);  
    `} 
    </CodeSample>

    <CodeSample>
    {/* javascript */`
      const fetchDelay = async (n) => await new Promise((res,rej) => setTimeout(() => n < 2000 ? res(n) : rej(n), n));
      Promise.all([fetchDelay(1000), fetchDelay(2000), fetchDelay(3000)]).then((r) => update(r)).catch(r => update('failed at: ' + r));
    `} 
    </CodeSample>
  </>;
};

const string = `Cursus et aliquet egestas scelerisque himenaeos nullam himenaeos eros habitant iaculis donec eget ali ullamcorper id a et lacinia praesent nisl senectus metus parturient. A suspendisse nascetur vestibulum dui sem faucibus hac ullamcorper vestibulum adipiscing ipsum mauris ali eleifend dis adipiscing fringilla facilisis habitasse scelerisque.`;
export const String_MatchAll = () => {
  const [value, setValue] = useState('ali');
  const [match, setMatch]= useState([]);
  useEffect(() => {
    let matches;
    try {
      console.log(RegExp(value, 'g'))
      matches = string.matchAll(RegExp(value, 'g'));
    } catch (e) {
      console.log('invaild regex');
      return;
    }
    
    let newMatch = [];
    for (const { index } of matches) {
      for (let p = 0; p < value.length; p++) {
        newMatch[index + p] = index;
      }
    }
    setMatch(newMatch);
  }, [value]);

  return <>
    <h2>String</h2>
    <cite style={{overflowX: 'scroll'}}>
      {string.split('').map((c,i) => <span key={i} className={match[i] || match[i] === 0 ? styles.matched : ''}>{c}</span>)}
    </cite>
    <h2>String.prototype.matchAll</h2>
    <input defaultValue={value} onChange={(e) => setValue(e.target.value)}></input>
    <br />

    <>
    </>
  </>;
};

const handleChange = (e, set) => {
  console.log(e)
  set(e);
};
export const Dynamic_Import = () => {
  const [module, setModule] = useState(null);
  const [moduleName, setModuleName] = useState(null);

  useEffect(() => {
    import('./').then(m => {
      if (moduleName) {
        setModule(m)
      }
    })
  }, [moduleName])

  let Module = module && moduleName && module[moduleName];
  return (<>
    <button onClick={e => handleChange('MatchAll', setModuleName)}>MatchAll</button>
    <button onClick={e => handleChange('BigIntSample', setModuleName)}>BigIntSample</button>
    <button onClick={e => handleChange(null, setModuleName)}>null</button>
    {Module !== null && <Module />}
    <br />
  </>);
};

const myGlobalThis = () => {
  if (typeof self !== 'undefined') { return self }
  else if (typeof window !== 'undefined') { return window }
  else if (typeof global !== 'undefined') { return global };
};
export const GlobalThis = () => {
  return (
    <>
      <CodeSample long>{/* javascript */`// standardize
const myGlobalThis = () => { 
  if (typeof self !== 'undefined') { return self }
  else if (typeof window !== 'undefined') { return window }
  else if (typeof global !== 'undefined') { return global }
  throw new Error('unknown global');
}
return myGlobalThis() === window === globalThis;
      `}
      </CodeSample>
    </>
  )
};

export const Nullish_Coalescing = () => {
  return (<CodeSample>{/* javascript */`
    return window.location.i_do_not_care ?? 'Not found'
  `}
  </CodeSample>);
};

export const Optional_Chaining = () => {
  return (<CodeSample>{/* javascript */`
    return window.location?.i_do_not_care?.what_the_punk_i_am || 'sure be nothing'
  `}
  </CodeSample>);
};

export const ForIn_Mechanics = () => {
  return (<>
    <cite>
      the different engines have agreed on how properties are iterated when using the {<code>for (a in b)</code>} control structure so that the behavior is standardized.
    </cite>
  </>);
};

export default function () {
  return (<>{
    Object.keys(All).filter(name => name !== 'default').map(name => {
      return <Sub name={name} key={name} component={All[name]}/>
    })
  }</>);
};
