export default function dateFormat(data, lang) {
	const formatDate = new Date(data);
	const date = {
		year: formatDate.getFullYear(),
		month: formatDate.getMonth(),
		day: formatDate.getDate(),
	}
	const month = {
		en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		uk: ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'],
	};
	// const enDate = `${month[lang][date.month]} ${date.day < 10 ? `0${date.day}` : date.day}, ${date.year}`
	// const ukDate = `${date.day < 10 ? `0${date.day}` : date.day} ${month[lang][date.month].toLowerCase()} ${date.year}`
	const formated = {
		enDate: `${month[lang][date.month]} ${date.day < 10 ? `0${date.day}` : date.day}, ${date.year}`,
		ukDate: `${date.day < 10 ? `0${date.day}` : date.day} ${month[lang][date.month].toLowerCase()} ${date.year}`
	}
	return formated
}
