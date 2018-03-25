import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimePicker from 'rc-time-picker';
import '../styles/datePicker.css';
import '../styles/timePicker.css';
import validationAtFormLevel from '../helpers/validationAtFormLevel';
import { disableHours, disableMinutes } from '../helpers/disableHoursMinutes';

import MomentLocaleUtils, {
	formatDate,
	parseDate,
} from 'react-day-picker/moment';

//////
////// Styles
//////
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	font-size: 1.6rem;
	padding: 1rem;
	max-width: 70rem;

	> * {
		width: 100%;

		&:nth-child(2) {
			position: relative;
		}

		&:not(:last-child) {
			margin-bottom: 7rem;
		}
	}
`;

const CalendarIcon = styled.span`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
	color: #888;
	font-size: 2rem;
`;

const TimePickerWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Input = styled.input`
	border: none;
	border-bottom: 0.2rem solid #eee;
	height: 5rem;
	outline: none;
	font-size: 2rem;
	text-indent: 1rem;
`;

const Button = styled.button`
	padding: 2rem;
	border: 0.2rem solid #b74255;
	color: #b74255;
	border-radius: 0.4rem;
	font-size: 2rem;
`;

const ErrorSpan = styled.span`
	color: red;
	font-weight: bold;
`;

//////
////// Component
//////
class TodoAddForm extends React.Component {
	state = {
		description: this.props.description || '',
		createdAt: this.props.createdAt || undefined,
		startTime: undefined,
		endTime: undefined,
		fieldErrors: {},
	};

	// handle the description
	onChangeDescription = e => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	// handle created at
	onDayPickerChange = day => {
		let createdAt;
		if (day) createdAt = day;
		if (this.props.isEditable) {
			this.setState(() => ({ createdAt }));
			return;
		}
		this.setState(() => ({ createdAt }));
		this.props.onSelectDay(createdAt);
	};

	// handle submit for both when editing or adding todo
	onSubmit = e => {
		e.preventDefault();
		// check fieldErrors and return onSubmit earlier to prevent submission
		const description = this.state.description;
		const createdAt = this.state.createdAt;
		const fieldErrors = validationAtFormLevel(description, createdAt);
		this.setState(() => ({ fieldErrors }));
		if (Object.keys(fieldErrors).length) return;

		// if not errors found proceed with form submission
		if (this.props.onSubmitEditTodo) {
			const { description, createdAt } = this.state;
			this.props.onSubmitEditTodo(this.props.id, { description, createdAt });
		} else {
			this.props.onSubmit({ ...this.state });
			this.setState(() => ({
				description: '',
				createdAt: undefined,
				startTime: undefined,
				endTime: undefined,
			}));
		}
		this.props.push('/');
	};

	// handle the state for startTime
	onStartTimeChange = e => {
		const startTime = e;
		this.setState(() => ({ startTime }));
	};

	// handle the state for endTime
	onEndTimeChange = e => {
		const endTime = e;
		this.setState(() => ({ endTime }));
	};

	render() {
		// display human readable date in DatePickerInput
		const dayPickerValue = this.state.createdAt
			? moment(this.state.createdAt).format('dddd, MMMM Do, YYYY')
			: undefined;

		// toggle disabled for both start and end time
		const toggleEndTimeDisabled = !this.state.startTime;
		const toogleStartTimeDisabled = this.state.createdAt
			? !moment(this.state.createdAt).isSameOrAfter(moment(), 'day')
			: true;

		// variables to disable past time in time picker
		const day = moment(this.state.createdAt).format('MMMM Do YYYY');
		const today = moment().format('MMMM Do YYYY');
		const hour = moment(this.state.startTime).format('HH');
		const minute = moment().format('mm');

		return (
			<div>
				<Form action="#" onSubmit={this.onSubmit}>
					<Input
						type="text"
						placeholder="Add todo"
						value={this.state.description}
						onChange={this.onChangeDescription}
					/>
					{this.state.fieldErrors.description && (
						<ErrorSpan>{this.state.fieldErrors.description}</ErrorSpan>
					)}

					<div>
						<CalendarIcon className="ion-calendar" />
						<DayPickerInput
							value={dayPickerValue}
							placeholder="Select a day"
							onDayChange={this.onDayPickerChange}
							formatDate={formatDate}
							parseDate={parseDate}
							format="dddd, MMMM Do, YYYY"
							dayPickerProps={{
								locale: 'en',
								localeUtils: MomentLocaleUtils,
								todayButton: moment().format('[today] Do'),
								className: 'Form-DayPickerInput',
								fixedWeeks: true,
							}}
						/>
					</div>

					{this.state.fieldErrors.createdAt && (
						<ErrorSpan>{this.state.fieldErrors.createdAt}</ErrorSpan>
					)}

					<TimePickerWrapper>
						<TimePicker
							showSecond={false}
							value={this.state.startTime}
							format="h:mm a"
							use12Hours
							inputReadOnly
							disabled={toogleStartTimeDisabled}
							disabledHours={() => disableHours(moment().format('HH'))}
							disabledMinutes={() => disableMinutes(minute, day, today)}
							onChange={this.onStartTimeChange}
							placeholder="Start time"
						/>

						<TimePicker
							showSecond={false}
							value={this.state.endTime}
							format="h:mm a"
							use12Hours
							inputReadOnly
							disabled={toggleEndTimeDisabled}
							disabledHours={() => disableHours(hour, day, today)}
							disabledMinutes={() =>
								disableMinutes(moment(this.state.startTime).format('mm'))
							}
							onChange={this.onEndTimeChange}
							placeholder="End time"
						/>
					</TimePickerWrapper>

					<Button>{this.props.isEditable ? 'Update' : 'Add'}</Button>
				</Form>
			</div>
		);
	}
}

export default TodoAddForm;
