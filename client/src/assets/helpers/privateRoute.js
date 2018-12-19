import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Layout} from 'antd';
import { connect } from 'react-redux';
import SideMenu from '../../components/sideMenu';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        <div>
					<Layout style={{height: '100vh'}}>
						<SideMenu />
						<Layout.Content>
							<Component {...props}/>
						</Layout.Content>
					</Layout>
        </div>
    }
  />
);
export default connect()(PrivateRoute);