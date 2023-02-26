'use client';

import clsx from 'classnames';
import DislikeIcon from '@/components/Icons/DislikeIcon';
import LikeIcon from '@/components/Icons/LikeIcon';
import Modal from 'react-modal';
import styles from '../page.module.css';
import Video from '@/types/Video';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const VideoModal = ({ video }: { video: Video }) => {
	const router = useRouter();

	const [toggleLike, setToggleLike] = useState(false);
	const [toggleDisLike, setToggleDisLike] = useState(false);

	const {
		id,
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount } = { viewCount: 0 },
	} = video;

	const handleToggleDislike = useCallback(async () => {
		console.log('handleToggleDislike');
		setToggleDisLike(!toggleDisLike);
		setToggleLike(toggleDisLike);

		const val = !toggleDisLike;

		const response = await fetch('/api/stats', {
			method: 'POST',
			body: JSON.stringify({
				videoId: id,
				favorited: val ? 0 : 1,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log('data', await response.json());
	}, [toggleDisLike]);

	const handleToggleLike = useCallback(async () => {
		const val = !toggleLike;
		setToggleLike(val);
		setToggleDisLike(toggleLike);

		const response = await fetch('/api/stats', {
			method: 'POST',
			body: JSON.stringify({
				videoId: id,
				favorited: val ? 1 : 0,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log('data', await response.json());
	}, [toggleLike]);

	const getFavoriated = useCallback(async () => {
		const resposne = await fetch(`/api/stats?videoId=${id}`);

		if (resposne.status !== 200) {
			return;
		}

		const video = await resposne.json();
		const { favorited } = video;
		if (favorited === 1) {
			setToggleLike(true);
		} else if (favorited === 0) {
			setToggleDisLike(true);
		}
	}, [id]);

	useEffect(() => {
		if (!id) {
			return () => {};
		}
		getFavoriated();
	}, [id]);

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
					<button onClick={handleToggleLike}>
						<div className={styles.btnWrapper}>
							<LikeIcon selected={toggleLike} />
						</div>
					</button>
				</div>
				<button onClick={handleToggleDislike}>
					<div className={styles.btnWrapper}>
						<DislikeIcon selected={toggleDisLike} />
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
