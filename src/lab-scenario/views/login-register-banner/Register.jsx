import React, { Component } from 'react'

import kao_normal from '@/res/assets/images/reimu_01.jpg'
import kao_pwd from '@/res/assets/images/reimu_02.jpg'
import kao_captcha from '@/res/assets/images/reimu_03.jpg'
import kao_img from '@/res/assets/images/reimu_04.jpg'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { kao: kao_normal}
    // this.captcha = React.captcha();
  }
  
  kaoSelector(s) {
    switch(s) {
      case 'u':
        this.setState({ kao: kao_captcha })
        break;
      case 'p':
        this.setState({ kao: kao_pwd })
        break;
      case 'i':
        this.setState({ kao: kao_img })
        break;
      default:
        this.setState({ kao: kao_normal })
        break;
    }
    return 
  }
  render() {
    return (
      <div className="saisenbako-container">
        <div className="miko">
          <img src={this.state.kao} onMouseEnter={e => this.kaoSelector('i')} onMouseLeave={e => this.kaoSelector('')}/>
        </div>
        <form className="saisenbako">
          <fieldset>
            <label htmlFor='username'>UserName</label>
            <input onFocus={e => this.kaoSelector('u')} onBlur={e => this.kaoSelector('')} name='username'></input>
          </fieldset>
          <fieldset>
            <label htmlFor='password'>Password</label>
            <input onFocus={e => this.kaoSelector('p')} onBlur={e => this.kaoSelector('')} name='password' type='password'></input>
          </fieldset>
        </form>
      </div>
    );
  }
}
