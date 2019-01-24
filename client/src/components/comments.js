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
							title={`${comment.username}`}
							description={comment.date}
						/>
						<div>
							{comment.comment}
						</div>
					</List.Item>
				))}
			</>
		);
    return (
			console.log(this.props.comments),
			<List className='comments' itemLayout="vertical">
				<Comments comments={this.props.comments}/>
			</List>
		)
  }
}

export default Comments;

// {/* <List.Item
// key={key}
// >
// <List.Item.Meta
// 	avatar={
// 		<Avatar size={64} shape='square' src={`http://localhost:3000/photo/${checkpoint.pic_path}`} />
// 	}
// 	title={<div><p>{checkpoint.controlType}</p><p>{checkpoint.checkpoint}</p></div>}
// 	description={checkpoint.defautTexte}
// />
// <div>
// 	preconisation: {checkpoint.preconisation}
// </div>
// </List.Item> */}