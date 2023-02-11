import Banner from '@/components/Banner';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import SectionCard from '@/components/Card/SectionCards';
import styles from './page.module.css';
import Video from '@/types/Video';
import { getVideos } from '@/lib/video';

export default function Home() {
	//@ts-ignore
	const disneyVideos: Array<Video> = getVideos();
	// const disneyVideos = [
	// 	{
	// 		id: '0',
	// 		imgUrl: '/static/clifford.webp',
	// 	},
	// 	{
	// 		id: '1',
	// 		imgUrl: '/static/clifford.webp',
	// 	},
	// 	{
	// 		id: '2',
	// 		imgUrl: '/static/clifford.webp',
	// 	},
	// 	{
	// 		id: '3',
	// 		imgUrl: '/static/clifford.webp',
	// 	},
	// ] as Array<Video>;
	return (
		<main className={styles.main}>
			<Navbar username='relaxedleaf' />
			<Banner
				title='Clifford the red dog'
				subTitle='a very cute dog'
				imgUrl='/static/clifford.webp'
			/>

			<div className={styles.sectionWrapper}>
				<SectionCard title="Disney" videos={disneyVideos} size="large" scale={1.1} />
			</div>
		</main>
	);
}
