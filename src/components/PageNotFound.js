import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
	<div>
		<h3>This page does not exist!</h3>
		<Link to="/">Go back to the Dashboard</Link>
	</div>
);

export default PageNotFound;
