import styles from './page.module.css';
import Video from '../../../types/Video';
import VideoModal from './components/VideoModal';
import { getYoutubeVideoById } from '@/apis/youtubeAPIs';

export const generateStaticParams = async () => {
	console.log('Inside of generate static params');
	const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'uh4dTLJ9q9o'];

	return listOfVideos.map((id) => ({
		id,
	}));
};

export const revalidate = 10;

const Video = async ({
	params,
	searchParams,
}: {
	video: Video;
	params: { id: string };
	searchParams: any;
}) => {
	const id = params.id;

	const video = await getYoutubeVideoById(id, 'force-cache');

	if (!video) {
		return <div>Not found</div>;
	}

	return (
		<div className={styles.container}>
			<VideoModal video={video} />
		</div>
	);
};

export default Video;
