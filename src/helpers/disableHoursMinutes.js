// returns an array with the numbers below the current hour
export const disableHours = (startHour, day, today) => {
	const hoursToDisable = [];
	if (day === today) {
		for (let i = 0; i < startHour; i++) {
			hoursToDisable.push(i);
		}
	}
	return hoursToDisable;
};

// returns an array with the numbers below the current minute
export const disableMinutes = (startMinute, day, today) => {
	const minutesToDisable = [];
	if (day === today) {
		for (let i = 0; i < startMinute; i++) {
			minutesToDisable.push(i);
		}
	}
	return minutesToDisable;
};
