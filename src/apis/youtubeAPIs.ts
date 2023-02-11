import Video from '@/types/Video';
import YoutubeSearchResponse from '@/types/YoutubeSearchResponse';

export const fetchVideos = async (search: string): Promise<Array<Video>> => {
	const response = await fetch(
		`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&key=${process
			.env.YOUTUBE_API_KEY!}`,
		{
			cache: 'no-store',
		}
	);
	console.log(process.env.YOUTUBE_API_KEY);
	const videos: YoutubeSearchResponse = await response.json();

	return videos.items.map((item) => {
		return {
			id: item.id.videoId,
			title: item.snippet.title,
			imgUrl: item.snippet.thumbnails.high.url,
		};
	});
};
