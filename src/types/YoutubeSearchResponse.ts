export interface Thumbnail {
	url: string;
	width: number;
	height: number;
}

export interface Thumbnails {
	default: Thumbnail;
	medium: Thumbnail;
	high: Thumbnail;
}

export interface Snippet {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	liveBroadcastContent: string;
	publishTime: string;
}

export interface Id {
	kind: string;
	videoId: string;
}

export interface SearchResult {
	kind: string;
	etag: string;
	id: Id;
	snippet: Snippet;
}

export default interface YoutubeSearchResponse {
	items: SearchResult[];
}
