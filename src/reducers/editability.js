const editabilityDefaultState = {
	selectDay: '',
	id: null,
	isEditable: false,
};
const editabilityReducer = (state = editabilityDefaultState, action) => {
	switch (action.type) {
		case 'SET_SELECT_DAY':
			const selectDay = action.selectDay;
			return { ...state, selectDay };
		case 'SET_ID_TO_EDIT':
			const id = action.id;
			return { ...state, id };
		case 'SET_IS_EDITABLE':
			const isEditable = !state.isEditable;
			return { ...state, isEditable };
		default:
			return state;
	}
};

export default editabilityReducer;
