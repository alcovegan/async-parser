const parser = require('../../src');
const parseHTML = require('./handler');

const npmPackages = [
	'https://www.npmjs.com/package/async',
	'https://www.npmjs.com/package/react',
	'https://www.npmjs.com/package/redux'
];

parser({
	writeToFile: false,
	operationsLimit: 2,
	plainUrls: true,
	assets: npmPackages,
	handler: parseHTML
}, (response) => {
		console.log(response);
});