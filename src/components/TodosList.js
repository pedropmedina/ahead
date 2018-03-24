import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
					.map(({ description, createdAt, id, list }) => {
						if (props.isEditable && props.editableId === id) {
							return (
								<TodoAddForm
									key={id}
									id={id}
									description={description}
									createdAt={createdAt}
									onSubmitEditTodo={props.onSubmitEditTodo}
									isEditable={props.isEditable}
									push={props.push}
								/>
							);
						}
						return (
							<Todo
								key={id}
								id={id}
								description={description}
								createdAt={createdAt}
								list={list}
								onRemoveTodo={props.onRemoveTodo}
								onEditTodo={props.onEditTodo}
							/>
						);
					})
					.filter(todo => {
						const createdAt = moment(todo.props.createdAt).format(
							'dddd, MMMM Do, YYYY',
						);

						if (props.today) return createdAt === props.today;
						return false;
						// return todo.createdAt === props.selectDay;
					})}
			</Ul>
		</div>
	);
};

const MapStateToProps = state => ({
	todos: state.todos,
});

export default connect(MapStateToProps)(TodoList);
