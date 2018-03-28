import React from 'react';
import BigCalendar from 'react-big-calendar';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import '../styles/calendar.css';

BigCalendar.momentLocalizer(moment);
// let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

//////
////// styles
//////
const MainWrapper = styled.div`
	position: fixed;
	bottom: ${props => (props.isOpen ? 0 : '-63.7rem')};
	width: 100%;
	height: ${props => (props.isOpen ? '100%' : 0)};
	display: block;
	background-color: #f7f7f7;
	transition: all 0.5s;
`;

const ExpandButton = styled.button`
	border: none;
	border-radius: 50%;
	width: 6rem;
	height: 6rem;
	background-color: #b74255;
	color: #fff;
	font-weight: 700;
	font-size: 2rem;
	position: fixed;
	bottom: 6rem;
	right: 6rem;
	outline: none;
	transition: all 0.2s;
	box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.4);
	z-index: 10000;
`;

// const e = [
// 	{
// 		// id: 0,
// 		title: 'All Day Event very long title',
// 		allDay: true,
// 		start: new Date(),
// 		end: new Date(),
// 	},
// 	{
// 		// id: 1,
// 		title: 'Long Event',
// 		start: new Date(2018, 2, 7),
// 		end: new Date(2018, 2, 10),
// 	},

// 	{
// 		// id: 2,
// 		title: 'DTS STARTS',
// 		start: new Date(2018, 2, 12, 0, 0, 0),
// 		end: new Date(2018, 2, 15, 0, 0, 0),
// 		something: undefined,
// 	},
// 	{
// 		// id: 3,
// 		title: 'Custom test',
// 		start: new Date(2018, 2, 25, 3, 0, 0),
// 		end: new Date(2018, 2, 25, 5, 0, 0),
// 	},
// ];

class Calendar extends React.Component {
	state = {
		isOpen: false,
	};

	onToggleCalendar = () => {
		this.setState(() => ({ isOpen: !this.state.isOpen }));
	};

	render() {
		const todos = this.props.todos;

		return (
			<MainWrapper isOpen={this.state.isOpen}>
				<BigCalendar
					selectable
					events={todos}
					defaultDate={new Date()}
					views={['month', 'week', 'day']}
					showMultiDayTimes
					onSelectEvent={event => console.log(event)}
					onSelectSlot={slot => console.log(slot)}
					// step={60}
					// view="month"
				/>
				<ExpandButton
					onClick={this.onToggleCalendar}
					isOpen={this.state.isOpen}
				>
					<i
						className={
							this.state.isOpen
								? 'fas fa-calendar-times'
								: 'fas fa-calendar-alt'
						}
					/>
				</ExpandButton>
			</MainWrapper>
		);
	}
}

const MapStateToProps = state => {
	return {
		todos: state.todos,
	};
};

export default connect(MapStateToProps)(Calendar);
