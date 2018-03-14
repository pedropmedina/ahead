import React from 'react';
import { connect } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../actions/todo';
import TodosList from './TodosList';

class CreateTodos extends React.Component {
	state = {
		isEditable: false,
		id: null,
		selectDay: '',
	};

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
		this.setState(() => ({ isEditable: !this.state.isEditable, id }));
	};

	// edit todo from store
	onSubmitEditTodo = (id, updates) => {
		this.props.dispatch(editTodo(id, updates));
		this.setState(() => ({ isEditable: !this.state.isEditable, id: null }));
	};

	// handle selectDay
	onSelectDay = day => {
		const selectDay = day;
		this.setState(() => ({ selectDay }));
	};

	render() {
		const { isEditable, id, selectDay } = this.state;
		return (
			<div>
				<TodosList
					editableId={id}
					isEditable={isEditable}
					selectDay={selectDay}
					onAddTodos={this.onAddTodos}
					onEditTodo={this.onEditTodo}
					onSubmit={this.onSubmit}
					onSubmitEditTodo={this.onSubmitEditTodo}
					onRemoveTodo={this.onRemoveTodo}
					onSelectDay={this.onSelectDay}
				/>
			</div>
		);
	}
}

const MapStateToProps = state => ({
	todos: state.todos,
});

export default connect(MapStateToProps)(CreateTodos);
