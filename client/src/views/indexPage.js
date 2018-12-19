import React, { Component } from 'react';
import { Row, Col, Layout, Icon, Divider, Button, Avatar } from 'antd';

import SignForm from '../components/signForm';
import LoginForm from '../components/loginForm';

import '../assets/css/index.scss'

class IndexPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			login: true,
		}
	}

	handleChange = () => this.setState({ login: !this.state.login })

  render() {
		const { login } = this.state
    return (
			<Layout style={{height: '100vh'}}>
				<Layout.Content>
				<Row type="flex" justify="space-around" align="middle" style={{height: '100vh'}}>
					{!login &&
					<Col span={8}>
						<SignForm/>
						<Divider>Or</Divider>
						<Button block type="primary" onClick={this.handleChange.bind(this)}>Log in</Button>
					</Col>}
					{login &&
					<Col span={8}>
						<LoginForm />
						<a href='/help' style={{position: 'relative', top: '-25px'}}>Need help?</a>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<Button shape="circle" type="primary" icon="google" style={{backgroundColor: 'red', borderColor: 'red'}}/>
							<Button shape="circle" type="primary">
								<Icon type="facebook" theme="filled" />
							</Button>
							<Button shape="circle" type="primary" style={{backgroundColor: 'black', borderColor: 'black'}}>
								<Avatar src="/img/42.png" />
							</Button>
						</div>
						<Divider>Or</Divider>
						<Button block type="primary" onClick={this.handleChange.bind(this)}>Sign Up</Button>
					</Col>}
				</Row>
				</Layout.Content>
				<Layout.Footer>
					<Row type="flex" justify="space-around" align="middle">
						<Col>
							Created by bsiguret & zxu & nrandria & lezhang with <Icon type="heart" style={{color: 'red'}} theme="filled" />
						</Col>
					</Row>
				</Layout.Footer>
			</Layout>
		)
  }
}

export default IndexPage;