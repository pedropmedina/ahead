import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
	position: relative;
	width: 80%;
	margin: -3.5rem auto 3rem auto;
	background-color: #fff;

	> i {
		position: absolute;
		top: 50%;
		left: 2rem;
		transform: translateY(-50%);
		font-size: 2.5rem;
		color: #ddd;
	}
`;

const Input = styled.input`
	/* margin-top: 1.5rem; */
	/* border-bottom: 0.2rem solid #b74255; */
	border: none;
	width: 100%;
	background-color: transparent;
	height: 7rem;
	font-size: 2rem;
	outline: none;
	text-indent: 5rem;
	letter-spacing: 0.1rem;
	box-shadow: 0 0.5rem 0.6rem rgba(0, 0, 0, 0.1);

	&::placeholder {
		color: #ddd;
		font-style: italic;
	}
`;

const TodosSearchForm = props => (
	<MainWrapper>
		<i className="ion-search" />
		<Input
			type="text"
			value={props.searchTerm}
			placeholder="Search by date or todo's description..."
			onChange={props.onSearchTodo}
		/>
	</MainWrapper>
);

export default TodosSearchForm;
