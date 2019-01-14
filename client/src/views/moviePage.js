import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { List, Row, Col, Spin } from 'antd';

import { movieActions } from '../redux/actions/movie';
import movieService from '../redux/services/movie';
import ReactPlayer from 'react-player'

import CommentBox from '../components/commentBox'

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
		.then((response) => {
			console.log(response)
			if (response.data != 'NO')
			{
				this.setState({
					loading: false,
					source: 'http://localhost:3000/tmp/' + this.props.match.params.id + '/out.m3u8' 
				})
				this.getSubtitle();
				clearInterval(this.get_movie);
			}
		})
	}

	getSubtitle = () => {
		let player = document.getElementsByClassName('player')[0];
		movieService.getMovieDownload('get_subtitle', this.props.match.params.id)
		.then((response) => {
			console.log(response)
			if (response.data != 'NO')
			{
				let json = response.data;
				if (json.length != 0)
				{
					let i = 0;
					let tracks = new Array ();
					while (i < json.length)
					{
						tracks = [
							...tracks,
							{
								kind: 'substitles',
								src: json[i].path,
								srcLang: json[i].language,
							}
						]
						// var cTrack = document.createElement('track');
						// cTrack.kind = 'subtitles';
						// cTrack.src = json[i].path;
						// cTrack.srclang = json[i].language;
						// player.appendChild(cTrack);
						i++;
					}
					console.log('TRACKS Array', tracks)
					this.setState({ file: { tracks } })
				}
			}
		})
	}


	componentWillMount = async () => {
		console.log(this.props.match.params.id)
		let res = await this.props.dispatch(movieActions.getMovieInfo(this.props.match.params.id));
		console.log(res);
	}
  render() {
		const { movie } = this.props
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
						config={{ file: {
							tracks: [
								{kind: 'subtitles', src: "http://localhost:3000/tmp/tt0068646/subtitle/The.Godfather.Part.I.1972.720p.BrRip.x264.YIFY.vtt", srcLang: 'greek'},
								{kind: 'subtitles', src: "http://localhost:3000/tmp/tt0068646/subtitle/The Godfather (1972) [1080p].vtt", srcLang: 'turkish'},
								{kind: 'subtitles', src: "http://localhost:3000/tmp/tt0068646/subtitle/the-godfather-yify-english.vtt", srcLang: 'en', default: true}
							]
						}}}
						controls
						width='100%'
						height='100%'
					/>}
				</Row>
				<Row type='flex' justify='center'>
					<h2 style={{textAlign: 'center'}}>Comments</h2>
					<CommentBox />
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

// var id = location.search.substr(1).split('=')[1];
// var video = document.getElementById('video');

// function ft_get_subtitle()
// {
//   let url = '/play';
//   let data = 'action=get_subtitle&id=' + id;
//   ft_ajax(url, data, 'post', function(response)
//   {
//     if (response != 'NO')
//     {
//       console.log(response);
//       var json = JSON.parse(response);
//       if (json.length != 0)
//       {
//         var i = 0;
//         while (i < json.length)
//         {
//           var cTrack = document.createElement('track');
//           cTrack.kind = 'subtitles';
//           cTrack.src = json[i].path;
//           cTrack.srclang = json[i].language;
//           video.appendChild(cTrack);
//           i++;
//         }
//       }
//     }
//   });
// }

// var get_movie = window.setInterval(function()
// {
//   let url = '/play';
//   let data = 'action=get_movie&id=' + id;
//   ft_ajax(url, data, 'post', function(response)
//   {
//     if (response != 'NO')
//     {
//       if (Hls.isSupported())
//       {
//         var hls = new Hls();
//         hls.loadSource('http://localhost:3000/tmp/' + id + '/out.m3u8');
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED,function()
//         {
//           video.play();
//         });
//       }
//       else if (video.canPlayType('application/vnd.apple.mpegurl'))
//       {
//         video.src = 'http://localhost:3000/tmp/' + id + '/out.m3u8';
//         video.addEventListener('loadedmetadata',function()
//         {
//           video.play();
//         });
//       }
//       ft_get_subtitle();
//       window.clearInterval(get_movie);
//     }
//   });
// }, 1000);