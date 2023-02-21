import { Statistics } from './YoutubeSearchResponse';

type Video = {
	id: string;
	title: string;
	imgUrl: string;
	description: string;
	publishTime: string;
	channelTitle: string;
	statistics: Statistics;
};

export default Video;
