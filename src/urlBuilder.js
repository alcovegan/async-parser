const urlAssembler = require('safe-url-assembler');

module.exports = function(schema) {

	return function(asset) {

		const changingAssets = {};
		const changingParams = {};
		const newSegments = schema.addSegments && schema.addSegments.length > 0 ? schema.addSegments.join('') : ''

		schema.changingAssets && schema.changingAssets.forEach(ca => {
			changingAssets[ca] = typeof asset !== 'object'
				? asset
				: asset[ca]
		})
		schema.changingParams && schema.changingParams.forEach(cp => {
			changingParams[cp] = typeof asset !== 'object'
				? asset
				: asset[cp]
		});

		const assembledURL = urlAssembler(schema.baseUrl)
			.prefix(schema.prefix ? schema.prefix : '')
			.template(schema.template ? schema.template : '')
			.segment(newSegments)
			.param(
				schema.param || schema.changingParams
					? Object.assign({}, schema.param, changingParams)
					: null
			)
			.query(
				schema.query || schema.changingAssets
					? Object.assign({}, schema.query, changingAssets)
					: ''
			)
			.toString()

		return assembledURL
	}

};