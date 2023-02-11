import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCard from '@/components/Card/SectionCards';
import styles from './page.module.css';
import { fetchMostPopularVideos, fetchVideosByQuery } from '@/apis/youtubeAPIs';

const Home = async () => {
	const disneyVideos = await fetchVideosByQuery('Disney videos');
	const productivityVideos = await fetchVideosByQuery('productivity');
	const travelVideos = await fetchVideosByQuery('travel');
	const popularVideos = await fetchMostPopularVideos();

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
					videos={popularVideos}
					size='small'
					scale={1.1}
				/>
			</div>
		</main>
	);
};

export default Home;
