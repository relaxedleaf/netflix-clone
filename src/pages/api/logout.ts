import verifyToken from '@/lib/utils/server/verifyToken';
import { magicAdmin } from '../../lib/magic';
import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@/lib/cookies';

const logout = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	try {
		if (!req.cookies.token) {
			return res.status(401).json({ message: 'User is not logged in' });
		}
		const token = req.cookies.token;

		const userId = await verifyToken(token);
		if (!userId) {
			return res.status(401).json({ message: 'Invalid user token' });
		}
		removeTokenCookie(res);
		try {
			await magicAdmin.users.logoutByIssuer(userId);
		} catch (error) {
			console.error('Error occurred while logging out magic user', error);
		}
		//redirects user to login page
		res.writeHead(302, { Location: '/login' });
		res.end();
	} catch (error) {
		console.error({ error });
		return res.status(401).json({ message: 'User is not logged in' });
	}
};

export default logout;
