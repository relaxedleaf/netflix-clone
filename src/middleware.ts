import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import verifyToken from './lib/utils/server/verifyToken';

export const middleware = async (req: NextRequest, ev: any) => {
	console.log('middleware');
	const url = req.nextUrl.clone();
	url.pathname = '/login';

	const token = req ? req.cookies.get('token') : null;

	if (!token || typeof token !== 'string') {
		return NextResponse.rewrite(url);
	}

	const userId = await verifyToken(token);
	const { pathname } = req.nextUrl;

	if (
		pathname.startsWith('/_next') ||
		pathname.includes('/api/login') ||
		userId ||
		pathname.includes('/static')
	) {
		return NextResponse.next();
	}

	if (!userId && pathname !== '/login') {
		return NextResponse.rewrite(url);
	}
};
