import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { movieActions } from '../redux/actions/movie';
import movieService from '../redux/services/movie';

// import Movies from '../components/movies'

import '../assets/css/home.scss'

class MoviePage extends Component {
	constructor(props) {
		super(props)
	}

	handleDownload = async () => {
		let res = await movieService.startMovieDownload(this.props.match.params.id);
		console.log(res)
	}

	componentWillMount = async () => {
		console.log(this.props.match.params.id)
		let res = await this.props.dispatch(movieActions.getMovieInfo(this.props.match.params.id));
		console.log(res);
	}
  render() {
		return (
		<div className="movie-container">
			{this.props.movie &&
			<div>
				<img className='movie-cover' alt="cover" src={this.props.movie.info[0].img}/>
				<h1 className='movie-title'>{this.props.movie.info[0].title}</h1>
				<p>{this.props.movie.info[0].description}</p>
				<Button type="primary" onClick={this.handleDownload.bind(this)}>TEST DL FILM</Button>
				<video controls style={{width: '100%', height:'600px'}}>
				</video>
			</div>}
		</div>
		)
  }
}

const mapStateToProps = state => ({
	movie: state.movieReducer.movie
});

export default connect(mapStateToProps)(MoviePage);