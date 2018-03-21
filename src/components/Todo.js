import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
	render() {
		const {
			description,
			createdAt,
			id,
			list,
			onRemoveTodo,
			onEditTodo,
		} = this.props;
		return (
			<Li>
				<span>{description}</span> <span>{createdAt}</span>
				<Button onClick={() => onRemoveTodo(id)}>Remove</Button>
				<Button onClick={() => onEditTodo({ id })}>Edit</Button>
				<ListButton to={`/createList/${id}`}>
					{list.length ? 'Update list' : 'Need a list?'}
				</ListButton>
			</Li>
		);
	}
}

export default Todo;
