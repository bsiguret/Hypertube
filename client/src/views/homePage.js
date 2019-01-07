import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin } from 'antd';

import { movieActions } from '../redux/actions/movie';
import Movies from '../components/movies'

import '../assets/css/home.scss'

class HomePage extends Component {
	constructor(props){
		super(props)
		this.state = {
			loading: false,
			page: 1,
		}
	}
	
	handleInfiniteOnLoad = async () => {
    this.setState({
      loading: true,
    });
		let resp = await this.props.dispatch(
			movieActions.getMoreMovies(
				this.props.filter.name,
				this.props.filter.min_rating,
				this.props.filter.max_rating,
				this.props.filter.min_year,
				this.props.filter.max_year,
				this.props.filter.genres,
				this.props.filter.order,
				this.state.page
			)
		)
		this.setState({
			loading: false,
			page: this.state.page + 1
    });
		console.log(resp)
	}
	
  render() {
    return (
			<InfiniteScroll
				initialLoad={false}
				loadMore={this.handleInfiniteOnLoad}
				hasMore={!this.state.loading}
				useWindow={false}
				style={{height: '100%'}}
			>
				<div className='home-movies-container'>
					{this.props.movies &&
					<Movies movies={this.props.movies}/>}
					{this.state.loading && 
					<div className="loading-container">
						<Spin />
					</div>}
				</div>
			</InfiniteScroll>
		)
  }
}

const mapStateToProps = state => ({
	movies: state.movieReducer.movies,
	filter: state.movieReducer.filter
});

export default connect(mapStateToProps)(HomePage);