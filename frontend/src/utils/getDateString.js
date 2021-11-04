// there is a need to convert mongodb dates to readable date formats in various pages
// this util function does that, and has a second argument to decide whether the time has to be included
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
