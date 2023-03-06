import { magic } from '@/lib/magic-client';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const useAuth = () => {
	console.log('useAuth');
	const [verifyingLogin, setIsVerifyingLogin] = useState(true);
	const [isLoggedIn, setIsLogged] = useState(false);
	const pathname = usePathname();

	const checkAuth = useCallback(() => {
		setIsVerifyingLogin(true);
		magic?.user
			.isLoggedIn()
			.then((loggedIn) => {
				if (loggedIn) {
					setIsLogged(loggedIn);
				}
				setIsVerifyingLogin(false);
			})
			.catch((err) => {
				setIsVerifyingLogin(false);
			});
	}, []);

	useEffect(() => {
		checkAuth();
	}, [pathname]);

	return { verifyingLogin, isLoggedIn };
};

export default useAuth;
