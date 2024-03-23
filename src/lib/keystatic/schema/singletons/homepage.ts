import { fields, singleton } from '@keystatic/core';

export const homepage = singleton({
	label: 'Homepage',
	entryLayout: 'form',
	path: 'src/content/_homepage',
	schema: {
		title: fields.text({
			label: 'Title',
		}),
		description: fields.text({
			label: 'Description',
		}),
		image: fields.image({
			label: 'Cover Image',
		}),
	},
});
