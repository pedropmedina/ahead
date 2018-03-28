import React from 'react';
import styled from 'styled-components';

const SelectionButton = styled.button`
	position: absolute;
	background-color: transparent;
	color: #aaa;
	border: none;
	font-size: 1.6rem;
	outline: none;
	/* transform: translateY(-50vh); */
`;

const NextButton = SelectionButton.extend`
	top: 50vh;
	right: 3rem;
`;

const PrevButton = SelectionButton.extend`
	top: 50vh;
	left: 3rem;
`;

const NavButtons = () => (
	<React.Fragment>
		<PrevButton>←</PrevButton>
		<NextButton>→</NextButton>
	</React.Fragment>
);

export default NavButtons;
