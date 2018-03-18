import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import styled from 'styled-components';
import '../style.css';

//////
////// styles
//////
const MainWrapper = styled.div`
	position: fixed;
	bottom: ${props => (props.isOpen ? 0 : '-39rem')};
	width: 100%;
	height: 39rem;
	display: block;
	background-color: #eee;
	transition: all 0.5s;
`;

const RangeInfo = styled.div`
	padding: 1rem;
	text-align: center;
	font-size: 1.6rem;
	height: 6rem;
	color: #5b5959;
`;

const ResetButton = styled.button`
	border: 0.1rem;
	border: 0.1rem solid #b74255;
	color: #b74255;
	padding: 0.5rem 1rem;
	background-color: transparent;
	margin-left: 1rem;
`;

const ExpandButton = styled.button`
	border: none;
	border-radius: 50%;
	width: 5rem;
	height: 5rem;
	background-color: ${props => (props.isOpen ? '#eee' : '#b74255')};
	color: ${props => (props.isOpen ? '#aaa' : '#fff')};
	font-weight: 700;
	font-size: 4rem;
	position: absolute;
	top: -6rem;
	left: 50%;
	transform: translateX(-50%);
	outline: none;
	transition: all 0.2s;
	box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.3);
`;

class MultiDayPicker extends React.Component {
	state = {
		from: null,
		to: null,
		enteredTo: null,
		isOpen: false,
	};

	isSelectingFirstDay = (from, to, day) => {
		const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
		const isRangeSelected = from && to;
		return !from || isBeforeFirstDay || isRangeSelected;
	};

	handleDayClick = day => {
		const { from, to } = this.state;
		if (from && to && day >= from && day <= to) {
			this.handleResetClick();
			return;
		}
		if (this.isSelectingFirstDay(from, to, day)) {
			this.setState({
				from: day,
				to: null,
				enteredTo: null,
			});
		} else {
			this.setState({
				to: day,
				enteredTo: day,
			});
		}
	};

	handleDayMouseEnter = day => {
		const { from, to } = this.state;
		if (!this.isSelectingFirstDay(from, to, day)) {
			this.setState({
				enteredTo: day,
			});
		}
	};

	handleResetClick = () => {
		this.setState({
			from: null,
			to: null,
			enteredTo: null,
		});
	};

	onToggleCalendar = () => {
		this.setState(() => ({ isOpen: !this.state.isOpen }));
	};

	render() {
		const { from, to, enteredTo } = this.state;
		const modifiers = { start: from, end: enteredTo };
		const disabledDays = { before: this.state.from };
		const selectedDays = [from, { from, to: enteredTo }];
		return (
			<MainWrapper isOpen={this.state.isOpen}>
				<ExpandButton
					onClick={this.onToggleCalendar}
					isOpen={this.state.isOpen}
				>
					<i
						className={
							this.state.isOpen ? 'ion-ios-arrow-down' : 'ion-ios-arrow-up'
						}
					/>
				</ExpandButton>
				<DayPicker
					className="Range"
					numberOfMonths={4}
					fromMonth={from}
					selectedDays={selectedDays}
					disabledDays={disabledDays}
					modifiers={modifiers}
					onDayClick={this.handleDayClick}
					onDayMouseEnter={this.handleDayMouseEnter}
					todayButton={this.state.from ? undefined : 'Go to Today'}
				/>
				<RangeInfo>
					{!from && !to && 'Please select the first day.'}
					{from && !to && 'Please select the last day.'}
					{from &&
						to &&
						`Selected from ${from.toLocaleDateString()} to
									${to.toLocaleDateString()}`}
					{from &&
						to && (
							<ResetButton className="link" onClick={this.handleResetClick}>
								X
							</ResetButton>
						)}
				</RangeInfo>
			</MainWrapper>
		);
	}
}

export default MultiDayPicker;
