import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { message } from 'antd';
import { history } from './assets/helpers/history'

import IndexPage from './views/indexPage';
import HomePage from './views/homePage';

import { PrivateRoute } from './assets/helpers/privateRoute';

class App extends Component {
  render() {
    message.config({
      maxCount: 3,
    });
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path='/' component={IndexPage}/>
            <PrivateRoute path='/home' component={HomePage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;