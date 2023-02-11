import Card from '..';
import clsx from 'classnames';
import Link from 'next/link';
import styles from './section-cards.module.css';
import { SectionCardsProps } from './section-cards';

const SectionCards = ({
	title,
	videos = [],
	size,
	shouldWrap = false,
	scale,
}: SectionCardsProps) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div
				className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}
			>
				{videos.map((video, idx) => {
					return (
						<Link href={`/video/${video.id}`} key={video.id}>
							<Card
								imgUrl={video.imgUrl}
								size={size}
								scale={{
									[idx === 0 ? 'scaleY' : 'scale']: scale,
								}}
							/>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default SectionCards;
