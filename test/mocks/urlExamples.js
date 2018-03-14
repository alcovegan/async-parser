module.exports = {
	queryPlusSingleParam: 'http://api.travelpayouts.com/v2/prices/latest?currency=rub&show_to_affiliates=true&origin=MOW',

	noQueryPlusSingleParam: 'http://api.travelpayouts.com/v2/prices/latest?origin=MOW',

	queryPlusMultipleParams: 'http://api.travelpayouts.com/v2/prices/month-matrix?currency=rub&show_to_affiliates=true&month=2017-10-01&origin=MOW&destination=LED',

	noQueryPlusMultipleParams: 'http://api.travelpayouts.com/v2/prices/month-matrix?origin=MOW&destination=LED',

	pathSingleParam: 'http://api.github.com/users/alcovegan/followers',

	pathMultipleParams: [
		'http://api.github.com/repos/alcovegan/travelpayouts-js/issues',
		'http://api.github.com/repos/alcovegan/travelpayouts-js/milestones/5',
		'http://fakeapi.com/param1/veryparam1/param2/veryparam2/param3/veryparam3/param4/veryparam4/param5/veryparam5/param6/veryparam6/param7/veryparam7'
		],

	pathMultipleParamsPlusQuery: [
		'http://api.github.com/repos/alcovegan/travelpayouts-js/issues?page=1',
		'http://api.github.com/repos/alcovegan/travelpayouts-js/milestones/5?page=1&finished=true'
		],
	pathParamsAndAssets: [
		'http://api.github.com/someprefix/repos/alcovegan/travelpayouts-js/issues/chp/changingChp/else/working?currency=rub&show_to_affiliates=true&page=1&origin=MOW&destination=LED'
	],
	oneChangingParamAsString: 'http://api.github.com/someprefix/repos/alcovegan?currency=rub&show_to_affiliates=true&page=1',
	oneChangingAssetAsString: 'http://api.github.com/someprefix/repos/alcovegan?currency=rub&show_to_affiliates=true&page=1&origin=MOW',
	twoChangingAssetsWithOneString: 'http://api.github.com/someprefix/repos/alcovegan?currency=rub&show_to_affiliates=true&page=1&origin=MOW&destination=MOW',
	twoChangingParamsWithOneString: 'http://api.travelpayouts.com/someprefix/origin/MOW/destination/MOW?currency=rub&show_to_affiliates=true&page=1'
}