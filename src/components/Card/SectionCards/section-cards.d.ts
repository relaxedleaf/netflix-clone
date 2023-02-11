import Scale from '@/types/Scale';
import Video from '@/types/Video';
import { CardSize } from '../card';

export type SectionCardsProps = {
	title: string;
	videos: Array<Video>;
	size: CardSize;
	shouldWrap?: boolean;
	scale: number
};
