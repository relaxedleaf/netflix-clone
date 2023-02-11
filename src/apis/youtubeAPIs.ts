import Video from '@/types/Video';
import YoutubeSearchResponse from '@/types/YoutubeSearchResponse';
import { getUrl } from '@/utils/fetchUtils';

export const fetchVideos = async (search: string): Promise<Array<Video>> => {
	const url = getUrl({
		baseUrl: 'https://youtube.googleapis.com/youtube/v3/search',
		params: {
			part: 'snippet',
			maxResults: 25,
			q: search,
			type: 'video',
			key: process.env.YOUTUBE_API_KEY!,
		},
	});

	try {
		const response = await fetch(url, {
			cache: 'no-store',
		});
		const videos: YoutubeSearchResponse = await response.json();

		return videos.items.map((item) => {
			return {
				id: item.id.videoId,
				title: item.snippet.title,
				imgUrl: item.snippet.thumbnails.high.url,
			};
		});
	} catch (err) {
		console.log('Something went wrong with video library', err);
		return [];
	}
};
