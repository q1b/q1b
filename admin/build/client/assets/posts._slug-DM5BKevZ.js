import { j as e, R as r } from "./index-DFWxKLZT.js";
import { M as s } from "./index-1h9o7eJh.js";
import { u as o } from "./components-DuNu-YZ6.js";
function i() {
	const { post: t } = o();
	return e.jsxs("div", {
		className: "content",
		children: [
			e.jsx("h1", { children: t.title }),
			s.renderers.react(t.content, r),
		],
	});
}
export { i as default };