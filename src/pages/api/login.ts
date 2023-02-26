import { magicAdmin } from '@/lib/magic';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { createNewUser, isNewUser } from '@/lib/db/hasura';
import { setTokenCookie } from '@/lib/cookies';

const login = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== 'POST') {
		return res.status(400).send({ done: false });
	}

	const auth = req.headers.authorization;
	if (!auth) {
		return res.status(401).send({ done: false });
	}

	const now = (Date.now() / 1000) - 100;

	try {
		const didToken = auth ? auth.substring(7) : '';

		const metadata = await magicAdmin.users.getMetadataByToken(didToken);

		const token = jwt.sign(
			{
				...metadata,
				iat: Math.floor(now),
				exp: Math.floor(now + 7 * 24 * 60 * 60),
				'https://hasura.io/jwt/claims': {
					'x-hasura-allowed-roles': ['user', 'admin'],
					'x-hasura-default-role': 'user',
					'x-hasura-user-id': `${metadata.issuer}`,
				},
			},
			process.env.JWT_SECRET!
		);

		const isNewUsr = await isNewUser(token, metadata.issuer!);
		console.log({isNewUsr});
		if (isNewUsr) {
			await createNewUser(token, metadata);
		}
		setTokenCookie(token, res);
		res.send({ done: true });
	} catch (error) {
		console.error('Something went wrong logging in', error);
		res.status(500).send({ done: false });
	}
};

export default login;
