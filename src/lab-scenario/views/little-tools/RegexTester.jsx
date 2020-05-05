import React from 'react';

const DisplayMatch = (regexp, tester) => {     
  try {
    return Array.from(tester.matchAll(new RegExp(regexp,'gm'))).map((e,i) => {
      const content = e[0], index= e.index;
      return <p key={i}><code>{content}</code> {content ? 'at':''} {content ? content.length === 1 ? index+1 : `${index + 1} - ${index + content.length }` : ''}</p>
    })
  } catch (e) {
    if (e instanceof SyntaxError) {
      return 'Current RegExp is illegal'
    } else {
      console.error(e)
      return 'Something wried'
    }
  }
}
// TODO：高亮和语法提示改进 // 这样一来这个问题会变得很复杂....
const RegexTester = () => {
  const [regexp, setRegExp] = React.useState(new RegExp('', 'gm'));
  const [tester, setTester] = React.useState('');
  const inputStyle = {
    boxSizing: 'border-box',
    height: '3em',
    padding: '0 .4em',
    margin: '1em 1%'
  }
  const container = {
    display: 'flex',
    flexDireciton: 'row'
  }
  return (<section style={container}>
    <section style={{width: '50%'}}>
      <p>
        <label style={{display:'block'}} htmlFor='regex'>RegExp</label>
        <input id='regex' style={inputStyle} type='input' onChange={e => setRegExp(e.target.value)}></input>
      </p>
      <p>
        <label style={{display:'block'}} htmlFor='tester'>Tester</label>
        <input id='tester' style={{...inputStyle,'width': '80%'}} type='input' onChange={e => setTester(e.target.value)}></input>
      </p>
    </section>
    <section style={{width: '50%', height: '100%', overflow: 'auto'}}>
      <p style={{fontWeight: 'bold'}}>Match:</p>
      {DisplayMatch(regexp, tester)}
    </section>
  </section>
  )
}

export default RegexTester;
