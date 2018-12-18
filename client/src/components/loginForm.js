import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

class LoginForm extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.props.form)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
		const { getFieldDecorator } = this.props.form;
    return (
			<div className='indexLoginFormWrapper'>
				<Form onSubmit={this.handleSubmit} className="indexLoginForm">
					<Form.Item>
						{getFieldDecorator('email', {
							rules: [{
								type: 'email', message: 'The input is not valid E-mail!',
							}, {
								required: true, message: 'Please input your E-mail!',
							}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</Form.Item>
					<Form.Item>
						<Button block type="primary" htmlType="submit" className="loginFormButton">
							Log In
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
  }
}

export default Form.create()(LoginForm);