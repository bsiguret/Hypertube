import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { message } from 'antd';
import { history } from './assets/helpers/history'
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Cookies from 'js-cookie';

import IndexPage from './views/indexPage';
import HomePage from './views/homePage';
import Page404 from './views/page404';
import MoviePage from './views/moviePage';
import EmailValidationPage from './views/emailValidationPage';

import { PrivateRoute } from './assets/helpers/privateRoute';
import { PublicRoute } from './assets/helpers/publicRoute';

import { userActions } from './redux/actions/user';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  getUser = async () => {
    if (Cookies.get('token')) {
      let res = await this.props.dispatch(userActions.getUser())
      if (res.status !== 200) {
        message.error('Please log in, your session may have expired')
      }
      return;
    }
  }

  componentDidMount = async () => {
    await this.getUser();
    this.setState({ loading: false})
  }

  render() {
    const { isAuth, isVerified } = this.props
    const { loading } = this.state
    message.config({
      maxCount: 3,
    });
    return (
      <Router history={history}>
        <div>
          {loading &&
					<div className='router-loading' style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin size="large"/>
          </div>}
          {!loading &&
          <Switch>
            <PublicRoute exact path='/' component={IndexPage} isAuth={isAuth} isVerified={isVerified} sideMenuFilter={false} />
            <PublicRoute exact path='/emailvalidation/:username/:token' component={EmailValidationPage} isAuth={isAuth} isVerified={isVerified} sideMenuFilter={false} />
            <PrivateRoute path='/home' component={HomePage} isAuth={isAuth} isVerified={isVerified} sideMenuFilter={true} />
            <PrivateRoute path='/movie/:id' component={MoviePage} isAuth={isAuth} isVerified={isVerified} sideMenuFilter={false} />
            <Route component={Page404} />
          </Switch>}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  isVerified: state.userReducer.user.isVerified,
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(App);