const defaultListState = [];
const ListReducer = (state = defaultListState, action) => {
	switch (action.type) {
		case 'ADD_ITEM_TO_LIST':
			return [...state, action.listItem];
		default:
			return state;
	}
};

export default ListReducer;

/*
	[
		{id: number, item: 'item description'}
		{id: number, item: 'item description'}
		{id: number, item: 'item description'}
	]
*/
