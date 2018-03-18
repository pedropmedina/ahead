import { createStore, combineReducers } from 'redux';
import todosReducer from '../reducers/todos';
import editabilityReducer from '../reducers/editability';

export default () => {
	const store = createStore(
		combineReducers({
			todos: todosReducer,
			editability: editabilityReducer,
		}),
	);
	return store;
};
