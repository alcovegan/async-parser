const urlBuilder = require('../../src/urlBuilder');

const queryPlusSingleParam = urlBuilder(
		{
			baseUrl: "http://api.travelpayouts.com",
			prefix: '/v2/prices/latest',
			query: {
				currency: 'rub',
				show_to_affiliates: true
			},
			changingAssets: ['origin']
		}
	)('MOW')

const noQueryPlusSingleParam = urlBuilder(
		{
			baseUrl: "http://api.travelpayouts.com",
			prefix: '/v2/prices/latest',
			changingAssets: ['origin']
		}
	)('MOW')

const queryPlusMultipleParams = urlBuilder(
		{
			baseUrl: "http://api.travelpayouts.com",
			prefix: '/v2/prices/month-matrix',
			query: {
				currency: 'rub',
				show_to_affiliates: true,
				month: '2017-10-01'
			},
			changingAssets: ['origin', 'destination']
		}
	)({ origin: 'MOW', destination: 'LED' })

const noQueryPlusMultipleParams = urlBuilder(
		{
			baseUrl: "http://api.travelpayouts.com",
			prefix: '/v2/prices/month-matrix',
			changingAssets: ['origin', 'destination']
		}
	)({ origin: 'MOW', destination: 'LED' })

const pathSingleParam = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			template: "/users/:user/followers",
			changingParams: ['user']
		}
	)('alcovegan')

const pathMultipleParams1 = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			template: "/repos/:owner/:repo/issues",
			changingParams: ['owner', 'repo']
		}
	)({ owner: 'alcovegan', repo: 'travelpayouts-js' })

const pathMultipleParams2 = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			template: "/repos/:owner/:repo/milestones/:number",
			changingParams: ['owner', 'repo', 'number']
		}
	)({ owner: 'alcovegan', repo: 'travelpayouts-js', number: 5 })

const pathMultipleParams3 = urlBuilder(
		{
			baseUrl: "http://fakeapi.com",
			template: "/param1/:param1/param2/:param2/param3/:param3/param4/:param4/param5/:param5/param6/:param6/param7/:param7",
			changingParams: [
				'param1',
				'param2',
				'param3',
				'param4',
				'param5',
				'param6',
				'param7',
			]
		}
	)({
			param1: "veryparam1",
			param2: "veryparam2",
			param3: "veryparam3",
			param4: "veryparam4",
			param5: "veryparam5",
			param6: "veryparam6",
			param7: "veryparam7"
	})

const pathMultipleParamsPlusQuery1 = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			template: "/repos/:owner/:repo/issues",
			query: {
				page: 1
			},
			changingParams: ['owner', 'repo']
		}
	)({ owner: 'alcovegan', repo: 'travelpayouts-js' })

const pathMultipleParamsPlusQuery2 = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			template: "/repos/:owner/:repo/milestones/:number",
			query: {
				page: 1,
				finished: true
			},
			changingParams: ['owner', 'repo', 'number']
		}
	)({ owner: 'alcovegan', repo: 'travelpayouts-js', number: 5 })

const pathParamsAndAssets = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			prefix: '/someprefix',
			template: '/repos/:owner/:repo/issues/chp/:chp/else/:else',
			query: {
				currency: 'rub',
				show_to_affiliates: true,
				page: 1
			},
			changingAssets: ['origin', 'destination'],
			changingParams: ['owner', 'repo', 'chp', 'else'],

		}
	)({origin: 'MOW', destination: 'LED', owner: 'alcovegan', repo: 'travelpayouts-js', chp: 'changingChp', else: 'working'})

const oneChangingParamAsString = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			prefix: '/someprefix',
			template: '/repos/:owner',
			query: {
				currency: 'rub',
				show_to_affiliates: true,
				page: 1
			},
			changingParams: ['owner']
		}
	)('alcovegan')

const oneChangingAssetAsString = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			prefix: '/someprefix',
			template: '/repos/:owner',
			param: {owner: 'alcovegan'},
			query: {
				currency: 'rub',
				show_to_affiliates: true,
				page: 1
			},
			changingAssets: ['origin']
		}
	)('MOW')

const twoChangingAssetsWithOneString = urlBuilder(
		{
			baseUrl: "http://api.github.com",
			prefix: '/someprefix',
			template: '/repos/:owner',
			param: {owner: 'alcovegan'},
			query: {
				currency: 'rub',
				show_to_affiliates: true,
				page: 1
			},
			changingAssets: ['origin', 'destination']
		}
	)('MOW')

const twoChangingParamsWithOneString = urlBuilder(
		{
			baseUrl: "http://api.travelpayouts.com",
			prefix: '/someprefix',
			template: '/origin/:origin/destination/:destination',
			query: {
				currency: 'rub',
				show_to_affiliates: true,
				page: 1
			},
			changingParams: ['origin', 'destination']
		}
	)('MOW')

module.exports = {
	queryPlusSingleParam,
	noQueryPlusSingleParam,
	queryPlusMultipleParams,
	noQueryPlusMultipleParams,
	pathSingleParam,
	pathMultipleParams1,
	pathMultipleParams2,
	pathMultipleParams3,
	pathMultipleParamsPlusQuery1,
	pathMultipleParamsPlusQuery2,
	pathParamsAndAssets,
	oneChangingParamAsString,
	oneChangingAssetAsString,
	twoChangingAssetsWithOneString,
	twoChangingParamsWithOneString
}