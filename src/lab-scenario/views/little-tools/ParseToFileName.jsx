import React, {useState} from 'react';

const parseToFileName = (str) => {
  return str.replace(/[\t\n\r\s]/mg, "_")
}
const handleClick = (e) => {
  let text = e.target.innerHTML;
  navigator.permissions.query({name: 'clipboard-write'}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(text);
      alert('已复制到剪切板')
    }
  })
}
const ThesisNameToFileName = () => {
  const [title, setTitle] = useState('');
  const titleStyle = {
    background: 'pink',
    padding: '0 .4em',
  }
  const inputStyle = {
    boxSizing: 'border-box',
    width: '98%',
    height: '3em',
    padding: '0 .4em',
    margin: '0 1%'
  }
  return (<>
    <input style={inputStyle} type='input' onChange={e => setTitle(parseToFileName(e.target.value))}></input>
    <p style={titleStyle} onClick={e => handleClick(e)}>{title}</p>
  </>)
}

export default ThesisNameToFileName;