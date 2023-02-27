'use client';

import styles from './navbar.module.css';
import { NavbarProps } from './navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { magic } from '@/lib/magic-client';

const Navbar = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [email, setEmail] = useState<string | null>('');
	const [didToken, setDidToken] = useState('');

	const router = useRouter();

	const handleOnClickNavItem = (item: string) => {
		router.push(item);
	};

	const handleShowDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleSignout = useCallback(async () => {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${didToken}`,
					'Content-Type': 'application/json',
				},
			});

			const res = await response.json();
		} catch (error) {
			console.error('Error logging out', error);
			router.push('/login');
		}
	}, [router]);

	useEffect(() => {
		let mounted = true;

		magic?.user.getIdToken().then((data) => {
			if (mounted) {
				setDidToken(data);
			}
		});

		magic?.user.getMetadata().then((data) => {
			if (mounted) {
				setEmail(data.email);
			}
		});

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
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
				<ul className={styles.navItems}>
					<li
						className={styles.navItem}
						onClick={() => {
							handleOnClickNavItem('/');
						}}
					>
						Home
					</li>
					<li
						className={styles.navItem2}
						onClick={() => {
							handleOnClickNavItem('/browse/my-list');
						}}
					>
						My List
					</li>
				</ul>
				<nav className={styles.navContainer}>
					<div>
						<button
							className={styles.usernameBtn}
							onClick={handleShowDropdown}
						>
							<p className={styles.username}>{email}</p>
							<Image
								src='/static/expand_more.svg'
								width={24}
								height={24}
								alt='Expand dropdown'
							/>
						</button>

						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<a
										className={styles.linkName}
										onClick={handleSignout}
									>
										Sign out
									</a>
									<div className={styles.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
