/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => {
		return [
			// Basic redirect
			{
				source: "/",
				destination: "/keystatic",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
