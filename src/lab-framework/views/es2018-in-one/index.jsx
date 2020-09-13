import React from 'react';

import * as All from './';

import { RegSample, CodeSample, MultCodeSample } from "@/components/CodeSample";
import { Sub } from '../../components/CodeSection';

export const Rest__Properties = () => {
  return (
    <CodeSample>
      {/* javascript */`
        const { first, second, ...others } =  { first: 1, second: 2, third: 3, forth: 4};
        return others;
      `}
    </CodeSample>
  );
}

export const Spread__Properties = () => {
  return (
    <CodeSample>
      {/* javascript */`
        const mixin =  { first: 1, second: 2, third: 3, forth: 4};
        return { origin: 0, ...mixin };
      `}
    </CodeSample>
  );
}


export const Asynchronous__Iteration = () => (
<>
<CodeSample format>{/* javascript */`
// can be only used in async function
async function* asyncGenerator () {
  let i = 0;
  while (i < 1000) {
    yield new Promise(resolve => {
      setTimeout(() => {
        resolve(i++)
      }, i * 10);
    });
  }
}
for await (let each of asyncGenerator()) {
  update(each)
}
`}</CodeSample>
or you can implement yourself <code>Symbol.iterator</code>
</>
);

export const Promise_prototype_finally = () => (
<MultCodeSample format>{/* javascript */`
let promise_with_error = new Promise((resolve, reject) => {
  reject('Whatever i wanna test it finally');
}).then(r => next('then: ' + r))
  .catch(r => next('catch: ' + r))
  .finally(() => next('finally: it should run whatever happened'))
`}</MultCodeSample>
);

export const Regular__Expressions____Backreferences = () => {
  const tests = [
    'abc!abc',
    'abc!ab',
  ]

/** codesample */
return (
<>
<code>{"\\k<name>"}</code> in a regular expression means: match the string that was previously matched by the named capture group <code>{"name"}</code>. For example:
<RegSample regexp={new RegExp("^(?<word>[a-z]+)!\\k<word>$", "g")} tests={tests} />
The backreference syntax for numbered capture groups works for named capture groups, too:
<RegSample regexp={/^(?<word>[a-z]+)!\k<word>$/g} tests={tests} />
In fact, the regular expression using <code>{"\\k<name>"}</code> would compile to capture group.
The above two sample's expression are totally same in source code.
</>
);
}

export const Regular__Expressions____lookbehind__assertions = () => {
const tests = [
  'Drump loves China',
  'Drump loves China, and Drump Tonald makes it great again',
  'Drump loves China, Tonald real understand it',
]
/** codesample */
return (
<>
Search behind
<RegSample regexp={/(?<=Drump) Tonald/} tests={tests} />
and negative format
<RegSample regexp={/(?<!Drump) Tonald/} tests={tests} />

</>
);
};


export const Regular__Expressions____Unicode__property = () => {
const unicodetests = [
  'Rocket',
  'Rocket🚀',
  '🚀🚀🚀🚀',
  '🚀🙂🚀',
  '1234124',
];
const casetests = [
  'Rocket',
  'rocket',
  'ROCKET',
];
const numberictests = [
  'Rocket',
  '881',
  '88c',
  '🚀🚀🚀🚀',
];
/** codesample */
return (
<>
<a href='https://github.com/tc39/proposal-regexp-unicode-property-escapes'>
proposal-regexp-unicode-property-escapes
</a>
<RegSample regexp={new RegExp("^\\p{ASCII}+$", "u")} tests={unicodetests} />
<RegSample regexp={new RegExp("^\\P{ASCII}+$", "u")} tests={unicodetests} />
<RegSample regexp={new RegExp("^\\p{Emoji}+$", "u")} tests={unicodetests} />

<RegSample regexp={new RegExp("^\\p{ASCII_Hex_Digit}+$", "u")} tests={numberictests} />
<RegSample regexp={new RegExp("^\\P{ASCII_Hex_Digit}+$", "u")} tests={numberictests} />
<RegSample regexp={new RegExp("^\\p{Alphabetic}+$", "u")} tests={numberictests} />

<RegSample regexp={new RegExp("^\\p{Uppercase}+$", "u")} tests={casetests} />
<RegSample regexp={new RegExp("^\\P{Uppercase}+$", "u")} tests={casetests} />
<RegSample regexp={new RegExp("^\\p{Lowercase}+$", "u")} tests={casetests} />

<RegSample regexp={new RegExp("^\\p{Script=Greek}+$", "u")} tests={['ελληνικά', '中文']} />

</>
);
};

export const Regular__Expressions____dotAll__mode = () => {
const tests = [
  'foo\nbar',
  'foo bar',
  'foo\rbar',
];
return (
<>
By default, <code>.</code> matches any character except for line terminators:
<RegSample regexp={/foo.bar/} tests={tests} />
<RegSample regexp={new RegExp("foo.bar", "s")} tests={tests} />
its also a syntactic sugar that will compile like that:
<RegSample regexp={/foo.bar/s} tests={tests} />
</>
);
};

export const Named__Capture__Group = () => (
<>
<MultCodeSample>
{/* javascript */`
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;
const matchObj = reg.exec('2009-07-28');
yield matchObj.groups.year;
yield matchObj.groups.month;
yield matchObj.groups.day;
`}
</MultCodeSample>
</>
);

export default function View() {
  return (<>{
    Object.keys(All).filter(name => name !== 'default').map(name => 
      <Sub name={name} key={name} component={All[name]}/>
    )
  }</>);
};