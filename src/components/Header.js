import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

const HeaderTag = styled.header`
	position: relative;
	background-color: #b74255;
	padding: 3rem 2rem;
`;

/*
const Logo = styled.h1`
	position: absolute;
	left: 2rem;
	top: 17%;
	transform: translateY(-17%);
	font-size: 3rem;
	color: #b74255;
	background-color: #fff;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	text-align: center;
	line-height: 1.5;
`;
*/

const Nav = styled.nav`
	/* background-color: #fff; */
	font-size: 1.6rem;
	text-transform: uppercase;
	width: 100%;
	padding: 1rem 1rem 1rem 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	> * {
		margin: 1rem;
	}
`;

const NavItem = styled(NavLink)`
	color: #fff;
	text-decoration: none;
	letter-spacing: 0.1rem;
	border: 0.2rem solid #fff;
	padding: 1rem 2rem;
`;

const TodayDate = styled.h2`
	font-size: 3rem;
	padding: 1rem 1rem 3rem 1rem;
	text-align: center;
	color: #fff;
	font-weight: 500;
`;

const Header = () => {
	return (
		<HeaderTag>
			{/* <Logo>↠</Logo> */}
			<TodayDate>{moment().format('dddd, MMMM Do, YYYY')}</TodayDate>
			<Nav>
				<NavItem exact to="/">
					Calendar
				</NavItem>
				<NavItem to="/today">Today</NavItem>
				<NavItem to="/createTodos">Create todos</NavItem>
				{/* <NavItem to="/createList">Create list</NavItem> */}
			</Nav>
		</HeaderTag>
	);
};

export default Header;
