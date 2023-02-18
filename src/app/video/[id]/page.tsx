'use client';

import Modal from 'react-modal';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import clsx from 'classnames';

// Modal.setAppElement('nextjs-portal');

const Video = ({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: any;
}) => {
	const router = useRouter();

	const video = {
		title: 'Hi cute dog',
		publishTime: '1990-01-01',
		description: "A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger? A big red dog that is super cute, can he get any bigger?",
		channelTitle: 'Paramount Pictures',
		viewCount: 10000,
	};

	const { title, publishTime, description, channelTitle, viewCount } = video;

	return (
		<div className={styles.container}>
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
					src={`https://www.youtube.com/embed/${params.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
				></iframe>
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
		</div>
	);
};

export default Video;
