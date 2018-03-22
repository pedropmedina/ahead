import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addTodo, removeTodo, editTodo } from '../actions/todo';
import {
	setSelectDay,
	setIdToEdit,
	setIsEditable,
} from '../actions/editability';
import TodosList from './TodosList';
import TodoAddForm from './TodoAddForm';

//////
////// styles
//////
const MainWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
	width: 100%;
`;

class CreateTodos extends React.Component {
	// add todo to the store
	onSubmit = todo => {
		this.props.dispatch(addTodo(todo));
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
		this.props.dispatch(setIdToEdit({ id: null }));
		this.props.dispatch(setIsEditable());
	};

	// handle selectDay
	onSelectDay = day => {
		const selectDay = day;
		this.props.dispatch(setSelectDay(selectDay));
	};

	render() {
		const { isEditable, id, selectDay } = this.props.editability;
		return (
			<MainWrapper>
				<TodoAddForm onSubmit={this.onSubmit} onSelectDay={this.onSelectDay} />
				<TodosList
					editableId={id}
					isEditable={isEditable}
					selectDay={selectDay}
					onEditTodo={this.onEditTodo}
					onSubmit={this.onSubmit}
					onSubmitEditTodo={this.onSubmitEditTodo}
					onRemoveTodo={this.onRemoveTodo}
					onSelectDay={this.onSelectDay}
				/>
			</MainWrapper>
		);
	}
}

const MapStateToProps = state => ({
	todos: state.todos,
	editability: state.editability,
});

export default connect(MapStateToProps)(CreateTodos);
