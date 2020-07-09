import React, { Component } from 'react';
function debounce(fn, time) {
  var startTime;
  var timer;
  var _callback;
  var result;
  time = Math.max(0, +time || 0);

  function checkTime() {
    timer = null;
    if (Date.now() >= startTime) _callback();else checkTimer();
  }

  function checkTimer() {
    if (!timer) {
      var delta = startTime - Date.now();
      timer = setTimeout(checkTime, delta);
    }
  }

  function debouncedFunction() {
    var _this = this;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    startTime = Date.now() + time;

    _callback = function callback() {
      _callback = null;
      result = fn.apply(_this, args);
    };

    checkTimer();
    return result;
  }

  return debouncedFunction;
}

const boundaryOptions = {
  OBSERVER_INIT_DELAY: 300,
  DEBOUNCE_DELAY: 1000,
};

const observerOptions = {
  threshold: 0.3,
};

export default class LoaderBoundary extends Component {
  /* ===init starts=== */
  constructor(props) {
    super(props);
    this.observer = null;
    this.observee = null;
  }

  state = {
    /* flags */
    pending: false,
    loaded: false,
    success: false,
  }
  /* === init ends === */

  /* === life cycle functions starts === */
  shouldComponentUpdate(_, nextState) {
    const { pending, loaded, success } = this.state;
    /* only update when any flag changes */
    let needUpdate = !(
      nextState.pending === pending
      && nextState.loaded === loaded
      && nextState.success === success
    );
    return needUpdate;
  }

  componentDidMount() {
    setTimeout(() => {
      this.observer = new IntersectionObserver(entries => this.intersectionChangeCallback(entries), observerOptions);
      this.observer.observe(this.boundary);
    }, boundaryOptions.OBSERVER_INIT_DELAY);
  }

  componentWillUnmount() {
    this.observer.unobserve(this.boundary);
    this.observer.disconnect();
  }

  /* === life cycle functions ends === */
  /* === customary functions start === */

  checkPending = debounce(this._checkPending, boundaryOptions.DEBOUNCE_DELAY);

  _checkPending() {
    const { element, event } = this.observee;
    if (element && event.isIntersecting) {
      if (!this.state.loaded) {
        this.tryFetchData();
      }
      this.setState({ pending: true });
    }
  }

  intersectionChangeCallback(entries) {
    entries.forEach(el => {
      this.observee = {
        element: el.target,
        event: el,
      };
      this.checkPending(this);
    });
  }

  async tryFetchData() {
    try {
      const { fetchData } = this.props;
      if (fetchData) {
        const response = await fetchData();
        this.setState({ response });
      }
      this.setState({ loaded: true, success: true });
    } catch (e) {
      this.setState({ loaded: true, success: false });
    }
  }

  /* ===customary functions ends=== */
  /* ===render starts=== */

  renderBoundary() {
    const { Skeleton, Loading, Failed } = this.props;
    const { pending, loaded, success } = this.state;

    /* 此处是 if-else, 须按照先后顺序放置 */
    const ruleMap = [
      { template: Skeleton || '', rule: true },
      { template: Loading || '', rule: pending },
      { template: Failed || '', rule: pending && loaded },
      { template: this.props.children, rule: pending && loaded && success },
    ];

    /* 取最后一个符合的条件组 */
    let Content = ruleMap.reduce((prev, cur) => {
      if (cur.rule === true) return cur.template;
      return prev;
    }, Skeleton);

    /* inject props */
    if (typeof Content === 'function') {
      return <Content />;
    }
    let propsChildren = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { data: this.state.response });
    });
    return propsChildren;
  }

  render() {
    return (
      <div ref={el => this.boundary = el}>
        {this.renderBoundary()}
      </div>
    );
  }
}
