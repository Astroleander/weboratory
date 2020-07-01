import React, { useReducer } from 'react'
import useInterval from "@/components/useInterval";
import './sample.scss'

const initialState = {
  timestamp: Date.now(),
  count: 0
}

export default function SampleSkeleton() {  
  const [state, dispatch] = useReducer((state, timestamp) => {
    return {
      count: state.count + ((timestamp - state.timestamp)/1000),
      timestamp
    }
  }, initialState);

  useInterval(()=>{
    dispatch(Date.now());
  }, 200)
  return (
    <div className='skeleton'>
      <p>Skeleton</p>
      <p>{(state.count).toFixed(1)}</p>
    </div>
  )
}
