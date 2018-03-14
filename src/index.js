const fs = require('fs');
const chalk = require('chalk');
const logsymbols = require('log-symbols');
const axios = require('axios');
const async = require('async');
const handleResultsCallback = require('../helpers/handleResultsCallback');
const buildURL = require('./urlBuilder');
const failedAssets = [];

function asyncParser(
	{
		writeToFile = true,
		outputPath = './output',
		outputFileName = 'results.json',
		operationsLimit = 5,
		assets = [],
		plainUrls = false,
		urlSchema = {
			baseUrl: '',
			prefix: '',
			template: '',
			query: {},
			changingAssets: [],
			changingParams: [],
		},
		handler = undefined,
		customAxiosConfig = {},
	} = {},
	callbackForResults = undefined
) {
	function iteratee(asset, cb) {
		const request = axios.create(customAxiosConfig);

		// if plainUrls is true, then asset
		// is just a plain URL to parse
		var requestURL = plainUrls ? asset : buildURL(urlSchema)(asset);

		request
			.get(requestURL)
			.then(function(response) {
				let result;

				if (handler !== undefined) {
					result = handler(response, asset);
				} else {
					result = response.data;
				}

				cb(null, result);
			})
			.catch(err => {
				failedAssets.push(asset);
				console.log('----------');
				console.log(
					logsymbols.error,
					chalk.bold('Error on asset:'),
					chalk.white.underline(JSON.stringify(asset))
				);
				console.log(
					logsymbols.error,
					'Error status:',
					chalk.white.underline(err.response.status)
				);
				console.log(
					logsymbols.error,
					'Error message:',
					chalk.white.underline(err.message)
				);
				cb(null, {});
			});
	} // end of iteratee

	return async.mapLimit(assets, operationsLimit, iteratee, function(
		err,
		results
	) {
		if (err) throw err;

		// if outputPath directory exists, and write to file true, just do it
		if (writeToFile && !fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath);
		}

		// if file write and callback defined
		if (writeToFile && callbackForResults) {
			fs.writeFile(
				`${outputPath}/${outputFileName}`,
				JSON.stringify(results),
				'utf8',
				err => {
					if (err) {
						console.log(
							'Something wrong with writing results to disk!'
						);
					}

					// return callback with results
					handleResultsCallback(
						results,
						failedAssets,
						callbackForResults
					);

					console.log(
						chalk.white.bgGreenBright(
							`File with results written in ${outputPath.replace(
								'./',
								''
							)}/${outputFileName}!`
						)
					);
				}
			); // end of fs.writeFile for results
		}

		// if NOT file write and callback defined
		if (!writeToFile && callbackForResults !== undefined) {
			handleResultsCallback(results, failedAssets, callbackForResults);
		}

		// if have any errors on any asset, write this assets to file
		failedAssets.length > 0 &&
			fs.writeFile(
				`${outputPath}/errors@${outputFileName}`,
				JSON.stringify(failedAssets),
				'utf8',
				err => {
					if (err) {
						console.log(
							'Something wrong with writing errors to disk!'
						);
					}

					console.log(
						chalk.white.bgRed.bold(
							`File with errors written in ${outputPath.replace(
								'./',
								''
							)}/errors@${outputFileName}!`
						)
					);
				}
			); // end of fs.writeFile for errors
	}); // end of async.mapLimit
} // end of main function

module.exports = asyncParser;
