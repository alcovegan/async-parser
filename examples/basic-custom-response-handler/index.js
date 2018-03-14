const parser = require('../../src');
const customHandler = require('./handler');

const githubUsers = [
	'gaearon',
	'ai',
	'kenwheeler'
];

parser({
	writeToFile: true,
	operationsLimit: 2,
	urlSchema: {
		baseUrl: "http://api.github.com",
		template: "/users/:user",
		changingParams: ['user']
	},
	assets: githubUsers,
	handler: customHandler
}, (response) => {
		console.log(response);
});