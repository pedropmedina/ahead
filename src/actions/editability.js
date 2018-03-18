// set select day to filter the todos by day
export const setSelectDay = selectDay => {
	return {
		type: 'SET_SELECT_DAY',
		selectDay,
	};
};

// set editable id to target the todo that must be edit
export const setIdToEdit = ({ id }) => {
	return { type: 'SET_ID_TO_EDIT', id };
};

// toggle is editable to render either the TodoAddForm or Todo
export const setIsEditable = () => {
	return { type: 'SET_IS_EDITABLE' };
};
