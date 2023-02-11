import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCard from '@/components/Card/SectionCards';
import styles from './page.module.css';
import { fetchVideos } from '@/apis/youtubeAPIs';

const Home = async () => {
	const disneyVideos = await fetchVideos('Disney videos');
	const productivityVideos = await fetchVideos('productivity');
	const travelVideos = await fetchVideos('travel');
	// const popularVideos = await fetchVideos('Disney videos');

	return (
		<main className={styles.main}>
			<Navbar username='relaxedleaf' />
			<Banner
				title='Clifford the red dog'
				subTitle='a very cute dog'
				imgUrl='/static/clifford.webp'
			/>

			<div className={styles.sectionWrapper}>
				<SectionCard
					title='Disney'
					videos={disneyVideos}
					size='large'
					scale={1.1}
				/>
				<SectionCard
					title='Productivity'
					videos={productivityVideos}
					size='medium'
					scale={1.1}
				/>
				<SectionCard
					title='Travel'
					videos={travelVideos}
					size='small'
					scale={1.1}
				/>
				<SectionCard
					title='Popular'
					videos={disneyVideos}
					size='small'
					scale={1.1}
				/>
			</div>
		</main>
	);
};

export default Home;
