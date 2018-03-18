import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import styled from 'styled-components';
import showCalendarView from '../selectors/showCalendarView';
import TodosSearchForm from './TodosSearchForm';
import MultiDayPicker from './MultiDayPicker';

const MainWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
`;

const DayWrapper = styled.div`
	background-color: #f9f7f7;
	border-top: 0.2rem solid #aaa;
	padding: 2rem 3rem;
	display: inline-block;
	font-size: 1.6rem;
	box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.1);
	margin: 1rem;
	flex: 1;
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
				<MainWrapper>
					{keys
						.map(key => {
							return (
								<DayWrapper key={uuid()}>
									<h4>{todos[key][0].createdAt}</h4>
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
				</MainWrapper>
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
