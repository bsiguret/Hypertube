import React, { Component } from 'react';
import { Row, Col} from 'antd';

import '../assets/css/home.scss'

class HomePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			collapsed: false,
		};
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	handleClick = (e) => {
    this.setState({
      current: e.key,
    });
	}
	
  render() {
    return (
			<Row type="flex" justify="space-around" align="middle" style={{height: '100vh'}}>

			</Row>
		)
  }
}

export default HomePage;