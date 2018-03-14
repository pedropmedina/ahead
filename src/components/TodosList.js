import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';
import TodoAddForm from './TodoAddForm';
import styled from 'styled-components';

const MainWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
	width: 100%;
`;

const Ul = styled.ul`
	list-style: none;
	padding: 1rem;
`;

const TodoList = props => {
	return (
		<MainWrapper>
			<TodoAddForm onSubmit={props.onSubmit} onSelectDay={props.onSelectDay} />
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
						return todo.props.createdAt === props.selectDay;
					})}
			</Ul>
		</MainWrapper>
	);
};

const MapStateToProps = state => ({
	todos: state.todos,
});

export default connect(MapStateToProps)(TodoList);
