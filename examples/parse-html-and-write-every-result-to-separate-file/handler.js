const fs = require('fs');
const cheerio = require('cheerio');

module.exports = function (response, asset) {
	const $ = cheerio.load(response.data);
	const packageName = $('h1.package-name')
		.text()
		.trim();

	fs.writeFile(`${packageName}.txt`, packageName, 'utf8', (err) => {
		if(err) throw err;
		console.log(`Done with ${packageName}!`);
	});

	return packageName
};