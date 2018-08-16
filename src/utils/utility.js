export const objectToURLSearchParams = obj => {
	const urlSearhParams = new URLSearchParams();
	for (let key in obj) {
		urlSearhParams.append(key, obj[key]);
	}
    return urlSearhParams;
};