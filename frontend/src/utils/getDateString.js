const getDateString = (date, showTime = true) => {
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	const timeStr = new Date(date).toLocaleTimeString('en', {
		timeStyle: 'short',
		hour12: true,
		timeZone: 'IST',
	});

	let result = '';
	if (showTime) result += `${timeStr} `;
	return result + new Date(date).toLocaleDateString('en', options);
};

export default getDateString;
