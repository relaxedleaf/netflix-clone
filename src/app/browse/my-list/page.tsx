import Navbar from '@/components/Navbar';
import redirectUser from '@/lib/utils/server/redirectUser';
import SectionCard from '@/components/Card/SectionCards';
import styles from './page.module.css';
import { fetchMyListVideos } from '@/apis/youtubeAPIs';

const MyList = async () => {
	const { userId, token } = redirectUser();
	const watchItAgainVideos = await fetchMyListVideos(userId, token);

	return (
		<main className={styles.main}>
			<Navbar />

			<div className={styles.sectionWrapper}>
				<SectionCard
					title='Watch it again'
					videos={watchItAgainVideos}
					size='small'
					scale={1}
					shouldWrap={true}
				/>
			</div>
		</main>
	);
};

export default MyList;
