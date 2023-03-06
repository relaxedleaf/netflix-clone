import Scale from '@/types/Scale';
import Video from '@/types/Video';
import { CardSize } from '../card';

export type SectionCardsProps = {
	title: string;
	videos:
		| Array<Video>
		| Array<{
				id: string;
				imgUrl: string;
		  }>;
	size: CardSize;
	shouldWrap?: boolean;
	scale: number;
};
