import React, { Component } from 'react';
import { Icon } from 'antd';

class Movies extends Component {
	constructor(props){
		super(props)

		this.state = {
			isHover: false,
			key: ''
		}
		this.handleEnter = this.handleEnter.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
	}
	
	handleEnter = async (key) => {
		await this.setState({
			isHover: true,
			key: key
		})
	}
	
	handleLeave = async () => {
		await this.setState({
			isHover: false,
			key: ''
		})
	}

	render() {
		const { isHover } = this.state
		const Movies = ({movies}) => (
			<>
				{movies.map((movie, key) => (
					<div key={key} className='movie-poster' >
						<div onMouseEnter={() => this.handleEnter(key)} onMouseLeave={() => this.handleLeave()}>
							<img alt={movie.title} src={movie.img} style={{width: '100%'}} />
						</div>
						{isHover && key === this.state.key &&
						<div className='movie-image'>
							<span className='movie-title'>{movie.title}</span>
							<p className='movie-rating'><Icon type="star" theme="filled" style={{color: 'yellow'}}/>{movie.rating}</p>
							<p className='movie-year'>{movie.year}</p>
						</div>}
					</div>
				))}
			</>
			);
			
		return (
				<Movies movies={this.props.movies}/>
		)
	}
}

export default Movies;