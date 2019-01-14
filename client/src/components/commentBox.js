import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';


class Comment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			comment: '',
		}
	}

	handleComment = () => {
		if (this.state.comment.length >= 5)
			console.log('hello', this.state.comment)
	}

	onEnterPress = (e) => {
		if(e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			this.handleComment();
		}
	}

	handleChange = (e) => {
		console.log(e.target.value.length)
		if (e.target.value.length > 2000)
			console.log('nope')
		else
			this.setState({ [e.target.name]: e.target.value})
	}

  render() {
		const { comment } = this.state
    return (
			<div className='movie-comment'>
				<Input.TextArea
					name='comment'
					autosize={{minRows: 2, maxRows: 6}}
					value={comment}
					onChange={this.handleChange}
					onPressEnter={this.onEnterPress}
				/>
				<div className='comment-bts'>
					<Button type="primary" onClick={this.handleComment}>Send</Button>
				</div>
			</div>
		)
  }
}

export default connect()(Comment);