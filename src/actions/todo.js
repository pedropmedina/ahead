import uuid from 'uuid';

// add todo
export const addTodo = ({ description = '', createdAt = undefined } = {}) => ({
	type: 'ADD_TODO',
	todo: {
		description,
		createdAt,
		list: [],
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

// add item to list
export const addItemToList = (item, id) => ({
	type: 'ADD_ITEM_TO_LIST',
	item,
	id,
});
