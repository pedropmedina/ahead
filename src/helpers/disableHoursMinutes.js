import moment from 'moment';

// returns array with hours to disable for first timePicker
export const disableStartTimeHours = (today, day, hour) => {
	const hoursToDisable = [];
	if (moment(day).isSame(today)) {
		for (let i = 0; i < hour; i++) {
			hoursToDisable.push(i);
		}
	}

	return hoursToDisable;
};

// returns array with hours to disable for second timePicker
export const disableEndTimeHours = startTime => {
	const hour = moment(startTime).hour();
	const hoursToDisable = [];
	for (let i = 0; i < hour; i++) {
		hoursToDisable.push(i);
	}

	return hoursToDisable;
};

// returns array with minutes to disable first timePicker
export const disableStartMinutes = (today, day, minute) => {
	const minutesToDisable = [];
	if (moment(day).isSame(today)) {
		for (let i = 0; i < minute; i++) {
			minutesToDisable.push(i);
		}
	}

	return minutesToDisable;
};

// returns array with minutes to disable first timePicker
export const disableEndMinutes = startTime => {
	const minute = moment(startTime).minute();
	const minutesToDisable = [];
	for (let i = 0; i < minute; i++) {
		minutesToDisable.push(i);
	}

	return minutesToDisable;
};
