import React from 'react';
export default class AlgoLayout extends React.Component {
  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname;
    let path = pathname.substring(pathname.indexOf('/', 2));
    /** 👇 Webapck 使用实时 import 的时候经常需要限定范围 */
    import('@/snippet/algorithm' + path).then(m => {
      let state = { path }
      console.log(m)
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
          <hr />
          {key && this.state[key] && this.state['inputs'] && this.state['inputs_type'] && this.renderArgs()}
          <hr />
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
        <div key={`${idx}`} className='float-label-container'>
          <input
            id={`args-${idx}`}
            value={this.state['inputs'][idx]}
            onChange={(e) => this.handleArgChange(e.target.value, idx)}
            disabled={(this.state['inputs_type'][idx] === 'number' || this.state['inputs_type'][idx] === 'string' ? '' : 'disabled')}
          />
          <label htmlFor={`arg-${idx}`}>
            <blockquote>
            {typeof this.state['inputs'][idx] === 'object' ?
              JSON.stringify(this.state['inputs'][idx]) : this.state['inputs'][idx]}
          </blockquote>
          </label>
        </div>
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
      <div onClick={this.handleBack} className='exit floating-button react-style'>
        <span className='cross'>+</span>
      </div>
    )
  }
}