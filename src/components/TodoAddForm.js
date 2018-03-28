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

		&:not(:last-child) {
			margin-bottom: 7rem;
		}
	}
`;

const DayPickersWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		position: relative;
		width: 45%;
	}
`;

const CalendarIcon = styled.span`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
	color: #b1b1b1;
	font-size: 1.5rem;
`;

const TimePickerWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		position: relative;
		width: 45%;
	}
`;

const ClockIcon = styled.span`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
	color: #b1b1b1;
	font-size: 1.5rem;
	z-index: 5;
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
		title: this.props.title || '',
		start: this.props.start || undefined,
		end: this.props.end || undefined,
		startTime: undefined,
		endTime: undefined,
		fieldErrors: {},
	};

	// handle the title
	onChangeTitle = e => {
		const title = e.target.value;
		this.setState(() => ({ title }));
	};

	// handle start
	onStartDayPickerChange = day => {
		let start;
		if (day) start = day;
		if (this.props.isEditable) {
			this.setState(() => ({ start }));
			return;
		}
		this.setState(() => ({ start }));
		this.props.onSelectDay(start);
	};

	// handle end
	onEndDayPickerChange = day => {
		let end;
		if (day) end = day;
		if (this.props.isEditable) {
			this.setState(() => ({ end }));
			return;
		}
		this.setState(() => ({ end }));
		this.props.onSelectDay(end);
	};

	// handle submit for both when editing or adding todo
	onSubmit = e => {
		e.preventDefault();
		// check fieldErrors and return onSubmit earlier to prevent submission
		const title = this.state.title;
		const start = this.state.start;
		const fieldErrors = validationAtFormLevel(title, start);
		this.setState(() => ({ fieldErrors }));
		if (Object.keys(fieldErrors).length) return;

		// if not errors found proceed with form submission
		if (this.props.onSubmitEditTodo) {
			const { title, start, end } = this.state;
			this.props.onSubmitEditTodo(this.props.id, { title, start, end });
		} else {
			this.props.onSubmit({ ...this.state });
			this.setState(() => ({
				title: '',
				start: undefined,
				end: undefined,
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
		const start = this.state.start
			? moment(this.state.start).format('ddd, MMM Do, YYYY')
			: undefined;
		const end = this.state.end
			? moment(this.state.end).format('ddd, MMM Do, YYYY')
			: undefined;

		// toggle disabled for both start and end time
		const toggleEndTimeDisabled = !this.state.startTime;
		const toogleStartTimeDisabled = this.state.start
			? !moment(this.state.start).isSameOrAfter(moment(), 'day')
			: true;

		// variables to disable past time in time picker
		const day = moment(this.state.start).format('MMMM Do YYYY');
		const today = moment().format('MMMM Do YYYY');
		const hour = moment(this.state.startTime).format('HH');
		const minute = moment().format('mm');
		console.log(
			moment()
				.set({ hour: '4', minute: '30' })
				.toDate(),
		);
		console.log(moment().format('h:mm'));

		return (
			<div>
				<Form action="#" onSubmit={this.onSubmit}>
					<Input
						type="text"
						placeholder="Add task"
						value={this.state.title}
						onChange={this.onChangeTitle}
					/>
					{this.state.fieldErrors.title && (
						<ErrorSpan>{this.state.fieldErrors.title}</ErrorSpan>
					)}

					<DayPickersWrapper>
						<div>
							<CalendarIcon className="far fa-calendar-alt" />
							<DayPickerInput
								value={start}
								placeholder="From"
								onDayChange={this.onStartDayPickerChange}
								formatDate={formatDate}
								parseDate={parseDate}
								format="dddd, MMMM Do, YYYY"
								dayPickerProps={{
									locale: 'en',
									localeUtils: MomentLocaleUtils,
									todayButton: 'Today',
									// className: 'Form-DayPickerInput',
									fixedWeeks: true,
								}}
							/>
						</div>
						<div>
							<CalendarIcon className="far fa-calendar-alt" />
							<DayPickerInput
								value={end}
								placeholder="To"
								onDayChange={this.onEndDayPickerChange}
								formatDate={formatDate}
								parseDate={parseDate}
								format="dddd, MMMM Do, YYYY"
								dayPickerProps={{
									locale: 'en',
									localeUtils: MomentLocaleUtils,
									todayButton: 'Today',
									className: 'Form-DayPickerInput',
									fixedWeeks: true,
								}}
							/>
						</div>
					</DayPickersWrapper>

					{this.state.fieldErrors.start && (
						<ErrorSpan>{this.state.fieldErrors.start}</ErrorSpan>
					)}

					<TimePickerWrapper>
						<div>
							<ClockIcon className="far fa-clock" />
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
								placeholder="Start"
							/>
						</div>

						<div>
							<ClockIcon className="far fa-clock" />
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
								placeholder="End"
							/>
						</div>
					</TimePickerWrapper>

					<Button>{this.props.isEditable ? 'Update' : 'Add'}</Button>
				</Form>
			</div>
		);
	}
}

export default TodoAddForm;
