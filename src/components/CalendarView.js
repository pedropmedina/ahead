import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import showCalendarView from '../selectors/showCalendarView';
import TodosSearchForm from './TodosSearchForm';
import MultiDayPicker from './MultiDayPicker';

const TodosWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
`;

const DayWrapper = styled.div`
	/* border-top: 0.2rem solid #aaa; */
	background-color: #fff;
	padding: 2rem 3rem;
	display: inline-block;
	font-size: 1.6rem;
	box-shadow: 0 0.4rem 1.5rem rgba(0, 0, 0, 0.15);
	margin: 1rem;
	flex: 1;
`;

const SelectionButton = styled.button`
	position: absolute;
	color: #aaa;
	border: none;
	/* transform: translateY(-50vh); */
`;

const NextButton = SelectionButton.extend`
	top: 50vh;
	right: 3rem;
`;

class CalendarView extends React.Component {
	state = {
		searchTerm: '',
	};

	// on searching todos
	onSearchTodo = e => {
		const searchTerm = e.target.value;
		this.setState(() => ({ searchTerm }));
	};

	render() {
		const todos = this.props.todos;
		const keys = Object.keys(todos);

		return (
			<div>
				<TodosSearchForm
					searchTerm={this.state.searchTerm}
					onSearchTodo={this.onSearchTodo}
				/>
				<NextButton>→</NextButton>
				<TodosWrapper>
					{keys
						.map(key => {
							const todoDateHeader = moment(todos[key][0].createdAt).format(
								'dddd, MMMM Do, YYYY',
							);
							return (
								<DayWrapper key={uuid()}>
									<h4>{todoDateHeader}</h4>
									{todos[key].map(todo => {
										return <p key={todo.id}>{todo.description}</p>;
									})}
								</DayWrapper>
							);
						})
						.filter(({ props }) => {
							const matchedDescription = props.children[1].filter(
								({ props }) => {
									return props.children
										.toLowerCase()
										.includes(this.state.searchTerm.toLowerCase());
								},
							);
							return (
								!!matchedDescription.length ||
								props.children[0].props.children
									.toLowerCase()
									.includes(this.state.searchTerm.toLowerCase())
							);
						})}
				</TodosWrapper>
				<MultiDayPicker />
			</div>
		);
	}
}

const MapStateToProps = state => {
	return {
		todos: showCalendarView(state.todos),
	};
};

export default connect(MapStateToProps)(CalendarView);
