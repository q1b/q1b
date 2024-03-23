import { collection, fields } from '@keystatic/core';

export const tags = collection({
	label: 'Tags',
	entryLayout: 'form',
	path: 'src/content/tags/*',
    slugField: "name",
    schema: {
        name: fields.slug({
            name: {
                label: "Name",
            },
        }),
    },
});
