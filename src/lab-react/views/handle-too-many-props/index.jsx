import React from 'react'

const form = {
  name: 'abalili',
  email: 'abalili@elephant.com',
  password: 'password',
  address: 'No.10 of Coco Street',
  fool: true
}
const PropsEater = props => {
  return <div>
    {
      Object.keys(form).map(propKey => {
        return <p key={propKey}>{props[propKey]}</p>
      })  
    }
  </div>
}
export default function Index() {
  return (
    <div>
      <PropsEater name={form.name} email={form.email} password={form.password} address={form.address}></PropsEater>
      <hr />
      <PropsEater {...form} ></PropsEater>
    </div>
  )
}
