const defaultTodoState = [];
const todosReducer = (state = defaultTodoState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, action.todo];
		case 'REMOVE_TODO':
			return state.filter(todo => todo.id !== action.id);
		case 'EDIT_TODO':
			return state.map(todo => {
				if (todo.id === action.id) {
					return { ...todo, ...action.updates };
				} else {
					return todo;
				}
			});
		case 'EMPTY_TODOS':
			return [];
		case 'ADD_ITEM_TO_LIST':
			return state.map(todo => {
				if (todo.id === action.id) {
					return { ...todo, list: todo.list.concat(action.item) };
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
};

export default todosReducer;

/* [{}, {}, {}, {}] */
