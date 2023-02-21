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
			return {
				id: typeof item.id === 'string' ? item.id : item.id.videoId,
				title: item.snippet.title,
				imgUrl: item.snippet.thumbnails.high.url,
				description: item.snippet.description,
				publishTime: item.snippet.publishedAt,
				channelTitle: item.snippet.channelTitle,
				//@ts-ignore
				statistics: item.snippet.statistics
					? item.snippet.statistics
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
			maxResults: 5,
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
			maxResults: 5,
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
