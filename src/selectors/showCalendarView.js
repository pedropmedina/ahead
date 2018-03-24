import moment from 'moment';

const showCalendarView = todos => {
	const newTodosByDay = {};
	for (let i = 0; i < todos.length; i++) {
		const createdAt = moment(todos[i].createdAt).format('dddd, MMMM Do, YYYY');

		if (Object.keys(newTodosByDay).includes(createdAt)) {
			newTodosByDay[createdAt] = [...newTodosByDay[createdAt], todos[i]];
		} else {
			newTodosByDay[createdAt] = [todos[i]];
		}
	}
	return newTodosByDay;
};

export default showCalendarView;

/*
	// each day needs its own array of objects
	{
		day1: [{ }, { }, { }]
		day2: [{ }, { }, { }]
		day3: [{ }, { }, { }]
	}
*/
