import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCard from '@/components/Card/SectionCards';
import styles from './page.module.css';
import Video from '@/types/Video';
import { getVideos } from '@/lib/video';

const Home = () => {
	const disneyVideos: Array<Video> = getVideos();
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
			</div>
		</main>
	);
};

export default Home;
