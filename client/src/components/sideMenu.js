import React, { Component } from 'react';
import { Icon, Input, Menu, Layout } from 'antd';
import { connect } from 'react-redux';

class SideMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			collapsed: false,
		};
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

  render() {
		console.log(this.props.genres)
    return (
			<Layout.Sider
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				<Input.Search
					placeholder="search"
					onSearch={value => console.log(value)}
					autosize='true'
				/>
				<Menu theme="dark" mode="inline">
					<Menu.SubMenu
						key="sub1"
						title={<span><Icon type="desktop" /><span>Movies</span></span>}
					>
						{this.props.genres &&
						this.props.genres.map(function(genre, i){return(<Menu.Item key={i}><span>{genre.genre}</span></Menu.Item>)})}
					</Menu.SubMenu>
					<Menu.SubMenu
						key="sub2"
						title={<span><Icon type="user" /><span>Account</span></span>}
					>
						<Menu.Item key="16">
							<Icon type="setting" />
							<span>Settings</span>
						</Menu.Item>
						<Menu.Item key="17">
							<Icon type="logout" />
							<span>Logout</span>
						</Menu.Item>
					</Menu.SubMenu>
				</Menu>
			</Layout.Sider>
		)
  }
}

const mapStateToProps = state => ({
  genres: state.movieReducer.genres
});

export default  connect(mapStateToProps)(SideMenu);