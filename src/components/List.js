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

const Path = styled.h4`
	font-size: 1.2rem;
	font-weight: 300;
	color: #aaa;
	padding: 1rem;
	margin-bottom: 1.5rem;
`;

const Arrow = styled.span`
	padding: 0 0.5rem;
	color: #ccc;
`;

const List = props => {
	const todo = props.todos.find(todo => todo.id === props.id);
	let counter = 1;
	return (
		<div>
			{todo ? (
				<div>
					<Path>
						{todo.createdAt} <Arrow>&rarr;</Arrow> {todo.description}
						<Arrow>&rarr;</Arrow> List
					</Path>
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
				</div>
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
