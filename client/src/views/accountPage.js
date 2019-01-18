import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import { connect } from 'react-redux';

// import { authActions } from '../redux/actions/auth';
// import { history } from '../assets/helpers/history';
import AccountForm from '../components/accountForm';

class AccountPage extends Component {

  render() {
    return (
				<Row type="flex" justify="space-around" align="middle" style={{height: '100vh'}}>
					<Col span={8}>
						<div className='resetPassFormWrapper'>
							<AccountForm />
						</div>
					</Col>
				</Row>
		)
  }
}

export default connect()(AccountPage);