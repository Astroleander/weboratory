import React from 'react';
import Home from "@/lab-scenario/AppScenario.jsx";
import GlobalNavigation from "@/components/GlobalNavigation.jsx";

export default class NavLayout extends React.Component {
  render() {
    return (
      <>
        <GlobalNavigation />
        <Home />
      </>
    )
  }
}