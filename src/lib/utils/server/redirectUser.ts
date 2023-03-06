import verifyToken from './verifyToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const redirectUser = async () => {
	const cookieStore = cookies();
	const token = cookieStore.get('token')?.value;
	const userId = await verifyToken(token);
	if (!userId) {
		redirect('/login');
	}
	return {
		userId,
		token,
	};
};

export default redirectUser;
