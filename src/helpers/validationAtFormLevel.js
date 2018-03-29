// handle validation at form level on submit
const validate = (title, start) => {
	const errors = {};
	if (!title) errors.title = 'Provide description';
	if (!start) errors.start = 'Pick a date for your todo';
	return errors;
};

export default validate;
