/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'yt3.ggpht.com',
			},
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
			},
		],
	},
	reactStrictMode: false
};

module.exports = nextConfig;
