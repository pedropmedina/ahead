const showListView = (lists, id) => {
	return lists.filter(item => {
		return item.id === id;
	});
};

export default showListView;

/*
	Iterate through the array of items and return a new array with items that share same id.

	from:
		[{dif id}, {dif id}, {dif id}]
	to:
		[{same id}, {same id}, {same id}]
*/
