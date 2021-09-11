import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from "./App";
import Home from "./home";
//import Log from "./login";

export default (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
);