import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import TodoAddForm from './TodoAddForm';
import styled from 'styled-components';

const Ul = styled.ul`
	list-style: none;
	padding: 1rem;
`;

const TodoList = props => {
	return (
		<div>
			<Ul>
				{props.todos
					.map(({ description, createdAt, id }) => {
						if (props.isEditable && props.editableId === id) {
							return (
								<TodoAddForm
									key={id}
									id={id}
									description={description}
									createdAt={createdAt}
									onSubmitEditTodo={props.onSubmitEditTodo}
									isEditable={props.isEditable}
								/>
							);
						}
						return (
							<Todo
								key={id}
								id={id}
								description={description}
								createdAt={createdAt}
								onRemoveTodo={props.onRemoveTodo}
								onEditTodo={props.onEditTodo}
								onAddTodos={props.onAddTodos}
							/>
						);
					})
					.filter(todo => {
						if (props.today) return todo.props.createdAt === props.today;
						return todo.props.createdAt === props.selectDay;
					})}
			</Ul>
		</div>
	);
};

const MapStateToProps = state => ({
	todos: state.todos,
});

export default connect(MapStateToProps)(TodoList);
