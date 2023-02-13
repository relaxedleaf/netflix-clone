'use client';

import './globals.css';

import { Roboto_Slab } from '@next/font/google';
import useAuth from '@/hooks/useAuth';
import { ReactNode } from 'react';
import useMountedEffect from '@/hooks/useMountedEffect';
import { usePathname, useRouter } from 'next/navigation';
import useRouterEvent from '@/hooks/useRouterEvent';
import Loader from '@/components/Loader';

const slab = Roboto_Slab({ subsets: ['latin'], display: 'optional' });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { verifyingLogin, isLoggedIn } = useAuth();
	const router = useRouter();

	useMountedEffect(() => {
		if (!verifyingLogin && !isLoggedIn) {
			router.push('/login');
		}
	}, [verifyingLogin, isLoggedIn]);

	return (
		<html lang='en' className={slab.className}>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
				<Component
					verifyingLogin={verifyingLogin}
					isLoggedIn={isLoggedIn}
				>
					{children}
				</Component>
			</body>
		</html>
	);
}

const Component = ({
	verifyingLogin,
	isLoggedIn,
	children,
}: {
	verifyingLogin: boolean;
	isLoggedIn: boolean;
	children: ReactNode;
}) => {
	const pathname = usePathname();
	const { completeActionCompleted } = useRouterEvent({});

	if (verifyingLogin || !completeActionCompleted) {
		return <Loader />;
	}

	if (isLoggedIn || pathname === '/login') {
		return <>{children}</>;
	}

	return <>Unauthroized</>;
};
