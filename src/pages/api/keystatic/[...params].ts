import { makeHandler } from '@keystatic/astro/api';

import { config } from '@/lib/keystatic/keystatic.config';

export const ALL = makeHandler({
	config,
});

export const prerender = false;