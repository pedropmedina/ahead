import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import styled from 'styled-components';
import showListView from '../selectors/showListView';

const Ul = styled.ul`
	list-style: none;
	font-size: 1.6rem;
`;

const List = props => {
	const updatedList = showListView(props.lists, props.id);

	return (
		<div>
			<Ul>
				{updatedList.map(item => {
					return <li key={uuid()}>{item.itemDescription}</li>;
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
