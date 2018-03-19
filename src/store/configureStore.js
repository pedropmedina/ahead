import { createStore, combineReducers } from 'redux';
import todosReducer from '../reducers/todos';
import editabilityReducer from '../reducers/editability';
import listsReducer from '../reducers/lists';

export default () => {
	const store = createStore(
		combineReducers({
			todos: todosReducer,
			editability: editabilityReducer,
			lists: listsReducer,
		}),
	);
	return store;
};
