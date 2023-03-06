import styles from './page.module.css';
import Video from '../../../types/Video';
import VideoModal from './components/VideoModal';
import { getYoutubeVideoById } from '@/apis/youtubeAPIs';
import Navbar from '@/components/Navbar';

export const generateStaticParams = async () => {
	const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'uh4dTLJ9q9o'];

	return listOfVideos.map((id) => ({
		id,
	}));
};

export const revalidate = 10;

const Video = async ({
	params,
}: {
	video: Video;
	params: { id: string };
}) => {
	const id = params.id;

	const video = await getYoutubeVideoById(id, 'force-cache');

	if (!video) {
		return <div>Not found</div>;
	}

	return (
		<div className={styles.container}>
			<Navbar />
			<VideoModal video={video} />
		</div>
	);
};

export default Video;
