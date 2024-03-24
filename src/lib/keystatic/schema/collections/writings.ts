import { collection, fields } from '@keystatic/core';

import { content } from '@/lib/keystatic/schema/fields/content';

export const writings = collection({
	label: 'Writings',
	entryLayout: 'content',
	format: {
		contentField: 'content',
	},
	path: 'src/content/writings/*',
	slugField: 'title',
	schema: {
		title: fields.slug({
			name: {
				label: 'Title',
			},
		}),
		summary: fields.text({
			label: 'Short Summary',
			multiline: true
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
		tags: fields.array(
			fields.relationship({
				label: "Tag",
				collection: "tags",
				validation: {
					isRequired: true,
				},
			}),
			{
				label: "Tags",
				itemLabel: (props) => props.value ?? "Please select",
			},
		),
		content,
	},
});
