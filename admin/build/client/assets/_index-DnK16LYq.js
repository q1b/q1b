import { j as e } from "./index-DFWxKLZT.js";
import { u as o, L as s } from "./components-DuNu-YZ6.js";
const c = () => [
	{ title: "New Remix App" },
	{ name: "description", content: "Welcome to Remix + Keystatic!" },
];
function l() {
	const { posts: i } = o();
	return e.jsxs("div", {
		className: "content",
		children: [
			e.jsx("h1", { children: "Keystatic ⚡️" }),
			e.jsx("p", {
				children:
					"This homepage shows how to load a collection from the reader API.",
			}),
			e.jsxs("p", {
				children: [
					e.jsx(s, {
						to: "/keystatic",
						children: "Click here to visit the Admin UI",
					}),
					", or the link below to view a post in the collection.",
				],
			}),
			e.jsx("h2", { children: "Posts" }),
			i.length
				? e.jsx("ul", {
						children: i.map((t) =>
							e.jsx(
								"li",
								{
									children: e.jsx(s, {
										to: `/posts/${t.slug}`,
										children: t.entry.title,
									}),
								},
								t.slug,
							),
						),
					})
				: e.jsxs("p", {
						children: [
							"There are currently no posts. Go",
							" ",
							e.jsx(s, {
								to: "/keystatic/collection/posts/create",
								children: "create one in Keystatic",
							}),
							"!",
						],
					}),
		],
	});
}
export { l as default, c as meta };
