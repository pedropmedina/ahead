import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Month from '../components/Month';
import Day from '../components/Day';
import CreateTodos from '../components/CreateTodos';
import CreateList from '../components/CreateList';
import Header from '../components/Header';
import PageNotFound from '../components/PageNotFound';

const TodoAppRouter = () => {
	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Month} />
					<Route path="/today" component={Day} />
					<Route path="/createTodos" component={CreateTodos} />
					<Route path="/createList/:id" component={CreateList} />
					<Route component={PageNotFound} />
				</Switch>
			</div>
		</Router>
	);
};

export default TodoAppRouter;
