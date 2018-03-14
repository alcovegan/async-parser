const chai            = require('chai');
const nock            = require('nock');
const fs              = require('fs');

const assert          = chai.assert;
chai.use(require('chai-fs'));

const lib             = require('../src');
const urlBuilder      = require('../src/urlBuilder');
const examples        = require('./mocks/urlExamples');
const urlConstructors = require('./mocks/urlConstructors');

const mocks = {
	singleQuery : require('../test/mocks/singleQuery'),
	multipleQuery : require('../test/mocks/multipleQuery'),
	singleParamNameWQ : require('../test/mocks/single-singleparamWQ'),
	customPathSingle : require('../test/mocks/custompath-single'),
	customPathMultiple : require('../test/mocks/custompath-multiple')
}

describe('UrlBuilder:', function() {

	it('Generating correct url for query + single param', function() {
		assert.equal(urlConstructors.queryPlusSingleParam, examples.queryPlusSingleParam);
	});

	it('Generating correct url for no query + single param', function() {
		assert.equal(urlConstructors.noQueryPlusSingleParam, examples.noQueryPlusSingleParam);
	});

	it('Generating correct url for query + multiple params', function() {
		assert.equal(urlConstructors.queryPlusMultipleParams, examples.queryPlusMultipleParams);
	});

	it('Generating correct url for no query + multiple params', function() {
		assert.equal(urlConstructors.noQueryPlusMultipleParams, examples.noQueryPlusMultipleParams);
	});

	it('Generating correct url for path + single param', function() {
		assert.equal(urlConstructors.pathSingleParam, examples.pathSingleParam);
	});

	it('Generating correct url for path + multiple params', function() {
		assert.equal(urlConstructors.pathMultipleParams1, examples.pathMultipleParams[0]);
		assert.equal(urlConstructors.pathMultipleParams2, examples.pathMultipleParams[1]);
		assert.equal(urlConstructors.pathMultipleParams3, examples.pathMultipleParams[2]);
	});

	it('Generating correct url for path + multiple params + query', function() {
		assert.equal(urlConstructors.pathMultipleParamsPlusQuery1, examples.pathMultipleParamsPlusQuery[0]);
		assert.equal(urlConstructors.pathMultipleParamsPlusQuery2, examples.pathMultipleParamsPlusQuery[1]);
	});

	it('Generating correct url for different url parameters and takes into account changingAssets and changingParams', function() {
		assert.equal(urlConstructors.pathParamsAndAssets, examples.pathParamsAndAssets[0]);
	});

	it('Can take asset as string if passed single changingParams', function() {
		assert.equal(urlConstructors.oneChangingParamAsString, examples.oneChangingParamAsString);
	});

	it('Can take asset as string if passed single changingAssets', function() {
		assert.equal(urlConstructors.oneChangingAssetAsString, examples.oneChangingAssetAsString);
	});

	it('Works correctly if passed single asset as string with several changingAssets', function() {
		assert.equal(urlConstructors.twoChangingAssetsWithOneString, examples.twoChangingAssetsWithOneString);
	});

	it('Works correctly if passed single asset as string with several changingParams', function() {
		assert.equal(urlConstructors.twoChangingParamsWithOneString, examples.twoChangingParamsWithOneString);
	});

});

describe('Requests and writing files:', function() {

	const outputPath = './test/output';

	beforeEach(function() {

		nock('https://fakeapi.com')
		  .get('/users?user=alcovegan')
		  .reply(200, mocks.singleQuery);

		nock('https://fakeapi.com')
		  .get('/users?user=alcovegan&page=1&customparam=someparam')
		  .reply(200, mocks.multipleQuery);


		nock('https://fakeapi.com')
		  .get('/users?user=alcovegan')
		  .reply(200, mocks.singleParamNameWQ);


		nock('https://fakeapi.com')
		  .get('/users/alcovegan/followers')
		  .reply(200, mocks.customPathSingle);

		nock('https://fakeapi.com')
			.get('/users/alcovegan/relationships/with/gaearon')
			.reply(200, mocks.customPathMultiple)

	});


	it('Making requests with single query and write file', function(done) {

		lib({
			writeToFile: true,
			outputPath: './test/output',
			outputFileName: 'single-query.json',
			operationsLimit: 2,
			assets: ['alcovegan'],
			urlSchema: {
					baseUrl: 'https://fakeapi.com',
					prefix: '/users',
					changingAssets: ['user']
			}
		}, (response) => {
				assert.isArray(response.results);
				assert.isFile(`${outputPath}/single-query.json`);
				assert.jsonFile(`${outputPath}/single-query.json`);

				done();
		})
	});

	it('Making requests with multiple queries and write file', function(done) {

		lib({
			writeToFile: true,
			outputPath: './test/output',
			outputFileName: 'multiple-query.json',
			operationsLimit: 2,
			assets: [{ user: 'alcovegan', page: 1, customparam: 'someparam' }],
			urlSchema: {
					baseUrl: 'https://fakeapi.com',
					prefix: '/users',
					changingAssets: ['user', 'page', 'customparam']
			}
		}, (response) => {
				assert.isArray(response.results);
				assert.isFile(`${outputPath}/multiple-query.json`);
				assert.jsonFile(`${outputPath}/multiple-query.json`);

				done();
		})
	});

});