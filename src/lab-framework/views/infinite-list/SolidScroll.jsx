import React, {useRef} from 'react';

const SolidScroll = (props) => {
  const onWheel = (e) => {
    element.current.scrollLeft += e.deltaY
  }
  const element = useRef(null);
  return (
    <section className='scroll-x' id='solid-scroll'
      ref={element}
      style={{overflowX: 'hidden'}}
      onWheel={onWheel}>
      <div className='float-descriptor'>JS, with <code>scrollLeft</code></div>

      {props.data.map(each => <div className='inner-square' key={each}>{each}</div>)}

    </section>
  );
}

export default SolidScroll;
