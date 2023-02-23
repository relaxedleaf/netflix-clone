import { magicAdmin } from '@/lib/magic';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { createNewUser, isNewUser } from '@/lib/db/hasura';

const login = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== 'POST') {
		return res.send({ done: false });
	}

	try {
		const auth = req.headers.authorization;
		const didToken = auth ? auth.substring(7) : '';
		console.log({ didToken });

		const metadata = await magicAdmin.users.getMetadataByToken(didToken);

		const token = jwt.sign(
			{
				...metadata,
				iat: Math.floor(Date.now() / 1000),
				exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
				'https://hasura.io/jwt/claims': {
					'x-hasura-allowed-roles': ['user', 'admin'],
					'x-hasura-default-role': 'user',
					'x-hasura-user-id': `${metadata.issuer}`,
				},
			},
			process.env.JWT_SECRET!
		);
		console.log({ token });

		const isNewUserQuery = await isNewUser(token, metadata.issuer!);

		if (isNewUserQuery) {
			const createNewUserMutation = await createNewUser(token, metadata);
			console.log({ createNewUserMutation });
			return res.send({ done: true, msg: 'is a new user' });
		} else {
			return res.send({ done: true, msg: 'not a new user' });
		}
		return res.send({ done: true, isNewUserQuery });
	} catch (error) {
		console.error('Something went wrong logging in', error);
		res.status(500).send({ done: false });
	}
};

export default login;
