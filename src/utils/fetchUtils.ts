export const getUrl = ({
	baseUrl,
	params,
}: {
	baseUrl: string;
	params: Record<string, string | number>;
}) => {
	console.log(params);
	if (!baseUrl) {
		return '';
	}

	let str = '';
	Object.keys(params).forEach((key, index) => {
		if (index > 0) {
			str += '&';
		}
		str += `${encodeURI(key)}=${encodeURI(params[key].toString())}`;
	});

	if (str) {
		return `${baseUrl}?${str}`;
	}

	return baseUrl;
};
