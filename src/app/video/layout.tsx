'use client';

import '../globals.css';

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
		console.log({
			verifyingLogin,
			isLoggedIn,
		});
		if (!verifyingLogin && !isLoggedIn) {
			router.push('/login');
		}
	}, [verifyingLogin, isLoggedIn]);

	return (
		<Component verifyingLogin={verifyingLogin} isLoggedIn={isLoggedIn}>
			{children}
		</Component>
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
