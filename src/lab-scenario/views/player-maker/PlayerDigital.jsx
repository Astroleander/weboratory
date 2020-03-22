import React, { Component, useState } from "react";
import ArrayUtils from '@/utils/array.js'

import traits from './res/npc-traits-zh.yml'
import details from './res/npc-details-zh.yml'
import graph from './graph.yml'

import ChartRadar from '@/components/charts/ChartRadar'



const PlayerDigital = (props) => {
  let player = PlayerGenerator(props.seed);
  const data = PropertyGenerator(props.seed);
  Object.assign(player, props)

  Object.keys(data).forEach((e,i) => data[e] /= 100)
  
  return <section className='stats-panel'>
    <section className='sub-panel sub-panel-1'>
      <span>名字: </span><br />
      <span>职业: {player.class}</span><br />
      <span>性别: {player.gender}</span><br />
      <span>稀有度: {Show.rare(player.seed.rare)}</span>
    </section>
    <section className='sub-panel sub-panel-2'>
      <ChartRadar data={[data]} color={color(player.seed.rare)}></ChartRadar>
    </section>
    <section className='sub-panel sub-panel-3'>
    </section>
    <section className='sub-panel sub-panel-4'>
      特质: <TraitsGenerator></TraitsGenerator>
    </section>
    <section className='sub-panel sub-panel-5'></section>
    </section>
}

const Show = {
  rare: (rank) => {
    let ret = ''
    while (rank > 0) {
      rank -= 0.1
      if (ret[ret.length - 1] === '☆') {
        ret = ret.substring(0, ret.length - 1)
        ret += '★'
      } else {
        ret += '☆'
      }

    }
    return <>{ret}</>
  }
}

const PlayerGenerator = (seed) => {
  let queue = [graph.start]
  let ret = {}
  while(queue.length) {
    let element = queue.shift()
    if(!element) break;
    if(element.v) {
      console.log("Generator：", element.v)
      ret[element.v[0]] = rollProfessor(details[element.v[1]])
    }
    if(element.e) {
      console.log("Next：", element.e)
      let next = select(element.e);
      queue.push(graph[next])
    }
  }
  return ret
}
const TraitsGenerator = (seed) => {
  let mTraits = ArrayUtils.randomSelect(traits['western'], Math.floor(Math.random() * traits['western'].length))
  return mTraits.map(trait => Math.random() > 0.5 ?
    <span className='trait' key={trait[0]}>{trait[0]}</span> :
    <span className='trait' key={trait[1]}>{trait[1]}</span>
  )
}
const PropertyGenerator = (seed) => {
  const rollProperty = (rare, ...fix) => {
    return fix.reduce((p, v)=> p + v, 0) + 
      Math.random() * 100 * (1.1 * rare + 0.15)
  }
  const data =
  {
    '力量': rollProperty(seed.rare), '体质': rollProperty(seed.rare), 
    '敏捷': rollProperty(seed.rare), '智慧': rollProperty(seed.rare), 
    '感知': rollProperty(seed.rare), '魅力': rollProperty(seed.rare)
  }
  console.log(data)
  return data
}



const rollProfessor = (dice) => {
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

const color = (rare) => {
  const rules = [
    ['#999999', rare => rare < 0.2],
    ['#ffe082', rare => 0.2 <= rare && rare < 0.4],
    ['#ffe082', rare => 0.4 <= rare && rare < 0.6],
    ['#ffd54f', rare => 0.6 <= rare && rare < 0.8],
    ['#f44336', rare => 0.8 <= rare && rare < 0.9],
    ['#ff5252', rare => 0.9 <= rare]
  ]
  return rules.find(rule => rule[1](rare))[0];
}

export default PlayerDigital;
