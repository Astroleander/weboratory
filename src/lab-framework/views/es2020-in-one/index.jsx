import React, { useState, useEffect } from 'react';
import * as All from './';
import CodeSample from '@/components/CodeSample/index.tsx';
import styles from './index.module.css';
import { Sub } from '../../components/CodeSection';

const initVal = () => [Number.MAX_SAFE_INTEGER, BigInt(Number.MAX_SAFE_INTEGER)]
export const BigInt__Sample = () => {
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

export const Promise_allSettled = () => {
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
export const String_matchAll = () => {
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
export const Dynamic__Import = () => {
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
    <button onClick={e => handleChange('String_MatchAll', setModuleName)}>MatchAll</button>
    <button onClick={e => handleChange('BigInt_Sample', setModuleName)}>BigIntSample</button>
    <button onClick={e => handleChange(null, setModuleName)}>null</button>
    {Module !== null && <Module />}
    <br />
  </>);
};

export const Global__This = () => {
  return (
    <>
      <CodeSample format>{/* javascript */`// standardize
const myGlobalThis = () => { 
  if (typeof self !== 'undefined') { return self }
  else if (typeof window !== 'undefined') { return window }
  else if (typeof global !== 'undefined') { return global }
  throw new Error('unknown global');
}
return myGlobalThis() === globalThis;
      `}
      </CodeSample>
    </>
  )
};

export const Nullish__Coalescing = () => {
  return (<CodeSample>{/* javascript */`
    return window.location.i_do_not_care ?? 'Not found'
  `}
  </CodeSample>);
};

export const Optional__Chaining = () => {
  return (<CodeSample>{/* javascript */`
    return window.location?.i_do_not_care?.what_the_punk_i_am || 'sure be nothing'
  `}
  </CodeSample>);
};

export const ForIn__Mechanics = () => {
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
