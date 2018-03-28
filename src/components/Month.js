import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import showMonthTodos from '../selectors/showMonthTodos';
import TodosSearchForm from './TodosSearchForm';
import Calendar from './Calendar';
import NavButtons from './NavButtons';

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

const TodoHeading = styled.h4`
	border: 0.1rem solid #eee;
	display: inline-block;
	padding: 0.5rem 1rem;
	font-weight: 500;
	color: #aaa;

	&:first-child {
		margin-bottom: 0.5rem;
	}

	> span {
		display: block;
	}
`;

const TodoBody = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	padding-top: 0;
	color: #aaa;
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
				<NavButtons />
				<TodosWrapper>
					{keys
						.map(key => {
							const dayOfWeek = moment(todos[key][0].start).format('ddd');
							const dayOfMonth = moment(todos[key][0].start).format('Do');
							return (
								<DayWrapper key={uuid()}>
									<TodoHeading>
										<span>{dayOfWeek}</span>
										<span>{dayOfMonth}</span>
									</TodoHeading>
									<TodoBody>
										{todos[key].map(todo => {
											return <p key={todo.id}>{todo.title}</p>;
										})}
									</TodoBody>
								</DayWrapper>
							);
						})
						.filter(({ props }) => {
							return true;
							// THIS FILTER LIMITS THE SEARCH TO THE MONTH THAT'S BEEN RENDERED. I NEED TO RENDER EITHER THE MONTHS' TODOS OR THE MATCHED TODOS BY SEARCH OR CATEGORY AND OR THAT I NEED TO LOOK INSIDE THE TODOS ARRAY ITSELF
							// const matchedDescription = props.children[1].filter(
							// 	({ props }) => {
							// 		return props.children
							// 			.toLowerCase()
							// 			.includes(this.state.searchTerm.toLowerCase());
							// 	},
							// );
							// return (
							// 	!!matchedDescription.length ||
							// 	props.children[0].props.children
							// 		.toLowerCase()
							// 		.includes(this.state.searchTerm.toLowerCase())
							// );
						})}
				</TodosWrapper>
				{/* <MultiDayPicker /> */}
				<Calendar />
			</div>
		);
	}
}

const MapStateToProps = state => {
	return {
		todos: showMonthTodos(state.todos),
	};
};

export default connect(MapStateToProps)(CalendarView);
