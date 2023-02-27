import verifyToken from './verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const redirectUser = () => {
	const cookieStore = cookies();
	const token = cookieStore.get('token')?.value;
	const userId = verifyToken(token);
	if (!userId) {
		redirect('/login');
	} else {
		return {
			userId,
			token,
		};
	}
};

export default redirectUser;
