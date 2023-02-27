import { MagicUserMetadata } from '@magic-sdk/admin';

export async function getWatchedVideos(userId: string, token: string) {
	const operationsDoc = `
		query watchedVideos($userId: String!) {
			stats(where: {
				watched: {_eq: true}, 
				userId: {_eq: $userId},
			}) {
				videoId
				watched
			}
		}
	`;

	const response = await queryHasuraGQL({
		operationsDoc,
		operationName: 'watchedVideos',
		variables: {
			userId,
		},
		token,
	});

	return response?.data?.stats;
}

export async function insertStats(
	token: string,
	{
		favorited,
		userId,
		watched,
		videoId,
	}: {
		favorited: number;
		userId: string;
		watched: boolean;
		videoId: string;
	}
) {
	console.log({
		favorited,
		userId,
		watched,
		videoId,
	});
	const operationsDoc = `
		mutation insertStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
			insert_stats_one(object: {
				favorited: $favorited, 
				userId: $userId, 
				watched: $watched, 
				videoId: $videoId
			}) {
				favorited
				id
				userId
			}
		}
	`;

	return await queryHasuraGQL({
		operationsDoc,
		operationName: 'insertStats',
		variables: { favorited, userId, watched, videoId },
		token,
	});
}

export async function updateStats(
	token: string,
	{
		favorited,
		userId,
		watched,
		videoId,
	}: {
		favorited: number;
		userId: string;
		watched: boolean;
		videoId: string;
	}
) {
	const operationsDoc = `
		mutation updateStats($favorited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
			update_stats(
				_set: {watched: $watched, favorited: $favorited},
				where: {
					userId: {_eq: $userId}, 
					videoId: {_eq: $videoId}
				}
			){
				returning {
					favorited,
					userId,
					watched,
					videoId
				}
			}
		}
		`;

	return await queryHasuraGQL({
		operationsDoc,
		operationName: 'updateStats',
		variables: { favorited, userId, watched, videoId },
		token,
	});
}

export const findVideoIdByUser = async (
	token: string,
	userId: string,
	videoId: string
) => {
	const operationsDoc = `
		query findVideoIdByUserId($userId: String!, $videoId: String!) {
			stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
				id
				userId
				videoId
				favorited
				watched
			}
		}
	`;

	const response = await queryHasuraGQL({
		operationsDoc,
		operationName: 'findVideoIdByUserId',
		variables: {
			videoId,
			userId,
		},
		token,
	});

	if (response?.data?.stats) {
		const stats = response?.data?.stats;
		if (stats.length) {
			return stats[0];
		}
	}
	return null;
};

export async function createNewUser(
	token: string,
	metadata: MagicUserMetadata
) {
	const operationsDoc = `
		mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
			insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
				returning {
					email
					id
					issuer
				}
			}
		}
  	`;

	const { issuer, email, publicAddress } = metadata;
	const response = await queryHasuraGQL({
		operationsDoc,
		operationName: 'createNewUser',
		variables: {
			issuer,
			email,
			publicAddress,
		},
		token,
	});
	console.log({ response, issuer });
	return response;
}

export async function isNewUser(token: string, issuer: string) {
	const operationsDoc = `
		query isNewUser($issuer: String!) {
			users(where: {issuer: {_eq: $issuer}}) {
				id
				email
				issuer
			}
		}
  `;

	const response = await queryHasuraGQL({
		operationsDoc,
		operationName: 'isNewUser',
		variables: {
			issuer,
		},
		token,
	});
	console.log({ response, error: response?.errors });
	return response?.data?.users?.length === 0;
}

async function queryHasuraGQL({
	operationsDoc,
	operationName,
	variables,
	token,
}: {
	operationsDoc: string;
	operationName: string;
	variables: any;
	token: string;
}) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL!, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}
