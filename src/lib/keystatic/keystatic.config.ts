import { config as createConfig } from '@keystatic/core';

import { links } from '@/lib/keystatic/schema/collections/links';
import { posts } from '@/lib/keystatic/schema/collections/posts';
import { about } from '@/lib/keystatic/schema/singletons/about';
import { homepage } from '@/lib/keystatic/schema/singletons/homepage';



// export const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
// 	process.env.NODE_ENV === "development"
// 		? { kind: "local" }
// 		: {
// 				kind: "github",
// 				repo: {
// 					owner: "q1b",
// 					name: "q1b",
// 				},
// 		  };


export const config = createConfig({
	storage: {
		kind: 'cloud'
	},
	cloud: {
		project: 'persona/site',
	},
	singletons: {
		homepage,
		about,
	},
	collections: {
		posts,
		links,
	},
});
