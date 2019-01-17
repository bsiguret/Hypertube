import React, { Component } from 'react';
import { Form, Icon, Input, Button, Avatar, Select } from 'antd';
import { connect } from 'react-redux';

import PhotoUploader from './photoUploader';

class AccountForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			err: {}
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
				console.log(values)
      }
    });
  }

  render() {
		const { err } = this.state;
		const { user } = this.props;
		const { getFieldDecorator } = this.props.form;
    return (
			<Form onSubmit={this.handleSubmit} className="indexSignupForm">
				<div style={{display: 'flex', justifyContent: 'space-around'}}>
					<Avatar shape="square" size={105} src={user.profile} />
					<PhotoUploader dispatch={this.props.dispatch}/>
				</div>
				<Form.Item
					validateStatus={err.username ? 'error' : 'success'}
					help={err.username}
				>
					{getFieldDecorator('username', {
						rules: [{ 
							type: 'string', message: 'The input is not valid',
						}, {
							whitespace: true , message: 'The input is not valid',
						}],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={user.username} />
					)}
				</Form.Item>
				<Form.Item
					validateStatus={err.email ? 'error' : 'success'}
					help={err.email}
				>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'The input is not valid',
						}, {
							whitespace: true , message: 'The input is not valid',
						}],
					})(
						<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder={user.email} />
					)}
				</Form.Item>
				<Form.Item
					validateStatus={err.firstname ? 'error' : 'success'}
					help={err.firstname}
				>
					{getFieldDecorator('firstname', {
						rules: [{ 
							type: 'string', message: 'The input is not valid',
						}, {
							whitespace: true , message: 'The input is not valid',
						}],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={user.firstname} />
					)}
				</Form.Item>
				<Form.Item
					validateStatus={err.lastname ? 'error' : 'success'}
					help={err.lastname}
				>
					{getFieldDecorator('lastname', {
						rules: [{ 
							type: 'string', message: 'The input is not valid',
						}, {
							whitespace: true , message: 'The input is not valid',
						}],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={user.lastname} />
					)}
				</Form.Item>
				<Form.Item
					validateStatus={err.password ? 'error' : 'success'}
					help={err.password}
				>
					{getFieldDecorator('npassword', {
						rules: [{ 
							type: 'string', message: 'The input is not valid',
						}, {
							whitespace: true , message: 'The input is not valid',
						}],
					})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />
					)}
				</Form.Item>
				<Form.Item
					validateStatus={err.cpassword ? 'error' : 'success'}
					help={err.cpassword}
				>
					{getFieldDecorator('cpassword', {
						rules: [{ 
							type: 'string', message: 'The input is not valid',
						}, {
							whitespace: true , message: 'The input is not valid',
						}],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
					)}
				</Form.Item>
				<Form.Item
					validateStatus={err.language ? 'error' : 'success'}
					help={err.language}
				>
					<Select defaultValue="en">
							<Select.Option value="en">english</Select.Option>
							<Select.Option value="fr">french</Select.Option>
          </Select>
				</Form.Item>
				<Form.Item
					validateStatus={err.password ? 'error' : 'success'}
					help={err.password}
				>
					{getFieldDecorator('password', {
						rules: [{
							whitespace: true , message: 'The input is not valid',
						}, {
							required: true, message: 'Please input your password to submit your change(s)',
						}],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</Form.Item>
				<Form.Item>
					<Button block type="primary" htmlType="submit" className="signFormButton">
						Submit
					</Button>
				</Form.Item>
			</Form>
		)
  }
}

const mapStateToProps = state => ({
	user: state.userReducer.user,
});

export default connect(mapStateToProps)(Form.create()(AccountForm));