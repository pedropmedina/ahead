// add item to list
export const addItemToList = ({ id = null, itemDescription = '' } = {}) => {
	return {
		type: 'ADD_ITEM_TO_LIST',
		listItem: {
			id,
			itemDescription,
		},
	};
};
