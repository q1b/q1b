import { collection, fields } from '@keystatic/core';

import { content } from '@/lib/keystatic/schema/fields/content';

export const posts = collection({
	label: 'Posts',
	entryLayout: 'content',
	format: {
		contentField: 'content',
	},
	path: 'src/contentposts/*',
	slugField: 'title',
	schema: {
		title: fields.slug({
			name: {
				label: 'Title',
			},
		}),
		publishedAt: fields.date({
			label: 'Published at',
			validation: {
				isRequired: true,
			},
		}),
		isDraft: fields.checkbox({
			label: 'Do not publish',
			description: 'Check this box to prevent this post from being published',
			defaultValue: false,
		}),
		content,
	},
});
