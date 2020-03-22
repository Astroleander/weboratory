import React, { Component } from 'react'

const data = [
  { '力量': 0.70, '体质': 0.80, '敏捷': 0.25, '智慧': 0.55, '感知': 0.81, '魅力': 0.99 },
];

const chartSize = 250;
const numberOfScales = 10;
const middleOfChart = (chartSize / 2).toFixed(4);


const polar = (angle, distance) => [
  Math.cos(angle - Math.PI / 2) * distance,
  Math.sin(angle - Math.PI / 2) * distance
]

const pathDefinition = points => {
  let d = `M${points[0][0].toFixed(4)},${points[0][1].toFixed(4)}`;
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }
  return d + 'z';
}

const pointDefinition = points => {
  return points
    .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
    .join(' ');
}

const scale = (value) => (
  <circle 
    key={`scale-${value}`}
    cx={0}
    cy={0}
    r={((value / numberOfScales) * chartSize) / 2}
    fill={value % 2 ? '#FAFAFA' : '#F4F4F4'}
    stroke='#999'
    strokeWidth='0'
  />
)

const scaleArk = (columns, i) => {
  return (<path
    key={`shape-${i}`}
    d={
      pathDefinition(
        columns.map(col => {
          return polar(col.angle, i / numberOfScales * chartSize / 2);
        }
        ))
    }
    stroke={`#FFF`}
    fill={i % 2 ? '#FAFAFA' : '#EAEAEA'}
    fillOpacity=".9"
  />)
}

const axis = () => (col, i) => {
  return <polyline
    key={`poly-axis-${i}`}
    points={pointDefinition([[0, 0], polar(col.angle, chartSize / 2)])}
    stroke="#FFF7"
    strokeWidth="3"
  />
}

const shape = (columns, color) => (chartData, i) => {
  return (
  <path 
    key={`shape-${i}`}
    d={ 
      pathDefinition(
        columns.map(col => {
          const value = chartData[col.key];
          return polar(col.angle, (value * chartSize) / 2);
        }
      ))
    }
    stroke={color}
    fill={color}
    fillOpacity=".5"
    />
  )
}

const caption = () => col => {
  const [x, y] = polar(col.angle, (chartSize / 2 * 1.18).toFixed(4))
  console.log()
  return <text
    key={`caption-of-${col.key}`}
    x={x}
    y={y}
    dy='1%'
    dx='-8%'
    fill="#444"
    fontWeight="400"
    textshadow="1px 1px 0 #fff">
    {col.key}
    </text>
}

const ChartRadar = props => {
  console.log(props)

  const groups = [];
  const scales = [];
    
  const color = props.color || `#edc951`
  const dataset = props.data || data
  const captions = Object.keys(data[0])
  const columns = captions.map((key, i, all) => {
    return {
      key,
      angle: (Math.PI * 2 * i) / all.length
    }
  })

  for (let i = numberOfScales; i > 0; i--) {
    // scales.push(scale(i));
    scales.push(scaleArk(columns, i));
  }
  groups.push(<g key={`scales`}>{scales}</g>);

  groups.push(<g key={`groups`}>{dataset.map(shape(columns, color))}</g>)
  groups.push(<g key={`group-axes`}>{columns.map(axis())}</g>)
  groups.push(<g key={`group-captions`}>{columns.map(caption())}</g>)
  return (
    <svg
      overflow='visible' style={{ margin: '30px' }}
      version="1" 
      xmlns="http://www.w3.org/2000/svg" 
      width={chartSize}
      height={chartSize}
      viewBox={`0 0 ${chartSize} ${chartSize}`}
    >
      <g transform={`translate(${middleOfChart},${middleOfChart})`} >{groups}</g>
    </svg>
  );
};


export default ChartRadar;