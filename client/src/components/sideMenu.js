import React, { Component } from 'react';
import { Icon, Input, Menu, Layout } from 'antd';
import { connect } from 'react-redux';
import { movieActions } from '../redux/actions/movie';

class SideMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			collapsed: false,
		};
		// this.handleMenuMovies = this.handleMenuMovies.bind(this);
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

  render() {
		const { name, min_rating, max_rating, min_year, max_year, genres, order } = this.props.filter
		const handleMenuMovies = async (genre) => {
			console.log(genre)
			this.props.dispatch(movieActions.addFilter(min_rating, max_rating, min_year, max_year, [`${genre}`], order))
			let resp = await this.props.dispatch(
				movieActions.getMovies(min_rating, max_rating, min_year, max_year, [`${genre}`], order, 0)
			)
			console.log(resp)
		}

    return (
			<Layout.Sider
				className='side-menu'
				id='style-1'
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
						this.props.genres.map(function(genre, i){
							return(
								<Menu.Item key={i} onClick={() => handleMenuMovies(genre.genre)}>
									<span>{genre.genre}</span>
								</Menu.Item>)
							})}
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
	genres: state.movieReducer.genres,
	filter: state.movieReducer.filter
});

export default  connect(mapStateToProps)(SideMenu);