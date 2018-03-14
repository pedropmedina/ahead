import uuid from 'uuid';

// add todo
export const addTodo = ({ description = '', createdAt = undefined } = {}) => ({
	type: 'ADD_TODO',
	todo: {
		description,
		createdAt,
		id: uuid(),
	},
});

// remove todo
export const removeTodo = ({ id }) => ({
	type: 'REMOVE_TODO',
	id,
});

// edit todo
export const editTodo = (id, updates) => ({
	type: 'EDIT_TODO',
	id,
	updates,
});
