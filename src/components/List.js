import React from 'react';
import uuid from 'uuid';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Ul = styled.ul`
	list-style: none;
	font-size: 1.6rem;

	> li {
		border-bottom: 0.2rem solid #eee;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;

		> span {
			color: #aaa;
			padding-right: 1rem;
		}

		> div {
			margin-left: auto;

			> span {
				color: #aaa;
				display: inline-block;
				padding: 1rem 3rem;
				background-color: #f9f7f7;
			}
		}
	}
`;

const List = props => {
	const todo = props.todos.find(todo => todo.id === props.id);
	let counter = 1;
	return (
		<div>
			{todo ? (
				<Ul>
					{todo.list.map(item => {
						return (
							<li key={uuid()}>
								<span>{counter++}. </span>
								{item}
								<div>
									<span>X</span>
									<span>O</span>
								</div>
							</li>
						);
					})}
				</Ul>
			) : (
				props.push('/')
			)}
		</div>
	);
};

const MapStateToProps = state => {
	return {
		todos: state.todos,
	};
};

export default connect(MapStateToProps)(List);
