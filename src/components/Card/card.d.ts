import Scale from "@/types/Scale";

export type CardSize = 'large' | 'medium' | 'small';

export type CardProps = {
	imgUrl: string;
	size: CardSize;
	scale: Scale
};
