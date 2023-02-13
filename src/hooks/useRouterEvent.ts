'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useMountedEffect from './useMountedEffect';

type RouterEventProps = {
	onStart?: () => void;
	onComplete?: () => void;
};

const useRouterEvent = ({
	onStart = () => {},
	onComplete = () => {},
}: RouterEventProps) => {
	const [isChanging, setIsChanging] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [completeActionCompleted, setCompleteActionCompleted] =
		useState(false);
	useEffect(() => {
		console.log({ windowPath: window.location.pathname });
		console.log({ pathname, searchParams });
		setIsChanging(false);
	}, [pathname, searchParams]);

	useEffect(() => {
		console.log('called');
		if (isChanging) onStart();
		else {
			onComplete();
			setCompleteActionCompleted(true);
		}
	}, [isChanging]);

	return { completeActionCompleted };
};

export default useRouterEvent;
