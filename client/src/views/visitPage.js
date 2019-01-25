import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/user';
import { authActions } from '../redux/actions/auth';
import { history } from '../assets/helpers/history';

import VisitCard from '../components/visitCard';

class VisitPage extends Component {


	async componentWillMount() {
		console.log(this.props.match.params.id)
		let res = await this.props.dispatch(userActions.getOtherUser(this.props.match.params.id))
		if (res.status === 403) {
			message.error('No user found with this id')
			history.push('/home')
		}
		else if (res.status === 401) {
			message.error('Please log in, your session may have expired')
			this.props.dispatch(authActions.logout())
		}
	}

  render() {
    return (
				<Row type="flex" justify="space-around" align="middle" style={{height: '100vh'}}>
					<Col span={16}>
						<div className='visitPageWrapper' style={{width: '100%'}}>
							{this.props.oUser &&
							<VisitCard user={this.props.oUser} />}
						</div>
					</Col>
				</Row>
		)
  }
}

const mapStateToProps = state => ({
	oUser: state.userReducer.oUser
});

export default connect(mapStateToProps)(VisitPage);