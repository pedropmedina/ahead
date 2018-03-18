import React from 'react';
import styled from 'styled-components';

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

const Todo = ({ description, createdAt, id, onRemoveTodo, onEditTodo }) => (
	<Li>
		<input type="checkbox" />
		<span>{description}</span> <span>{createdAt}</span>
		<Button onClick={() => onRemoveTodo(id)}>Remove</Button>
		<Button onClick={() => onEditTodo({ id })}>Edit</Button>
		<Button>Need a list?</Button>
	</Li>
);

export default Todo;
