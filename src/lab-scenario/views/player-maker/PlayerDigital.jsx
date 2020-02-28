import React, { Component, useState } from "react";
import ArrayUtils from '@/utils/array.js'

import traits from './res/npc-traits-zh.yml'
import details from './res/npc-details-zh.yml'
import graph from './graph.yml'

import ChartRadar from '@/components/charts/ChartRadar'



const PlayerDigital = (props) => {
  let player = PlayerGenerator();
  
  const testData = 
    { '力量': Math.random() * 100, '体质': Math.random() * 100, '敏捷': Math.random() * 100, 
      '智慧': Math.random() * 100, '感知': Math.random() * 100, '魅力': Math.random() * 100 }
  Object.keys(testData).forEach((e,i) => testData[e] /= 100)
  
  return <section className='stats-panel'>
    <section className='sub-panel sub-panel-1'>
      <span>名字: </span><br />
      <span>职业: {player.class}</span><br />
      <span>性别: {player.gender}</span><br />
    </section>
    <section className='sub-panel sub-panel-2'>
      <ChartRadar data={[testData]}></ChartRadar>
    </section>
    <section className='sub-panel sub-panel-3'>
    </section>
    <section className='sub-panel sub-panel-4'>
      <TraitGeneerator></TraitGeneerator>
    </section>
    <section className='sub-panel sub-panel-5'></section>
    </section>
}

const PlayerGenerator = (seed) => {
  let queue = [graph.start]
  let ret = {}
  while(queue.length) {
    let element = queue.shift()
    if(!element) break;
    if(element.v) {
      console.log("Generator：", element.v)
      ret[element.v[0]] = roll(details[element.v[1]])
    }
    if(element.e) {
      console.log("Next：", element.e)
      let next = select(element.e);
      queue.push(graph[next])
    }
  }
  return ret
}
const TraitGeneerator = (seed) => {
  let mTraits = ArrayUtils.randomSelect(traits['western'], Math.floor(Math.random() * traits['western'].length))
  return mTraits.map(trait => Math.random() > 0.5 ?
    <span className='trait' key={trait[0]}>{trait[0]}</span> :
    <span className='trait' key={trait[1]}>{trait[1]}</span>
  )
}

const select = (dice) => {
  if (dice) {
    let sum = dice.reduce((acc, cur) => {
      return acc + cur[1]
    }, 0)
    let roll = Math.random() * sum;
    let c = 0;
    for (let index = 0; index < dice.length; index++) {
      c += dice[index][1];
      if (c >= roll) return dice[index][0];
    }
  }
  return dice && dice[0] && dice[0][0]
}

const roll = (dice) => {
  if (dice) {
    let sum = dice.reduce((acc, cur) => {
      return acc + cur[1]
    }, 0)
    let roll = Math.random() * sum;
    let c = 0;
    for (let index = 0; index < dice.length; index++) {
      c += dice[index][1];
      if (c >= roll) return getAffixes(dice[index]);
    }
  }
  return '???'
}

const getAffixes = (item) => {
  let affixes = ''
  /** prefix */
  if (item[2]) {
    Math.random() > 0.5 ?
      affixes += ArrayUtils.randomSelect(...details[ArrayUtils.randomSelect(item[2])]):
      affixes
  }
  affixes += item[0]
  return affixes
}

export default PlayerDigital;
