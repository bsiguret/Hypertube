import React, { Component } from 'react';
import { Icon, Input, Menu, Layout, Slider, Select } from 'antd';
import { connect } from 'react-redux';
import { movieActions } from '../redux/actions/movie';
import { history } from '../assets/helpers/history';

class SideMenu extends Component {
	constructor(props) {
		super(props)

		this.state = {
			collapsed: false,
			searchInput: '',
			loading: false
		};
		// this.handleMenuMovies = this.handleMenuMovies.bind(this);
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	handleSearch = async (name) => {
		this.props.dispatch(
			movieActions.addFilter(
				name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				this.props.filter.order,
				0
			)
		)
		let resp = await this.props.dispatch(
			movieActions.getMovies(
				name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				this.props.filter.order,
				0
			)
		)
	}

	handleSort = async (order) => {
		this.props.dispatch(
			movieActions.addFilter(
				this.props.filter.name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				order,
				0
			)
		)
		let resp = await this.props.dispatch(
			movieActions.getMovies(
				this.props.filter.name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				order,
				0
			)
		)
	}

	handleYear = async (year) => {
		this.props.dispatch(
			movieActions.addFilter(
				this.props.filter.name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				year[0],
				year[1],
				this.props.filter.genres,
				this.props.filter.order,
				0
			)
		)
		let resp = await this.props.dispatch(
			movieActions.getMovies(
				this.props.filter.name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				year[0],
				year[1],
				this.props.filter.genres,
				this.props.filter.order,
				0
			)
		)
	}

	handleRating = async (rating) => {
		this.props.dispatch(
			movieActions.addFilter(
				this.props.filter.name,
				rating[0],
				rating[1],
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				this.props.filter.order,
				0
			)
		)
		let resp = await this.props.dispatch(
			movieActions.getMovies(
				this.props.filter.name,
				rating[0],
				rating[1],
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				this.props.filter.order,
				0
			)
		)
	}

	handleHome() {
		history.push('/home')
	}

  render() {
		const { name, min_rating, max_rating, min_year, max_year, genres, order } = this.props.filter
		const handleMenuMovies = async (genre) => {
			this.props.dispatch(movieActions.addFilter(name, min_rating, max_rating, min_year, max_year, genre, order))
			let resp = await this.props.dispatch(
				movieActions.getMovies(name, min_rating, max_rating, min_year, max_year, genre, order, 0)
			)
		}
    return (
			<Layout.Sider
				className='side-menu'
				id='style-1'
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				
				{!this.state.collapsed &&
				<h1 style={{color: 'white', textAlign: 'center', cursor: 'pointer'}} onClick={this.handleHome}>HyperTube</h1>}
				{this.state.collapsed &&
				<h1 style={{color: 'white', textAlign: 'center', cursor: 'pointer'}} onClick={this.handleHome}>HT</h1>}
				{this.props.sideMenuFilter &&
				<Input.Search
					placeholder="search"
					onSearch={value => this.handleSearch(value)}
					autosize='true'
				/>}
				{this.props.sideMenuFilter &&
				<Select className='sort-button' defaultValue="rating" style={{ width: 120 }} onChange={this.handleSort}>
					<Select.Option value="title">Name</Select.Option>
					<Select.Option value="rating">Rating</Select.Option>
					<Select.Option value="year">Year</Select.Option>
				</Select>}
				{this.props.sideMenuFilter &&
				<div>
					<h4 style={{color: 'white', textAlign: 'center'}}>Year</h4>
					<Slider className='slider' range step={1} min ={1895} max={2019} defaultValue={[1895, 2019]} onAfterChange={this.handleYear} />
					<h4 style={{color: 'white', textAlign: 'center'}}>Rating</h4>
					<Slider classname='slider' range step={0.1} max={10} defaultValue={[0, 10]} onAfterChange={this.handleRating} />
				</div>}
				<Menu theme="dark" mode="inline">
					{this.props.sideMenuFilter &&
					<Menu.SubMenu
						key="sub1"
						title={<span><Icon type="desktop" /><span>Movies</span></span>}
					>
						<Menu.Item key='0' onClick={() => handleMenuMovies('')}>
							<span>All</span>
						</Menu.Item>
						{this.props.genres &&
						this.props.genres.map(function(genre, i){
							return(
								<Menu.Item key={i+1} onClick={() => handleMenuMovies(genre.genre)}>
									<span>{genre.genre}</span>
								</Menu.Item>)
							})}
					</Menu.SubMenu>}
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