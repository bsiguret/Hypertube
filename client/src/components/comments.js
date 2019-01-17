import React, { Component } from 'react';
import { List, Avatar } from 'antd';


class Comments extends Component {



  render() {
		const Comments = ({comments}) => (
			<>
				{comments.map((comment, key) => (
					<List.Item
						key={key}
					>
						<List.Item.Meta
							avatar={<Avatar src={comment.profile} />}
							title={`${comment.firstname} ${comment.lastname}`}
							description={comment.comment}
						/>
						{comment.date}
					</List.Item>
				))}
			</>
		);
    return (
			console.log(this.props.comments),
			<List className='comments'>
				<Comments comments={this.props.comments}/>
			</List>
		)
  }
}

export default Comments;