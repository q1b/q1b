import { singleton } from '@keystatic/core';

import { content } from '@/lib/keystatic/schema/fields/content';

export const homepage = singleton({
	label: 'Homepage',
	entryLayout: 'content',
	format: {
		contentField: 'content',
	},
	path: 'src/content_homepage',
	schema: {
		content,
	},
});
