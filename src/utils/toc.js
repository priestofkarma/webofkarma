export default function tableOfContents(settings) {
	// Helper function that iterates all headings and returns the highest level.
	// For example, if array of  h2, h3 and h4 is passed, the function returns 2.
	function translit(word) {
		let answer = '';
		const converter = {
			'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
			'е': 'e', 'є': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
			'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
			'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
			'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
			'ш': 'sh', 'щ': 'sch', 'ь': '', 'ї': 'i', 'ґ': 'ґ',
			'ю': 'yu', 'я': 'ya', 'і': 'i', ',': '', '‘': '', '`': '', '’': '', '"': ''
		};

		for (let i = 0; i < word.length; ++i) {
			if (converter[word[i]] === undefined) {
				answer += word[i];
			} else {
				answer += converter[word[i]];
			}
		}
		return answer;
	}

	const getHighestHIndex = headings => {
		let indexes = Array.from(headings).map(item => {
			return parseInt(item.tagName.replace('H', ''));
		});
		return indexes.reduce((a, b) => {
			return Math.min(a, b);
		});
	};

	const createAnchors = (settings) => {
		let headings = document.querySelectorAll(settings.headingsSelector);
		headings.forEach(item => {
			const anchorName = translit(item.innerHTML.toLowerCase()).replace(/[^а-яА-ЯёЁa-zA-Z0-9]/ig, '-');
			item.classList.add('anchor-header');
			item.setAttribute('id', anchorName);
			item.insertAdjacentHTML('afterbegin', `<a href='#${anchorName}'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a>`);
		});
	};

	const createTableOfContents = (settings) => {
		let headings = document.querySelectorAll(settings.headingsSelector);
		let tableOfContentsWrapper = document.querySelector(settings.wrapperSelector);
		let tableOfContents = '';
		let prevHeadingLevel = getHighestHIndex(headings);
		headings.forEach(item => {
			let headingLevel = parseInt(item.tagName.replace('H', ''));
			if (prevHeadingLevel > headingLevel) {
				tableOfContents += '</ul>';
			}
			if (prevHeadingLevel < headingLevel) {
				tableOfContents += '<ul>';
			}
			tableOfContents += `<li><a href="#${item.getAttribute('id')}" class="group relative"><span class="dot"></span>${item.textContent}</a></li>`;
			prevHeadingLevel = headingLevel;
		});
		tableOfContentsWrapper.innerHTML = tableOfContents;
	};

	createAnchors(settings);
	createTableOfContents(settings);
};