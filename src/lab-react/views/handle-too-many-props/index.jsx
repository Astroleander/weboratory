import React from 'react';
// TODO : we need a common mock maven;
const form = {
  name: 'abalili',
  email: 'abalili@elephant.com',
  password: 'password',
  address: 'No.10 of Coco Street',
  fool: true,
  fruit: { apple: 'ipple', orange: 'orcange' }
};
const formAddons = {
  fruit: { apple: 'bpple', banana: 'yellow' },
  address: 'Another',
  newProps: 123,
};

/* child component - print all its props */
const PropsPrinter = props => (<>{
  Object.keys(props).map(propKey => {
    return <p className='no-margin' key={JSON.stringify(propKey)}>{propKey}: {JSON.stringify(props[propKey])}</p>
  })
}</>);

export default function Index() {

  return (
    <div style={{ fontSize: '0.6em' }}>
      <h1>PropsEater</h1>
      {/* 参数太长 */}
      <PropsPrinter name={form.name} email={form.email} password={form.password} address={form.address}></PropsPrinter>
      <hr />
      {/* 使用 rest 语法批发参数, 其会按照先后顺序覆盖 props */}
      <PropsPrinter email='front-email' {...form} {...formAddons} name='end-name'></PropsPrinter>
      <hr />
    </div>
  )
}
