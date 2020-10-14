const querystring = require("./querystring");

function translate(text, options) {
	let url = "https://translate.google.com/translate_a/single"
	const from = options.from || "en";
	const to = options.to || "ko";
	const data = {
		client: "gtx",
		sl: from,
		tl: to,
		hl: to,
		dt: ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"],
		ie: "UTF-8",
		oe: "UTF-8",
		otf: 1,
		ssel: 0,
		tsel: 0,
		kc: 7,
		q: text
	};
	url += "?" + objectToString(data);
	const json = JSON.parse(org.jsoup.Jsoup.connect(url).ignoreContentType(true).ignoreHttpErrors(true).get().text());
	const translatedText = json[0][0][0];
	let pronunciation = "";
	for (let i = 0; i < json[0][1].length; i++) if (json[0][1][i] != null) pronunciation = json[0][1][i];
	const result = {
		translatedText: translatedText,
		pronunciation: pronunciation,
		from: from,
		to: to,
		text: text,
		json: json
	};
	return result;
}

module.exports = translate;