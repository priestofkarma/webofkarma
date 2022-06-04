export default function getLangContent(lang, array) {
	for (let item of array) {
		if (item.node_locale === lang) {
			return item
		}
	}
}
