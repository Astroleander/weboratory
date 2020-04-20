import React, {Suspense} from "react";

const CommonLayout = (props) => {
  let pathnameArr = props.location.pathname.split(/\//g);
  let pathname = pathnameArr[pathnameArr.length - 1] === 'index.jsx' ? `${pathnameArr[2]}/` : pathnameArr[2] 
  const DynamicComponent = React.lazy(() => import(`../views/${pathname}`));
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <DynamicComponent />
      </Suspense>
      <FloatButton />
    </div>
  );
};


const FloatButton = () => {
  return (
    <div
      onClick={(e) => history.go(-1)}
      className="exit floating-button react-style"
    >
      <span className="cross">+</span>
    </div>
  );
}

export default CommonLayout;
