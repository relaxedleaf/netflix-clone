'use client';

import cls from 'classnames';
import Image from 'next/image';
import styles from './card.module.css';
import { CardProps } from './card';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Card = ({
	imgUrl = '/static/clifford.webp',
	size = 'medium',
	scale,
}: CardProps) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);
	const classMap = {
		large: styles.lgItem,
		medium: styles.mdItem,
		small: styles.smItem,
	};

	const handleOnError = () => {
		setImgSrc(
			'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'
		);
	};

	return (
		<div className={styles.container}>
			<motion.div
				className={cls(styles.imgMotionWrapper, classMap[size])}
				whileHover={{ ...scale }}
			>
				<Image
					src={imgSrc}
					alt='image'
					fill
					onError={handleOnError}
					className={styles.cardImg}
				/>
			</motion.div>
		</div>
	);
};

export default Card;
