import moment from 'moment';

const showMonthTodos = todos => {
	const newTodosByDay = {};
	for (let i = 0; i < todos.length; i++) {
		const start = moment(todos[i].start).format('dddd, MMMM Do, YYYY');

		if (Object.keys(newTodosByDay).includes(start)) {
			newTodosByDay[start] = [...newTodosByDay[start], todos[i]];
		} else {
			newTodosByDay[start] = [todos[i]];
		}
	}
	console.log(newTodosByDay);
	return newTodosByDay;
};

export default showMonthTodos;

/*
	// each day needs its own array of objects
	{
		day1: [{ }, { }, { }]
		day2: [{ }, { }, { }]
		day3: [{ }, { }, { }]
	}
*/
