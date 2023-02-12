'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useRouterEvent = ({
	onStart = () => {},
	onComplete = () => {},
}: {
	onStart?: () => void;
	onComplete?: () => void;
}) => {
	const [isChanging, setIsChanging] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		setIsChanging(false);
	}, [pathname, searchParams]);

	useEffect(() => {
		if (isChanging) onStart();
		else onComplete();
	}, [isChanging]);
};

export default useRouterEvent;
