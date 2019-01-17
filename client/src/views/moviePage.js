import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { List, Row, Col, Spin, message } from 'antd';

import { movieActions } from '../redux/actions/movie';
import { authActions } from '../redux/actions/auth';
import movieService from '../redux/services/movie';
import ReactPlayer from 'react-player'

import CommentBox from '../components/commentBox'
import Comments from '../components/comments'

import '../assets/css/movie.scss'

class MoviePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			source: '',
			loading: false,
			file: {},
		}
		this.getMovieDownload = this.getMovieDownload.bind(this);
	}

	handleDownload = () => {
		console.log('before startMovieDownload')
		this.setState({ loading: true })
		movieService.startMovieDownload(this.props.match.params.id);
		this.get_movie = setInterval(() => {
			this.getMovieDownload()
		}, 1000)
	}

	getMovieDownload = () => {
		movieService.getMovieDownload('get_movie', this.props.match.params.id)
		.then(async (response) => {
			console.log(response)
			if (response.data !== 'NO')
			{
				await this.getSubtitle();
				clearInterval(this.get_movie);
			}
		})
	}

	getSubtitle = () => {
		movieService.getMovieDownload('get_subtitle', this.props.match.params.id)
		.then((response) => {
			console.log(response)
			if (response.data !== 'NO')
			{
				let json = response.data;
				if (json.length !== 0)
				{
					let tracks = [];
					for (let i = 0; i < json.length; i++)
					{
						tracks = [
							...tracks,
							{
								kind: 'subtitles',
								src: json[i].path,
								srcLang: json[i].language
							}
						]
					}
					console.log('TRACKS Array', tracks)
					this.setState({
						loading: false,
						source: 'http://localhost:3000/tmp/' + this.props.match.params.id + '/out.m3u8' ,
						file: { tracks }
					})
				}
			}
		})
	}


	componentWillMount = async () => {
		let res = await this.props.dispatch(movieActions.getMovieInfo(this.props.match.params.id));
		if (res.status !== 200) {
			this.props.dispatch(authActions.logout())
			message.error('Please log in, your session may have expired')
		}
		let resp = await this.props.dispatch(movieActions.getCommments(this.props.match.params.id));
		if (resp.status !== 200) {
			this.props.dispatch(authActions.logout())
			message.error('Please log in, your session may have expired')
		}
	}


	componentWillUnmount = () => {
		movieService.getMovieDownload('sigall', this.props.match.params.id)
		.then((response) => {
			if (response.status !== 200) {
				this.props.dispatch(authActions.logout())
				message.error('Please log in, your session may have expired')
			}
		})
	}

  render() {
		const { movie } = this.props
		const { file } = this.state
		console.log('file', this.state.file)
		return (
		<div className="movie-container">
			{this.props.movie &&
			<div className='wrapper-movie'>
				<Row
					type='flex'
					justify='center'
				>
					<Col span={24}><h1 className='movie-title'>{movie.info[0].title}</h1></Col>
				</Row>
				<Row
					type='flex'
					justify='center'
					align='middle'
				>
					<Col span={12} className='left-movie'>
						<img className='movie-cover' alt="cover" src={movie.info[0].img}/>
					</Col>
					<Col span={12} className='right-movie'>
						<List>
							<List.Item>Year: {movie.info[0].year}</List.Item>
							<List.Item>Director: {movie.info[0].director}</List.Item>
							<List.Item>Writer: {movie.info[0].writer}</List.Item>
							<List.Item>Actors: {movie.info[0].actors}</List.Item>
							<List.Item>Language: {movie.info[0].language}</List.Item>
							<List.Item>Runtime: {movie.info[0].runtime}min</List.Item>
							<List.Item>Rating: {movie.info[0].rating}</List.Item>
						</List>
					</Col>
				</Row>
				<Row>
					<h2 style={{textAlign: 'center'}}>Synopsis</h2>
					<p style={{textAlign: 'center'}}>{movie.info[0].description}</p>
					<Button type="primary" onClick={this.handleDownload.bind(this)}>TEST DL FILM</Button>
				</Row>
				<Row type='flex' justify='center'>
					{this.state.loading &&
					<div className='player-loading'>
						<Spin size="large"/>
					</div>}
					{this.state.source &&
					<ReactPlayer
						className='player'
						url={this.state.source}
						config={{file}}
						controls
						width='100%'
						height='100%'
					/>}
				</Row>
				<Row type='flex' justify='center'>
					<h2 style={{textAlign: 'center'}}>Comments</h2>
					<CommentBox />
				</Row>
				<Row>
					<Comments />
				</Row>
			</div>}
		</div>
		)
  }
}

const mapStateToProps = state => ({
	movie: state.movieReducer.movie
});

export default connect(mapStateToProps)(MoviePage);