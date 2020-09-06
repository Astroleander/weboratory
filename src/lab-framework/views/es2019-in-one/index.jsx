import React from 'react'

import { CodeSample, MultCodeSample } from "@/components/CodeSample";
import * as All from '.';
import { Sub } from '../../components/CodeSection';

export const Array_flat = () => {
  return (
  <MultCodeSample>
    {/* javascript */`
      const array = [1, 2, 3, [ 4, 5, 6, [ 7, 8, 9 ]]];
      yield array;
      yield array.flat();
      yield array.flat().flat();
      yield array.flat().flat().flat();
    `} 
  </MultCodeSample>);
}

export const Array_flatMap = () => {
  return (
    <>
    <p>first map each element, then flat them into a new array</p>
    <CodeSample>
      {/* javascript */`
        const array = [1, 2, 3, 4, 5];
        return array.flatMap(x => [x, x * 2]);
      `} 
    </CodeSample>
    </>
  );
}

const _ObjectFromEntries_Sample_1 = /* javascript */`
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  }
  const entries = Object.entries(obj);
  entries[0].push('extra array element cannot push to properties')
  yield entries;
  const object = Object.fromEntries(entries)
  yield Object.fromEntries(entries);
`;

const _ObjectFromEntries_Sample_2 = /* javascript */`
  const entries = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]);
  const object = Object.fromEntries(entries);
  yield object;
`
export const Object_fromEntries = () => {
  return (
  <>
    <MultCodeSample>
      {_ObjectFromEntries_Sample_1}
    </MultCodeSample>
    <MultCodeSample>
      {_ObjectFromEntries_Sample_2}
    </MultCodeSample>
  </>
  );
}

export const String__trimStart__and__trimEnd = () => {
  return (
    <>
    <CodeSample>
      {/* javascript */`
        return '        Hello world !          '.trim()
      `}
    </CodeSample>
    <CodeSample>
      {/* javascript */`
        return '        Hello world !          '.trimStart()
      `}
    </CodeSample>
    <CodeSample>
      {/* javascript */`
        return '        Hello world !          '.trimEnd()
      `}
    </CodeSample>
    </>
  )
}

export const Optional__Catch = () => {
  return (<CodeSample long>
    {/* javascript */`
    // sample
      try {
        throw 'Custom Error';
      } catch {
        return 'You can catch any Error';
      }
      return 'if normal'
    `}
  </CodeSample>);
}

export const Function_toString = () => {
  return (
  <>
  ES2019 brought changes to the way <code>Function.toString()</code> operates. Previously, it stripped white space entirely.
  <MultCodeSample>
    {/* javascript */`
      // sample
      const func = (a, b) => {
        return a + b;
      };
      yield func;
      yield func.toString();
    `}
  </MultCodeSample>
  </>);
}

export const Symbol_Description = () => {
  return (<MultCodeSample long='false'>
    {/* javascript */`
      const symbol = Symbol('symbol_sample');
      yield symbol;
      yield symbol.description;
      yield String(symbol);
    `}
  </MultCodeSample>);
}

export const uft__support__and__more__for__JSON_Stringify = () => {
  return (<MultCodeSample long='false'>
  {/* javascript */`
  // chrome will parse all unicode, its cannot display at webpage
    yield "\uD83D\uDE80"
    yield '🚀'
    yield JSON.stringify("\uD83D\uDE80")
  `}
  </MultCodeSample>);
}

export default function () {
  return (<>{
    Object.keys(All).filter(name => name !== 'default').map(name => {
      return <Sub name={name} key={name} component={All[name]}/>
    })
  }</>);
};
