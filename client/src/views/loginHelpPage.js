import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import ResetPassForm from '../components/resetPassForm';

class LoginHelp extends Component {

  render() {
    return (
			<div>
				<Row type="flex" justify="end" align="top" >
					<Col span={2} style={{margin: '3%'}}>
						<Button block type="primary" href='/'>Log In</Button>
					</Col>
				</Row>
				<Row type="flex" justify="space-around" align="middle" style={{height: '70vh'}} >
					<Col span={8} >
						<h1>Forgot your password ?</h1>
						<p>We will send you an email with instructions on how to reset your password.</p>
						<ResetPassForm />
					</Col>
				</Row>
			</div>
		)
  }
}

export default LoginHelp;