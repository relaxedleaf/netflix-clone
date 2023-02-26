import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { findVideoIdByUser, insertStats, updateStats } from '@/lib/db/hasura';

const stats = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== 'GET' && req.method !== 'POST') {
		return res.send({ msg: 'Unsupported Route' });
	}

	if (req.method === 'POST') {
		handlePost(req, res);
	} else {
		handleGet(req, res);
	}
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(403).send({ done: false, error: 'Missing token' });
	}

	const { videoId, favorited, watched = true } = req.body;

	if (!videoId || typeof videoId !== 'string') {
		return res.status(400).send({ done: false, error: 'Missing video ID' });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
		if (typeof decodedToken === 'string') {
			return res
				.status(500)
				.send({ done: false, error: 'Unable to decode token' });
		}

		const userId = decodedToken.issuer;

		const video = await findVideoIdByUser(token, userId, videoId);

		if (video) {
			//Update it
			const response = await updateStats(token, {
				watched,
				userId,
				videoId,
				favorited,
			});
			return res.send({ data: response });
		} else {
			// Add it
			const response = await insertStats(token, {
				watched,
				userId,
				videoId,
				favorited,
			});
			return res.send({ data: response });
		}
	} catch (error) {
		console.error('Error occurred /stats', error);
		let message = 'Error occurred /stats';
		if (error instanceof Error) {
			message = error.message;
		}
		return res.status(500).send({ done: false, error: message });
	}
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(403).send({ done: false, error: 'Missing token' });
	}

	const { videoId } = req.query;

	if (!videoId || typeof videoId !== 'string') {
		return res.status(400).send({ done: false, error: 'Missing video ID' });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
		if (typeof decodedToken === 'string') {
			return res
				.status(500)
				.send({ done: false, error: 'Unable to decode token' });
		}

		const userId = decodedToken.issuer;
		console.log({
			token,
			userId,
			videoId
		})
		const video = await findVideoIdByUser(token, userId, videoId);

		if (video) {
			return res.send(video);
		} else {
			return res.status(404).send({ user: null, msg: 'Video not found' });
		}
	} catch (error) {
		console.error('Error occurred /stats', error);
		let message = 'Error occurred /stats';
		if (error instanceof Error) {
			message = error.message;
		}
		return res.status(500).send({ done: false, error: message });
	}
};
export default stats;
