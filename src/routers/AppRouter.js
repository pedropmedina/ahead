import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalendarView from '../components/CalendarView';
import TodayView from '../components/TodayView';
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
					<Route exact path="/" component={CalendarView} />
					<Route path="/today" component={TodayView} />
					<Route path="/createTodos" component={CreateTodos} />
					<Route path="/createList/:id" component={CreateList} />
					<Route component={PageNotFound} />
				</Switch>
			</div>
		</Router>
	);
};

export default TodoAppRouter;
