'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CardProps } from './card';
import styles from './card.module.css';

const Card = ({
	imgUrl = '/static/clifford.webp',
	size = 'medium',
}: CardProps) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);
	const classMap = {
		large: styles.lgItem,
		medium: styles.mdItem,
		small: styles.smItem,
	};

	const handleOnError = () => {
		console.log('hii error');
		setImgSrc(
			'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'
		);
	};

	return (
		<div className={styles.container}>
			Card
			<div className={classMap[size]}>
				<Image
					src={imgSrc}
					alt='image'
					fill
					onError={handleOnError}
					className={styles.cardImg}
				/>
			</div>
		</div>
	);
};

export default Card;
