import React from 'react';
export default class AlgoLayout extends React.Component {
  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname;
    let path = pathname.substring(pathname.indexOf('/', 2));
    /** 👇 Webapck 使用实时 import 的时候经常需要限定范围 */
    import('@/snippet/algorithm' + path).then(m => {
      let state = { path };
      let module = m.default || m;
      console.log(module);

      Object.keys(module).forEach(propertyName => {
        /** copy each param */
        state[propertyName] = m.default[propertyName]
        /** parse name and params of function */
        if (propertyName !== 'inputs') { /** 👈 means the property is the function (so our functions name can't be 'inputs') */
          state['func_key'] = propertyName
        } else { /** 👈 means the property is inputs */
          state['inputs_type'] = [...module[propertyName].map(propertyName => typeof propertyName)]
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
    /** [📖 review] precedence of Logic OR(||) is 5, and Logic AND(&&) is 6 */
    let func_key = (this.state && this.state["func_key"]) || undefined;
    return (
      <>
      {(
        <div>
          <pre>{func_key && String(this.state[func_key])}</pre>
          <hr />
          {/** delay timing of params render until function has loaded*/}
          {func_key && this.state[func_key] && this.state['inputs'] && this.state['inputs_type'] && this.renderArgs()}
          <hr />
          {func_key && this.state[func_key] && this.state['inputs'] && this.renderResults(func_key)}
        </div>
      )}
      <FloatButton />
      </>
    )
  }
  renderArgs() {
    /** display all params and create input for primitive type params */
    return this.state['inputs'].map((item, idx) => {
      return (
        <div key={`${idx}`} className='float-label-container'>
          <input
            id={`args-${idx}`}
            value={this.state['inputs'][idx]}
            onChange={(e) => this.handleArgChange(e.target.value, idx, e)}
            disabled={(this.state['inputs_type'][idx] === 'number' || this.state['inputs_type'][idx] === 'string' ? '' : 'disabled')}
          />
          <label htmlFor={`arg-${idx}`}>
            <code>
            {typeof this.state['inputs'][idx] === 'object' ?
              JSON.stringify(this.state['inputs'][idx]) : this.state['inputs'][idx]}
          </code>
          </label>
        </div>
      )
    });
  }
  renderResults(key) {
    let f = this.state[key];
    return (
      <div>result:
        <blockquote>
          {JSON.stringify(f(...this.state['inputs']))}
        </blockquote>
      </div>
    )
  }
  handleArgChange(val, idx, e) {
    let newer = this.state['inputs'];
    if (this.state['inputs_type'][idx] === 'number') {
      /** 
       * 1. if string endswith '-' means user enter '-' just now
       * 2. currently, val is like 'xxx-', newer[idx] is the old value xxx (number)
       * 3. so we could just set val to negtive
       */
      if (String.prototype.endsWith.call(val, "-")) {
        val = -newer[idx];
      }
      newer[idx] = Number(val);
      if (Number.isNaN(newer[idx])) newer[idx] = 0;
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