import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { message } from 'antd';
import { history } from './assets/helpers/history'
import { connect } from 'react-redux';

import IndexPage from './views/indexPage';
import HomePage from './views/homePage';
import Page404 from './views/page404';
import Play from './views/play';


import { PrivateRoute } from './assets/helpers/privateRoute';

import { movieActions } from './redux/actions/movie';

class App extends Component {


  getAllGenre = async () => {
    let res = await this.props.dispatch(movieActions.getAllGenre())
    console.log(res)
    return;
  }

  initMovies = async () => {
    let res = await this.props.dispatch(movieActions.initMovies())
    console.log(res)
    return;
  }

  componentDidMount = async () => {
    this.getAllGenre();
    this.initMovies();
    // await this.getUserData();
  }

  render() {
    message.config({
      maxCount: 3,
    });

    // getUserData = async () => {
    //   let token = JSON.parse(localStorage.getItem('user'));
    //   if (token) {
    //     let res = await this.props.dispatch(userActions.getUserData(token));
    //     if (res !== 200 && res !== 500) {
    //       await this.props.dispatch(authActions.logoutUser());
    //     }
    //     // else if (res === 500){
    //     //   history.push('/yourenotsupposedtobehere/500');
    //     // }
    //     return res
    //   }
    // }
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path='/' component={IndexPage}/>
            <PrivateRoute path='/home' component={HomePage}/>
            <PrivateRoute path='/play' component={Play}/>
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);