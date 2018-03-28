import uuid from 'uuid';

// add todo
export const addTodo = ({
	title = '',
	start = undefined,
	end = undefined,
} = {}) => ({
	type: 'ADD_TODO',
	todo: {
		id: uuid(),
		title,
		start,
		end,
		list: [],
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
