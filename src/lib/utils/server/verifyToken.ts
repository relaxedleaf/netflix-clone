import { jwtVerify } from "jose";

const verifyToken = async (token: string | undefined) => {
	if (!token) {
		return null;
	}

	const verified = await jwtVerify(token,  new TextEncoder().encode(process.env.JWT_SECRET!));
	
	if (verified.payload && verified.payload.issuer){
		return verified.payload.issuer as string;
	}

	return null;
};

export default verifyToken;
