module.exports = function (response, asset) {

	const { data } = response;
	const convertedCurrency = Number(data[0][`price_${asset}`]).toFixed(2);
	const currencyName = asset.toUpperCase();

	console.log(
		`BTC Price in ${currencyName}: ${convertedCurrency} ${currencyName}`
	);

};