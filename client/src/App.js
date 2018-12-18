import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";

import IndexPage from './views/indexPage';
import { history } from './assets/helpers/history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path='/' component={IndexPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;