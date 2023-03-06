import { getMyListVideos, getWatchedVideos } from '@/lib/db/hasura';
import Video from '@/types/Video';
import YoutubeSearchResponse from '@/types/YoutubeSearchResponse';
import { getUrl } from '@/utils/fetchUtils';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

export const fetchVideos = async (
	url: string,
	cache: RequestCache = 'no-store'
): Promise<Array<Video>> => {
	try {
		const response = await fetch(url, {
			cache,
		});
		const videos: YoutubeSearchResponse = await response.json();
		if (!videos.items) {
			return [];
		}
		return videos.items.map((item) => {
			const id = typeof item.id === 'string' ? item.id : item.id.videoId;
			return {
				id,
				title: item.snippet.title,
				imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
				description: item.snippet.description,
				publishTime: item.snippet.publishedAt,
				channelTitle: item.snippet.channelTitle,
				statistics: item.statistics
					? item.statistics
					: {
							likeCount: '0',
							favoriteCount: '0',
							commentCount: '0',
							viewCount: '0',
					  },
			};
		});
	} catch (err) {
		console.log('Something went wrong with video library', err);
		return [];
	}
};

export const fetchVideosByQuery = async (
	search: string
): Promise<Array<Video>> => {
	const url = getUrl({
		baseUrl: `${BASE_URL}/search`,
		params: {
			part: 'snippet',
			maxResults: 10,
			q: search,
			type: 'video',
			key: process.env.YOUTUBE_API_KEY!,
		},
	});

	const videos = await fetchVideos(url);
	return videos;
};

export const fetchMostPopularVideos = async () => {
	const url = getUrl({
		baseUrl: `${BASE_URL}/videos`,
		params: {
			part: 'snippet,contentDetails,statistics',
			chart: 'mostPopular',
			regionCode: 'US',
			maxResults: 10,
			type: 'video',
			key: process.env.YOUTUBE_API_KEY!,
		},
	});

	const videos = await fetchVideos(url);
	return videos;
};

export const getYoutubeVideoById = async (
	videoId: string,
	cache: RequestCache = 'no-store'
) => {
	const url = getUrl({
		baseUrl: `${BASE_URL}/videos`,
		params: {
			part: 'snippet,contentDetails,statistics',
			id: videoId,
			key: process.env.YOUTUBE_API_KEY!,
		},
	});

	const videos = await fetchVideos(url, cache);
	return videos.length ? videos[0] : null;
};

export const fetchWatchItAgainVideos = async (
	userId: string,
	token: string | undefined
) => {
	if (!token) {
		return [];
	}
	const videos = await getWatchedVideos({
		userId,
		token,
		cache: 'no-store',
	});

	if (!videos) {
		return [];
	}
	return videos.map((video: any) => {
		return {
			id: video.videoId,
			imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
		};
	}) as Array<{ id: string; imgUrl: string }>;
};

export const fetchMyListVideos = async (
	userId: string,
	token: string | undefined
) => {
	if (!token) {
		return [];
	}
	const videos = await getMyListVideos({
		userId,
		token,
		cache: 'no-store',
	});

	if (!videos) {
		return [];
	}
	return videos.map((video: any) => {
		return {
			id: video.videoId,
			imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
		};
	});
};
