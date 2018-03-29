import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactTimePicker from 'rc-time-picker';
import '../styles/timePicker.css';
import {
	disableStartTimeHours,
	disableEndTimeHours,
	disableStartMinutes,
	disableEndMinutes,
} from '../helpers/disableHoursMinutes';

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

const TimePicker = props => {
	// variables pool to disable time picker
	const day = moment(props.start).format('YYYY-MM-DD');
	const today = moment().format('YYYY-MM-DD');
	const hour = day === today ? moment().hour() : 0;
	const minute = moment().get('minute');

	// toggle disabled for both start and end time
	const toggleDisableTime = props.start
		? !moment(day).isSameOrAfter(today)
		: props.startTime ? !props.startTime : true;

	// handle start and end time on TimePickerChange
	const onTimePickerChange = time => {
		if (props.timeType === 'startTime') {
			props.handleStartEndTime({ type: 'startTime', startTime: time });
		} else if (props.timeType === 'endTime') {
			props.handleStartEndTime({ type: 'endTime', endTime: time });
		}
	};

	return (
		<div>
			<ClockIcon className="far fa-clock" />
			<ReactTimePicker
				showSecond={false}
				value={props.val}
				format="h:mm a"
				use12Hours
				inputReadOnly
				disabled={toggleDisableTime}
				disabledHours={
					props.startTime
						? () => disableEndTimeHours(props.startTime)
						: () => disableStartTimeHours(today, day, hour)
				}
				disabledMinutes={
					props.startTime
						? () => disableEndMinutes(props.startTime)
						: () => disableStartMinutes(today, day, minute)
				}
				onChange={onTimePickerChange}
				placeholder={props.timeType === 'startTime' ? 'Start' : 'End'}
			/>
		</div>
	);
};

export default TimePicker;
