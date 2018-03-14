/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addTodo } from './actions/todo';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import moment from 'moment';
import { injectGlobal } from 'styled-components';

injectGlobal`
	html {
		font-size: 62.5%;
	}
	body {
		box-sizing: border-box;
		line-height: 1.3
		font-family: 'Helvetica'
	}
	*,
	*::before,
	*::after {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
	}
`;

// store -> notice that we have to call configureStore function to have access to store. This is the same pattern that express uses
const store = configureStore();
const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});
store.dispatch(
	addTodo({
		description: "Buy Philippe's food",
		createdAt: moment().format('dddd, MMMM Do, YYYY'),
	}),
);
store.dispatch(
	addTodo({
		description: 'Do groceries',
		createdAt: moment().format('dddd, MMMM Do, YYYY'),
	}),
);

// Provider gives react access to redux store
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

// render app
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();

// states
// 1. track of created todos
// 2. each todo in todo
// 3. filters -> date, search
