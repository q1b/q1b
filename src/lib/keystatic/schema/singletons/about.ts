import { singleton } from '@keystatic/core';

import { content } from '@/lib/keystatic/schema/fields/content';

export const about = singleton({
	label: 'About',
	entryLayout: 'content',
	format: {
		contentField: 'content',
	},
	path: 'src/content_about',
	schema: {
		content,
	},
});
