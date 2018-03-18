// handle validation at form level on submit
const validate = (description, createdAt) => {
	const errors = {};
	if (!description) errors.description = 'Provide description';
	if (!createdAt) errors.createdAt = 'Pick a date for your todo';
	return errors;
};

export default validate;
