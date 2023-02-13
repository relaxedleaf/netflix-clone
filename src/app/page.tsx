'use client';

import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCard from '@/components/Card/SectionCards';
import styles from './page.module.css';
import { fetchMostPopularVideos, fetchVideosByQuery } from '@/apis/youtubeAPIs';
import Video from '@/types/Video';
import { useEffect, useState } from 'react';

const Home = () => {
	const [disneyVideos, setDisneyVideos] = useState<Array<Video>>([]);
	const [productivityVideos, setProductivityVideos] = useState<Array<Video>>(
		[]
	);
	const [travelVideos, setTravelVideos] = useState<Array<Video>>([]);
	const [popularVideos, setPopularVideos] = useState<Array<Video>>([]);

	useEffect(() => {
		fetchVideosByQuery('Disney videos').then((videos) => {
			console.log(videos);
			setDisneyVideos(videos);
		});

		fetchVideosByQuery('productivity').then((videos) => {
			setProductivityVideos(videos);
		});

		fetchVideosByQuery('travel').then((videos) => {
			setTravelVideos(videos);
		});

		fetchMostPopularVideos().then((videos) => {
			setPopularVideos(videos);
		});
	}, []);

	// const disneyVideos = [] as Array<Video>;
	// const productivityVideos = [] as Array<Video>;
	// const travelVideos = [] as Array<Video>;
	// const popularVideos = [] as Array<Video>;

	console.log('Home');

	return (
		<main className={styles.main}>
			<Navbar />
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
