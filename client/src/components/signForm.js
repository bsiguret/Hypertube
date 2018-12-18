import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import PhotoUploader from './photoUploader';

class SignForm extends Component {

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
		const { getFieldDecorator } = this.props.form;
    return (
			<div className='indexSignupFormWrapper'>
				<Form onSubmit={this.handleSubmit} className="indexSignupForm">
				<Form.Item>
						{getFieldDecorator('avatar', {
							rules: [{ required: true, message: 'Please upload a picture!' }],
						})(
							<PhotoUploader />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
					</Form.Item>
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
						{getFieldDecorator('firstname', {
							rules: [{
								type: 'email', message: 'The input is not valid E-mail!',
							}, {
								required: true, message: 'Please input your E-mail!',
							}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Firstname" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('lastname', {
							rules: [{
								type: 'email', message: 'The input is not valid E-mail!',
							}, {
								required: true, message: 'Please input your E-mail!',
							}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Lastname" />
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
						{getFieldDecorator('cpassword', {
							rules: [{ required: true, message: 'Please input your Password!' }],
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

export default Form.create()(SignForm);

// L’application doit permettre à un utilisateur de s’inscrire, en demandant au minimum
// une adresse email, un nom d’utilisateur, une photo de profil, un nom, un
// prénom et un mot de passe un tant soit peu sécurisé.