import React from 'react';
import uuid from 'uuid';
import TodosSearchForm from './TodosSearchForm';
import { connect } from 'react-redux';
import showCalendarView from '../selectors/showCalendarView';
import styled from 'styled-components';

const MainWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
`;

const DayWrapper = styled.div`
	background-color: #eee;
	border-top: 0.2rem solid #aaa;
	padding: 2rem 3rem;
	display: inline-block;
	font-size: 1.6rem;
	box-shadow: 0 0.3rem 0.8rem rgba(0, 0, 0, 0.2);
	margin: 1rem;
	flex: 1;
`;

class CalendarView extends React.Component {
	state = {
		searchTerm: '',
	};

	// on searching todos
	onSearchTodo = e => {
		const searchTerm = e.target.value.toLowerCase();
		this.setState(() => ({ searchTerm }));
	};

	render() {
		const todos = this.props.todos;
		const keys = Object.keys(todos).filter(key =>
			key.toLowerCase().includes(this.state.searchTerm),
		);
		return (
			<div>
				<TodosSearchForm
					searchTerm={this.state.searchTerm}
					onSearchTodo={this.onSearchTodo}
				/>
				<MainWrapper>
					{keys.map(key => {
						return (
							<DayWrapper key={uuid()}>
								<h4>{todos[key][0].createdAt}</h4>
								{todos[key].map(todo => {
									return <p key={todo.id}>{todo.description}</p>;
								})}
							</DayWrapper>
						);
					})}
				</MainWrapper>
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
