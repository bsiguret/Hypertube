import React, { Component } from 'react';
import { Icon, Input, Menu, Layout } from 'antd';

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
						<Menu.Item key="1">Action</Menu.Item>
						<Menu.Item key="2">Thriller</Menu.Item>
						<Menu.Item key="3">Horror</Menu.Item>
						<Menu.Item key="4">Romance</Menu.Item>
						<Menu.Item key="5">Romance</Menu.Item>
						<Menu.Item key="6">Romance</Menu.Item>
						<Menu.Item key="7">Romance</Menu.Item>
						<Menu.Item key="8">Romance</Menu.Item>
						<Menu.Item key="9">Romance</Menu.Item>
						<Menu.Item key="10">Romance</Menu.Item>
						<Menu.Item key="11">Romance</Menu.Item>
						<Menu.Item key="12">Romance</Menu.Item>
						<Menu.Item key="13">Romance</Menu.Item>
						<Menu.Item key="14">Romance</Menu.Item>
						<Menu.Item key="15">Romance</Menu.Item>
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

export default SideMenu;