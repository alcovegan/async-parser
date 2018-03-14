module.exports = function(response, asset) {
	const { id, name, followers, following } = response.data;

	return { id, name, followers, following }
};