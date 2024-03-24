import { config as createConfig, type GitHubConfig, type LocalConfig } from '@keystatic/core';

import { tags } from '@/lib/keystatic/schema/collections/tags';
import { writings } from '@/lib/keystatic/schema/collections/writings';


export const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
	process.env.NODE_ENV === "development"
		? { kind: "local" }
		: {
				kind: "github",
				repo: {
					owner: "q1b",
					name: "q1b",
				},
		  };


export const config = createConfig({
	ui: {
		navigation: {
			'Content': ['writings', 'tags'],
		},
		brand: {
			name: '- Personal Dashboard',
			// @ts-ignore
			mark: () => null,
		}
	},
	storage,
	collections: {
		writings,
		tags
	},
});
