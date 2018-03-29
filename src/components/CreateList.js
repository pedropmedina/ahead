import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addItemToList } from '../actions/todo';
import List from './List';

//////
////// styles
//////
const MainWrapper = styled.div`
	margin: 5rem auto;
	padding: 3rem;
	max-width: 80%;
	display: flex;
	flex-direction: column;
`;

const Form = styled.form`
	height: 5rem;
	box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.2);
	margin-bottom: 5rem;
	position: relative;

	> input {
		width: 100%;
		height: 100%;
		border: none;
		/* border: 0.1rem solid red; */
		text-indent: 1.5rem;
		font-size: 1.6rem;
		outline: none;

		&::placeholder {
			color: #aaa;
		}
	}

	> button {
		position: absolute;
		right: 0;
		height: 100%;
		/* width: 6rem; */
		border: none;
		background-color: #aaa;
		color: #fff;
		font-weight: 500;
		font-size: 2rem;
		padding: 0 3rem;
	}
`;

//////
////// Component
//////
class CreateList extends React.Component {
	state = {
		itemDescription: '',
	};

	// handle item description
	onItemDescriptionChange = e => {
		const itemDescription = e.target.value;
		this.setState(() => ({ itemDescription }));
	};

	// handle form submission
	onSubmit = e => {
		e.preventDefault();
		const itemDescription = this.state.itemDescription;
		const id = this.props.match.params.id;
		this.props.dispatch(addItemToList(itemDescription, id));
		this.setState(() => ({ itemDescription: '' }));
	};

	render() {
		return (
			<MainWrapper>
				<Form action="#" onSubmit={this.onSubmit}>
					<input
						type="text"
						value={this.state.itemDescription}
						placeholder="item"
						onChange={this.onItemDescriptionChange}
					/>
					<button onClick={this.onSubmit} className="far fa-plus-square" />
				</Form>
				<List id={this.props.match.params.id} push={this.props.history.push} />
			</MainWrapper>
		);
	}
}

export default connect()(CreateList);
