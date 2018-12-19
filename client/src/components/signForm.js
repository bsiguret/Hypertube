import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';

import PhotoUploader from './photoUploader';
import { userActions } from '../redux/actions/user';

class SignForm extends Component {

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
			console.log(values)
      if (!err && this.props.photo) {
				let res = await this.props.dispatch(userActions.signup({user: {photo: this.props.photo, ...values}}))
				if (res.status !== 200) {
					console.log(res)
				}
			} else if (!err && !this.props.photo)
					message.error('Please upload a photo')
    });
	}

  render() {
		const { getFieldDecorator } = this.props.form;
    return (
			<div className='indexSignupFormWrapper'>
				<Form onSubmit={this.handleSubmit} className="indexSignupForm">
					<Form.Item>
						<PhotoUploader dispatch={this.props.dispatch}/>
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ 
								type: 'string', message: 'The input is not valid',
							}, {
								whitespace: true , message: 'The input is not valid',
							}, {
								required: true, message: 'Please input your username!'
							}],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('email', {
							rules: [{
								type: 'email', message: 'The input is not valid',
							}, {
								whitespace: true , message: 'The input is not valid',
							}, {
								required: true, message: 'Please input your E-mail!',
							}],
						})(
							<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('firstname', {
							rules: [{ 
								type: 'string', message: 'The input is not valid',
							}, {
								whitespace: true , message: 'The input is not valid',
							}, {
								required: true, message: 'Please input your firstname!'
							}],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Firstname" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('lastname', {
							rules: [{ 
								type: 'string', message: 'The input is not valid',
							}, {
								whitespace: true , message: 'The input is not valid',
							}, {
								required: true, message: 'Please input your lastname!'
							}],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Lastname" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ 
								type: 'string', message: 'The input is not valid',
							}, {
								whitespace: true , message: 'The input is not valid',
							}, {
								required: true, message: 'Please input your pasword!'
							}],
						})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('cpassword', {
							rules: [{ 
								type: 'string', message: 'The input is not valid',
							}, {
								whitespace: true , message: 'The input is not valid',
							}, {
								required: true, message: 'Please confirm your password!'
							}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
						)}
					</Form.Item>
					<Form.Item>
						<Button block type="primary" htmlType="submit" className="signFormButton">
							Sign Up
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
  }
}

const mapStateToProps = state => ({
  photo: state.userReducer.photo
});

export default connect(mapStateToProps)(Form.create()(SignForm));

// L’application doit permettre à un utilisateur de s’inscrire, en demandant au minimum
// une adresse email, un nom d’utilisateur, une photo de profil, un nom, un
// prénom et un mot de passe un tant soit peu sécurisé.