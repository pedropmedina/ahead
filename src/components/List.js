import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import styled from 'styled-components';
import showListView from '../selectors/showListView';

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
	const updatedList = showListView(props.lists, props.id);
	let counter = 1;
	return (
		<div>
			<Ul>
				{updatedList.map(item => {
					return (
						<li key={uuid()}>
							<span>{counter++}. </span>
							{item.itemDescription}{' '}
							<div>
								<span>X</span>
								<span>O</span>
							</div>
						</li>
					);
				})}
			</Ul>
		</div>
	);
};

const MapStateToProps = state => {
	return {
		lists: state.lists,
	};
};

export default connect(MapStateToProps)(List);
