import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
	border: none;
	border-bottom: 0.2rem solid #b74255;
	width: 100%;
	background-color: transparent;
	height: 7rem;
	font-size: 2rem;
	outline: none;
	text-indent: 3rem;
	letter-spacing: 0.1rem;
	box-shadow: 0 0.5rem 0.6rem rgba(0, 0, 0, 0.1);
	/* margin-top: 1.5rem; */

	&::placeholder {
		color: #efb6bf;
		font-style: italic;
	}
`;

const TodosSearchForm = props => (
	<div>
		<Input
			type="text"
			value={props.searchTerm}
			placeholder="Search by Date or todo's description..."
			onChange={props.onSearchTodo}
		/>
	</div>
);

export default TodosSearchForm;
