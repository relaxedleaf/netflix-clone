import jwt from 'jsonwebtoken';

const verifyToken = (token: string | undefined) => {
	if (!token) {
		return null;
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
	if (typeof decodedToken === 'string') {
		return null;
	}

	const userId = decodedToken.issuer;

	return userId;
};

export default verifyToken;
