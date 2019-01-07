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
		let resp = await this.props.dispatch(movieActions.getMovies(0, 10, 0, 9999, [''], 'rating', this.state.page))
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
  movies: state.movieReducer.movies
});

export default connect(mapStateToProps)(HomePage);