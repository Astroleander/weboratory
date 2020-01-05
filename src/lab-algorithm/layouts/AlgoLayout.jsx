import React from 'react';
import Dashboard from '@algorithm/views/Dashboard'

export default class AlgoLayout extends React.Component {
  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname;
    let path = pathname.substring(pathname.indexOf('/', 2));
    console.log(path)
    /** 👇 Webapck 使用实时 import 的时候经常需要限定范围 */
    import('@/algorithm' + path).then(m => {
      let state = { path }
      Object.keys(m.default).forEach(propertyName => {
        /** copy each param */
        state[propertyName] = m.default[propertyName]
        /** parse name and params of function */
        if (propertyName !== 'inputs') {
          state['func_key'] = propertyName
        } else {
          state['inputs_type'] = [...m.default[propertyName].map(propertyName => typeof propertyName)]
        }
      })
      state['done'] = true;
      this.setState(state);
      console.log(this.state)
    })
  }
  /** 在参数加载完成之前不进行渲染，即不执行 render 中的 f 函数，避免莫名其妙的错误 */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState['done']
  }
  render() {
    let key = this.state && this.state['func_key'] || undefined
    return (
      <>
      {(
        <div>
          <pre>{key && String(this.state[key])}</pre>
          {key && this.state[key] && this.state['inputs'] && this.state['inputs_type'] && this.renderArgs()}
          {key && this.state[key] && this.state['inputs'] && this.renderResults(key)}
        </div>
      )}
      <FloatButton />
      </>
    )
  }
  renderArgs() {
    return this.state['inputs'].map((item, idx) => {
      return (
        <input
          key={`${idx}`}
          value={this.state['inputs'][idx]}
          onChange={(e) => this.handleArgChange(e.target.value, idx)}
          disabled={(this.state['inputs_type'][idx] === 'number' || this.state['inputs_type'][idx] === 'string' ? '' : 'disabled')}
        />
      )
    });
  }
  renderResults(key) {
    let f = this.state[key];
    return (
      <div>result:
        {JSON.stringify(f(...this.state['inputs']))}
      </div>
    )
  }
  handleArgChange(val, idx) {
    let newer = this.state['inputs'];
    if (this.state['inputs_type'][idx] === 'number') {
      if (val === '-') return -0;
      newer[idx] = Number(val);
    } else {
      newer[idx] = val;
    }
    this.setState({ inputs: newer });
  }
}

class FloatButton extends React.Component {
  constructor() {
    super();
    this.state = {
      rotateDeg: 45
    }
  }
  handleBack() {
    history.go(-1);
  }
  render() {
    return (
      <div onClick={this.handleBack} className='exit floating-button' id='react-common-layout-floating-button'>
        <span className='cross'>+</span>
      </div>
    )
  }
}