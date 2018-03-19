import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Li = styled.li`
	margin-bottom: 2rem;
	width: 100%;
	border-bottom: 0.2rem solid #eee;
	padding: 1rem;
	font-size: 1.2rem;

	> * {
		&:not(:last-child) {
			margin-right: 1rem;
		}
	}
`;

const Button = styled.button`
	border: 0.1rem solid #b74255;
	color: #b74255;
	padding: 0.5rem 1rem;
	border-radius: 0.2rem;
`;

const ListButton = styled(Link)`
	border: 0.1rem solid #b74255;
	color: #b74255;
	padding: 0.5rem 1rem;
	border-radius: 0.2rem;
	text-decoration: none;
`;

class Todo extends React.Component {
	// toggle name if list exists under id
	updateListButtonName = lists => {
		return lists.filter(item => {
			return item.id === this.props.id;
		}).length;
	};

	render() {
		const {
			description,
			createdAt,
			id,
			onRemoveTodo,
			onEditTodo,
			lists,
		} = this.props;
		const list = this.updateListButtonName(lists);
		return (
			<Li>
				<input type="checkbox" />
				<span>{description}</span> <span>{createdAt}</span>
				<Button onClick={() => onRemoveTodo(id)}>Remove</Button>
				<Button onClick={() => onEditTodo({ id })}>Edit</Button>
				<ListButton to={`/createList/${id}`}>
					{list ? 'Update List' : 'Need a List?'}
				</ListButton>
			</Li>
		);
	}
}

const MapStateToProps = state => {
	return {
		lists: state.lists,
	};
};

export default connect(MapStateToProps)(Todo);
