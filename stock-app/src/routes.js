import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from "./App";
import Graph from "./graph";
//import Log from "./login";

const Routes = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={App}></Route>
      <Route exact path='/graph' component={Graph}></Route>
    </Switch>
  );
}

export default Routes;