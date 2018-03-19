import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeTodo, editTodo } from '../actions/todo';
import { setIdToEdit, setIsEditable } from '../actions/editability';
import TodosSearchForm from './TodosSearchForm';
import TodosList from './TodosList';

const TodosWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
`;

class TodayView extends React.Component {
	state = {
		today: moment().format('dddd, MMMM Do, YYYY'),
	};

	// remove todo from store
	onRemoveTodo = id => {
		this.props.dispatch(removeTodo({ id }));
	};

	// handle UI on edit todo
	onEditTodo = id => {
		this.props.dispatch(setIdToEdit(id));
		this.props.dispatch(setIsEditable());
	};

	// edit todo from store
	onSubmitEditTodo = (id, updates) => {
		this.props.dispatch(editTodo(id, updates));
		this.props.dispatch(setIsEditable());
		this.props.dispatch(setIdToEdit({ id: null }));
	};

	render() {
		const { isEditable, id } = this.props.editability;
		return (
			<div>
				<TodosSearchForm />
				<TodosWrapper>
					<TodosList
						today={this.state.today}
						editableId={id}
						isEditable={isEditable}
						onAddTodos={this.onAddTodos}
						onEditTodo={this.onEditTodo}
						onSubmit={this.onSubmit}
						onSubmitEditTodo={this.onSubmitEditTodo}
						onRemoveTodo={this.onRemoveTodo}
					/>
				</TodosWrapper>
			</div>
		);
	}
}

const MapStateToProps = state => ({
	todos: state.todos,
	editability: state.editability,
});

export default connect(MapStateToProps)(TodayView);
