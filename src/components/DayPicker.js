import React from 'react';
import styled from 'styled-components';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import '../styles/datePicker.css';

import MomentLocaleUtils, {
	formatDate,
	parseDate,
} from 'react-day-picker/moment';

//
// styles
//
const CalendarIcon = styled.span`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
	color: #b1b1b1;
	font-size: 1.5rem;
`;

//
// jsx
//
const DayPicker = props => {
	// handle start and end
	const onDayPickerChange = day => {
		if (day && props.dayType === 'start') {
			props.handleStartEnd({ type: 'start', start: day });
		} else if (day && props.dayType === 'end') {
			props.handleStartEnd({ type: 'end', end: day });
		} else if (props.dayType === 'start') {
			props.handleStartEnd({ type: 'start', start: undefined });
		} else if (props.dayType === 'end') {
			props.handleStartEnd({ type: 'end', end: undefined });
		}
	};

	return (
		<div>
			<CalendarIcon className="far fa-calendar-alt" />
			<DayPickerInput
				value={props.val}
				placeholder={props.dayType === 'start' ? 'From' : 'To'}
				onDayChange={onDayPickerChange}
				formatDate={formatDate}
				parseDate={parseDate}
				format="ddd, MMM Do, YYYY"
				dayPickerProps={{
					locale: 'en',
					localeUtils: MomentLocaleUtils,
					todayButton: 'Today',
					// className: 'Form-DayPickerInput',
					fixedWeeks: true,
				}}
			/>
		</div>
	);
};

export default DayPicker;
