import React from 'react';

const DefaultScroll = (props) => {
  return (
    <section className='scroll-x' id='solid-scroll'>
      <div className='float-descriptor'>Standard, ONLY CSS</div>
      {props.data.map(each => <div className='inner-square' key={each}>{each}</div>)}

    </section>
  );
}

export default DefaultScroll;
