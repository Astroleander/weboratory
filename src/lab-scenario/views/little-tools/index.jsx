import React, {Suspense} from 'react';

const ComponentWrapper = (props) => <section>
  <h3>{props.name}</h3>
  {props.children}
</section>

const LittleTools = () => {
  return <>
    {
      require.context('./', false, /(?!\.\/index\.jsx)^.*?\.jsx$/).keys().map(key => {
        key = key.substring(2)
        let Component = React.lazy(() => import('./' + key))
        return <Suspense key={key} fallback={<div>loading...</div>}>
          <ComponentWrapper name={key}>
            <Component></Component>
          </ComponentWrapper>
        </Suspense>
     })
    }
  </>
}

export default LittleTools;
