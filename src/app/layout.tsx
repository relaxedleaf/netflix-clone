'use client';

import './globals.css';

import { Roboto_Slab } from '@next/font/google';

const slab = Roboto_Slab({ subsets: ['latin'], display: 'optional' });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={slab.className}>
			<head />
			<body>{children}</body>
		</html>
	);
}
