import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieActions } from '../redux/actions/movie';

import '../assets/css/movie.scss'

class MoviePage extends Component {


	getMovieInfo = async (movie_id) => {
    let res = await this.props.dispatch(movieActions.getMovieInfo(movie_id))
    console.log(res)
    return;
  }

	componentWillMount = async () => {
    await this.getMovieInfo(this.props.match.params.movie_id);
	}
	
  render() {
    return (
			<div>

			</div>
		)
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(MoviePage);