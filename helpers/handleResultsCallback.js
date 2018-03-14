const logsymbols = require('log-symbols');

module.exports = function (results, failedAssets, callback) {

	console.log(logsymbols.success, 'Results callback:');

	return callback(
		{
			done: failedAssets.length !== 0 ? false : true,
			errors: failedAssets.length === 0 ? false : true,
			results: results
		})

};