import React from 'react'
const form = {
  name: 'abalili',
  email: 'abalili@elephant.com',
  password: 'password',
  address: 'No.10 of Coco Street',
  fool: true,
  fruit: { apple: 'ipple', orange: 'orcange' }
}
const formAddons = {
  fruit: { apple: 'bpple', banana: 'yellow'},
  address: 'Another',
  newProps: 123,
}
/* ==========压缩 props========== */
const PropsEater = props => {
  return <div>
    {
      Object.keys(props).map(propKey => {
      return <p className='no-margin' key={JSON.stringify(propKey)}>{propKey}: {JSON.stringify(props[propKey])}</p>
      })  
    }
  </div>
}

/* =========mixin props========= */
const PropsWrapper = props => {
  let clone = React.cloneElement(props.children, formAddons)
  return (<div>
    {clone}
  </div>)
}

export default function Index() {
  return (
    <div style={{fontSize: '0.6em'}}>
      <h1>PropsEater</h1>
      <PropsEater name={form.name} email={form.email} password={form.password} address={form.address}></PropsEater>
      <hr />
      <PropsEater {...form} ></PropsEater>
      <hr />
      <h1>PropsWrapper</h1>
      <PropsWrapper>
        <PropsEater {...form} />
      </PropsWrapper>
    </div>
  )
}
