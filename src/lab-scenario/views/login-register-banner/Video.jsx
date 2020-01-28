import React, { Component, useState } from 'react'

export default class Video extends Component {
  constructor(props) {
    super(props);
    let arr = generateTitleArray(props.title);
    this.state = {
      title: arr,
      stageTrigger: setInterval(() => {
        let pick_number = ~~(Math.random() * 5);
        let set = new Set();
        while (pick_number) {
          pick_number --;
          set.add(~~(Math.random() * this.state.title.length)); 
        }
        set.forEach(e => {
          setTimeout(() => this.toStage(e, 0), 300);
          setTimeout(() => this.toStage(e, 2), 400);
          setTimeout(() => this.toStage(e, 1), 450 + ~~(Math.random() * 100));
        })
      }, ~~(Math.random() * 1200))
    }
  }
  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.title !== this.props.title) {
      this.updateAndNotify();
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.stageTrigger);
  }
  render() {
    return (
      <div className="middle-layer">
        <div className="ytp-container">
          <iframe
            id="ytp-iframe"
            width="177%"
            height="100%"
            src="https://www.youtube.com/embed/O7Jt4s_a-Pg?autoplay=1&loop=1&mute=1&controls=0&fs=0&iv_load_policy=3&showinfo=0&rel=1&cc_load_policy=0&origin=localhost&playlist=O7Jt4s_a-Pg"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="float-container">
          <div className="title">
            {this.state.title.map(e => (
              <span
                key={e.idx}
                style={{ fontSize: `${e.fontSize}em` }}
                className={`title-text-animation stage-${e.stage}`}
              >
                {e.char}
              </span>
            ))}
          </div>
          <div className="sub-title">{this.props.subtitle}</div>
        </div>
      </div>
    );
  }
  updateAndNotify() {
    let arr = generateTitleArray(this.props.title);
    this.setState({title: arr})
  }
  toStage(idx, stage) {
    let arr = this.state.title;
    arr[idx].stage = stage
    this.setState({
      title: arr
    })
  }
  toggleName() {

  }
}

function shuffle() {

}

function generateTitleArray(text) {
  const ret = [];
  for (const idx in text) {
    ret.push({
      char: text[idx],
      stage: null,
      idx,
      fontSize: 0.7 + Math.random() * 1
    })
  }
  return ret
}