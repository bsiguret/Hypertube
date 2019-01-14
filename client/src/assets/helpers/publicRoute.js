import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ component: Component, isAuth, isVerified, sideMenuFilter, ...rest }) => (
  <Route
    {...rest}
    render={props =>
			isAuth === true ? (
				isVerified === 1 ? (
					<Redirect to='/home' />
				) : (
					<Component {...props} />
				)
			) : (
				<Component {...props} />
			)
		}
	/>
);
export default PublicRoute;