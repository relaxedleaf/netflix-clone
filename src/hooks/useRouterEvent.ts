'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
		setIsChanging(false);
	}, [pathname, searchParams]);

	useEffect(() => {
		if (isChanging) onStart();
		else {
			onComplete();
			setCompleteActionCompleted(true);
		}
	}, [isChanging]);

	return { completeActionCompleted };
};

export default useRouterEvent;
