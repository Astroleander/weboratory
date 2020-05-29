import React, { Component, useState, useEffect } from "react";
import ArrayUtils from '@/utils/array.js'

import traits from './res/npc-traits-zh.yml'
import details from './res/npc-details-zh.yml'
import graph from './graph.yml'

import ChartRadar from '@/components/charts/ChartRadar'
const PlayerDigital = (props) => {
  const [seed, setSeed] = useState(null)
  const [data, setData] = useState(null)
  const [info, setInfo] = useState(null)
  const [trait, setTrait] = useState(null)
  const [avatarURI, setAvatarURI] = useState(null)
  const [name, setName] = useState(null)

  if (props.seed !== seed) {
    setSeed(props.seed)
    setData(PropertyGenerator(props.seed));
    setInfo(InfoGenerator(props.seed))
    setTrait(TraitsGenerator(props.seed))
    setAvatarURI(AvatarURIGenerator(props.seed))
    setName(NameGenerator(props.seed))
  }
  
  useEffect(() => {
    props.setPlayer({seed, data, info, trait, avatarURI, name})
  })
  if (!seed){
    /** hooks do not effect immediately */
    return <>loading...</>
  }

  const radarData = Object.assign({}, data);
  Object.keys(radarData).forEach((e, i) => radarData[e] /= 100);
  return <section className='stats-panel'>
    <section className='sub-panel sub-panel-1'>
      <span>名字: {name}</span><br />
      <span>职业: {info.class}</span><br />
      <span>性别: {info.gender}</span><br />
      <span>稀有度: {Show.rare(seed.rare)}</span>
    </section>
    <section className='sub-panel sub-panel-2'>
      <ChartRadar data={[radarData]} color={drawRareColor(seed.rare)}></ChartRadar>
    </section>
    <section className='sub-panel sub-panel-3'>
    </section>
    <section className='sub-panel sub-panel-4'>
      {
        trait.map(each => each.type === 0 ?
          <span className='trait' key={each.value}>{each.value}</span> :
          <span className='trait' key={each.value}>{each.value}</span>
      )}
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

const InfoGenerator = (seed) => {
  let queue = [graph.start]
  let ret = {}
  console.group('Generate Info')
  while(queue.length) {
    let element = queue.shift()
    if(!element) break;
    /** 如果是选择点, 为 [properties, available set] 结构的 properties 从 available set 中赋值*/
    if(element.v) {
      console.log("Generator：", element.v)
      ret[element.v[0]] = assign(details[element.v[1]])
    }
    /** 如果是边, 进行倾向分支选择 */
    if(element.e) {
      console.log("Next：", element.e)
      let next = select(element.e);
      queue.push(graph[next])
    }
  }
  console.groupEnd('Generate Info')
  return ret
}
const NameGenerator = (seed) => {
  const length = new Array(3).fill(0).map(e => ~~(Math.random() * 5 + 1));
  const name = length.map(len => randomUnicode(len))
  const forms = [
    `${name[0]} · ${name[1]}`,
    `${name[0]}`,
    `${name[0]} · ${name[1]} · ${name[2]}`,
    `${name[1]} ${name[0]}`,
    `${name[0]}${name[1]}`,
    `${name[0]}-${name[1]}`,
    `${name[0]} el ${name[1]}`,
    `${name[0]} of ${name[1]}`,
  ]
  return ArrayUtils.randomSelect(forms, 1)
}
const TraitsGenerator = (seed, traitsgroup= 'western') => {
  let mTraits = ArrayUtils.randomSelect(traits['western'], Math.floor(Math.random() * traits['western'].length));
  // TODO: 需要更完善和强大的 trait 系统
  return mTraits.map(trait => Math.random() > 0.5 ? 
    { type:0, value: trait[0] } : 
    { type:1, value: trait[1] }
  )
}
const PropertyGenerator = (seed) => {
  const rollProperty = (rare) => {
    const addons = [rare * rare * 100 / 4];
    const distribution = Math.sin(Math.random() * Math.PI / 2) * 100 * rare
    return addons.reduce((p, v)=> p + v, 0) + distribution
  }
  const data =
  {
    '力量': rollProperty(seed.rare), '体质': rollProperty(seed.rare),
    '敏捷': rollProperty(seed.rare), '智慧': rollProperty(seed.rare),
    '感知': rollProperty(seed.rare), '魅力': rollProperty(seed.rare)
  }
  // console.log(data)
  return data
}

const AvatarURIGenerator = (seed) => {
  return `https://api.adorable.io/avatars/90/${seed.index}`
}

/** auxiliarys 👇 */

const assign = (dice) => {
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

const drawRareColor = (rare) => {
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

const randomUnicode = (length = 5) => {
  var array = new Uint16Array(length);
	window.crypto.getRandomValues(array);
	var str = '';
	for (var i = 0; i < array.length; i++) {
		str += String.fromCharCode(array[i]);
	};
	return str;
}

export default PlayerDigital;
