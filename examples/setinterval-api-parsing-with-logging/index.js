// logging bitcoin courses from coinmarketapp api every 10 seconds in console

const parser = require('../../src');
const customHandler = require('./handler');

const currencyList = [
	'usd',
	'eur',
	'rub'
];

setInterval(() => {

	parser({
		writeToFile: false,
		operationsLimit: 3,
		urlSchema: {
			baseUrl: "https://api.coinmarketcap.com",
			template: "/v1/ticker/bitcoin",
			changingAssets: ['convert']
		},
		assets: currencyList,
		handler: customHandler
	});
	console.log('--------------------');

}, 10000);