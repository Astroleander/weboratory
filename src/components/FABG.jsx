/**
 * FABG =>
 * @Float
 * @Action
 * @Button
 * @Group
 */
import React from 'react';
import classNames from 'classnames';
import './FABG.less';

const CodeButton = (props) => <div
  id='code'
  onClick={()=>{}}
  className={classNames(props.className, "fabg-button")}
>
{"</>"}
</div>

const ForwardButton = (props) => <div
    id='forward'
    onClick={(e) => history.go(-1)}
    className={classNames(props.className, "fabg-button")}
  >
    {">"}
  </div>

const BackButton = (props) => <div
    id='back'
    onClick={(e) => history.go(-1)}
    className={classNames(props.className, 'fabg-button')}
  >
    <span className="cross">+</span>
  </div>

const Dict = {
  forward: ForwardButton,
  back: BackButton,
  code: CodeButton
}
const FABG = ({
  components = ['code', 'back'],
  size = 'middle',
  style = 'react-style',
  position = ['bottom', 'right']
} = {}) => {
  console.log(components)
  return (
    <section className='fabg-container bottom right'>
      { !Array.isArray(components) && (()=> {
          let Component = Dict[components];
          return <Component key={Dict[components]} className={[size, style]} ></Component>
        })() }
      { Array.isArray(components) && components.map(buttonKey => {
          const Component = Dict[buttonKey];
          if (Component === undefined) throw 'unmatched buttonkey : ' + buttonKey
          return <Component key={buttonKey} className={[size, style]} ></Component>
        }
      )}
    </section>
  )
}

export default FABG;