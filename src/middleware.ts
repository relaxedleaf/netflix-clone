import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import verifyToken from './lib/utils/server/verifyToken';

export const middleware = async (req: NextRequest, ev: any) => {
	const token = req ? req.cookies.get('token') : null;
	const userId = typeof token === 'object' ? await verifyToken(token?.value) : null;
	const { pathname } = req.nextUrl;

	if (
		pathname.startsWith('/_next') ||
		pathname.includes('/api/login') ||
		userId ||
		pathname.includes('/static') ||
		pathname.includes('/favicon.ico')
	) {
		return NextResponse.next();
	}

	if ((!token || !userId) && pathname !== '/login') {
		const url = req.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
};
