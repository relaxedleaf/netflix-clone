const Video = ({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: any;
}) => {
	return <div>Video ID {params.id}</div>;
};

export default Video;
