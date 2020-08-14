import React from 'react';
import Test from './Test';

const StandardLazy = React.lazy(() => import('./Test'));

const WithPromise = React.lazy(() => new Promise(reslove => {
    return reslove(import('./Test'));
  }) //end Promise
);

const WithThen = React.lazy(() => import('./Test').then(async m => {
    // you can fuck data here
    await new Promise(r => setTimeout(() => r(), 3000));
    let fn = m.default;
    let extra_props = {
      inject_props: 'i inject my self during importing'
    };
    const hackerMoudle = {
      default: (props) => React.cloneElement(fn(Object.assign({}, props, extra_props))),
      /* 👇 这两个居然不是伪造必要的 */
      // [Symbol.toStringTag]: 'Module',
      // __esModule: true,
    }
    return hackerMoudle;
  }) // end then
);

const MixinPromiseThen = React.lazy(() => new Promise(reslove => {
    return reslove(import('./Test'));
  }) //end Promise
);

const Customary = React.lazy(() => new Promise(resolve => resolve({
    default: (props) => Test(props)
  })
));

const SuspenseWrapper = ({Child}) => (<>
  <React.Suspense fallback={'.....loading'}>
    {Child}
  </React.Suspense>
</>)

export default function index() {
  const lazyList = [
    <StandardLazy title='standard react lazy' content='assfapfojasfweq'/>,
    <WithPromise title='with new promise' content='assfapfojasfweq'/>,
    <WithThen title='with then' content='assfapfojasfweq'/>,
    <Customary title='make by my self' />,
    <MixinPromiseThen title='mixin promise & then' />
  ]
  return (
    <section>
      {lazyList.map((Component, idx) => <SuspenseWrapper Child={Component} key={idx}></SuspenseWrapper>)}
    </section>
  )
}
