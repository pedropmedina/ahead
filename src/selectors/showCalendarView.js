const showCalendarView = todos => {
	const newTodosByDay = {};
	for (let i = 0; i < todos.length; i++) {
		if (Object.keys(newTodosByDay).includes(todos[i].createdAt)) {
			newTodosByDay[todos[i].createdAt] = [
				...newTodosByDay[todos[i].createdAt],
				todos[i],
			];
		} else {
			newTodosByDay[todos[i].createdAt] = [todos[i]];
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
