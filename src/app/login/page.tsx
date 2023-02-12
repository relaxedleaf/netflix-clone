'use client';

import useRouterEvent from '@/hooks/useRouterEvent';
import { magic } from '@/lib/magic-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [userMsg, setUserMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	useRouterEvent({
		onComplete: () => {
			setIsLoading(false);
		},
	});

	const handleLoginWithEmail = useCallback(async () => {
		setEmail('');
		if (!email) {
			setUserMsg('Enter a valid email address');
			return;
		}

		if (email === 'liguanghui.cs@gmail.com') {
			try {
				setIsLoading(true);
				const didToken = await magic?.auth.loginWithMagicLink({
					email,
				});
				if (didToken) {
					router.push('/');
				}
			} catch (err) {
				console.log('Error login with Magic', err);
				setIsLoading(false);
			}
		}
	}, [email]);

	const handleOnEmailChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
			setUserMsg('');
		},
		[]
	);

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerWrapper}>
					<Link className={styles.logoLink} href='/'>
						<div className={styles.logoWrapper}>
							<Image
								src='/static/netflix.svg'
								alt='Netflix logo'
								width={128}
								height={34}
							/>
						</div>
					</Link>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.mainWrapper}>
					<h1 className={styles.signinHeader}>Sign In</h1>

					<input
						type='text'
						placeholder='Email address'
						className={styles.emailInput}
						onChange={handleOnEmailChange}
					/>

					<p className={styles.userMsg}>{userMsg}</p>
					<button
						onClick={handleLoginWithEmail}
						className={styles.loginBtn}
					>
						{isLoading ? 'Loading...' : 'Sign In'}
					</button>
				</div>
			</main>
		</div>
	);
};

export default Login;
