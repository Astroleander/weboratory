// import React, { useState, useEffect } from 'react';
// // @ts-ignore
// import FABG from '@/components/FABG';

// // DO not support function as algo's params

// interface CodeModule {
//   module: any,
//   route: string,
//   func: Function,
//   params: Array<CodeModuleParam>,
// };

// interface CodeModuleParam {
//   key: string,
//   value: any,
//   type: string,
// }

// const handleArgChange = (val: any, key, params) => {
//   let newer = this.state['inputs';
//   if (this.state['inputs_type'][idx] === 'number') {
//     /** 
//      * 1. if string endswith '-' means user enter '-' just now
//      * 2. currently, val is like 'xxx-', newer[idx] is the old value xxx (number)
//      * 3. so we could just set val to negtive
//      */
//     if (String.prototype.endsWith.call(val, "-")) {
//       val = -newer[idx];
//     }
//     newer[idx] = Number(val);
//     if (Number.isNaN(newer[idx])) newer[idx] = 0;
//   } else {
//     newer[idx] = val;
//   }
//   this.setState({ inputs: newer });
// }

// const useModule =  =>(path: string) => {
//   const [state, setState] = useState<T>(undefined);
  
//   /* only execute once */
//   useEffect(() => {
//     import('@/snippet/algorithm' + path).then(m => {
//       const module = m.default || m;
//       console.log(m)
//       const route = path;
//       const params = Object.keys(module).map(key => ({
//         key,
//         value: module[key],
//         type: typeof module[key],
//       }));
//       const func = params?.find(p => p.type === 'function')?.value;
//       setState({
//         module, route, params, func
//       })
//     });
//   }, []);

//   return [ state, setState ];
// }

// const renderCode = (fn?: Function) => (
//   <pre>{fn && String(fn)}</pre>
// )

// const renderArgs = (params: Array<CodeModuleParam>, setModule: Function) => {
//   /** display all params and create input for primitive type params */
//   return params.map(({type, value, key}, idx) => {
//     return (
//       <div key={key} className='float-label-container'>
//         <input
//           id={`args-${key}`}
//           value={value}
//           onChange={(e) => handleArgChange(e.target.value, key, params)}
//           disabled={( type === 'number' || type === 'string' ? false : true)}
//         />
//         <label htmlFor={`arg-${idx}`}>
//           <code>
//           {type === 'object' ?
//             JSON.stringify(value) : value}
//         </code>
//         </label>
//       </div>
//     )
//   });
// };

// const renderResults = (fn: Function, module?: any) => {
//   return (
//     <div>result:
//       <blockquote>
//         {JSON.stringify(fn(...module.inputs))}
//       </blockquote>
//     </div>
//   )
// };

// const renderRuntime = (codeModule?: any, setModule: any) => {
//   if (!codeModule) return null;
//   const {params, module, func} = codeModule;
//   return (
//     <>
//       <hr />
//       {renderArgs(params, setModule)}
//       <hr />
//       {func && renderResults(func, module)}
//     </>
//   );
// }

// export default function AlgoLayout(props: any) {
//   let path = props.location.pathname.substring(props.location.pathname.indexOf('/', 2));
//   let [ module, setModule ] = useModule(path);

//   return (
//     <>
//       {module && <section>
//         {renderCode(module.func)}
//         {renderRuntime(module, setModule)}
//       </section>}
//       <FABG />
//     </>
//   )
// }
