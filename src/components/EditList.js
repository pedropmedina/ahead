import React from 'react';

const EditList = props => (
	<div>
		<h3>Editing list with id: {props.match.params.id}</h3>
	</div>
);

export default EditList;
