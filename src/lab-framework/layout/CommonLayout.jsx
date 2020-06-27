import React, {Suspense} from "react";
import FABG from "../../components/FABG";

const CommonLayout = (props) => {
  let pathnameArr = props.location.pathname.split(/\//g);
  let pathname = pathnameArr[pathnameArr.length - 1] === 'index.jsx' ? `${pathnameArr[2]}/` : pathnameArr[2] 
  const DynamicComponent = React.lazy(() => import(`../views/${pathname}`));
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <DynamicComponent />
      </Suspense>
      <FABG></FABG>
    </div>
  );
};

export default CommonLayout;
