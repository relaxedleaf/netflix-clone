'use client';

import clsx from 'classnames';
import DislikeIcon from '@/components/Icons/DislikeIcon';
import LikeIcon from '@/components/Icons/LikeIcon';
import Modal from 'react-modal';
import styles from '../page.module.css';
import Video from '@/types/Video';
import { useRouter } from 'next/navigation';

const VideoModal = ({ video }: { video: Video }) => {
	const router = useRouter();

	const {
		id,
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount } = { viewCount: 0 },
	} = video;

	return (
		<Modal
			className={styles.modal}
			isOpen={true}
			contentLabel='Watch the video'
			onRequestClose={() => router.back()}
			overlayClassName={styles.overlay}
		>
			<iframe
				id='ytplayer'
				className={styles.videoPlayer}
				width='100%'
				height='360'
				src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
			></iframe>

			<div className={styles.likeDislikeBtnWrapper}>
				<div className={styles.likeBtnWrapper}>
					<button>
						<div className={styles.btnWrapper}>
							<LikeIcon />
						</div>
					</button>
				</div>
				<button>
					<div className={styles.btnWrapper}>
						<DislikeIcon />
					</div>
				</button>
			</div>

			<div className={styles.modalBody}>
				<div className={styles.modalBodyContent}>
					<div className={styles.col1}>
						<p className={styles.publishTime}>{publishTime}</p>
						<p className={styles.title}>{title}</p>
						<p className={styles.description}>{description}</p>
					</div>
					<div className={styles.col2}>
						<p
							className={clsx(
								styles.subText,
								styles.subTextWrapper
							)}
						>
							<span className={styles.textColor}>Cast: </span>
							<span className={styles.channelTitle}>
								{channelTitle}
							</span>
						</p>
						<p
							className={clsx(
								styles.subText,
								styles.subTextWrapper
							)}
						>
							<span className={styles.textColor}>
								View Count:{' '}
							</span>
							<span className={styles.channelTitle}>
								{viewCount}
							</span>
						</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default VideoModal;
