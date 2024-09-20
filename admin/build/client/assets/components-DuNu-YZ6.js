var fa = Object.defineProperty;
var ha = (e, t, r) =>
	t in e
		? fa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
		: (e[t] = r);
var xt = (e, t, r) => ha(e, typeof t != "symbol" ? t + "" : t, r);
import { r as f, b as ma, c as pa } from "./index-DFWxKLZT.js";
/**
 * @remix-run/router v1.19.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Y() {
	return (
		(Y = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Y.apply(this, arguments)
	);
}
var ee;
(function (e) {
	(e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(ee || (ee = {}));
const $r = "popstate";
function Nl(e) {
	e === void 0 && (e = {});
	function t(n, a) {
		let { pathname: i, search: o, hash: s } = n.location;
		return it(
			"",
			{ pathname: i, search: o, hash: s },
			(a.state && a.state.usr) || null,
			(a.state && a.state.key) || "default",
		);
	}
	function r(n, a) {
		return typeof a == "string" ? a : Me(a);
	}
	return va(t, r, null, e);
}
function k(e, t) {
	if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Ke(e, t) {
	if (!e) {
		typeof console < "u" && console.warn(t);
		try {
			throw new Error(t);
		} catch {}
	}
}
function ya() {
	return Math.random().toString(36).substr(2, 8);
}
function Br(e, t) {
	return { usr: e.state, key: e.key, idx: t };
}
function it(e, t, r, n) {
	return (
		r === void 0 && (r = null),
		Y(
			{
				pathname: typeof e == "string" ? e : e.pathname,
				search: "",
				hash: "",
			},
			typeof t == "string" ? xe(t) : t,
			{ state: r, key: (t && t.key) || n || ya() },
		)
	);
}
function Me(e) {
	let { pathname: t = "/", search: r = "", hash: n = "" } = e;
	return (
		r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r),
		n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n),
		t
	);
}
function xe(e) {
	let t = {};
	if (e) {
		let r = e.indexOf("#");
		r >= 0 && ((t.hash = e.substr(r)), (e = e.substr(0, r)));
		let n = e.indexOf("?");
		n >= 0 && ((t.search = e.substr(n)), (e = e.substr(0, n))),
			e && (t.pathname = e);
	}
	return t;
}
function va(e, t, r, n) {
	n === void 0 && (n = {});
	let { window: a = document.defaultView, v5Compat: i = !1 } = n,
		o = a.history,
		s = ee.Pop,
		l = null,
		u = h();
	u == null && ((u = 0), o.replaceState(Y({}, o.state, { idx: u }), ""));
	function h() {
		return (o.state || { idx: null }).idx;
	}
	function c() {
		s = ee.Pop;
		let R = h(),
			P = R == null ? null : R - u;
		(u = R), l && l({ action: s, location: E.location, delta: P });
	}
	function p(R, P) {
		s = ee.Push;
		let x = it(E.location, R, P);
		u = h() + 1;
		let C = Br(x, u),
			S = E.createHref(x);
		try {
			o.pushState(C, "", S);
		} catch (j) {
			if (j instanceof DOMException && j.name === "DataCloneError")
				throw j;
			a.location.assign(S);
		}
		i && l && l({ action: s, location: E.location, delta: 1 });
	}
	function w(R, P) {
		s = ee.Replace;
		let x = it(E.location, R, P);
		u = h();
		let C = Br(x, u),
			S = E.createHref(x);
		o.replaceState(C, "", S),
			i && l && l({ action: s, location: E.location, delta: 0 });
	}
	function v(R) {
		let P =
				a.location.origin !== "null"
					? a.location.origin
					: a.location.href,
			x = typeof R == "string" ? R : Me(R);
		return (
			(x = x.replace(/ $/, "%20")),
			k(
				P,
				"No window.location.(origin|href) available to create URL for href: " +
					x,
			),
			new URL(x, P)
		);
	}
	let E = {
		get action() {
			return s;
		},
		get location() {
			return e(a, o);
		},
		listen(R) {
			if (l)
				throw new Error("A history only accepts one active listener");
			return (
				a.addEventListener($r, c),
				(l = R),
				() => {
					a.removeEventListener($r, c), (l = null);
				}
			);
		},
		createHref(R) {
			return t(a, R);
		},
		createURL: v,
		encodeLocation(R) {
			let P = v(R);
			return { pathname: P.pathname, search: P.search, hash: P.hash };
		},
		push: p,
		replace: w,
		go(R) {
			return o.go(R);
		},
	};
	return E;
}
var K;
(function (e) {
	(e.data = "data"),
		(e.deferred = "deferred"),
		(e.redirect = "redirect"),
		(e.error = "error");
})(K || (K = {}));
const ga = new Set([
	"lazy",
	"caseSensitive",
	"path",
	"id",
	"index",
	"children",
]);
function wa(e) {
	return e.index === !0;
}
function ot(e, t, r, n) {
	return (
		r === void 0 && (r = []),
		n === void 0 && (n = {}),
		e.map((a, i) => {
			let o = [...r, String(i)],
				s = typeof a.id == "string" ? a.id : o.join("-");
			if (
				(k(
					a.index !== !0 || !a.children,
					"Cannot specify children on an index route",
				),
				k(
					!n[s],
					'Found a route id collision on id "' +
						s +
						`".  Route id's must be globally unique within Data Router usages`,
				),
				wa(a))
			) {
				let l = Y({}, a, t(a), { id: s });
				return (n[s] = l), l;
			} else {
				let l = Y({}, a, t(a), { id: s, children: void 0 });
				return (
					(n[s] = l),
					a.children && (l.children = ot(a.children, t, o, n)),
					l
				);
			}
		})
	);
}
function Ee(e, t, r) {
	return r === void 0 && (r = "/"), Ot(e, t, r, !1);
}
function Ot(e, t, r, n) {
	let a = typeof t == "string" ? xe(t) : t,
		i = ce(a.pathname || "/", r);
	if (i == null) return null;
	let o = fn(e);
	ba(o);
	let s = null;
	for (let l = 0; s == null && l < o.length; ++l) {
		let u = Oa(i);
		s = _a(o[l], u, n);
	}
	return s;
}
function dn(e, t) {
	let { route: r, pathname: n, params: a } = e;
	return {
		id: r.id,
		pathname: n,
		params: a,
		data: t[r.id],
		handle: r.handle,
	};
}
function fn(e, t, r, n) {
	t === void 0 && (t = []),
		r === void 0 && (r = []),
		n === void 0 && (n = "");
	let a = (i, o, s) => {
		let l = {
			relativePath: s === void 0 ? i.path || "" : s,
			caseSensitive: i.caseSensitive === !0,
			childrenIndex: o,
			route: i,
		};
		l.relativePath.startsWith("/") &&
			(k(
				l.relativePath.startsWith(n),
				'Absolute route path "' +
					l.relativePath +
					'" nested under path ' +
					('"' +
						n +
						'" is not valid. An absolute child route path ') +
					"must start with the combined path of all its parent routes.",
			),
			(l.relativePath = l.relativePath.slice(n.length)));
		let u = me([n, l.relativePath]),
			h = r.concat(l);
		i.children &&
			i.children.length > 0 &&
			(k(
				i.index !== !0,
				"Index routes must not have child routes. Please remove " +
					('all child routes from route path "' + u + '".'),
			),
			fn(i.children, t, h, u)),
			!(i.path == null && !i.index) &&
				t.push({ path: u, score: Da(u, i.index), routesMeta: h });
	};
	return (
		e.forEach((i, o) => {
			var s;
			if (i.path === "" || !((s = i.path) != null && s.includes("?")))
				a(i, o);
			else for (let l of hn(i.path)) a(i, o, l);
		}),
		t
	);
}
function hn(e) {
	let t = e.split("/");
	if (t.length === 0) return [];
	let [r, ...n] = t,
		a = r.endsWith("?"),
		i = r.replace(/\?$/, "");
	if (n.length === 0) return a ? [i, ""] : [i];
	let o = hn(n.join("/")),
		s = [];
	return (
		s.push(...o.map((l) => (l === "" ? i : [i, l].join("/")))),
		a && s.push(...o),
		s.map((l) => (e.startsWith("/") && l === "" ? "/" : l))
	);
}
function ba(e) {
	e.sort((t, r) =>
		t.score !== r.score
			? r.score - t.score
			: Ca(
					t.routesMeta.map((n) => n.childrenIndex),
					r.routesMeta.map((n) => n.childrenIndex),
				),
	);
}
const Ea = /^:[\w-]+$/,
	Sa = 3,
	Ra = 2,
	xa = 1,
	La = 10,
	Pa = -2,
	Hr = (e) => e === "*";
function Da(e, t) {
	let r = e.split("/"),
		n = r.length;
	return (
		r.some(Hr) && (n += Pa),
		t && (n += Ra),
		r
			.filter((a) => !Hr(a))
			.reduce((a, i) => a + (Ea.test(i) ? Sa : i === "" ? xa : La), n)
	);
}
function Ca(e, t) {
	return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a])
		? e[e.length - 1] - t[t.length - 1]
		: 0;
}
function _a(e, t, r) {
	r === void 0 && (r = !1);
	let { routesMeta: n } = e,
		a = {},
		i = "/",
		o = [];
	for (let s = 0; s < n.length; ++s) {
		let l = n[s],
			u = s === n.length - 1,
			h = i === "/" ? t : t.slice(i.length) || "/",
			c = Ft(
				{
					path: l.relativePath,
					caseSensitive: l.caseSensitive,
					end: u,
				},
				h,
			),
			p = l.route;
		if (
			(!c &&
				u &&
				r &&
				!n[n.length - 1].route.index &&
				(c = Ft(
					{
						path: l.relativePath,
						caseSensitive: l.caseSensitive,
						end: !1,
					},
					h,
				)),
			!c)
		)
			return null;
		Object.assign(a, c.params),
			o.push({
				params: a,
				pathname: me([i, c.pathname]),
				pathnameBase: Na(me([i, c.pathnameBase])),
				route: p,
			}),
			c.pathnameBase !== "/" && (i = me([i, c.pathnameBase]));
	}
	return o;
}
function Ft(e, t) {
	typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
	let [r, n] = Ta(e.path, e.caseSensitive, e.end),
		a = t.match(r);
	if (!a) return null;
	let i = a[0],
		o = i.replace(/(.)\/+$/, "$1"),
		s = a.slice(1);
	return {
		params: n.reduce((u, h, c) => {
			let { paramName: p, isOptional: w } = h;
			if (p === "*") {
				let E = s[c] || "";
				o = i.slice(0, i.length - E.length).replace(/(.)\/+$/, "$1");
			}
			const v = s[c];
			return (
				w && !v
					? (u[p] = void 0)
					: (u[p] = (v || "").replace(/%2F/g, "/")),
				u
			);
		}, {}),
		pathname: i,
		pathnameBase: o,
		pattern: e,
	};
}
function Ta(e, t, r) {
	t === void 0 && (t = !1),
		r === void 0 && (r = !0),
		Ke(
			e === "*" || !e.endsWith("*") || e.endsWith("/*"),
			'Route path "' +
				e +
				'" will be treated as if it were ' +
				('"' +
					e.replace(/\*$/, "/*") +
					'" because the `*` character must ') +
				"always follow a `/` in the pattern. To get rid of this warning, " +
				('please change the route path to "' +
					e.replace(/\*$/, "/*") +
					'".'),
		);
	let n = [],
		a =
			"^" +
			e
				.replace(/\/*\*?$/, "")
				.replace(/^\/*/, "/")
				.replace(/[\\.*+^${}|()[\]]/g, "\\$&")
				.replace(
					/\/:([\w-]+)(\?)?/g,
					(o, s, l) => (
						n.push({ paramName: s, isOptional: l != null }),
						l ? "/?([^\\/]+)?" : "/([^\\/]+)"
					),
				);
	return (
		e.endsWith("*")
			? (n.push({ paramName: "*" }),
				(a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
			: r
				? (a += "\\/*$")
				: e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"),
		[new RegExp(a, t ? void 0 : "i"), n]
	);
}
function Oa(e) {
	try {
		return e
			.split("/")
			.map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
			.join("/");
	} catch (t) {
		return (
			Ke(
				!1,
				'The URL path "' +
					e +
					'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
					("encoding (" + t + ")."),
			),
			e
		);
	}
}
function ce(e, t) {
	if (t === "/") return e;
	if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
	let r = t.endsWith("/") ? t.length - 1 : t.length,
		n = e.charAt(r);
	return n && n !== "/" ? null : e.slice(r) || "/";
}
function Ma(e, t) {
	t === void 0 && (t = "/");
	let {
		pathname: r,
		search: n = "",
		hash: a = "",
	} = typeof e == "string" ? xe(e) : e;
	return {
		pathname: r ? (r.startsWith("/") ? r : ja(r, t)) : t,
		search: Fa(n),
		hash: Aa(a),
	};
}
function ja(e, t) {
	let r = t.replace(/\/+$/, "").split("/");
	return (
		e.split("/").forEach((a) => {
			a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
		}),
		r.length > 1 ? r.join("/") : "/"
	);
}
function Xt(e, t, r, n) {
	return (
		"Cannot include a '" +
		e +
		"' character in a manually specified " +
		("`to." +
			t +
			"` field [" +
			JSON.stringify(n) +
			"].  Please separate it out to the ") +
		("`to." +
			r +
			"` field. Alternatively you may provide the full path as ") +
		'a string in <Link to="..."> and the router will parse it for you.'
	);
}
function mn(e) {
	return e.filter(
		(t, r) => r === 0 || (t.route.path && t.route.path.length > 0),
	);
}
function sr(e, t) {
	let r = mn(e);
	return t
		? r.map((n, a) => (a === r.length - 1 ? n.pathname : n.pathnameBase))
		: r.map((n) => n.pathnameBase);
}
function ur(e, t, r, n) {
	n === void 0 && (n = !1);
	let a;
	typeof e == "string"
		? (a = xe(e))
		: ((a = Y({}, e)),
			k(
				!a.pathname || !a.pathname.includes("?"),
				Xt("?", "pathname", "search", a),
			),
			k(
				!a.pathname || !a.pathname.includes("#"),
				Xt("#", "pathname", "hash", a),
			),
			k(
				!a.search || !a.search.includes("#"),
				Xt("#", "search", "hash", a),
			));
	let i = e === "" || a.pathname === "",
		o = i ? "/" : a.pathname,
		s;
	if (o == null) s = r;
	else {
		let c = t.length - 1;
		if (!n && o.startsWith("..")) {
			let p = o.split("/");
			for (; p[0] === ".."; ) p.shift(), (c -= 1);
			a.pathname = p.join("/");
		}
		s = c >= 0 ? t[c] : "/";
	}
	let l = Ma(a, s),
		u = o && o !== "/" && o.endsWith("/"),
		h = (i || o === ".") && r.endsWith("/");
	return !l.pathname.endsWith("/") && (u || h) && (l.pathname += "/"), l;
}
const me = (e) => e.join("/").replace(/\/\/+/g, "/"),
	Na = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
	Fa = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
	Aa = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class ka {
	constructor(t, r) {
		(this.type = "DataWithResponseInit"),
			(this.data = t),
			(this.init = r || null);
	}
}
function Ia(e, t) {
	return new ka(e, typeof t == "number" ? { status: t } : t);
}
class At extends Error {}
class Ua {
	constructor(t, r) {
		(this.pendingKeysSet = new Set()),
			(this.subscribers = new Set()),
			(this.deferredKeys = []),
			k(
				t && typeof t == "object" && !Array.isArray(t),
				"defer() only accepts plain objects",
			);
		let n;
		(this.abortPromise = new Promise((i, o) => (n = o))),
			(this.controller = new AbortController());
		let a = () => n(new At("Deferred data aborted"));
		(this.unlistenAbortSignal = () =>
			this.controller.signal.removeEventListener("abort", a)),
			this.controller.signal.addEventListener("abort", a),
			(this.data = Object.entries(t).reduce((i, o) => {
				let [s, l] = o;
				return Object.assign(i, { [s]: this.trackPromise(s, l) });
			}, {})),
			this.done && this.unlistenAbortSignal(),
			(this.init = r);
	}
	trackPromise(t, r) {
		if (!(r instanceof Promise)) return r;
		this.deferredKeys.push(t), this.pendingKeysSet.add(t);
		let n = Promise.race([r, this.abortPromise]).then(
			(a) => this.onSettle(n, t, void 0, a),
			(a) => this.onSettle(n, t, a),
		);
		return (
			n.catch(() => {}),
			Object.defineProperty(n, "_tracked", { get: () => !0 }),
			n
		);
	}
	onSettle(t, r, n, a) {
		if (this.controller.signal.aborted && n instanceof At)
			return (
				this.unlistenAbortSignal(),
				Object.defineProperty(t, "_error", { get: () => n }),
				Promise.reject(n)
			);
		if (
			(this.pendingKeysSet.delete(r),
			this.done && this.unlistenAbortSignal(),
			n === void 0 && a === void 0)
		) {
			let i = new Error(
				'Deferred data for key "' +
					r +
					'" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.',
			);
			return (
				Object.defineProperty(t, "_error", { get: () => i }),
				this.emit(!1, r),
				Promise.reject(i)
			);
		}
		return a === void 0
			? (Object.defineProperty(t, "_error", { get: () => n }),
				this.emit(!1, r),
				Promise.reject(n))
			: (Object.defineProperty(t, "_data", { get: () => a }),
				this.emit(!1, r),
				a);
	}
	emit(t, r) {
		this.subscribers.forEach((n) => n(t, r));
	}
	subscribe(t) {
		return this.subscribers.add(t), () => this.subscribers.delete(t);
	}
	cancel() {
		this.controller.abort(),
			this.pendingKeysSet.forEach((t, r) =>
				this.pendingKeysSet.delete(r),
			),
			this.emit(!0);
	}
	async resolveData(t) {
		let r = !1;
		if (!this.done) {
			let n = () => this.cancel();
			t.addEventListener("abort", n),
				(r = await new Promise((a) => {
					this.subscribe((i) => {
						t.removeEventListener("abort", n),
							(i || this.done) && a(i);
					});
				}));
		}
		return r;
	}
	get done() {
		return this.pendingKeysSet.size === 0;
	}
	get unwrappedData() {
		return (
			k(
				this.data !== null && this.done,
				"Can only unwrap data on initialized and settled deferreds",
			),
			Object.entries(this.data).reduce((t, r) => {
				let [n, a] = r;
				return Object.assign(t, { [n]: Ba(a) });
			}, {})
		);
	}
	get pendingKeys() {
		return Array.from(this.pendingKeysSet);
	}
}
function $a(e) {
	return e instanceof Promise && e._tracked === !0;
}
function Ba(e) {
	if (!$a(e)) return e;
	if (e._error) throw e._error;
	return e._data;
}
const pn = function (t, r) {
	r === void 0 && (r = 302);
	let n = r;
	typeof n == "number"
		? (n = { status: n })
		: typeof n.status > "u" && (n.status = 302);
	let a = new Headers(n.headers);
	return a.set("Location", t), new Response(null, Y({}, n, { headers: a }));
};
class Ie {
	constructor(t, r, n, a) {
		a === void 0 && (a = !1),
			(this.status = t),
			(this.statusText = r || ""),
			(this.internal = a),
			n instanceof Error
				? ((this.data = n.toString()), (this.error = n))
				: (this.data = n);
	}
}
function Ve(e) {
	return (
		e != null &&
		typeof e.status == "number" &&
		typeof e.statusText == "string" &&
		typeof e.internal == "boolean" &&
		"data" in e
	);
}
const yn = ["post", "put", "patch", "delete"],
	Ha = new Set(yn),
	za = ["get", ...yn],
	Wa = new Set(za),
	Ja = new Set([301, 302, 303, 307, 308]),
	Ka = new Set([307, 308]),
	Gt = {
		state: "idle",
		location: void 0,
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
	},
	Va = {
		state: "idle",
		data: void 0,
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
	},
	et = {
		state: "unblocked",
		proceed: void 0,
		reset: void 0,
		location: void 0,
	},
	cr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
	Ya = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
	vn = "remix-router-transitions";
function Fl(e) {
	const t = e.window ? e.window : typeof window < "u" ? window : void 0,
		r =
			typeof t < "u" &&
			typeof t.document < "u" &&
			typeof t.document.createElement < "u",
		n = !r;
	k(
		e.routes.length > 0,
		"You must provide a non-empty routes array to createRouter",
	);
	let a;
	if (e.mapRouteProperties) a = e.mapRouteProperties;
	else if (e.detectErrorBoundary) {
		let d = e.detectErrorBoundary;
		a = (m) => ({ hasErrorBoundary: d(m) });
	} else a = Ya;
	let i = {},
		o = ot(e.routes, a, void 0, i),
		s,
		l = e.basename || "/",
		u = e.unstable_dataStrategy || ei,
		h = e.unstable_patchRoutesOnNavigation,
		c = Y(
			{
				v7_fetcherPersist: !1,
				v7_normalizeFormMethod: !1,
				v7_partialHydration: !1,
				v7_prependBasename: !1,
				v7_relativeSplatPath: !1,
				v7_skipActionErrorRevalidation: !1,
			},
			e.future,
		),
		p = null,
		w = new Set(),
		v = 1e3,
		E = new Set(),
		R = null,
		P = null,
		x = null,
		C = e.hydrationData != null,
		S = Ee(o, e.history.location, l),
		j = null;
	if (S == null && !h) {
		let d = oe(404, { pathname: e.history.location.pathname }),
			{ matches: m, route: g } = Qr(o);
		(S = m), (j = { [g.id]: d });
	}
	S &&
		!e.hydrationData &&
		gt(S, o, e.history.location.pathname).active &&
		(S = null);
	let D;
	if (S)
		if (S.some((d) => d.route.lazy)) D = !1;
		else if (!S.some((d) => d.route.loader)) D = !0;
		else if (c.v7_partialHydration) {
			let d = e.hydrationData ? e.hydrationData.loaderData : null,
				m = e.hydrationData ? e.hydrationData.errors : null,
				g = (b) =>
					b.route.loader
						? typeof b.route.loader == "function" &&
							b.route.loader.hydrate === !0
							? !1
							: (d && d[b.route.id] !== void 0) ||
								(m && m[b.route.id] !== void 0)
						: !0;
			if (m) {
				let b = S.findIndex((_) => m[_.route.id] !== void 0);
				D = S.slice(0, b + 1).every(g);
			} else D = S.every(g);
		} else D = e.hydrationData != null;
	else if (((D = !1), (S = []), c.v7_partialHydration)) {
		let d = gt(null, o, e.history.location.pathname);
		d.active && d.matches && (S = d.matches);
	}
	let U,
		y = {
			historyAction: e.history.action,
			location: e.history.location,
			matches: S,
			initialized: D,
			navigation: Gt,
			restoreScrollPosition: e.hydrationData != null ? !1 : null,
			preventScrollReset: !1,
			revalidation: "idle",
			loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
			actionData: (e.hydrationData && e.hydrationData.actionData) || null,
			errors: (e.hydrationData && e.hydrationData.errors) || j,
			fetchers: new Map(),
			blockers: new Map(),
		},
		F = ee.Pop,
		B = !1,
		I,
		W = !1,
		ae = new Map(),
		Q = null,
		ne = !1,
		de = !1,
		dt = [],
		ft = new Set(),
		Z = new Map(),
		ht = 0,
		Ge = -1,
		$e = new Map(),
		pe = new Set(),
		Be = new Map(),
		Qe = new Map(),
		ye = new Set(),
		je = new Map(),
		Ne = new Map(),
		Yn = new Map(),
		mt;
	function Xn() {
		if (
			((p = e.history.listen((d) => {
				let { action: m, location: g, delta: b } = d;
				if (mt) {
					mt(), (mt = void 0);
					return;
				}
				Ke(
					Ne.size === 0 || b != null,
					"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
				);
				let _ = Fr({
					currentLocation: y.location,
					nextLocation: g,
					historyAction: m,
				});
				if (_ && b != null) {
					let M = new Promise((A) => {
						mt = A;
					});
					e.history.go(b * -1),
						yt(_, {
							state: "blocked",
							location: g,
							proceed() {
								yt(_, {
									state: "proceeding",
									proceed: void 0,
									reset: void 0,
									location: g,
								}),
									M.then(() => e.history.go(b));
							},
							reset() {
								let A = new Map(y.blockers);
								A.set(_, et), ie({ blockers: A });
							},
						});
					return;
				}
				return Fe(m, g);
			})),
			r)
		) {
			pi(t, ae);
			let d = () => yi(t, ae);
			t.addEventListener("pagehide", d),
				(Q = () => t.removeEventListener("pagehide", d));
		}
		return (
			y.initialized || Fe(ee.Pop, y.location, { initialHydration: !0 }), U
		);
	}
	function Gn() {
		p && p(),
			Q && Q(),
			w.clear(),
			I && I.abort(),
			y.fetchers.forEach((d, m) => pt(m)),
			y.blockers.forEach((d, m) => Nr(m));
	}
	function Qn(d) {
		return w.add(d), () => w.delete(d);
	}
	function ie(d, m) {
		m === void 0 && (m = {}), (y = Y({}, y, d));
		let g = [],
			b = [];
		c.v7_fetcherPersist &&
			y.fetchers.forEach((_, M) => {
				_.state === "idle" && (ye.has(M) ? b.push(M) : g.push(M));
			}),
			[...w].forEach((_) =>
				_(y, {
					deletedFetchers: b,
					unstable_viewTransitionOpts: m.viewTransitionOpts,
					unstable_flushSync: m.flushSync === !0,
				}),
			),
			c.v7_fetcherPersist &&
				(g.forEach((_) => y.fetchers.delete(_)),
				b.forEach((_) => pt(_)));
	}
	function He(d, m, g) {
		var b, _;
		let { flushSync: M } = g === void 0 ? {} : g,
			A =
				y.actionData != null &&
				y.navigation.formMethod != null &&
				fe(y.navigation.formMethod) &&
				y.navigation.state === "loading" &&
				((b = d.state) == null ? void 0 : b._isRedirect) !== !0,
			L;
		m.actionData
			? Object.keys(m.actionData).length > 0
				? (L = m.actionData)
				: (L = null)
			: A
				? (L = y.actionData)
				: (L = null);
		let N = m.loaderData
				? Xr(y.loaderData, m.loaderData, m.matches || [], m.errors)
				: y.loaderData,
			T = y.blockers;
		T.size > 0 && ((T = new Map(T)), T.forEach((J, V) => T.set(V, et)));
		let O =
			B === !0 ||
			(y.navigation.formMethod != null &&
				fe(y.navigation.formMethod) &&
				((_ = d.state) == null ? void 0 : _._isRedirect) !== !0);
		s && ((o = s), (s = void 0)),
			ne ||
				F === ee.Pop ||
				(F === ee.Push
					? e.history.push(d, d.state)
					: F === ee.Replace && e.history.replace(d, d.state));
		let z;
		if (F === ee.Pop) {
			let J = ae.get(y.location.pathname);
			J && J.has(d.pathname)
				? (z = { currentLocation: y.location, nextLocation: d })
				: ae.has(d.pathname) &&
					(z = { currentLocation: d, nextLocation: y.location });
		} else if (W) {
			let J = ae.get(y.location.pathname);
			J
				? J.add(d.pathname)
				: ((J = new Set([d.pathname])), ae.set(y.location.pathname, J)),
				(z = { currentLocation: y.location, nextLocation: d });
		}
		ie(
			Y({}, m, {
				actionData: L,
				loaderData: N,
				historyAction: F,
				location: d,
				initialized: !0,
				navigation: Gt,
				revalidation: "idle",
				restoreScrollPosition: kr(d, m.matches || y.matches),
				preventScrollReset: O,
				blockers: T,
			}),
			{ viewTransitionOpts: z, flushSync: M === !0 },
		),
			(F = ee.Pop),
			(B = !1),
			(W = !1),
			(ne = !1),
			(de = !1),
			(dt = []);
	}
	async function Dr(d, m) {
		if (typeof d == "number") {
			e.history.go(d);
			return;
		}
		let g = rr(
				y.location,
				y.matches,
				l,
				c.v7_prependBasename,
				d,
				c.v7_relativeSplatPath,
				m == null ? void 0 : m.fromRouteId,
				m == null ? void 0 : m.relative,
			),
			{
				path: b,
				submission: _,
				error: M,
			} = zr(c.v7_normalizeFormMethod, !1, g, m),
			A = y.location,
			L = it(y.location, b, m && m.state);
		L = Y({}, L, e.history.encodeLocation(L));
		let N = m && m.replace != null ? m.replace : void 0,
			T = ee.Push;
		N === !0
			? (T = ee.Replace)
			: N === !1 ||
				(_ != null &&
					fe(_.formMethod) &&
					_.formAction === y.location.pathname + y.location.search &&
					(T = ee.Replace));
		let O =
				m && "preventScrollReset" in m
					? m.preventScrollReset === !0
					: void 0,
			z = (m && m.unstable_flushSync) === !0,
			J = Fr({ currentLocation: A, nextLocation: L, historyAction: T });
		if (J) {
			yt(J, {
				state: "blocked",
				location: L,
				proceed() {
					yt(J, {
						state: "proceeding",
						proceed: void 0,
						reset: void 0,
						location: L,
					}),
						Dr(d, m);
				},
				reset() {
					let V = new Map(y.blockers);
					V.set(J, et), ie({ blockers: V });
				},
			});
			return;
		}
		return await Fe(T, L, {
			submission: _,
			pendingError: M,
			preventScrollReset: O,
			replace: m && m.replace,
			enableViewTransition: m && m.unstable_viewTransition,
			flushSync: z,
		});
	}
	function Zn() {
		if (
			(Kt(),
			ie({ revalidation: "loading" }),
			y.navigation.state !== "submitting")
		) {
			if (y.navigation.state === "idle") {
				Fe(y.historyAction, y.location, {
					startUninterruptedRevalidation: !0,
				});
				return;
			}
			Fe(F || y.historyAction, y.navigation.location, {
				overrideNavigation: y.navigation,
				enableViewTransition: W === !0,
			});
		}
	}
	async function Fe(d, m, g) {
		I && I.abort(),
			(I = null),
			(F = d),
			(ne = (g && g.startUninterruptedRevalidation) === !0),
			sa(y.location, y.matches),
			(B = (g && g.preventScrollReset) === !0),
			(W = (g && g.enableViewTransition) === !0);
		let b = s || o,
			_ = g && g.overrideNavigation,
			M = Ee(b, m, l),
			A = (g && g.flushSync) === !0,
			L = gt(M, b, m.pathname);
		if ((L.active && L.matches && (M = L.matches), !M)) {
			let { error: H, notFoundMatches: re, route: q } = Vt(m.pathname);
			He(
				m,
				{ matches: re, loaderData: {}, errors: { [q.id]: H } },
				{ flushSync: A },
			);
			return;
		}
		if (
			y.initialized &&
			!de &&
			oi(y.location, m) &&
			!(g && g.submission && fe(g.submission.formMethod))
		) {
			He(m, { matches: M }, { flushSync: A });
			return;
		}
		I = new AbortController();
		let N = We(e.history, m, I.signal, g && g.submission),
			T;
		if (g && g.pendingError)
			T = [Je(M).route.id, { type: K.error, error: g.pendingError }];
		else if (g && g.submission && fe(g.submission.formMethod)) {
			let H = await qn(N, m, g.submission, M, L.active, {
				replace: g.replace,
				flushSync: A,
			});
			if (H.shortCircuited) return;
			if (H.pendingActionResult) {
				let [re, q] = H.pendingActionResult;
				if (se(q) && Ve(q.error) && q.error.status === 404) {
					(I = null),
						He(m, {
							matches: H.matches,
							loaderData: {},
							errors: { [re]: q.error },
						});
					return;
				}
			}
			(M = H.matches || M),
				(T = H.pendingActionResult),
				(_ = Qt(m, g.submission)),
				(A = !1),
				(L.active = !1),
				(N = We(e.history, N.url, N.signal));
		}
		let {
			shortCircuited: O,
			matches: z,
			loaderData: J,
			errors: V,
		} = await ea(
			N,
			m,
			M,
			L.active,
			_,
			g && g.submission,
			g && g.fetcherSubmission,
			g && g.replace,
			g && g.initialHydration === !0,
			A,
			T,
		);
		O ||
			((I = null),
			He(m, Y({ matches: z || M }, Gr(T), { loaderData: J, errors: V })));
	}
	async function qn(d, m, g, b, _, M) {
		M === void 0 && (M = {}), Kt();
		let A = hi(m, g);
		if ((ie({ navigation: A }, { flushSync: M.flushSync === !0 }), _)) {
			let T = await wt(b, m.pathname, d.signal);
			if (T.type === "aborted") return { shortCircuited: !0 };
			if (T.type === "error") {
				let { boundaryId: O, error: z } = vt(m.pathname, T);
				return {
					matches: T.partialMatches,
					pendingActionResult: [O, { type: K.error, error: z }],
				};
			} else if (T.matches) b = T.matches;
			else {
				let { notFoundMatches: O, error: z, route: J } = Vt(m.pathname);
				return {
					matches: O,
					pendingActionResult: [J.id, { type: K.error, error: z }],
				};
			}
		}
		let L,
			N = at(b, m);
		if (!N.route.action && !N.route.lazy)
			L = {
				type: K.error,
				error: oe(405, {
					method: d.method,
					pathname: m.pathname,
					routeId: N.route.id,
				}),
			};
		else if (
			((L = (await Ze("action", y, d, [N], b, null))[N.route.id]),
			d.signal.aborted)
		)
			return { shortCircuited: !0 };
		if (ke(L)) {
			let T;
			return (
				M && M.replace != null
					? (T = M.replace)
					: (T =
							Kr(
								L.response.headers.get("Location"),
								new URL(d.url),
								l,
							) ===
							y.location.pathname + y.location.search),
				await Ae(d, L, !0, { submission: g, replace: T }),
				{ shortCircuited: !0 }
			);
		}
		if (Oe(L)) throw oe(400, { type: "defer-action" });
		if (se(L)) {
			let T = Je(b, N.route.id);
			return (
				(M && M.replace) !== !0 && (F = ee.Push),
				{ matches: b, pendingActionResult: [T.route.id, L] }
			);
		}
		return { matches: b, pendingActionResult: [N.route.id, L] };
	}
	async function ea(d, m, g, b, _, M, A, L, N, T, O) {
		let z = _ || Qt(m, M),
			J = M || A || qr(z),
			V = !ne && (!c.v7_partialHydration || !N);
		if (b) {
			if (V) {
				let X = Cr(O);
				ie(
					Y({ navigation: z }, X !== void 0 ? { actionData: X } : {}),
					{ flushSync: T },
				);
			}
			let $ = await wt(g, m.pathname, d.signal);
			if ($.type === "aborted") return { shortCircuited: !0 };
			if ($.type === "error") {
				let { boundaryId: X, error: le } = vt(m.pathname, $);
				return {
					matches: $.partialMatches,
					loaderData: {},
					errors: { [X]: le },
				};
			} else if ($.matches) g = $.matches;
			else {
				let {
					error: X,
					notFoundMatches: le,
					route: G,
				} = Vt(m.pathname);
				return { matches: le, loaderData: {}, errors: { [G.id]: X } };
			}
		}
		let H = s || o,
			[re, q] = Wr(
				e.history,
				y,
				g,
				J,
				m,
				c.v7_partialHydration && N === !0,
				c.v7_skipActionErrorRevalidation,
				de,
				dt,
				ft,
				ye,
				Be,
				pe,
				H,
				l,
				O,
			);
		if (
			(Yt(
				($) =>
					!(g && g.some((X) => X.route.id === $)) ||
					(re && re.some((X) => X.route.id === $)),
			),
			(Ge = ++ht),
			re.length === 0 && q.length === 0)
		) {
			let $ = Mr();
			return (
				He(
					m,
					Y(
						{
							matches: g,
							loaderData: {},
							errors:
								O && se(O[1]) ? { [O[0]]: O[1].error } : null,
						},
						Gr(O),
						$ ? { fetchers: new Map(y.fetchers) } : {},
					),
					{ flushSync: T },
				),
				{ shortCircuited: !0 }
			);
		}
		if (V) {
			let $ = {};
			if (!b) {
				$.navigation = z;
				let X = Cr(O);
				X !== void 0 && ($.actionData = X);
			}
			q.length > 0 && ($.fetchers = ta(q)), ie($, { flushSync: T });
		}
		q.forEach(($) => {
			Z.has($.key) && Ce($.key),
				$.controller && Z.set($.key, $.controller);
		});
		let qe = () => q.forEach(($) => Ce($.key));
		I && I.signal.addEventListener("abort", qe);
		let { loaderResults: ge, fetcherResults: ze } = await _r(
			y,
			g,
			re,
			q,
			d,
		);
		if (d.signal.aborted) return { shortCircuited: !0 };
		I && I.signal.removeEventListener("abort", qe),
			q.forEach(($) => Z.delete($.key));
		let _e = Lt(ge);
		if (_e)
			return (
				await Ae(d, _e.result, !0, { replace: L }),
				{ shortCircuited: !0 }
			);
		if (((_e = Lt(ze)), _e))
			return (
				pe.add(_e.key),
				await Ae(d, _e.result, !0, { replace: L }),
				{ shortCircuited: !0 }
			);
		let { loaderData: bt, errors: we } = Yr(y, g, re, ge, O, q, ze, je);
		je.forEach(($, X) => {
			$.subscribe((le) => {
				(le || $.done) && je.delete(X);
			});
		}),
			c.v7_partialHydration &&
				N &&
				y.errors &&
				Object.entries(y.errors)
					.filter(($) => {
						let [X] = $;
						return !re.some((le) => le.route.id === X);
					})
					.forEach(($) => {
						let [X, le] = $;
						we = Object.assign(we || {}, { [X]: le });
					});
		let Et = Mr(),
			St = jr(Ge),
			Rt = Et || St || q.length > 0;
		return Y(
			{ matches: g, loaderData: bt, errors: we },
			Rt ? { fetchers: new Map(y.fetchers) } : {},
		);
	}
	function Cr(d) {
		if (d && !se(d[1])) return { [d[0]]: d[1].data };
		if (y.actionData)
			return Object.keys(y.actionData).length === 0 ? null : y.actionData;
	}
	function ta(d) {
		return (
			d.forEach((m) => {
				let g = y.fetchers.get(m.key),
					b = tt(void 0, g ? g.data : void 0);
				y.fetchers.set(m.key, b);
			}),
			new Map(y.fetchers)
		);
	}
	function ra(d, m, g, b) {
		if (n)
			throw new Error(
				"router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.",
			);
		Z.has(d) && Ce(d);
		let _ = (b && b.unstable_flushSync) === !0,
			M = s || o,
			A = rr(
				y.location,
				y.matches,
				l,
				c.v7_prependBasename,
				g,
				c.v7_relativeSplatPath,
				m,
				b == null ? void 0 : b.relative,
			),
			L = Ee(M, A, l),
			N = gt(L, M, A);
		if ((N.active && N.matches && (L = N.matches), !L)) {
			ve(d, m, oe(404, { pathname: A }), { flushSync: _ });
			return;
		}
		let {
			path: T,
			submission: O,
			error: z,
		} = zr(c.v7_normalizeFormMethod, !0, A, b);
		if (z) {
			ve(d, m, z, { flushSync: _ });
			return;
		}
		let J = at(L, T);
		if (((B = (b && b.preventScrollReset) === !0), O && fe(O.formMethod))) {
			na(d, m, T, J, L, N.active, _, O);
			return;
		}
		Be.set(d, { routeId: m, path: T }), aa(d, m, T, J, L, N.active, _, O);
	}
	async function na(d, m, g, b, _, M, A, L) {
		Kt(), Be.delete(d);
		function N(G) {
			if (!G.route.action && !G.route.lazy) {
				let be = oe(405, {
					method: L.formMethod,
					pathname: g,
					routeId: m,
				});
				return ve(d, m, be, { flushSync: A }), !0;
			}
			return !1;
		}
		if (!M && N(b)) return;
		let T = y.fetchers.get(d);
		De(d, mi(L, T), { flushSync: A });
		let O = new AbortController(),
			z = We(e.history, g, O.signal, L);
		if (M) {
			let G = await wt(_, g, z.signal);
			if (G.type === "aborted") return;
			if (G.type === "error") {
				let { error: be } = vt(g, G);
				ve(d, m, be, { flushSync: A });
				return;
			} else if (G.matches) {
				if (((_ = G.matches), (b = at(_, g)), N(b))) return;
			} else {
				ve(d, m, oe(404, { pathname: g }), { flushSync: A });
				return;
			}
		}
		Z.set(d, O);
		let J = ht,
			H = (await Ze("action", y, z, [b], _, d))[b.route.id];
		if (z.signal.aborted) {
			Z.get(d) === O && Z.delete(d);
			return;
		}
		if (c.v7_fetcherPersist && ye.has(d)) {
			if (ke(H) || se(H)) {
				De(d, Te(void 0));
				return;
			}
		} else {
			if (ke(H))
				if ((Z.delete(d), Ge > J)) {
					De(d, Te(void 0));
					return;
				} else
					return (
						pe.add(d),
						De(d, tt(L)),
						Ae(z, H, !1, { fetcherSubmission: L })
					);
			if (se(H)) {
				ve(d, m, H.error);
				return;
			}
		}
		if (Oe(H)) throw oe(400, { type: "defer-action" });
		let re = y.navigation.location || y.location,
			q = We(e.history, re, O.signal),
			qe = s || o,
			ge =
				y.navigation.state !== "idle"
					? Ee(qe, y.navigation.location, l)
					: y.matches;
		k(ge, "Didn't find any matches after fetcher action");
		let ze = ++ht;
		$e.set(d, ze);
		let _e = tt(L, H.data);
		y.fetchers.set(d, _e);
		let [bt, we] = Wr(
			e.history,
			y,
			ge,
			L,
			re,
			!1,
			c.v7_skipActionErrorRevalidation,
			de,
			dt,
			ft,
			ye,
			Be,
			pe,
			qe,
			l,
			[b.route.id, H],
		);
		we
			.filter((G) => G.key !== d)
			.forEach((G) => {
				let be = G.key,
					Ur = y.fetchers.get(be),
					da = tt(void 0, Ur ? Ur.data : void 0);
				y.fetchers.set(be, da),
					Z.has(be) && Ce(be),
					G.controller && Z.set(be, G.controller);
			}),
			ie({ fetchers: new Map(y.fetchers) });
		let Et = () => we.forEach((G) => Ce(G.key));
		O.signal.addEventListener("abort", Et);
		let { loaderResults: St, fetcherResults: Rt } = await _r(
			y,
			ge,
			bt,
			we,
			q,
		);
		if (O.signal.aborted) return;
		O.signal.removeEventListener("abort", Et),
			$e.delete(d),
			Z.delete(d),
			we.forEach((G) => Z.delete(G.key));
		let $ = Lt(St);
		if ($) return Ae(q, $.result, !1);
		if ((($ = Lt(Rt)), $)) return pe.add($.key), Ae(q, $.result, !1);
		let { loaderData: X, errors: le } = Yr(
			y,
			ge,
			bt,
			St,
			void 0,
			we,
			Rt,
			je,
		);
		if (y.fetchers.has(d)) {
			let G = Te(H.data);
			y.fetchers.set(d, G);
		}
		jr(ze),
			y.navigation.state === "loading" && ze > Ge
				? (k(F, "Expected pending action"),
					I && I.abort(),
					He(y.navigation.location, {
						matches: ge,
						loaderData: X,
						errors: le,
						fetchers: new Map(y.fetchers),
					}))
				: (ie({
						errors: le,
						loaderData: Xr(y.loaderData, X, ge, le),
						fetchers: new Map(y.fetchers),
					}),
					(de = !1));
	}
	async function aa(d, m, g, b, _, M, A, L) {
		let N = y.fetchers.get(d);
		De(d, tt(L, N ? N.data : void 0), { flushSync: A });
		let T = new AbortController(),
			O = We(e.history, g, T.signal);
		if (M) {
			let H = await wt(_, g, O.signal);
			if (H.type === "aborted") return;
			if (H.type === "error") {
				let { error: re } = vt(g, H);
				ve(d, m, re, { flushSync: A });
				return;
			} else if (H.matches) (_ = H.matches), (b = at(_, g));
			else {
				ve(d, m, oe(404, { pathname: g }), { flushSync: A });
				return;
			}
		}
		Z.set(d, T);
		let z = ht,
			V = (await Ze("loader", y, O, [b], _, d))[b.route.id];
		if (
			(Oe(V) && (V = (await dr(V, O.signal, !0)) || V),
			Z.get(d) === T && Z.delete(d),
			!O.signal.aborted)
		) {
			if (ye.has(d)) {
				De(d, Te(void 0));
				return;
			}
			if (ke(V))
				if (Ge > z) {
					De(d, Te(void 0));
					return;
				} else {
					pe.add(d), await Ae(O, V, !1);
					return;
				}
			if (se(V)) {
				ve(d, m, V.error);
				return;
			}
			k(!Oe(V), "Unhandled fetcher deferred data"), De(d, Te(V.data));
		}
	}
	async function Ae(d, m, g, b) {
		let {
			submission: _,
			fetcherSubmission: M,
			replace: A,
		} = b === void 0 ? {} : b;
		m.response.headers.has("X-Remix-Revalidate") && (de = !0);
		let L = m.response.headers.get("Location");
		k(L, "Expected a Location header on the redirect Response"),
			(L = Kr(L, new URL(d.url), l));
		let N = it(y.location, L, { _isRedirect: !0 });
		if (r) {
			let H = !1;
			if (m.response.headers.has("X-Remix-Reload-Document")) H = !0;
			else if (cr.test(L)) {
				const re = e.history.createURL(L);
				H =
					re.origin !== t.location.origin ||
					ce(re.pathname, l) == null;
			}
			if (H) {
				A ? t.location.replace(L) : t.location.assign(L);
				return;
			}
		}
		I = null;
		let T =
				A === !0 || m.response.headers.has("X-Remix-Replace")
					? ee.Replace
					: ee.Push,
			{ formMethod: O, formAction: z, formEncType: J } = y.navigation;
		!_ && !M && O && z && J && (_ = qr(y.navigation));
		let V = _ || M;
		if (Ka.has(m.response.status) && V && fe(V.formMethod))
			await Fe(T, N, {
				submission: Y({}, V, { formAction: L }),
				preventScrollReset: B,
				enableViewTransition: g ? W : void 0,
			});
		else {
			let H = Qt(N, _);
			await Fe(T, N, {
				overrideNavigation: H,
				fetcherSubmission: M,
				preventScrollReset: B,
				enableViewTransition: g ? W : void 0,
			});
		}
	}
	async function Ze(d, m, g, b, _, M) {
		let A,
			L = {};
		try {
			A = await ti(u, d, m, g, b, _, M, i, a);
		} catch (N) {
			return (
				b.forEach((T) => {
					L[T.route.id] = { type: K.error, error: N };
				}),
				L
			);
		}
		for (let [N, T] of Object.entries(A))
			if (si(T)) {
				let O = T.result;
				L[N] = {
					type: K.redirect,
					response: ai(O, g, N, _, l, c.v7_relativeSplatPath),
				};
			} else L[N] = await ni(T);
		return L;
	}
	async function _r(d, m, g, b, _) {
		let M = d.matches,
			A = Ze("loader", d, _, g, m, null),
			L = Promise.all(
				b.map(async (O) => {
					if (O.matches && O.match && O.controller) {
						let J = (
							await Ze(
								"loader",
								d,
								We(e.history, O.path, O.controller.signal),
								[O.match],
								O.matches,
								O.key,
							)
						)[O.match.route.id];
						return { [O.key]: J };
					} else
						return Promise.resolve({
							[O.key]: {
								type: K.error,
								error: oe(404, { pathname: O.path }),
							},
						});
				}),
			),
			N = await A,
			T = (await L).reduce((O, z) => Object.assign(O, z), {});
		return (
			await Promise.all([
				di(m, N, _.signal, M, d.loaderData),
				fi(m, T, b),
			]),
			{ loaderResults: N, fetcherResults: T }
		);
	}
	function Kt() {
		(de = !0),
			dt.push(...Yt()),
			Be.forEach((d, m) => {
				Z.has(m) && (ft.add(m), Ce(m));
			});
	}
	function De(d, m, g) {
		g === void 0 && (g = {}),
			y.fetchers.set(d, m),
			ie(
				{ fetchers: new Map(y.fetchers) },
				{ flushSync: (g && g.flushSync) === !0 },
			);
	}
	function ve(d, m, g, b) {
		b === void 0 && (b = {});
		let _ = Je(y.matches, m);
		pt(d),
			ie(
				{ errors: { [_.route.id]: g }, fetchers: new Map(y.fetchers) },
				{ flushSync: (b && b.flushSync) === !0 },
			);
	}
	function Tr(d) {
		return (
			c.v7_fetcherPersist &&
				(Qe.set(d, (Qe.get(d) || 0) + 1), ye.has(d) && ye.delete(d)),
			y.fetchers.get(d) || Va
		);
	}
	function pt(d) {
		let m = y.fetchers.get(d);
		Z.has(d) && !(m && m.state === "loading" && $e.has(d)) && Ce(d),
			Be.delete(d),
			$e.delete(d),
			pe.delete(d),
			ye.delete(d),
			ft.delete(d),
			y.fetchers.delete(d);
	}
	function ia(d) {
		if (c.v7_fetcherPersist) {
			let m = (Qe.get(d) || 0) - 1;
			m <= 0 ? (Qe.delete(d), ye.add(d)) : Qe.set(d, m);
		} else pt(d);
		ie({ fetchers: new Map(y.fetchers) });
	}
	function Ce(d) {
		let m = Z.get(d);
		k(m, "Expected fetch controller: " + d), m.abort(), Z.delete(d);
	}
	function Or(d) {
		for (let m of d) {
			let g = Tr(m),
				b = Te(g.data);
			y.fetchers.set(m, b);
		}
	}
	function Mr() {
		let d = [],
			m = !1;
		for (let g of pe) {
			let b = y.fetchers.get(g);
			k(b, "Expected fetcher: " + g),
				b.state === "loading" && (pe.delete(g), d.push(g), (m = !0));
		}
		return Or(d), m;
	}
	function jr(d) {
		let m = [];
		for (let [g, b] of $e)
			if (b < d) {
				let _ = y.fetchers.get(g);
				k(_, "Expected fetcher: " + g),
					_.state === "loading" && (Ce(g), $e.delete(g), m.push(g));
			}
		return Or(m), m.length > 0;
	}
	function oa(d, m) {
		let g = y.blockers.get(d) || et;
		return Ne.get(d) !== m && Ne.set(d, m), g;
	}
	function Nr(d) {
		y.blockers.delete(d), Ne.delete(d);
	}
	function yt(d, m) {
		let g = y.blockers.get(d) || et;
		k(
			(g.state === "unblocked" && m.state === "blocked") ||
				(g.state === "blocked" && m.state === "blocked") ||
				(g.state === "blocked" && m.state === "proceeding") ||
				(g.state === "blocked" && m.state === "unblocked") ||
				(g.state === "proceeding" && m.state === "unblocked"),
			"Invalid blocker state transition: " + g.state + " -> " + m.state,
		);
		let b = new Map(y.blockers);
		b.set(d, m), ie({ blockers: b });
	}
	function Fr(d) {
		let { currentLocation: m, nextLocation: g, historyAction: b } = d;
		if (Ne.size === 0) return;
		Ne.size > 1 && Ke(!1, "A router only supports one blocker at a time");
		let _ = Array.from(Ne.entries()),
			[M, A] = _[_.length - 1],
			L = y.blockers.get(M);
		if (
			!(L && L.state === "proceeding") &&
			A({ currentLocation: m, nextLocation: g, historyAction: b })
		)
			return M;
	}
	function Vt(d) {
		let m = oe(404, { pathname: d }),
			g = s || o,
			{ matches: b, route: _ } = Qr(g);
		return Yt(), { notFoundMatches: b, route: _, error: m };
	}
	function vt(d, m) {
		return {
			boundaryId: Je(m.partialMatches).route.id,
			error: oe(400, {
				type: "route-discovery",
				pathname: d,
				message:
					m.error != null && "message" in m.error
						? m.error
						: String(m.error),
			}),
		};
	}
	function Yt(d) {
		let m = [];
		return (
			je.forEach((g, b) => {
				(!d || d(b)) && (g.cancel(), m.push(b), je.delete(b));
			}),
			m
		);
	}
	function la(d, m, g) {
		if (((R = d), (x = m), (P = g || null), !C && y.navigation === Gt)) {
			C = !0;
			let b = kr(y.location, y.matches);
			b != null && ie({ restoreScrollPosition: b });
		}
		return () => {
			(R = null), (x = null), (P = null);
		};
	}
	function Ar(d, m) {
		return (
			(P &&
				P(
					d,
					m.map((b) => dn(b, y.loaderData)),
				)) ||
			d.key
		);
	}
	function sa(d, m) {
		if (R && x) {
			let g = Ar(d, m);
			R[g] = x();
		}
	}
	function kr(d, m) {
		if (R) {
			let g = Ar(d, m),
				b = R[g];
			if (typeof b == "number") return b;
		}
		return null;
	}
	function gt(d, m, g) {
		if (h) {
			if (E.has(g)) return { active: !1, matches: d };
			if (d) {
				if (Object.keys(d[0].params).length > 0)
					return { active: !0, matches: Ot(m, g, l, !0) };
			} else return { active: !0, matches: Ot(m, g, l, !0) || [] };
		}
		return { active: !1, matches: null };
	}
	async function wt(d, m, g) {
		let b = d;
		for (;;) {
			let _ = s == null,
				M = s || o;
			try {
				await Za(h, m, b, M, i, a, Yn, g);
			} catch (N) {
				return { type: "error", error: N, partialMatches: b };
			} finally {
				_ && (o = [...o]);
			}
			if (g.aborted) return { type: "aborted" };
			let A = Ee(M, m, l);
			if (A) return Ir(m, E), { type: "success", matches: A };
			let L = Ot(M, m, l, !0);
			if (
				!L ||
				(b.length === L.length &&
					b.every((N, T) => N.route.id === L[T].route.id))
			)
				return Ir(m, E), { type: "success", matches: null };
			b = L;
		}
	}
	function Ir(d, m) {
		if (m.size >= v) {
			let g = m.values().next().value;
			m.delete(g);
		}
		m.add(d);
	}
	function ua(d) {
		(i = {}), (s = ot(d, a, void 0, i));
	}
	function ca(d, m) {
		let g = s == null;
		wn(d, m, s || o, i, a), g && ((o = [...o]), ie({}));
	}
	return (
		(U = {
			get basename() {
				return l;
			},
			get future() {
				return c;
			},
			get state() {
				return y;
			},
			get routes() {
				return o;
			},
			get window() {
				return t;
			},
			initialize: Xn,
			subscribe: Qn,
			enableScrollRestoration: la,
			navigate: Dr,
			fetch: ra,
			revalidate: Zn,
			createHref: (d) => e.history.createHref(d),
			encodeLocation: (d) => e.history.encodeLocation(d),
			getFetcher: Tr,
			deleteFetcher: ia,
			dispose: Gn,
			getBlocker: oa,
			deleteBlocker: Nr,
			patchRoutes: ca,
			_internalFetchControllers: Z,
			_internalActiveDeferreds: je,
			_internalSetRoutes: ua,
		}),
		U
	);
}
function Xa(e) {
	return (
		e != null &&
		(("formData" in e && e.formData != null) ||
			("body" in e && e.body !== void 0))
	);
}
function rr(e, t, r, n, a, i, o, s) {
	let l, u;
	if (o) {
		l = [];
		for (let c of t)
			if ((l.push(c), c.route.id === o)) {
				u = c;
				break;
			}
	} else (l = t), (u = t[t.length - 1]);
	let h = ur(
		a || ".",
		sr(l, i),
		ce(e.pathname, r) || e.pathname,
		s === "path",
	);
	return (
		a == null && ((h.search = e.search), (h.hash = e.hash)),
		(a == null || a === "" || a === ".") &&
			u &&
			u.route.index &&
			!fr(h.search) &&
			(h.search = h.search
				? h.search.replace(/^\?/, "?index&")
				: "?index"),
		n &&
			r !== "/" &&
			(h.pathname = h.pathname === "/" ? r : me([r, h.pathname])),
		Me(h)
	);
}
function zr(e, t, r, n) {
	if (!n || !Xa(n)) return { path: r };
	if (n.formMethod && !ci(n.formMethod))
		return { path: r, error: oe(405, { method: n.formMethod }) };
	let a = () => ({ path: r, error: oe(400, { type: "invalid-body" }) }),
		i = n.formMethod || "get",
		o = e ? i.toUpperCase() : i.toLowerCase(),
		s = bn(r);
	if (n.body !== void 0) {
		if (n.formEncType === "text/plain") {
			if (!fe(o)) return a();
			let p =
				typeof n.body == "string"
					? n.body
					: n.body instanceof FormData ||
						  n.body instanceof URLSearchParams
						? Array.from(n.body.entries()).reduce((w, v) => {
								let [E, R] = v;
								return (
									"" +
									w +
									E +
									"=" +
									R +
									`
`
								);
							}, "")
						: String(n.body);
			return {
				path: r,
				submission: {
					formMethod: o,
					formAction: s,
					formEncType: n.formEncType,
					formData: void 0,
					json: void 0,
					text: p,
				},
			};
		} else if (n.formEncType === "application/json") {
			if (!fe(o)) return a();
			try {
				let p = typeof n.body == "string" ? JSON.parse(n.body) : n.body;
				return {
					path: r,
					submission: {
						formMethod: o,
						formAction: s,
						formEncType: n.formEncType,
						formData: void 0,
						json: p,
						text: void 0,
					},
				};
			} catch {
				return a();
			}
		}
	}
	k(
		typeof FormData == "function",
		"FormData is not available in this environment",
	);
	let l, u;
	if (n.formData) (l = nr(n.formData)), (u = n.formData);
	else if (n.body instanceof FormData) (l = nr(n.body)), (u = n.body);
	else if (n.body instanceof URLSearchParams) (l = n.body), (u = Vr(l));
	else if (n.body == null) (l = new URLSearchParams()), (u = new FormData());
	else
		try {
			(l = new URLSearchParams(n.body)), (u = Vr(l));
		} catch {
			return a();
		}
	let h = {
		formMethod: o,
		formAction: s,
		formEncType:
			(n && n.formEncType) || "application/x-www-form-urlencoded",
		formData: u,
		json: void 0,
		text: void 0,
	};
	if (fe(h.formMethod)) return { path: r, submission: h };
	let c = xe(r);
	return (
		t && c.search && fr(c.search) && l.append("index", ""),
		(c.search = "?" + l),
		{ path: Me(c), submission: h }
	);
}
function Ga(e, t) {
	let r = e;
	if (t) {
		let n = e.findIndex((a) => a.route.id === t);
		n >= 0 && (r = e.slice(0, n));
	}
	return r;
}
function Wr(e, t, r, n, a, i, o, s, l, u, h, c, p, w, v, E) {
	let R = E ? (se(E[1]) ? E[1].error : E[1].data) : void 0,
		P = e.createURL(t.location),
		x = e.createURL(a),
		C = E && se(E[1]) ? E[0] : void 0,
		S = C ? Ga(r, C) : r,
		j = E ? E[1].statusCode : void 0,
		D = o && j && j >= 400,
		U = S.filter((F, B) => {
			let { route: I } = F;
			if (I.lazy) return !0;
			if (I.loader == null) return !1;
			if (i)
				return typeof I.loader != "function" || I.loader.hydrate
					? !0
					: t.loaderData[I.id] === void 0 &&
							(!t.errors || t.errors[I.id] === void 0);
			if (
				Qa(t.loaderData, t.matches[B], F) ||
				l.some((Q) => Q === F.route.id)
			)
				return !0;
			let W = t.matches[B],
				ae = F;
			return Jr(
				F,
				Y(
					{
						currentUrl: P,
						currentParams: W.params,
						nextUrl: x,
						nextParams: ae.params,
					},
					n,
					{
						actionResult: R,
						actionStatus: j,
						defaultShouldRevalidate: D
							? !1
							: s ||
								P.pathname + P.search ===
									x.pathname + x.search ||
								P.search !== x.search ||
								gn(W, ae),
					},
				),
			);
		}),
		y = [];
	return (
		c.forEach((F, B) => {
			if (i || !r.some((ne) => ne.route.id === F.routeId) || h.has(B))
				return;
			let I = Ee(w, F.path, v);
			if (!I) {
				y.push({
					key: B,
					routeId: F.routeId,
					path: F.path,
					matches: null,
					match: null,
					controller: null,
				});
				return;
			}
			let W = t.fetchers.get(B),
				ae = at(I, F.path),
				Q = !1;
			p.has(B)
				? (Q = !1)
				: u.has(B)
					? (u.delete(B), (Q = !0))
					: W && W.state !== "idle" && W.data === void 0
						? (Q = s)
						: (Q = Jr(
								ae,
								Y(
									{
										currentUrl: P,
										currentParams:
											t.matches[t.matches.length - 1]
												.params,
										nextUrl: x,
										nextParams: r[r.length - 1].params,
									},
									n,
									{
										actionResult: R,
										actionStatus: j,
										defaultShouldRevalidate: D ? !1 : s,
									},
								),
							)),
				Q &&
					y.push({
						key: B,
						routeId: F.routeId,
						path: F.path,
						matches: I,
						match: ae,
						controller: new AbortController(),
					});
		}),
		[U, y]
	);
}
function Qa(e, t, r) {
	let n = !t || r.route.id !== t.route.id,
		a = e[r.route.id] === void 0;
	return n || a;
}
function gn(e, t) {
	let r = e.route.path;
	return (
		e.pathname !== t.pathname ||
		(r != null && r.endsWith("*") && e.params["*"] !== t.params["*"])
	);
}
function Jr(e, t) {
	if (e.route.shouldRevalidate) {
		let r = e.route.shouldRevalidate(t);
		if (typeof r == "boolean") return r;
	}
	return t.defaultShouldRevalidate;
}
async function Za(e, t, r, n, a, i, o, s) {
	let l = [t, ...r.map((u) => u.route.id)].join("-");
	try {
		let u = o.get(l);
		u ||
			((u = e({
				path: t,
				matches: r,
				patch: (h, c) => {
					s.aborted || wn(h, c, n, a, i);
				},
			})),
			o.set(l, u)),
			u && li(u) && (await u);
	} finally {
		o.delete(l);
	}
}
function wn(e, t, r, n, a) {
	if (e) {
		var i;
		let o = n[e];
		k(o, "No route found to patch children into: routeId = " + e);
		let s = ot(
			t,
			a,
			[
				e,
				"patch",
				String(((i = o.children) == null ? void 0 : i.length) || "0"),
			],
			n,
		);
		o.children ? o.children.push(...s) : (o.children = s);
	} else {
		let o = ot(t, a, ["patch", String(r.length || "0")], n);
		r.push(...o);
	}
}
async function qa(e, t, r) {
	if (!e.lazy) return;
	let n = await e.lazy();
	if (!e.lazy) return;
	let a = r[e.id];
	k(a, "No route found in manifest");
	let i = {};
	for (let o in n) {
		let l = a[o] !== void 0 && o !== "hasErrorBoundary";
		Ke(
			!l,
			'Route "' +
				a.id +
				'" has a static property "' +
				o +
				'" defined but its lazy function is also returning a value for this property. ' +
				('The lazy route property "' + o + '" will be ignored.'),
		),
			!l && !ga.has(o) && (i[o] = n[o]);
	}
	Object.assign(a, i), Object.assign(a, Y({}, t(a), { lazy: void 0 }));
}
async function ei(e) {
	let { matches: t } = e,
		r = t.filter((a) => a.shouldLoad);
	return (await Promise.all(r.map((a) => a.resolve()))).reduce(
		(a, i, o) => Object.assign(a, { [r[o].route.id]: i }),
		{},
	);
}
async function ti(e, t, r, n, a, i, o, s, l, u) {
	let h = i.map((w) => (w.route.lazy ? qa(w.route, l, s) : void 0)),
		c = i.map((w, v) => {
			let E = h[v],
				R = a.some((x) => x.route.id === w.route.id);
			return Y({}, w, {
				shouldLoad: R,
				resolve: async (x) => (
					x &&
						n.method === "GET" &&
						(w.route.lazy || w.route.loader) &&
						(R = !0),
					R
						? ri(t, n, w, E, x, u)
						: Promise.resolve({ type: K.data, result: void 0 })
				),
			});
		}),
		p = await e({
			matches: c,
			request: n,
			params: i[0].params,
			fetcherKey: o,
			context: u,
		});
	try {
		await Promise.all(h);
	} catch {}
	return p;
}
async function ri(e, t, r, n, a, i) {
	let o,
		s,
		l = (u) => {
			let h,
				c = new Promise((v, E) => (h = E));
			(s = () => h()), t.signal.addEventListener("abort", s);
			let p = (v) =>
					typeof u != "function"
						? Promise.reject(
								new Error(
									"You cannot call the handler for a route which defines a boolean " +
										('"' +
											e +
											'" [routeId: ' +
											r.route.id +
											"]"),
								),
							)
						: u(
								{ request: t, params: r.params, context: i },
								...(v !== void 0 ? [v] : []),
							),
				w = (async () => {
					try {
						return {
							type: "data",
							result: await (a ? a((E) => p(E)) : p()),
						};
					} catch (v) {
						return { type: "error", result: v };
					}
				})();
			return Promise.race([w, c]);
		};
	try {
		let u = r.route[e];
		if (n)
			if (u) {
				let h,
					[c] = await Promise.all([
						l(u).catch((p) => {
							h = p;
						}),
						n,
					]);
				if (h !== void 0) throw h;
				o = c;
			} else if ((await n, (u = r.route[e]), u)) o = await l(u);
			else if (e === "action") {
				let h = new URL(t.url),
					c = h.pathname + h.search;
				throw oe(405, {
					method: t.method,
					pathname: c,
					routeId: r.route.id,
				});
			} else return { type: K.data, result: void 0 };
		else if (u) o = await l(u);
		else {
			let h = new URL(t.url),
				c = h.pathname + h.search;
			throw oe(404, { pathname: c });
		}
		k(
			o.result !== void 0,
			"You defined " +
				(e === "action" ? "an action" : "a loader") +
				" for route " +
				('"' +
					r.route.id +
					"\" but didn't return anything from your `" +
					e +
					"` ") +
				"function. Please return a value or `null`.",
		);
	} catch (u) {
		return { type: K.error, result: u };
	} finally {
		s && t.signal.removeEventListener("abort", s);
	}
	return o;
}
async function ni(e) {
	let { result: t, type: r } = e;
	if (En(t)) {
		let u;
		try {
			let h = t.headers.get("Content-Type");
			h && /\bapplication\/json\b/.test(h)
				? t.body == null
					? (u = null)
					: (u = await t.json())
				: (u = await t.text());
		} catch (h) {
			return { type: K.error, error: h };
		}
		return r === K.error
			? {
					type: K.error,
					error: new Ie(t.status, t.statusText, u),
					statusCode: t.status,
					headers: t.headers,
				}
			: {
					type: K.data,
					data: u,
					statusCode: t.status,
					headers: t.headers,
				};
	}
	if (r === K.error) {
		if (Zr(t)) {
			var n;
			if (t.data instanceof Error) {
				var a;
				return {
					type: K.error,
					error: t.data,
					statusCode: (a = t.init) == null ? void 0 : a.status,
				};
			}
			t = new Ie(
				((n = t.init) == null ? void 0 : n.status) || 500,
				void 0,
				t.data,
			);
		}
		return {
			type: K.error,
			error: t,
			statusCode: Ve(t) ? t.status : void 0,
		};
	}
	if (ui(t)) {
		var i, o;
		return {
			type: K.deferred,
			deferredData: t,
			statusCode: (i = t.init) == null ? void 0 : i.status,
			headers:
				((o = t.init) == null ? void 0 : o.headers) &&
				new Headers(t.init.headers),
		};
	}
	if (Zr(t)) {
		var s, l;
		return {
			type: K.data,
			data: t.data,
			statusCode: (s = t.init) == null ? void 0 : s.status,
			headers:
				(l = t.init) != null && l.headers
					? new Headers(t.init.headers)
					: void 0,
		};
	}
	return { type: K.data, data: t };
}
function ai(e, t, r, n, a, i) {
	let o = e.headers.get("Location");
	if (
		(k(
			o,
			"Redirects returned/thrown from loaders/actions must have a Location header",
		),
		!cr.test(o))
	) {
		let s = n.slice(0, n.findIndex((l) => l.route.id === r) + 1);
		(o = rr(new URL(t.url), s, a, !0, o, i)), e.headers.set("Location", o);
	}
	return e;
}
function Kr(e, t, r) {
	if (cr.test(e)) {
		let n = e,
			a = n.startsWith("//") ? new URL(t.protocol + n) : new URL(n),
			i = ce(a.pathname, r) != null;
		if (a.origin === t.origin && i) return a.pathname + a.search + a.hash;
	}
	return e;
}
function We(e, t, r, n) {
	let a = e.createURL(bn(t)).toString(),
		i = { signal: r };
	if (n && fe(n.formMethod)) {
		let { formMethod: o, formEncType: s } = n;
		(i.method = o.toUpperCase()),
			s === "application/json"
				? ((i.headers = new Headers({ "Content-Type": s })),
					(i.body = JSON.stringify(n.json)))
				: s === "text/plain"
					? (i.body = n.text)
					: s === "application/x-www-form-urlencoded" && n.formData
						? (i.body = nr(n.formData))
						: (i.body = n.formData);
	}
	return new Request(a, i);
}
function nr(e) {
	let t = new URLSearchParams();
	for (let [r, n] of e.entries())
		t.append(r, typeof n == "string" ? n : n.name);
	return t;
}
function Vr(e) {
	let t = new FormData();
	for (let [r, n] of e.entries()) t.append(r, n);
	return t;
}
function ii(e, t, r, n, a) {
	let i = {},
		o = null,
		s,
		l = !1,
		u = {},
		h = r && se(r[1]) ? r[1].error : void 0;
	return (
		e.forEach((c) => {
			if (!(c.route.id in t)) return;
			let p = c.route.id,
				w = t[p];
			if (
				(k(
					!ke(w),
					"Cannot handle redirect results in processLoaderData",
				),
				se(w))
			) {
				let v = w.error;
				h !== void 0 && ((v = h), (h = void 0)), (o = o || {});
				{
					let E = Je(e, p);
					o[E.route.id] == null && (o[E.route.id] = v);
				}
				(i[p] = void 0),
					l || ((l = !0), (s = Ve(w.error) ? w.error.status : 500)),
					w.headers && (u[p] = w.headers);
			} else
				Oe(w)
					? (n.set(p, w.deferredData),
						(i[p] = w.deferredData.data),
						w.statusCode != null &&
							w.statusCode !== 200 &&
							!l &&
							(s = w.statusCode),
						w.headers && (u[p] = w.headers))
					: ((i[p] = w.data),
						w.statusCode &&
							w.statusCode !== 200 &&
							!l &&
							(s = w.statusCode),
						w.headers && (u[p] = w.headers));
		}),
		h !== void 0 && r && ((o = { [r[0]]: h }), (i[r[0]] = void 0)),
		{ loaderData: i, errors: o, statusCode: s || 200, loaderHeaders: u }
	);
}
function Yr(e, t, r, n, a, i, o, s) {
	let { loaderData: l, errors: u } = ii(t, n, a, s);
	return (
		i.forEach((h) => {
			let { key: c, match: p, controller: w } = h,
				v = o[c];
			if (
				(k(v, "Did not find corresponding fetcher result"),
				!(w && w.signal.aborted))
			)
				if (se(v)) {
					let E = Je(e.matches, p == null ? void 0 : p.route.id);
					(u && u[E.route.id]) ||
						(u = Y({}, u, { [E.route.id]: v.error })),
						e.fetchers.delete(c);
				} else if (ke(v))
					k(!1, "Unhandled fetcher revalidation redirect");
				else if (Oe(v)) k(!1, "Unhandled fetcher deferred data");
				else {
					let E = Te(v.data);
					e.fetchers.set(c, E);
				}
		}),
		{ loaderData: l, errors: u }
	);
}
function Xr(e, t, r, n) {
	let a = Y({}, t);
	for (let i of r) {
		let o = i.route.id;
		if (
			(t.hasOwnProperty(o)
				? t[o] !== void 0 && (a[o] = t[o])
				: e[o] !== void 0 && i.route.loader && (a[o] = e[o]),
			n && n.hasOwnProperty(o))
		)
			break;
	}
	return a;
}
function Gr(e) {
	return e
		? se(e[1])
			? { actionData: {} }
			: { actionData: { [e[0]]: e[1].data } }
		: {};
}
function Je(e, t) {
	return (
		(t ? e.slice(0, e.findIndex((n) => n.route.id === t) + 1) : [...e])
			.reverse()
			.find((n) => n.route.hasErrorBoundary === !0) || e[0]
	);
}
function Qr(e) {
	let t =
		e.length === 1
			? e[0]
			: e.find((r) => r.index || !r.path || r.path === "/") || {
					id: "__shim-error-route__",
				};
	return {
		matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
		route: t,
	};
}
function oe(e, t) {
	let {
			pathname: r,
			routeId: n,
			method: a,
			type: i,
			message: o,
		} = t === void 0 ? {} : t,
		s = "Unknown Server Error",
		l = "Unknown @remix-run/router error";
	return (
		e === 400
			? ((s = "Bad Request"),
				i === "route-discovery"
					? (l =
							'Unable to match URL "' +
							r +
							'" - the `unstable_patchRoutesOnNavigation()` ' +
							(`function threw the following error:
` +
								o))
					: a && r && n
						? (l =
								"You made a " +
								a +
								' request to "' +
								r +
								'" but ' +
								('did not provide a `loader` for route "' +
									n +
									'", ') +
								"so there is no way to handle the request.")
						: i === "defer-action"
							? (l = "defer() is not supported in actions")
							: i === "invalid-body" &&
								(l = "Unable to encode submission body"))
			: e === 403
				? ((s = "Forbidden"),
					(l = 'Route "' + n + '" does not match URL "' + r + '"'))
				: e === 404
					? ((s = "Not Found"),
						(l = 'No route matches URL "' + r + '"'))
					: e === 405 &&
						((s = "Method Not Allowed"),
						a && r && n
							? (l =
									"You made a " +
									a.toUpperCase() +
									' request to "' +
									r +
									'" but ' +
									('did not provide an `action` for route "' +
										n +
										'", ') +
									"so there is no way to handle the request.")
							: a &&
								(l =
									'Invalid request method "' +
									a.toUpperCase() +
									'"')),
		new Ie(e || 500, s, new Error(l), !0)
	);
}
function Lt(e) {
	let t = Object.entries(e);
	for (let r = t.length - 1; r >= 0; r--) {
		let [n, a] = t[r];
		if (ke(a)) return { key: n, result: a };
	}
}
function bn(e) {
	let t = typeof e == "string" ? xe(e) : e;
	return Me(Y({}, t, { hash: "" }));
}
function oi(e, t) {
	return e.pathname !== t.pathname || e.search !== t.search
		? !1
		: e.hash === ""
			? t.hash !== ""
			: e.hash === t.hash
				? !0
				: t.hash !== "";
}
function li(e) {
	return typeof e == "object" && e != null && "then" in e;
}
function si(e) {
	return En(e.result) && Ja.has(e.result.status);
}
function Oe(e) {
	return e.type === K.deferred;
}
function se(e) {
	return e.type === K.error;
}
function ke(e) {
	return (e && e.type) === K.redirect;
}
function Zr(e) {
	return (
		typeof e == "object" &&
		e != null &&
		"type" in e &&
		"data" in e &&
		"init" in e &&
		e.type === "DataWithResponseInit"
	);
}
function ui(e) {
	let t = e;
	return (
		t &&
		typeof t == "object" &&
		typeof t.data == "object" &&
		typeof t.subscribe == "function" &&
		typeof t.cancel == "function" &&
		typeof t.resolveData == "function"
	);
}
function En(e) {
	return (
		e != null &&
		typeof e.status == "number" &&
		typeof e.statusText == "string" &&
		typeof e.headers == "object" &&
		typeof e.body < "u"
	);
}
function ci(e) {
	return Wa.has(e.toLowerCase());
}
function fe(e) {
	return Ha.has(e.toLowerCase());
}
async function di(e, t, r, n, a) {
	let i = Object.entries(t);
	for (let o = 0; o < i.length; o++) {
		let [s, l] = i[o],
			u = e.find((p) => (p == null ? void 0 : p.route.id) === s);
		if (!u) continue;
		let h = n.find((p) => p.route.id === u.route.id),
			c = h != null && !gn(h, u) && (a && a[u.route.id]) !== void 0;
		Oe(l) &&
			c &&
			(await dr(l, r, !1).then((p) => {
				p && (t[s] = p);
			}));
	}
}
async function fi(e, t, r) {
	for (let n = 0; n < r.length; n++) {
		let { key: a, routeId: i, controller: o } = r[n],
			s = t[a];
		e.find((u) => (u == null ? void 0 : u.route.id) === i) &&
			Oe(s) &&
			(k(
				o,
				"Expected an AbortController for revalidating fetcher deferred result",
			),
			await dr(s, o.signal, !0).then((u) => {
				u && (t[a] = u);
			}));
	}
}
async function dr(e, t, r) {
	if ((r === void 0 && (r = !1), !(await e.deferredData.resolveData(t)))) {
		if (r)
			try {
				return { type: K.data, data: e.deferredData.unwrappedData };
			} catch (a) {
				return { type: K.error, error: a };
			}
		return { type: K.data, data: e.deferredData.data };
	}
}
function fr(e) {
	return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function at(e, t) {
	let r = typeof t == "string" ? xe(t).search : t.search;
	if (e[e.length - 1].route.index && fr(r || "")) return e[e.length - 1];
	let n = mn(e);
	return n[n.length - 1];
}
function qr(e) {
	let {
		formMethod: t,
		formAction: r,
		formEncType: n,
		text: a,
		formData: i,
		json: o,
	} = e;
	if (!(!t || !r || !n)) {
		if (a != null)
			return {
				formMethod: t,
				formAction: r,
				formEncType: n,
				formData: void 0,
				json: void 0,
				text: a,
			};
		if (i != null)
			return {
				formMethod: t,
				formAction: r,
				formEncType: n,
				formData: i,
				json: void 0,
				text: void 0,
			};
		if (o !== void 0)
			return {
				formMethod: t,
				formAction: r,
				formEncType: n,
				formData: void 0,
				json: o,
				text: void 0,
			};
	}
}
function Qt(e, t) {
	return t
		? {
				state: "loading",
				location: e,
				formMethod: t.formMethod,
				formAction: t.formAction,
				formEncType: t.formEncType,
				formData: t.formData,
				json: t.json,
				text: t.text,
			}
		: {
				state: "loading",
				location: e,
				formMethod: void 0,
				formAction: void 0,
				formEncType: void 0,
				formData: void 0,
				json: void 0,
				text: void 0,
			};
}
function hi(e, t) {
	return {
		state: "submitting",
		location: e,
		formMethod: t.formMethod,
		formAction: t.formAction,
		formEncType: t.formEncType,
		formData: t.formData,
		json: t.json,
		text: t.text,
	};
}
function tt(e, t) {
	return e
		? {
				state: "loading",
				formMethod: e.formMethod,
				formAction: e.formAction,
				formEncType: e.formEncType,
				formData: e.formData,
				json: e.json,
				text: e.text,
				data: t,
			}
		: {
				state: "loading",
				formMethod: void 0,
				formAction: void 0,
				formEncType: void 0,
				formData: void 0,
				json: void 0,
				text: void 0,
				data: t,
			};
}
function mi(e, t) {
	return {
		state: "submitting",
		formMethod: e.formMethod,
		formAction: e.formAction,
		formEncType: e.formEncType,
		formData: e.formData,
		json: e.json,
		text: e.text,
		data: t ? t.data : void 0,
	};
}
function Te(e) {
	return {
		state: "idle",
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
		data: e,
	};
}
function pi(e, t) {
	try {
		let r = e.sessionStorage.getItem(vn);
		if (r) {
			let n = JSON.parse(r);
			for (let [a, i] of Object.entries(n || {}))
				i && Array.isArray(i) && t.set(a, new Set(i || []));
		}
	} catch {}
}
function yi(e, t) {
	if (t.size > 0) {
		let r = {};
		for (let [n, a] of t) r[n] = [...a];
		try {
			e.sessionStorage.setItem(vn, JSON.stringify(r));
		} catch (n) {
			Ke(
				!1,
				"Failed to save applied view transitions in sessionStorage (" +
					n +
					").",
			);
		}
	}
}
/**
 * React Router v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kt() {
	return (
		(kt = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		kt.apply(this, arguments)
	);
}
const Ye = f.createContext(null),
	st = f.createContext(null),
	It = f.createContext(null),
	he = f.createContext(null),
	hr = f.createContext(null),
	Le = f.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
	Sn = f.createContext(null);
function mr(e, t) {
	let { relative: r } = t === void 0 ? {} : t;
	ut() || k(!1);
	let { basename: n, navigator: a } = f.useContext(he),
		{ hash: i, pathname: o, search: s } = ct(e, { relative: r }),
		l = o;
	return (
		n !== "/" && (l = o === "/" ? n : me([n, o])),
		a.createHref({ pathname: l, search: s, hash: i })
	);
}
function ut() {
	return f.useContext(hr) != null;
}
function Pe() {
	return ut() || k(!1), f.useContext(hr).location;
}
function Rn(e) {
	f.useContext(he).static || f.useLayoutEffect(e);
}
function vi() {
	let { isDataRoute: e } = f.useContext(Le);
	return e ? Fi() : gi();
}
function gi() {
	ut() || k(!1);
	let e = f.useContext(Ye),
		{ basename: t, future: r, navigator: n } = f.useContext(he),
		{ matches: a } = f.useContext(Le),
		{ pathname: i } = Pe(),
		o = JSON.stringify(sr(a, r.v7_relativeSplatPath)),
		s = f.useRef(!1);
	return (
		Rn(() => {
			s.current = !0;
		}),
		f.useCallback(
			function (u, h) {
				if ((h === void 0 && (h = {}), !s.current)) return;
				if (typeof u == "number") {
					n.go(u);
					return;
				}
				let c = ur(u, JSON.parse(o), i, h.relative === "path");
				e == null &&
					t !== "/" &&
					(c.pathname = c.pathname === "/" ? t : me([t, c.pathname])),
					(h.replace ? n.replace : n.push)(c, h.state, h);
			},
			[t, n, o, i, e],
		)
	);
}
const wi = f.createContext(null);
function bi(e) {
	let t = f.useContext(Le).outlet;
	return t && f.createElement(wi.Provider, { value: e }, t);
}
function ct(e, t) {
	let { relative: r } = t === void 0 ? {} : t,
		{ future: n } = f.useContext(he),
		{ matches: a } = f.useContext(Le),
		{ pathname: i } = Pe(),
		o = JSON.stringify(sr(a, n.v7_relativeSplatPath));
	return f.useMemo(() => ur(e, JSON.parse(o), i, r === "path"), [e, o, i, r]);
}
function Ei(e, t, r, n) {
	ut() || k(!1);
	let { navigator: a } = f.useContext(he),
		{ matches: i } = f.useContext(Le),
		o = i[i.length - 1],
		s = o ? o.params : {};
	o && o.pathname;
	let l = o ? o.pathnameBase : "/";
	o && o.route;
	let u = Pe(),
		h;
	h = u;
	let c = h.pathname || "/",
		p = c;
	if (l !== "/") {
		let E = l.replace(/^\//, "").split("/");
		p = "/" + c.replace(/^\//, "").split("/").slice(E.length).join("/");
	}
	let w = Ee(e, { pathname: p });
	return Pi(
		w &&
			w.map((E) =>
				Object.assign({}, E, {
					params: Object.assign({}, s, E.params),
					pathname: me([
						l,
						a.encodeLocation
							? a.encodeLocation(E.pathname).pathname
							: E.pathname,
					]),
					pathnameBase:
						E.pathnameBase === "/"
							? l
							: me([
									l,
									a.encodeLocation
										? a.encodeLocation(E.pathnameBase)
												.pathname
										: E.pathnameBase,
								]),
				}),
			),
		i,
		r,
		n,
	);
}
function Si() {
	let e = Ln(),
		t = Ve(e)
			? e.status + " " + e.statusText
			: e instanceof Error
				? e.message
				: JSON.stringify(e),
		r = e instanceof Error ? e.stack : null,
		a = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
	return f.createElement(
		f.Fragment,
		null,
		f.createElement("h2", null, "Unexpected Application Error!"),
		f.createElement("h3", { style: { fontStyle: "italic" } }, t),
		r ? f.createElement("pre", { style: a }, r) : null,
		null,
	);
}
const Ri = f.createElement(Si, null);
class xi extends f.Component {
	constructor(t) {
		super(t),
			(this.state = {
				location: t.location,
				revalidation: t.revalidation,
				error: t.error,
			});
	}
	static getDerivedStateFromError(t) {
		return { error: t };
	}
	static getDerivedStateFromProps(t, r) {
		return r.location !== t.location ||
			(r.revalidation !== "idle" && t.revalidation === "idle")
			? {
					error: t.error,
					location: t.location,
					revalidation: t.revalidation,
				}
			: {
					error: t.error !== void 0 ? t.error : r.error,
					location: r.location,
					revalidation: t.revalidation || r.revalidation,
				};
	}
	componentDidCatch(t, r) {
		console.error(
			"React Router caught the following error during render",
			t,
			r,
		);
	}
	render() {
		return this.state.error !== void 0
			? f.createElement(
					Le.Provider,
					{ value: this.props.routeContext },
					f.createElement(Sn.Provider, {
						value: this.state.error,
						children: this.props.component,
					}),
				)
			: this.props.children;
	}
}
function Li(e) {
	let { routeContext: t, match: r, children: n } = e,
		a = f.useContext(Ye);
	return (
		a &&
			a.static &&
			a.staticContext &&
			(r.route.errorElement || r.route.ErrorBoundary) &&
			(a.staticContext._deepestRenderedBoundaryId = r.route.id),
		f.createElement(Le.Provider, { value: t }, n)
	);
}
function Pi(e, t, r, n) {
	var a;
	if (
		(t === void 0 && (t = []),
		r === void 0 && (r = null),
		n === void 0 && (n = null),
		e == null)
	) {
		var i;
		if (!r) return null;
		if (r.errors) e = r.matches;
		else if (
			(i = n) != null &&
			i.v7_partialHydration &&
			t.length === 0 &&
			!r.initialized &&
			r.matches.length > 0
		)
			e = r.matches;
		else return null;
	}
	let o = e,
		s = (a = r) == null ? void 0 : a.errors;
	if (s != null) {
		let h = o.findIndex(
			(c) =>
				c.route.id && (s == null ? void 0 : s[c.route.id]) !== void 0,
		);
		h >= 0 || k(!1), (o = o.slice(0, Math.min(o.length, h + 1)));
	}
	let l = !1,
		u = -1;
	if (r && n && n.v7_partialHydration)
		for (let h = 0; h < o.length; h++) {
			let c = o[h];
			if (
				((c.route.HydrateFallback || c.route.hydrateFallbackElement) &&
					(u = h),
				c.route.id)
			) {
				let { loaderData: p, errors: w } = r,
					v =
						c.route.loader &&
						p[c.route.id] === void 0 &&
						(!w || w[c.route.id] === void 0);
				if (c.route.lazy || v) {
					(l = !0), u >= 0 ? (o = o.slice(0, u + 1)) : (o = [o[0]]);
					break;
				}
			}
		}
	return o.reduceRight((h, c, p) => {
		let w,
			v = !1,
			E = null,
			R = null;
		r &&
			((w = s && c.route.id ? s[c.route.id] : void 0),
			(E = c.route.errorElement || Ri),
			l &&
				(u < 0 && p === 0
					? ((v = !0), (R = null))
					: u === p &&
						((v = !0),
						(R = c.route.hydrateFallbackElement || null))));
		let P = t.concat(o.slice(0, p + 1)),
			x = () => {
				let C;
				return (
					w
						? (C = E)
						: v
							? (C = R)
							: c.route.Component
								? (C = f.createElement(c.route.Component, null))
								: c.route.element
									? (C = c.route.element)
									: (C = h),
					f.createElement(Li, {
						match: c,
						routeContext: {
							outlet: h,
							matches: P,
							isDataRoute: r != null,
						},
						children: C,
					})
				);
			};
		return r && (c.route.ErrorBoundary || c.route.errorElement || p === 0)
			? f.createElement(xi, {
					location: r.location,
					revalidation: r.revalidation,
					component: E,
					error: w,
					children: x(),
					routeContext: { outlet: null, matches: P, isDataRoute: !0 },
				})
			: x();
	}, null);
}
var xn = (function (e) {
		return (
			(e.UseBlocker = "useBlocker"),
			(e.UseRevalidator = "useRevalidator"),
			(e.UseNavigateStable = "useNavigate"),
			e
		);
	})(xn || {}),
	Se = (function (e) {
		return (
			(e.UseBlocker = "useBlocker"),
			(e.UseLoaderData = "useLoaderData"),
			(e.UseActionData = "useActionData"),
			(e.UseRouteError = "useRouteError"),
			(e.UseNavigation = "useNavigation"),
			(e.UseRouteLoaderData = "useRouteLoaderData"),
			(e.UseMatches = "useMatches"),
			(e.UseRevalidator = "useRevalidator"),
			(e.UseNavigateStable = "useNavigate"),
			(e.UseRouteId = "useRouteId"),
			e
		);
	})(Se || {});
function Di(e) {
	let t = f.useContext(Ye);
	return t || k(!1), t;
}
function $t(e) {
	let t = f.useContext(st);
	return t || k(!1), t;
}
function Ci(e) {
	let t = f.useContext(Le);
	return t || k(!1), t;
}
function Bt(e) {
	let t = Ci(),
		r = t.matches[t.matches.length - 1];
	return r.route.id || k(!1), r.route.id;
}
function _i() {
	return Bt(Se.UseRouteId);
}
function Ti() {
	return $t(Se.UseNavigation).navigation;
}
function Oi() {
	let { matches: e, loaderData: t } = $t(Se.UseMatches);
	return f.useMemo(() => e.map((r) => dn(r, t)), [e, t]);
}
function Mi() {
	let e = $t(Se.UseLoaderData),
		t = Bt(Se.UseLoaderData);
	if (e.errors && e.errors[t] != null) {
		console.error(
			"You cannot `useLoaderData` in an errorElement (routeId: " +
				t +
				")",
		);
		return;
	}
	return e.loaderData[t];
}
function Ln() {
	var e;
	let t = f.useContext(Sn),
		r = $t(Se.UseRouteError),
		n = Bt(Se.UseRouteError);
	return t !== void 0 ? t : (e = r.errors) == null ? void 0 : e[n];
}
function ji() {
	let e = f.useContext(It);
	return e == null ? void 0 : e._data;
}
function Ni() {
	let e = f.useContext(It);
	return e == null ? void 0 : e._error;
}
function Fi() {
	let { router: e } = Di(xn.UseNavigateStable),
		t = Bt(Se.UseNavigateStable),
		r = f.useRef(!1);
	return (
		Rn(() => {
			r.current = !0;
		}),
		f.useCallback(
			function (a, i) {
				i === void 0 && (i = {}),
					r.current &&
						(typeof a == "number"
							? e.navigate(a)
							: e.navigate(a, kt({ fromRouteId: t }, i)));
			},
			[e, t],
		)
	);
}
function Al(e) {
	return bi(e.context);
}
function Ai(e) {
	let {
		basename: t = "/",
		children: r = null,
		location: n,
		navigationType: a = ee.Pop,
		navigator: i,
		static: o = !1,
		future: s,
	} = e;
	ut() && k(!1);
	let l = t.replace(/^\/*/, "/"),
		u = f.useMemo(
			() => ({
				basename: l,
				navigator: i,
				static: o,
				future: kt({ v7_relativeSplatPath: !1 }, s),
			}),
			[l, s, i, o],
		);
	typeof n == "string" && (n = xe(n));
	let {
			pathname: h = "/",
			search: c = "",
			hash: p = "",
			state: w = null,
			key: v = "default",
		} = n,
		E = f.useMemo(() => {
			let R = ce(h, l);
			return R == null
				? null
				: {
						location: {
							pathname: R,
							search: c,
							hash: p,
							state: w,
							key: v,
						},
						navigationType: a,
					};
		}, [l, h, c, p, w, v, a]);
	return E == null
		? null
		: f.createElement(
				he.Provider,
				{ value: u },
				f.createElement(hr.Provider, { children: r, value: E }),
			);
}
function ki(e) {
	let { children: t, errorElement: r, resolve: n } = e;
	return f.createElement(
		Ui,
		{ resolve: n, errorElement: r },
		f.createElement($i, null, t),
	);
}
var ue = (function (e) {
	return (
		(e[(e.pending = 0)] = "pending"),
		(e[(e.success = 1)] = "success"),
		(e[(e.error = 2)] = "error"),
		e
	);
})(ue || {});
const Ii = new Promise(() => {});
class Ui extends f.Component {
	constructor(t) {
		super(t), (this.state = { error: null });
	}
	static getDerivedStateFromError(t) {
		return { error: t };
	}
	componentDidCatch(t, r) {
		console.error("<Await> caught the following error during render", t, r);
	}
	render() {
		let { children: t, errorElement: r, resolve: n } = this.props,
			a = null,
			i = ue.pending;
		if (!(n instanceof Promise))
			(i = ue.success),
				(a = Promise.resolve()),
				Object.defineProperty(a, "_tracked", { get: () => !0 }),
				Object.defineProperty(a, "_data", { get: () => n });
		else if (this.state.error) {
			i = ue.error;
			let o = this.state.error;
			(a = Promise.reject().catch(() => {})),
				Object.defineProperty(a, "_tracked", { get: () => !0 }),
				Object.defineProperty(a, "_error", { get: () => o });
		} else
			n._tracked
				? ((a = n),
					(i =
						"_error" in a
							? ue.error
							: "_data" in a
								? ue.success
								: ue.pending))
				: ((i = ue.pending),
					Object.defineProperty(n, "_tracked", { get: () => !0 }),
					(a = n.then(
						(o) =>
							Object.defineProperty(n, "_data", { get: () => o }),
						(o) =>
							Object.defineProperty(n, "_error", {
								get: () => o,
							}),
					)));
		if (i === ue.error && a._error instanceof At) throw Ii;
		if (i === ue.error && !r) throw a._error;
		if (i === ue.error)
			return f.createElement(It.Provider, { value: a, children: r });
		if (i === ue.success)
			return f.createElement(It.Provider, { value: a, children: t });
		throw a;
	}
}
function $i(e) {
	let { children: t } = e,
		r = ji(),
		n = typeof t == "function" ? t(r) : t;
	return f.createElement(f.Fragment, null, n);
}
function kl(e) {
	let t = {
		hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
	};
	return (
		e.Component &&
			Object.assign(t, {
				element: f.createElement(e.Component),
				Component: void 0,
			}),
		e.HydrateFallback &&
			Object.assign(t, {
				hydrateFallbackElement: f.createElement(e.HydrateFallback),
				HydrateFallback: void 0,
			}),
		e.ErrorBoundary &&
			Object.assign(t, {
				errorElement: f.createElement(e.ErrorBoundary),
				ErrorBoundary: void 0,
			}),
		t
	);
}
/**
 * React Router DOM v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ue() {
	return (
		(Ue = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		Ue.apply(this, arguments)
	);
}
function pr(e, t) {
	if (e == null) return {};
	var r = {},
		n = Object.keys(e),
		a,
		i;
	for (i = 0; i < n.length; i++)
		(a = n[i]), !(t.indexOf(a) >= 0) && (r[a] = e[a]);
	return r;
}
const Mt = "get",
	Zt = "application/x-www-form-urlencoded";
function Ht(e) {
	return e != null && typeof e.tagName == "string";
}
function Bi(e) {
	return Ht(e) && e.tagName.toLowerCase() === "button";
}
function Hi(e) {
	return Ht(e) && e.tagName.toLowerCase() === "form";
}
function zi(e) {
	return Ht(e) && e.tagName.toLowerCase() === "input";
}
function Wi(e) {
	return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ji(e, t) {
	return e.button === 0 && (!t || t === "_self") && !Wi(e);
}
let Pt = null;
function Ki() {
	if (Pt === null)
		try {
			new FormData(document.createElement("form"), 0), (Pt = !1);
		} catch {
			Pt = !0;
		}
	return Pt;
}
const Vi = new Set([
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain",
]);
function qt(e) {
	return e != null && !Vi.has(e) ? null : e;
}
function Yi(e, t) {
	let r, n, a, i, o;
	if (Hi(e)) {
		let s = e.getAttribute("action");
		(n = s ? ce(s, t) : null),
			(r = e.getAttribute("method") || Mt),
			(a = qt(e.getAttribute("enctype")) || Zt),
			(i = new FormData(e));
	} else if (
		Bi(e) ||
		(zi(e) && (e.type === "submit" || e.type === "image"))
	) {
		let s = e.form;
		if (s == null)
			throw new Error(
				'Cannot submit a <button> or <input type="submit"> without a <form>',
			);
		let l = e.getAttribute("formaction") || s.getAttribute("action");
		if (
			((n = l ? ce(l, t) : null),
			(r =
				e.getAttribute("formmethod") || s.getAttribute("method") || Mt),
			(a =
				qt(e.getAttribute("formenctype")) ||
				qt(s.getAttribute("enctype")) ||
				Zt),
			(i = new FormData(s, e)),
			!Ki())
		) {
			let { name: u, type: h, value: c } = e;
			if (h === "image") {
				let p = u ? u + "." : "";
				i.append(p + "x", "0"), i.append(p + "y", "0");
			} else u && i.append(u, c);
		}
	} else {
		if (Ht(e))
			throw new Error(
				'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
			);
		(r = Mt), (n = null), (a = Zt), (o = e);
	}
	return (
		i && a === "text/plain" && ((o = i), (i = void 0)),
		{ action: n, method: r.toLowerCase(), encType: a, formData: i, body: o }
	);
}
const Xi = [
		"onClick",
		"relative",
		"reloadDocument",
		"replace",
		"state",
		"target",
		"to",
		"preventScrollReset",
		"unstable_viewTransition",
	],
	Gi = [
		"aria-current",
		"caseSensitive",
		"className",
		"end",
		"style",
		"to",
		"unstable_viewTransition",
		"children",
	],
	Qi = [
		"fetcherKey",
		"navigate",
		"reloadDocument",
		"replace",
		"state",
		"method",
		"action",
		"onSubmit",
		"relative",
		"preventScrollReset",
		"unstable_viewTransition",
	],
	Zi = "6";
try {
	window.__reactRouterVersion = Zi;
} catch {}
const Pn = f.createContext({ isTransitioning: !1 }),
	qi = f.createContext(new Map()),
	eo = "startTransition",
	en = ma[eo],
	to = "flushSync",
	tn = pa[to];
function ro(e) {
	en ? en(e) : e();
}
function rt(e) {
	tn ? tn(e) : e();
}
let no = class {
	constructor() {
		(this.status = "pending"),
			(this.promise = new Promise((t, r) => {
				(this.resolve = (n) => {
					this.status === "pending" &&
						((this.status = "resolved"), t(n));
				}),
					(this.reject = (n) => {
						this.status === "pending" &&
							((this.status = "rejected"), r(n));
					});
			}));
	}
};
function Ul(e) {
	let { fallbackElement: t, router: r, future: n } = e,
		[a, i] = f.useState(r.state),
		[o, s] = f.useState(),
		[l, u] = f.useState({ isTransitioning: !1 }),
		[h, c] = f.useState(),
		[p, w] = f.useState(),
		[v, E] = f.useState(),
		R = f.useRef(new Map()),
		{ v7_startTransition: P } = n || {},
		x = f.useCallback(
			(y) => {
				P ? ro(y) : y();
			},
			[P],
		),
		C = f.useCallback(
			(y, F) => {
				let {
					deletedFetchers: B,
					unstable_flushSync: I,
					unstable_viewTransitionOpts: W,
				} = F;
				B.forEach((Q) => R.current.delete(Q)),
					y.fetchers.forEach((Q, ne) => {
						Q.data !== void 0 && R.current.set(ne, Q.data);
					});
				let ae =
					r.window == null ||
					r.window.document == null ||
					typeof r.window.document.startViewTransition != "function";
				if (!W || ae) {
					I ? rt(() => i(y)) : x(() => i(y));
					return;
				}
				if (I) {
					rt(() => {
						p && (h && h.resolve(), p.skipTransition()),
							u({
								isTransitioning: !0,
								flushSync: !0,
								currentLocation: W.currentLocation,
								nextLocation: W.nextLocation,
							});
					});
					let Q = r.window.document.startViewTransition(() => {
						rt(() => i(y));
					});
					Q.finished.finally(() => {
						rt(() => {
							c(void 0),
								w(void 0),
								s(void 0),
								u({ isTransitioning: !1 });
						});
					}),
						rt(() => w(Q));
					return;
				}
				p
					? (h && h.resolve(),
						p.skipTransition(),
						E({
							state: y,
							currentLocation: W.currentLocation,
							nextLocation: W.nextLocation,
						}))
					: (s(y),
						u({
							isTransitioning: !0,
							flushSync: !1,
							currentLocation: W.currentLocation,
							nextLocation: W.nextLocation,
						}));
			},
			[r.window, p, h, R, x],
		);
	f.useLayoutEffect(() => r.subscribe(C), [r, C]),
		f.useEffect(() => {
			l.isTransitioning && !l.flushSync && c(new no());
		}, [l]),
		f.useEffect(() => {
			if (h && o && r.window) {
				let y = o,
					F = h.promise,
					B = r.window.document.startViewTransition(async () => {
						x(() => i(y)), await F;
					});
				B.finished.finally(() => {
					c(void 0), w(void 0), s(void 0), u({ isTransitioning: !1 });
				}),
					w(B);
			}
		}, [x, o, h, r.window]),
		f.useEffect(() => {
			h && o && a.location.key === o.location.key && h.resolve();
		}, [h, p, a.location, o]),
		f.useEffect(() => {
			!l.isTransitioning &&
				v &&
				(s(v.state),
				u({
					isTransitioning: !0,
					flushSync: !1,
					currentLocation: v.currentLocation,
					nextLocation: v.nextLocation,
				}),
				E(void 0));
		}, [l.isTransitioning, v]),
		f.useEffect(() => {}, []);
	let S = f.useMemo(
			() => ({
				createHref: r.createHref,
				encodeLocation: r.encodeLocation,
				go: (y) => r.navigate(y),
				push: (y, F, B) =>
					r.navigate(y, {
						state: F,
						preventScrollReset:
							B == null ? void 0 : B.preventScrollReset,
					}),
				replace: (y, F, B) =>
					r.navigate(y, {
						replace: !0,
						state: F,
						preventScrollReset:
							B == null ? void 0 : B.preventScrollReset,
					}),
			}),
			[r],
		),
		j = r.basename || "/",
		D = f.useMemo(
			() => ({ router: r, navigator: S, static: !1, basename: j }),
			[r, S, j],
		),
		U = f.useMemo(
			() => ({ v7_relativeSplatPath: r.future.v7_relativeSplatPath }),
			[r.future.v7_relativeSplatPath],
		);
	return f.createElement(
		f.Fragment,
		null,
		f.createElement(
			Ye.Provider,
			{ value: D },
			f.createElement(
				st.Provider,
				{ value: a },
				f.createElement(
					qi.Provider,
					{ value: R.current },
					f.createElement(
						Pn.Provider,
						{ value: l },
						f.createElement(
							Ai,
							{
								basename: j,
								location: a.location,
								navigationType: a.historyAction,
								navigator: S,
								future: U,
							},
							a.initialized || r.future.v7_partialHydration
								? f.createElement(ao, {
										routes: r.routes,
										future: r.future,
										state: a,
									})
								: t,
						),
					),
				),
			),
		),
		null,
	);
}
const ao = f.memo(io);
function io(e) {
	let { routes: t, future: r, state: n } = e;
	return Ei(t, void 0, n, r);
}
const oo =
		typeof window < "u" &&
		typeof window.document < "u" &&
		typeof window.document.createElement < "u",
	lo = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
	Dn = f.forwardRef(function (t, r) {
		let {
				onClick: n,
				relative: a,
				reloadDocument: i,
				replace: o,
				state: s,
				target: l,
				to: u,
				preventScrollReset: h,
				unstable_viewTransition: c,
			} = t,
			p = pr(t, Xi),
			{ basename: w } = f.useContext(he),
			v,
			E = !1;
		if (typeof u == "string" && lo.test(u) && ((v = u), oo))
			try {
				let C = new URL(window.location.href),
					S = u.startsWith("//")
						? new URL(C.protocol + u)
						: new URL(u),
					j = ce(S.pathname, w);
				S.origin === C.origin && j != null
					? (u = j + S.search + S.hash)
					: (E = !0);
			} catch {}
		let R = mr(u, { relative: a }),
			P = fo(u, {
				replace: o,
				state: s,
				target: l,
				preventScrollReset: h,
				relative: a,
				unstable_viewTransition: c,
			});
		function x(C) {
			n && n(C), C.defaultPrevented || P(C);
		}
		return f.createElement(
			"a",
			Ue({}, p, {
				href: v || R,
				onClick: E || i ? n : x,
				ref: r,
				target: l,
			}),
		);
	}),
	so = f.forwardRef(function (t, r) {
		let {
				"aria-current": n = "page",
				caseSensitive: a = !1,
				className: i = "",
				end: o = !1,
				style: s,
				to: l,
				unstable_viewTransition: u,
				children: h,
			} = t,
			c = pr(t, Gi),
			p = ct(l, { relative: c.relative }),
			w = Pe(),
			v = f.useContext(st),
			{ navigator: E, basename: R } = f.useContext(he),
			P = v != null && wo(p) && u === !0,
			x = E.encodeLocation ? E.encodeLocation(p).pathname : p.pathname,
			C = w.pathname,
			S =
				v && v.navigation && v.navigation.location
					? v.navigation.location.pathname
					: null;
		a ||
			((C = C.toLowerCase()),
			(S = S ? S.toLowerCase() : null),
			(x = x.toLowerCase())),
			S && R && (S = ce(S, R) || S);
		const j = x !== "/" && x.endsWith("/") ? x.length - 1 : x.length;
		let D = C === x || (!o && C.startsWith(x) && C.charAt(j) === "/"),
			U =
				S != null &&
				(S === x ||
					(!o && S.startsWith(x) && S.charAt(x.length) === "/")),
			y = { isActive: D, isPending: U, isTransitioning: P },
			F = D ? n : void 0,
			B;
		typeof i == "function"
			? (B = i(y))
			: (B = [
					i,
					D ? "active" : null,
					U ? "pending" : null,
					P ? "transitioning" : null,
				]
					.filter(Boolean)
					.join(" "));
		let I = typeof s == "function" ? s(y) : s;
		return f.createElement(
			Dn,
			Ue({}, c, {
				"aria-current": F,
				className: B,
				ref: r,
				style: I,
				to: l,
				unstable_viewTransition: u,
			}),
			typeof h == "function" ? h(y) : h,
		);
	}),
	uo = f.forwardRef((e, t) => {
		let {
				fetcherKey: r,
				navigate: n,
				reloadDocument: a,
				replace: i,
				state: o,
				method: s = Mt,
				action: l,
				onSubmit: u,
				relative: h,
				preventScrollReset: c,
				unstable_viewTransition: p,
			} = e,
			w = pr(e, Qi),
			v = yo(),
			E = vo(l, { relative: h }),
			R = s.toLowerCase() === "get" ? "get" : "post",
			P = (x) => {
				if ((u && u(x), x.defaultPrevented)) return;
				x.preventDefault();
				let C = x.nativeEvent.submitter,
					S =
						(C == null ? void 0 : C.getAttribute("formmethod")) ||
						s;
				v(C || x.currentTarget, {
					fetcherKey: r,
					method: S,
					navigate: n,
					replace: i,
					state: o,
					relative: h,
					preventScrollReset: c,
					unstable_viewTransition: p,
				});
			};
		return f.createElement(
			"form",
			Ue({ ref: t, method: R, action: E, onSubmit: a ? u : P }, w),
		);
	});
var lt;
(function (e) {
	(e.UseScrollRestoration = "useScrollRestoration"),
		(e.UseSubmit = "useSubmit"),
		(e.UseSubmitFetcher = "useSubmitFetcher"),
		(e.UseFetcher = "useFetcher"),
		(e.useViewTransitionState = "useViewTransitionState");
})(lt || (lt = {}));
var ar;
(function (e) {
	(e.UseFetcher = "useFetcher"),
		(e.UseFetchers = "useFetchers"),
		(e.UseScrollRestoration = "useScrollRestoration");
})(ar || (ar = {}));
function yr(e) {
	let t = f.useContext(Ye);
	return t || k(!1), t;
}
function co(e) {
	let t = f.useContext(st);
	return t || k(!1), t;
}
function fo(e, t) {
	let {
			target: r,
			replace: n,
			state: a,
			preventScrollReset: i,
			relative: o,
			unstable_viewTransition: s,
		} = t === void 0 ? {} : t,
		l = vi(),
		u = Pe(),
		h = ct(e, { relative: o });
	return f.useCallback(
		(c) => {
			if (Ji(c, r)) {
				c.preventDefault();
				let p = n !== void 0 ? n : Me(u) === Me(h);
				l(e, {
					replace: p,
					state: a,
					preventScrollReset: i,
					relative: o,
					unstable_viewTransition: s,
				});
			}
		},
		[u, l, h, n, a, r, e, i, o, s],
	);
}
function ho() {
	if (typeof document > "u")
		throw new Error(
			"You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.",
		);
}
let mo = 0,
	po = () => "__" + String(++mo) + "__";
function yo() {
	let { router: e } = yr(lt.UseSubmit),
		{ basename: t } = f.useContext(he),
		r = _i();
	return f.useCallback(
		function (n, a) {
			a === void 0 && (a = {}), ho();
			let {
				action: i,
				method: o,
				encType: s,
				formData: l,
				body: u,
			} = Yi(n, t);
			if (a.navigate === !1) {
				let h = a.fetcherKey || po();
				e.fetch(h, r, a.action || i, {
					preventScrollReset: a.preventScrollReset,
					formData: l,
					body: u,
					formMethod: a.method || o,
					formEncType: a.encType || s,
					unstable_flushSync: a.unstable_flushSync,
				});
			} else
				e.navigate(a.action || i, {
					preventScrollReset: a.preventScrollReset,
					formData: l,
					body: u,
					formMethod: a.method || o,
					formEncType: a.encType || s,
					replace: a.replace,
					state: a.state,
					fromRouteId: r,
					unstable_flushSync: a.unstable_flushSync,
					unstable_viewTransition: a.unstable_viewTransition,
				});
		},
		[e, t, r],
	);
}
function vo(e, t) {
	let { relative: r } = t === void 0 ? {} : t,
		{ basename: n } = f.useContext(he),
		a = f.useContext(Le);
	a || k(!1);
	let [i] = a.matches.slice(-1),
		o = Ue({}, ct(e || ".", { relative: r })),
		s = Pe();
	if (e == null) {
		o.search = s.search;
		let l = new URLSearchParams(o.search);
		l.has("index") &&
			l.get("index") === "" &&
			(l.delete("index"),
			(o.search = l.toString() ? "?" + l.toString() : ""));
	}
	return (
		(!e || e === ".") &&
			i.route.index &&
			(o.search = o.search
				? o.search.replace(/^\?/, "?index&")
				: "?index"),
		n !== "/" &&
			(o.pathname = o.pathname === "/" ? n : me([n, o.pathname])),
		Me(o)
	);
}
const rn = "react-router-scroll-positions";
let Dt = {};
function $l(e) {
	let { getKey: t, storageKey: r } = e === void 0 ? {} : e,
		{ router: n } = yr(lt.UseScrollRestoration),
		{ restoreScrollPosition: a, preventScrollReset: i } = co(
			ar.UseScrollRestoration,
		),
		{ basename: o } = f.useContext(he),
		s = Pe(),
		l = Oi(),
		u = Ti();
	f.useEffect(
		() => (
			(window.history.scrollRestoration = "manual"),
			() => {
				window.history.scrollRestoration = "auto";
			}
		),
		[],
	),
		go(
			f.useCallback(() => {
				if (u.state === "idle") {
					let h = (t ? t(s, l) : null) || s.key;
					Dt[h] = window.scrollY;
				}
				try {
					sessionStorage.setItem(r || rn, JSON.stringify(Dt));
				} catch {}
				window.history.scrollRestoration = "auto";
			}, [r, t, u.state, s, l]),
		),
		typeof document < "u" &&
			(f.useLayoutEffect(() => {
				try {
					let h = sessionStorage.getItem(r || rn);
					h && (Dt = JSON.parse(h));
				} catch {}
			}, [r]),
			f.useLayoutEffect(() => {
				let h =
						t && o !== "/"
							? (p, w) =>
									t(
										Ue({}, p, {
											pathname:
												ce(p.pathname, o) || p.pathname,
										}),
										w,
									)
							: t,
					c =
						n == null
							? void 0
							: n.enableScrollRestoration(
									Dt,
									() => window.scrollY,
									h,
								);
				return () => c && c();
			}, [n, o, t]),
			f.useLayoutEffect(() => {
				if (a !== !1) {
					if (typeof a == "number") {
						window.scrollTo(0, a);
						return;
					}
					if (s.hash) {
						let h = document.getElementById(
							decodeURIComponent(s.hash.slice(1)),
						);
						if (h) {
							h.scrollIntoView();
							return;
						}
					}
					i !== !0 && window.scrollTo(0, 0);
				}
			}, [s, a, i]));
}
function go(e, t) {
	let { capture: r } = {};
	f.useEffect(() => {
		let n = r != null ? { capture: r } : void 0;
		return (
			window.addEventListener("pagehide", e, n),
			() => {
				window.removeEventListener("pagehide", e, n);
			}
		);
	}, [e, r]);
}
function wo(e, t) {
	t === void 0 && (t = {});
	let r = f.useContext(Pn);
	r == null && k(!1);
	let { basename: n } = yr(lt.useViewTransitionState),
		a = ct(e, { relative: t.relative });
	if (!r.isTransitioning) return !1;
	let i = ce(r.currentLocation.pathname, n) || r.currentLocation.pathname,
		o = ce(r.nextLocation.pathname, n) || r.nextLocation.pathname;
	return Ft(a.pathname, o) != null || Ft(a.pathname, i) != null;
}
var bo = -1,
	Eo = -2,
	So = -3,
	Ro = -4,
	xo = -5,
	Lo = -6,
	Po = -7,
	Do = "B",
	Co = "D",
	Cn = "E",
	_o = "M",
	To = "N",
	_n = "P",
	Oo = "R",
	Mo = "S",
	jo = "Y",
	No = "U",
	Fo = "Z",
	Tn = class {
		constructor() {
			xt(this, "promise");
			xt(this, "resolve");
			xt(this, "reject");
			this.promise = new Promise((e, t) => {
				(this.resolve = e), (this.reject = t);
			});
		}
	};
function Ao() {
	const e = new TextDecoder();
	let t = "";
	return new TransformStream({
		transform(r, n) {
			const a = e.decode(r, { stream: !0 }),
				i = (t + a).split(`
`);
			t = i.pop() || "";
			for (const o of i) n.enqueue(o);
		},
		flush(r) {
			t && r.enqueue(t);
		},
	});
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var er =
	typeof window < "u"
		? window
		: typeof globalThis < "u"
			? globalThis
			: void 0;
function ir(e) {
	const { hydrated: t, values: r } = this;
	if (typeof e == "number") return nn.call(this, e);
	if (!Array.isArray(e) || !e.length) throw new SyntaxError();
	const n = r.length;
	for (const a of e) r.push(a);
	return (t.length = r.length), nn.call(this, n);
}
function nn(e) {
	const { hydrated: t, values: r, deferred: n, plugins: a } = this;
	let i;
	const o = [
		[
			e,
			(l) => {
				i = l;
			},
		],
	];
	let s = [];
	for (; o.length > 0; ) {
		const [l, u] = o.pop();
		switch (l) {
			case Po:
				u(void 0);
				continue;
			case xo:
				u(null);
				continue;
			case Eo:
				u(NaN);
				continue;
			case Lo:
				u(1 / 0);
				continue;
			case So:
				u(-1 / 0);
				continue;
			case Ro:
				u(-0);
				continue;
		}
		if (t[l]) {
			u(t[l]);
			continue;
		}
		const h = r[l];
		if (!h || typeof h != "object") {
			(t[l] = h), u(h);
			continue;
		}
		if (Array.isArray(h))
			if (typeof h[0] == "string") {
				const [c, p, w] = h;
				switch (c) {
					case Co:
						u((t[l] = new Date(p)));
						continue;
					case No:
						u((t[l] = new URL(p)));
						continue;
					case Do:
						u((t[l] = BigInt(p)));
						continue;
					case Oo:
						u((t[l] = new RegExp(p, w)));
						continue;
					case jo:
						u((t[l] = Symbol.for(p)));
						continue;
					case Mo:
						const v = new Set();
						t[l] = v;
						for (let S = 1; S < h.length; S++)
							o.push([
								h[S],
								(j) => {
									v.add(j);
								},
							]);
						u(v);
						continue;
					case _o:
						const E = new Map();
						t[l] = E;
						for (let S = 1; S < h.length; S += 2) {
							const j = [];
							o.push([
								h[S + 1],
								(D) => {
									j[1] = D;
								},
							]),
								o.push([
									h[S],
									(D) => {
										j[0] = D;
									},
								]),
								s.push(() => {
									E.set(j[0], j[1]);
								});
						}
						u(E);
						continue;
					case To:
						const R = Object.create(null);
						t[l] = R;
						for (const S of Object.keys(p).reverse()) {
							const j = [];
							o.push([
								p[S],
								(D) => {
									j[1] = D;
								},
							]),
								o.push([
									Number(S.slice(1)),
									(D) => {
										j[0] = D;
									},
								]),
								s.push(() => {
									R[j[0]] = j[1];
								});
						}
						u(R);
						continue;
					case _n:
						if (t[p]) u((t[l] = t[p]));
						else {
							const S = new Tn();
							(n[p] = S), u((t[l] = S.promise));
						}
						continue;
					case Cn:
						const [, P, x] = h;
						let C = x && er && er[x] ? new er[x](P) : new Error(P);
						(t[l] = C), u(C);
						continue;
					case Fo:
						u((t[l] = t[p]));
						continue;
					default:
						if (Array.isArray(a)) {
							const S = [],
								j = h.slice(1);
							for (let D = 0; D < j.length; D++) {
								const U = j[D];
								o.push([
									U,
									(y) => {
										S[D] = y;
									},
								]);
							}
							s.push(() => {
								for (const D of a) {
									const U = D(h[0], ...S);
									if (U) {
										u((t[l] = U.value));
										return;
									}
								}
								throw new SyntaxError();
							});
							continue;
						}
						throw new SyntaxError();
				}
			} else {
				const c = [];
				t[l] = c;
				for (let p = 0; p < h.length; p++) {
					const w = h[p];
					w !== bo &&
						o.push([
							w,
							(v) => {
								c[p] = v;
							},
						]);
				}
				u(c);
				continue;
			}
		else {
			const c = {};
			t[l] = c;
			for (const p of Object.keys(h).reverse()) {
				const w = [];
				o.push([
					h[p],
					(v) => {
						w[1] = v;
					},
				]),
					o.push([
						Number(p.slice(1)),
						(v) => {
							w[0] = v;
						},
					]),
					s.push(() => {
						c[w[0]] = w[1];
					});
			}
			u(c);
			continue;
		}
	}
	for (; s.length > 0; ) s.pop()();
	return i;
}
async function ko(e, t) {
	const { plugins: r } = t ?? {},
		n = new Tn(),
		a = e.pipeThrough(Ao()).getReader(),
		i = { values: [], hydrated: [], deferred: {}, plugins: r },
		o = await Io.call(i, a);
	let s = n.promise;
	return (
		o.done
			? n.resolve()
			: (s = Uo.call(i, a)
					.then(n.resolve)
					.catch((l) => {
						for (const u of Object.values(i.deferred)) u.reject(l);
						n.reject(l);
					})),
		{ done: s.then(() => a.closed), value: o.value }
	);
}
async function Io(e) {
	const t = await e.read();
	if (!t.value) throw new SyntaxError();
	let r;
	try {
		r = JSON.parse(t.value);
	} catch {
		throw new SyntaxError();
	}
	return { done: t.done, value: ir.call(this, r) };
}
async function Uo(e) {
	let t = await e.read();
	for (; !t.done; ) {
		if (!t.value) continue;
		const r = t.value;
		switch (r[0]) {
			case _n: {
				const n = r.indexOf(":"),
					a = Number(r.slice(1, n)),
					i = this.deferred[a];
				if (!i) throw new Error(`Deferred ID ${a} not found in stream`);
				const o = r.slice(n + 1);
				let s;
				try {
					s = JSON.parse(o);
				} catch {
					throw new SyntaxError();
				}
				const l = ir.call(this, s);
				i.resolve(l);
				break;
			}
			case Cn: {
				const n = r.indexOf(":"),
					a = Number(r.slice(1, n)),
					i = this.deferred[a];
				if (!i) throw new Error(`Deferred ID ${a} not found in stream`);
				const o = r.slice(n + 1);
				let s;
				try {
					s = JSON.parse(o);
				} catch {
					throw new SyntaxError();
				}
				const l = ir.call(this, s);
				i.reject(l);
				break;
			}
			default:
				throw new SyntaxError();
		}
		t = await e.read();
	}
}
/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const On = Symbol("SingleFetchRedirect");
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function te() {
	return (
		(te = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var r = arguments[t];
						for (var n in r)
							Object.prototype.hasOwnProperty.call(r, n) &&
								(e[n] = r[n]);
					}
					return e;
				}),
		te.apply(this, arguments)
	);
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Re(e, t) {
	if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ async function Mn(e, t) {
	if (e.id in t) return t[e.id];
	try {
		let r = await import(e.module);
		return (t[e.id] = r), r;
	} catch (r) {
		return (
			console.error(
				`Error loading route module \`${e.module}\`, reloading page...`,
			),
			console.error(r),
			window.__remixContext.isSpaMode,
			window.location.reload(),
			new Promise(() => {})
		);
	}
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function $o(e, t, r) {
	let n = e
			.map((i) => {
				var o;
				let s = t[i.route.id],
					l = r.routes[i.route.id];
				return [
					l.css
						? l.css.map((u) => ({ rel: "stylesheet", href: u }))
						: [],
					(s == null || (o = s.links) === null || o === void 0
						? void 0
						: o.call(s)) || [],
				];
			})
			.flat(2),
		a = Ko(e, r);
	return Nn(n, a);
}
async function jn(e, t) {
	var r, n;
	if ((!e.css && !t.links) || !Yo()) return;
	let a = [
		((r = e.css) === null || r === void 0
			? void 0
			: r.map((s) => ({ rel: "stylesheet", href: s }))) ?? [],
		((n = t.links) === null || n === void 0 ? void 0 : n.call(t)) ?? [],
	].flat(1);
	if (a.length === 0) return;
	let i = [];
	for (let s of a)
		!vr(s) &&
			s.rel === "stylesheet" &&
			i.push({ ...s, rel: "preload", as: "style" });
	let o = i.filter(
		(s) =>
			(!s.media || window.matchMedia(s.media).matches) &&
			!document.querySelector(`link[rel="stylesheet"][href="${s.href}"]`),
	);
	await Promise.all(o.map(Bo));
}
async function Bo(e) {
	return new Promise((t) => {
		let r = document.createElement("link");
		Object.assign(r, e);
		function n() {
			document.head.contains(r) && document.head.removeChild(r);
		}
		(r.onload = () => {
			n(), t();
		}),
			(r.onerror = () => {
				n(), t();
			}),
			document.head.appendChild(r);
	});
}
function vr(e) {
	return e != null && typeof e.page == "string";
}
function Ho(e) {
	return e == null
		? !1
		: e.href == null
			? e.rel === "preload" &&
				typeof e.imageSrcSet == "string" &&
				typeof e.imageSizes == "string"
			: typeof e.rel == "string" && typeof e.href == "string";
}
async function zo(e, t, r) {
	let n = await Promise.all(
		e.map(async (a) => {
			let i = await Mn(t.routes[a.route.id], r);
			return i.links ? i.links() : [];
		}),
	);
	return Nn(
		n
			.flat(1)
			.filter(Ho)
			.filter((a) => a.rel === "stylesheet" || a.rel === "preload")
			.map((a) =>
				a.rel === "stylesheet"
					? { ...a, rel: "prefetch", as: "style" }
					: { ...a, rel: "prefetch" },
			),
	);
}
function an(e, t, r, n, a, i) {
	let o = Fn(e),
		s = (h, c) => (r[c] ? h.route.id !== r[c].route.id : !0),
		l = (h, c) => {
			var p;
			return (
				r[c].pathname !== h.pathname ||
				(((p = r[c].route.path) === null || p === void 0
					? void 0
					: p.endsWith("*")) &&
					r[c].params["*"] !== h.params["*"])
			);
		};
	return i === "data" && a.search !== o.search
		? t.filter((h, c) => {
				if (!n.routes[h.route.id].hasLoader) return !1;
				if (s(h, c) || l(h, c)) return !0;
				if (h.route.shouldRevalidate) {
					var w;
					let v = h.route.shouldRevalidate({
						currentUrl: new URL(
							a.pathname + a.search + a.hash,
							window.origin,
						),
						currentParams:
							((w = r[0]) === null || w === void 0
								? void 0
								: w.params) || {},
						nextUrl: new URL(e, window.origin),
						nextParams: h.params,
						defaultShouldRevalidate: !0,
					});
					if (typeof v == "boolean") return v;
				}
				return !0;
			})
		: t.filter((h, c) => {
				let p = n.routes[h.route.id];
				return (i === "assets" || p.hasLoader) && (s(h, c) || l(h, c));
			});
}
function Wo(e, t, r) {
	let n = Fn(e);
	return gr(
		t
			.filter(
				(a) =>
					r.routes[a.route.id].hasLoader &&
					!r.routes[a.route.id].hasClientLoader,
			)
			.map((a) => {
				let { pathname: i, search: o } = n,
					s = new URLSearchParams(o);
				return s.set("_data", a.route.id), `${i}?${s}`;
			}),
	);
}
function Jo(e, t) {
	return gr(
		e
			.map((r) => {
				let n = t.routes[r.route.id],
					a = [n.module];
				return n.imports && (a = a.concat(n.imports)), a;
			})
			.flat(1),
	);
}
function Ko(e, t) {
	return gr(
		e
			.map((r) => {
				let n = t.routes[r.route.id],
					a = [n.module];
				return n.imports && (a = a.concat(n.imports)), a;
			})
			.flat(1),
	);
}
function gr(e) {
	return [...new Set(e)];
}
function Vo(e) {
	let t = {},
		r = Object.keys(e).sort();
	for (let n of r) t[n] = e[n];
	return t;
}
function Nn(e, t) {
	let r = new Set(),
		n = new Set(t);
	return e.reduce((a, i) => {
		if (t && !vr(i) && i.as === "script" && i.href && n.has(i.href))
			return a;
		let s = JSON.stringify(Vo(i));
		return r.has(s) || (r.add(s), a.push({ key: s, link: i })), a;
	}, []);
}
function Fn(e) {
	let t = xe(e);
	return t.search === void 0 && (t.search = ""), t;
}
let Ct;
function Yo() {
	if (Ct !== void 0) return Ct;
	let e = document.createElement("link");
	return (Ct = e.relList.supports("preload")), (e = null), Ct;
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const Xo = {
		"&": "\\u0026",
		">": "\\u003e",
		"<": "\\u003c",
		"\u2028": "\\u2028",
		"\u2029": "\\u2029",
	},
	Go = /[&><\u2028\u2029]/g;
function _t(e) {
	return e.replace(Go, (t) => Xo[t]);
}
function on(e) {
	return { __html: e };
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Qo(e) {
	return e.headers.get("X-Remix-Catch") != null;
}
function Zo(e) {
	return e.headers.get("X-Remix-Error") != null;
}
function qo(e) {
	return (
		wr(e) &&
		e.status >= 400 &&
		e.headers.get("X-Remix-Error") == null &&
		e.headers.get("X-Remix-Catch") == null &&
		e.headers.get("X-Remix-Response") == null
	);
}
function el(e) {
	return e.headers.get("X-Remix-Redirect") != null;
}
function tl(e) {
	var t;
	return !!(
		(t = e.headers.get("Content-Type")) !== null &&
		t !== void 0 &&
		t.match(/text\/remix-deferred/)
	);
}
function wr(e) {
	return (
		e != null &&
		typeof e.status == "number" &&
		typeof e.statusText == "string" &&
		typeof e.headers == "object" &&
		typeof e.body < "u"
	);
}
function rl(e) {
	let t = e;
	return (
		t &&
		typeof t == "object" &&
		typeof t.data == "object" &&
		typeof t.subscribe == "function" &&
		typeof t.cancel == "function" &&
		typeof t.resolveData == "function"
	);
}
async function An(e, t, r = 0) {
	let n = new URL(e.url);
	n.searchParams.set("_data", t),
		r > 0 && (await new Promise((s) => setTimeout(s, 5 ** r * 10)));
	let a = await zt(e),
		i = window.__remixRevalidation,
		o = await fetch(n.href, a).catch((s) => {
			if (
				typeof i == "number" &&
				i === window.__remixRevalidation &&
				(s == null ? void 0 : s.name) === "TypeError" &&
				r < 3
			)
				return An(e, t, r + 1);
			throw s;
		});
	if (Zo(o)) {
		let s = await o.json(),
			l = new Error(s.message);
		return (l.stack = s.stack), l;
	}
	if (qo(o)) {
		let s = await o.text(),
			l = new Error(s);
		return (l.stack = void 0), l;
	}
	return o;
}
async function zt(e) {
	let t = { signal: e.signal };
	if (e.method !== "GET") {
		t.method = e.method;
		let r = e.headers.get("Content-Type");
		r && /\bapplication\/json\b/.test(r)
			? ((t.headers = { "Content-Type": r }),
				(t.body = JSON.stringify(await e.json())))
			: r && /\btext\/plain\b/.test(r)
				? ((t.headers = { "Content-Type": r }),
					(t.body = await e.text()))
				: r && /\bapplication\/x-www-form-urlencoded\b/.test(r)
					? (t.body = new URLSearchParams(await e.text()))
					: (t.body = await e.formData());
	}
	return t;
}
const nl = "__deferred_promise:";
async function al(e) {
	if (!e)
		throw new Error("parseDeferredReadableStream requires stream argument");
	let t,
		r = {};
	try {
		let n = il(e),
			i = (await n.next()).value;
		if (!i) throw new Error("no critical data");
		let o = JSON.parse(i);
		if (typeof o == "object" && o !== null)
			for (let [s, l] of Object.entries(o))
				typeof l != "string" ||
					!l.startsWith(nl) ||
					((t = t || {}),
					(t[s] = new Promise((u, h) => {
						r[s] = {
							resolve: (c) => {
								u(c), delete r[s];
							},
							reject: (c) => {
								h(c), delete r[s];
							},
						};
					})));
		return (
			(async () => {
				try {
					for await (let s of n) {
						let [l, ...u] = s.split(":"),
							h = u.join(":"),
							c = JSON.parse(h);
						if (l === "data")
							for (let [p, w] of Object.entries(c))
								r[p] && r[p].resolve(w);
						else if (l === "error")
							for (let [p, w] of Object.entries(c)) {
								let v = new Error(w.message);
								(v.stack = w.stack), r[p] && r[p].reject(v);
							}
					}
					for (let [s, l] of Object.entries(r))
						l.reject(
							new At(`Deferred ${s} will never be resolved`),
						);
				} catch (s) {
					for (let l of Object.values(r)) l.reject(s);
				}
			})(),
			new Ua({ ...o, ...t })
		);
	} catch (n) {
		for (let a of Object.values(r)) a.reject(n);
		throw n;
	}
}
async function* il(e) {
	let t = e.getReader(),
		r = [],
		n = [],
		a = !1,
		i = new TextEncoder(),
		o = new TextDecoder(),
		s = async () => {
			if (n.length > 0) return n.shift();
			for (; !a && n.length === 0; ) {
				let u = await t.read();
				if (u.done) {
					a = !0;
					break;
				}
				r.push(u.value);
				try {
					let c = o.decode(ln(...r)).split(`

`);
					if (
						(c.length >= 2 &&
							(n.push(...c.slice(0, -1)),
							(r = [
								i.encode(
									c.slice(-1).join(`

`),
								),
							])),
						n.length > 0)
					)
						break;
				} catch {
					continue;
				}
			}
			return (
				n.length > 0 ||
					(r.length > 0 &&
						((n = o
							.decode(ln(...r))
							.split(
								`

`,
							)
							.filter((h) => h)),
						(r = []))),
				n.shift()
			);
		},
		l = await s();
	for (; l; ) yield l, (l = await s());
}
function ln(...e) {
	let t = new Uint8Array(e.reduce((n, a) => n + a.length, 0)),
		r = 0;
	for (let n of e) t.set(n, r), (r += n.length);
	return t;
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Bl(e, t, r) {
	return async ({ request: n, matches: a, fetcherKey: i }) =>
		n.method !== "GET" ? ol(n, a) : i ? sl(n, a) : ll(e, t, r(), n, a);
}
async function ol(e, t) {
	let r = t.find((i) => i.shouldLoad);
	Re(r, "No action match found");
	let n,
		a = await r.resolve(
			async (i) =>
				await i(async () => {
					let s = Wt(e.url),
						l = await zt(e),
						{ data: u, status: h } = await br(s, l);
					return (n = h), or(u, r.route.id);
				}),
		);
	return wr(a.result) || Ve(a.result)
		? { [r.route.id]: a }
		: { [r.route.id]: { type: a.type, result: Ia(a.result, n) } };
}
async function ll(e, t, r, n, a) {
	let i = new Set(),
		o = !1,
		s = a.map(() => sn()),
		l = Promise.all(s.map((v) => v.promise)),
		u = sn(),
		h = In(Wt(n.url)),
		c = await zt(n),
		p = {},
		w = Promise.all(
			a.map(async (v, E) =>
				v.resolve(async (R) => {
					if ((s[E].resolve(), !v.shouldLoad)) {
						var P;
						if (!r.state.initialized) return;
						if (
							v.route.id in r.state.loaderData &&
							e.routes[v.route.id].hasLoader &&
							(P = t[v.route.id]) !== null &&
							P !== void 0 &&
							P.shouldRevalidate
						) {
							o = !0;
							return;
						}
					}
					if (e.routes[v.route.id].hasClientLoader) {
						e.routes[v.route.id].hasLoader && (o = !0);
						try {
							let x = await kn(R, h, c, v.route.id);
							p[v.route.id] = { type: "data", result: x };
						} catch (x) {
							p[v.route.id] = { type: "error", result: x };
						}
						return;
					}
					e.routes[v.route.id].hasLoader && i.add(v.route.id);
					try {
						let x = await R(async () => {
							let C = await u.promise;
							return Un(C, v.route.id);
						});
						p[v.route.id] = { type: "data", result: x };
					} catch (x) {
						p[v.route.id] = { type: "error", result: x };
					}
				}),
			),
		);
	if (
		(await l,
		(!r.state.initialized || i.size === 0) && !window.__remixHdrActive)
	)
		u.resolve({});
	else
		try {
			o &&
				i.size > 0 &&
				h.searchParams.set(
					"_routes",
					a
						.filter((E) => i.has(E.route.id))
						.map((E) => E.route.id)
						.join(","),
				);
			let v = await br(h, c);
			u.resolve(v.data);
		} catch (v) {
			u.reject(v);
		}
	return await w, p;
}
async function sl(e, t) {
	let r = t.find((a) => a.shouldLoad);
	Re(r, "No fetcher match found");
	let n = await r.resolve(async (a) => {
		let i = In(Wt(e.url)),
			o = await zt(e);
		return kn(a, i, o, r.route.id);
	});
	return { [r.route.id]: n };
}
function kn(e, t, r, n) {
	return e(async () => {
		let a = new URL(t);
		a.searchParams.set("_routes", n);
		let { data: i } = await br(a, r);
		return Un(i, n);
	});
}
function In(e) {
	let t = e.searchParams.getAll("index");
	e.searchParams.delete("index");
	let r = [];
	for (let n of t) n && r.push(n);
	for (let n of r) e.searchParams.append("index", n);
	return e;
}
function Wt(e) {
	let t = typeof e == "string" ? new URL(e, window.location.origin) : e;
	return (
		t.pathname === "/"
			? (t.pathname = "_root.data")
			: (t.pathname = `${t.pathname.replace(/\/$/, "")}.data`),
		t
	);
}
async function br(e, t) {
	let r = await fetch(e, t);
	Re(r.body, "No response body to decode");
	try {
		let n = await ul(r.body, window);
		return { status: r.status, data: n.value };
	} catch (n) {
		throw (
			(console.error(n),
			new Error(
				`Unable to decode turbo-stream response from URL: ${e.toString()}`,
			))
		);
	}
}
function ul(e, t) {
	return ko(e, {
		plugins: [
			(r, ...n) => {
				if (r === "SanitizedError") {
					let [a, i, o] = n,
						s = Error;
					a && a in t && typeof t[a] == "function" && (s = t[a]);
					let l = new s(i);
					return (l.stack = o), { value: l };
				}
				if (r === "ErrorResponse") {
					let [a, i, o] = n;
					return { value: new Ie(i, o, a) };
				}
				if (r === "SingleFetchRedirect")
					return { value: { [On]: n[0] } };
			},
			(r, n) => {
				if (r === "SingleFetchFallback") return { value: void 0 };
				if (r === "SingleFetchClassInstance") return { value: n };
			},
		],
	});
}
function Un(e, t) {
	let r = e[On];
	return r ? or(r, t) : e[t] !== void 0 ? or(e[t], t) : null;
}
function or(e, t) {
	if ("error" in e) throw e.error;
	if ("redirect" in e) {
		let r = {};
		return (
			e.revalidate && (r["X-Remix-Revalidate"] = "yes"),
			e.reload && (r["X-Remix-Reload-Document"] = "yes"),
			e.replace && (r["X-Remix-Replace"] = "yes"),
			pn(e.redirect, { status: e.status, headers: r })
		);
	} else {
		if ("data" in e) return e.data;
		throw new Error(`No response found for routeId "${t}"`);
	}
}
function sn() {
	let e,
		t,
		r = new Promise((n, a) => {
			(e = async (i) => {
				n(i);
				try {
					await r;
				} catch {}
			}),
				(t = async (i) => {
					a(i);
					try {
						await r;
					} catch {}
				});
		});
	return { promise: r, resolve: e, reject: t };
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ class Hl extends f.Component {
	constructor(t) {
		super(t),
			(this.state = { error: t.error || null, location: t.location });
	}
	static getDerivedStateFromError(t) {
		return { error: t };
	}
	static getDerivedStateFromProps(t, r) {
		return r.location !== t.location
			? { error: t.error || null, location: t.location }
			: { error: t.error || r.error, location: r.location };
	}
	render() {
		return this.state.error
			? f.createElement($n, {
					error: this.state.error,
					isOutsideRemixApp: !0,
				})
			: this.props.children;
	}
}
function $n({ error: e, isOutsideRemixApp: t }) {
	console.error(e);
	let r = f.createElement("script", {
		dangerouslySetInnerHTML: {
			__html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `,
		},
	});
	if (Ve(e))
		return f.createElement(
			lr,
			{ title: "Unhandled Thrown Response!" },
			f.createElement(
				"h1",
				{ style: { fontSize: "24px" } },
				e.status,
				" ",
				e.statusText,
			),
			r,
		);
	let n;
	if (e instanceof Error) n = e;
	else {
		let a =
			e == null
				? "Unknown Error"
				: typeof e == "object" && "toString" in e
					? e.toString()
					: JSON.stringify(e);
		n = new Error(a);
	}
	return f.createElement(
		lr,
		{ title: "Application Error!", isOutsideRemixApp: t },
		f.createElement(
			"h1",
			{ style: { fontSize: "24px" } },
			"Application Error",
		),
		f.createElement(
			"pre",
			{
				style: {
					padding: "2rem",
					background: "hsla(10, 50%, 50%, 0.1)",
					color: "red",
					overflow: "auto",
				},
			},
			n.stack,
		),
		r,
	);
}
function lr({ title: e, renderScripts: t, isOutsideRemixApp: r, children: n }) {
	var a;
	let { routeModules: i } = Xe();
	return (a = i.root) !== null && a !== void 0 && a.Layout && !r
		? n
		: f.createElement(
				"html",
				{ lang: "en" },
				f.createElement(
					"head",
					null,
					f.createElement("meta", { charSet: "utf-8" }),
					f.createElement("meta", {
						name: "viewport",
						content:
							"width=device-width,initial-scale=1,viewport-fit=cover",
					}),
					f.createElement("title", null, e),
				),
				f.createElement(
					"body",
					null,
					f.createElement(
						"main",
						{
							style: {
								fontFamily: "system-ui, sans-serif",
								padding: "2rem",
							},
						},
						n,
						t ? f.createElement(_l, null) : null,
					),
				),
			);
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function cl() {
	return f.createElement(
		lr,
		{ title: "Loading...", renderScripts: !0 },
		f.createElement("script", {
			dangerouslySetInnerHTML: {
				__html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `,
			},
		}),
	);
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Bn(e) {
	let t = {};
	return (
		Object.values(e).forEach((r) => {
			let n = r.parentId || "";
			t[n] || (t[n] = []), t[n].push(r);
		}),
		t
	);
}
function dl(e, t, r) {
	let n = Hn(t),
		a =
			t.HydrateFallback && (!r || e.id === "root")
				? t.HydrateFallback
				: e.id === "root"
					? cl
					: void 0,
		i = t.ErrorBoundary
			? t.ErrorBoundary
			: e.id === "root"
				? () => f.createElement($n, { error: Ln() })
				: void 0;
	return e.id === "root" && t.Layout
		? {
				...(n
					? {
							element: f.createElement(
								t.Layout,
								null,
								f.createElement(n, null),
							),
						}
					: { Component: n }),
				...(i
					? {
							errorElement: f.createElement(
								t.Layout,
								null,
								f.createElement(i, null),
							),
						}
					: { ErrorBoundary: i }),
				...(a
					? {
							hydrateFallbackElement: f.createElement(
								t.Layout,
								null,
								f.createElement(a, null),
							),
						}
					: { HydrateFallback: a }),
			}
		: { Component: n, ErrorBoundary: i, HydrateFallback: a };
}
function zl(e, t, r, n, a, i) {
	return Er(t, r, n, a, i, "", Bn(t), e);
}
function Tt(e, t, r) {
	if (r) {
		let o = `You cannot call ${e === "action" ? "serverAction()" : "serverLoader()"} in SPA Mode (routeId: "${t.id}")`;
		throw (console.error(o), new Ie(400, "Bad Request", new Error(o), !0));
	}
	let a = `You are trying to call ${e === "action" ? "serverAction()" : "serverLoader()"} on a route that does not have a server ${e} (routeId: "${t.id}")`;
	if ((e === "loader" && !t.hasLoader) || (e === "action" && !t.hasAction))
		throw (console.error(a), new Ie(400, "Bad Request", new Error(a), !0));
}
function tr(e, t) {
	let r = e === "clientAction" ? "a" : "an",
		n = `Route "${t}" does not have ${r} ${e}, but you are trying to submit to it. To fix this, please add ${r} \`${e}\` function to the route`;
	throw (
		(console.error(n), new Ie(405, "Method Not Allowed", new Error(n), !0))
	);
}
function Er(e, t, r, n, a, i = "", o = Bn(e), s) {
	return (o[i] || []).map((l) => {
		let u = t[l.id];
		async function h(C, S, j) {
			if (typeof j == "function") return await j();
			let D = await hl(C, l);
			return S ? ml(D) : D;
		}
		function c(C, S, j) {
			return l.hasLoader ? h(C, S, j) : Promise.resolve(null);
		}
		function p(C, S, j) {
			if (!l.hasAction) throw tr("action", l.id);
			return h(C, S, j);
		}
		async function w(C) {
			let S = t[l.id],
				j = S ? jn(l, S) : Promise.resolve();
			try {
				return C();
			} finally {
				await j;
			}
		}
		let v = { id: l.id, index: l.index, path: l.path };
		if (u) {
			var E, R, P;
			Object.assign(v, {
				...v,
				...dl(l, u, a),
				handle: u.handle,
				shouldRevalidate: s
					? un(l.id, u.shouldRevalidate, s)
					: u.shouldRevalidate,
			});
			let C =
					r == null || (E = r.loaderData) === null || E === void 0
						? void 0
						: E[l.id],
				S =
					r == null || (R = r.errors) === null || R === void 0
						? void 0
						: R[l.id],
				j =
					s == null &&
					(((P = u.clientLoader) === null || P === void 0
						? void 0
						: P.hydrate) === !0 ||
						!l.hasLoader);
			(v.loader = async ({ request: D, params: U }, y) => {
				try {
					return await w(
						async () => (
							Re(
								u,
								"No `routeModule` available for critical-route loader",
							),
							u.clientLoader
								? u.clientLoader({
										request: D,
										params: U,
										async serverLoader() {
											if ((Tt("loader", l, a), j)) {
												if (S !== void 0) throw S;
												return C;
											}
											return c(D, !0, y);
										},
									})
								: a
									? null
									: c(D, !1, y)
						),
					);
				} finally {
					j = !1;
				}
			}),
				(v.loader.hydrate = yl(l, u, a)),
				(v.action = ({ request: D, params: U }, y) =>
					w(async () => {
						if (
							(Re(
								u,
								"No `routeModule` available for critical-route action",
							),
							!u.clientAction)
						) {
							if (a) throw tr("clientAction", l.id);
							return p(D, !1, y);
						}
						return u.clientAction({
							request: D,
							params: U,
							async serverAction() {
								return Tt("action", l, a), p(D, !0, y);
							},
						});
					}));
		} else
			l.hasClientLoader ||
				(v.loader = ({ request: C }, S) =>
					w(() => (a ? Promise.resolve(null) : c(C, !1, S)))),
				l.hasClientAction ||
					(v.action = ({ request: C }, S) =>
						w(() => {
							if (a) throw tr("clientAction", l.id);
							return p(C, !1, S);
						})),
				(v.lazy = async () => {
					let C = await fl(l, t),
						S = { ...C };
					if (C.clientLoader) {
						let j = C.clientLoader;
						S.loader = (D, U) =>
							j({
								...D,
								async serverLoader() {
									return (
										Tt("loader", l, a), c(D.request, !0, U)
									);
								},
							});
					}
					if (C.clientAction) {
						let j = C.clientAction;
						S.action = (D, U) =>
							j({
								...D,
								async serverAction() {
									return (
										Tt("action", l, a), p(D.request, !0, U)
									);
								},
							});
					}
					return (
						s &&
							(S.shouldRevalidate = un(
								l.id,
								C.shouldRevalidate,
								s,
							)),
						{
							...(S.loader ? { loader: S.loader } : {}),
							...(S.action ? { action: S.action } : {}),
							hasErrorBoundary: S.hasErrorBoundary,
							shouldRevalidate: S.shouldRevalidate,
							handle: S.handle,
							Component: S.Component,
							ErrorBoundary: S.ErrorBoundary,
						}
					);
				});
		let x = Er(e, t, r, n, a, l.id, o, s);
		return x.length > 0 && (v.children = x), v;
	});
}
function un(e, t, r) {
	let n = !1;
	return (a) =>
		n ? (t ? t(a) : a.defaultShouldRevalidate) : ((n = !0), r.has(e));
}
async function fl(e, t) {
	let r = await Mn(e, t);
	return (
		await jn(e, r),
		{
			Component: Hn(r),
			ErrorBoundary: r.ErrorBoundary,
			clientAction: r.clientAction,
			clientLoader: r.clientLoader,
			handle: r.handle,
			links: r.links,
			meta: r.meta,
			shouldRevalidate: r.shouldRevalidate,
		}
	);
}
async function hl(e, t) {
	let r = await An(e, t.id);
	if (r instanceof Error) throw r;
	if (el(r)) throw pl(r);
	if (Qo(r)) throw r;
	return tl(r) && r.body ? await al(r.body) : r;
}
function ml(e) {
	if (rl(e)) return e.data;
	if (wr(e)) {
		let t = e.headers.get("Content-Type");
		return t && /\bapplication\/json\b/.test(t) ? e.json() : e.text();
	}
	return e;
}
function pl(e) {
	let t = parseInt(e.headers.get("X-Remix-Status"), 10) || 302,
		r = e.headers.get("X-Remix-Redirect"),
		n = {},
		a = e.headers.get("X-Remix-Revalidate");
	a && (n["X-Remix-Revalidate"] = a);
	let i = e.headers.get("X-Remix-Reload-Document");
	i && (n["X-Remix-Reload-Document"] = i);
	let o = e.headers.get("X-Remix-Replace");
	return o && (n["X-Remix-Replace"] = o), pn(r, { status: t, headers: n });
}
function Hn(e) {
	if (e.default == null) return;
	if (!(typeof e.default == "object" && Object.keys(e.default).length === 0))
		return e.default;
}
function yl(e, t, r) {
	return (
		(r && e.id !== "root") ||
		(t.clientLoader != null &&
			(t.clientLoader.hydrate === !0 || e.hasLoader !== !0))
	);
}
/**
 * @remix-run/react v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const jt = new Set(),
	vl = 1e3,
	Ut = new Set(),
	gl = 7680;
function Sr(e, t) {
	return e.unstable_lazyRouteDiscovery === !0 && !t;
}
function wl(e, t) {
	let r = new Set(t.state.matches.map((o) => o.route.id)),
		n = t.state.location.pathname.split("/").filter(Boolean),
		a = ["/"];
	for (n.pop(); n.length > 0; ) a.push(`/${n.join("/")}`), n.pop();
	a.forEach((o) => {
		let s = Ee(t.routes, o, t.basename);
		s && s.forEach((l) => r.add(l.route.id));
	});
	let i = [...r].reduce((o, s) => Object.assign(o, { [s]: e.routes[s] }), {});
	return { ...e, routes: i };
}
function Wl(e, t, r, n, a) {
	if (Sr(r, n))
		return async ({ path: i, patch: o }) => {
			Ut.has(i) || (await zn([i], e, t, r, n, a, o));
		};
}
function Jl(e, t, r, n, a) {
	f.useEffect(() => {
		var i;
		if (
			!Sr(n, a) ||
			((i = navigator.connection) === null || i === void 0
				? void 0
				: i.saveData) === !0
		)
			return;
		function o(c) {
			let p =
				c.tagName === "FORM"
					? c.getAttribute("action")
					: c.getAttribute("href");
			if (!p) return;
			let w = new URL(p, window.location.origin);
			Ut.has(w.pathname) || jt.add(w.pathname);
		}
		async function s() {
			let c = Array.from(jt.keys()).filter((p) =>
				Ut.has(p) ? (jt.delete(p), !1) : !0,
			);
			if (c.length !== 0)
				try {
					await zn(c, t, r, n, a, e.basename, e.patchRoutes);
				} catch (p) {
					console.error("Failed to fetch manifest patches", p);
				}
		}
		document.body
			.querySelectorAll("a[data-discover], form[data-discover]")
			.forEach((c) => o(c)),
			s();
		let l = El(s, 100);
		function u(c) {
			return c.nodeType === Node.ELEMENT_NODE;
		}
		let h = new MutationObserver((c) => {
			let p = new Set();
			c.forEach((w) => {
				[w.target, ...w.addedNodes].forEach((v) => {
					u(v) &&
						(((v.tagName === "A" &&
							v.getAttribute("data-discover")) ||
							(v.tagName === "FORM" &&
								v.getAttribute("data-discover"))) &&
							p.add(v),
						v.tagName !== "A" &&
							v
								.querySelectorAll(
									"a[data-discover], form[data-discover]",
								)
								.forEach((E) => p.add(E)));
				});
			}),
				p.forEach((w) => o(w)),
				l();
		});
		return (
			h.observe(document.documentElement, {
				subtree: !0,
				childList: !0,
				attributes: !0,
				attributeFilter: ["data-discover", "href", "action"],
			}),
			() => h.disconnect()
		);
	}, [n, a, t, r, e]);
}
async function zn(e, t, r, n, a, i, o) {
	let s = `${i ?? "/"}/__manifest`.replace(/\/+/g, "/"),
		l = new URL(s, window.location.origin);
	if (
		(e.sort().forEach((v) => l.searchParams.append("p", v)),
		l.searchParams.set("version", t.version),
		l.toString().length > gl)
	) {
		jt.clear();
		return;
	}
	let u = await fetch(l);
	if (u.ok) {
		if (u.status >= 400) throw new Error(await u.text());
	} else throw new Error(`${u.status} ${u.statusText}`);
	let h = await u.json(),
		c = new Set(Object.keys(t.routes)),
		p = Object.values(h).reduce(
			(v, E) => (c.has(E.id) ? v : Object.assign(v, { [E.id]: E })),
			{},
		);
	Object.assign(t.routes, p), e.forEach((v) => bl(v, Ut));
	let w = new Set();
	Object.values(p).forEach((v) => {
		(!v.parentId || !p[v.parentId]) && w.add(v.parentId);
	}),
		w.forEach((v) => o(v || null, Er(p, r, null, n, a, v)));
}
function bl(e, t) {
	if (t.size >= vl) {
		let r = t.values().next().value;
		t.delete(r);
	}
	t.add(e);
}
function El(e, t) {
	let r;
	return (...n) => {
		window.clearTimeout(r), (r = window.setTimeout(() => e(...n), t));
	};
}
function Wn() {
	let e = f.useContext(Ye);
	return (
		Re(
			e,
			"You must render this element inside a <DataRouterContext.Provider> element",
		),
		e
	);
}
function Jt() {
	let e = f.useContext(st);
	return (
		Re(
			e,
			"You must render this element inside a <DataRouterStateContext.Provider> element",
		),
		e
	);
}
const Jn = f.createContext(void 0);
Jn.displayName = "Remix";
function Xe() {
	let e = f.useContext(Jn);
	return Re(e, "You must render this element inside a <Remix> element"), e;
}
function Kn(e, t) {
	let [r, n] = f.useState(!1),
		[a, i] = f.useState(!1),
		{
			onFocus: o,
			onBlur: s,
			onMouseEnter: l,
			onMouseLeave: u,
			onTouchStart: h,
		} = t,
		c = f.useRef(null);
	f.useEffect(() => {
		if ((e === "render" && i(!0), e === "viewport")) {
			let v = (R) => {
					R.forEach((P) => {
						i(P.isIntersecting);
					});
				},
				E = new IntersectionObserver(v, { threshold: 0.5 });
			return (
				c.current && E.observe(c.current),
				() => {
					E.disconnect();
				}
			);
		}
	}, [e]);
	let p = () => {
			e === "intent" && n(!0);
		},
		w = () => {
			e === "intent" && (n(!1), i(!1));
		};
	return (
		f.useEffect(() => {
			if (r) {
				let v = setTimeout(() => {
					i(!0);
				}, 100);
				return () => {
					clearTimeout(v);
				};
			}
		}, [r]),
		[
			a,
			c,
			{
				onFocus: nt(o, p),
				onBlur: nt(s, w),
				onMouseEnter: nt(l, p),
				onMouseLeave: nt(u, w),
				onTouchStart: nt(h, p),
			},
		]
	);
}
const Rr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function xr(e, t, r) {
	return e === "render" && !t && !r ? "true" : void 0;
}
let Sl = f.forwardRef(
	({ to: e, prefetch: t = "none", discover: r = "render", ...n }, a) => {
		let i = typeof e == "string" && Rr.test(e),
			o = mr(e),
			[s, l, u] = Kn(t, n);
		return f.createElement(
			f.Fragment,
			null,
			f.createElement(
				so,
				te({}, n, u, {
					ref: Vn(a, l),
					to: e,
					"data-discover": xr(r, i, n.reloadDocument),
				}),
			),
			s && !i ? f.createElement(Pr, { page: o }) : null,
		);
	},
);
Sl.displayName = "NavLink";
let Rl = f.forwardRef(
	({ to: e, prefetch: t = "none", discover: r = "render", ...n }, a) => {
		let i = typeof e == "string" && Rr.test(e),
			o = mr(e),
			[s, l, u] = Kn(t, n);
		return f.createElement(
			f.Fragment,
			null,
			f.createElement(
				Dn,
				te({}, n, u, {
					ref: Vn(a, l),
					to: e,
					"data-discover": xr(r, i, n.reloadDocument),
				}),
			),
			s && !i ? f.createElement(Pr, { page: o }) : null,
		);
	},
);
Rl.displayName = "Link";
let xl = f.forwardRef(({ discover: e = "render", ...t }, r) => {
	let n = typeof t.action == "string" && Rr.test(t.action);
	return f.createElement(
		uo,
		te({}, t, { ref: r, "data-discover": xr(e, n, t.reloadDocument) }),
	);
});
xl.displayName = "Form";
function nt(e, t) {
	return (r) => {
		e && e(r), r.defaultPrevented || t(r);
	};
}
function Lr(e, t, r) {
	if (r && !Nt) return [e[0]];
	if (t) {
		let n = e.findIndex((a) => t[a.route.id] !== void 0);
		return e.slice(0, n + 1);
	}
	return e;
}
function Kl() {
	let { isSpaMode: e, manifest: t, routeModules: r, criticalCss: n } = Xe(),
		{ errors: a, matches: i } = Jt(),
		o = Lr(i, a, e),
		s = f.useMemo(() => $o(o, r, t), [o, r, t]);
	return f.createElement(
		f.Fragment,
		null,
		n
			? f.createElement("style", {
					dangerouslySetInnerHTML: { __html: n },
				})
			: null,
		s.map(({ key: l, link: u }) =>
			vr(u)
				? f.createElement(Pr, te({ key: l }, u))
				: f.createElement("link", te({ key: l }, u)),
		),
	);
}
function Pr({ page: e, ...t }) {
	let { router: r } = Wn(),
		n = f.useMemo(
			() => Ee(r.routes, e, r.basename),
			[r.routes, e, r.basename],
		);
	return n
		? f.createElement(Pl, te({ page: e, matches: n }, t))
		: (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function Ll(e) {
	let { manifest: t, routeModules: r } = Xe(),
		[n, a] = f.useState([]);
	return (
		f.useEffect(() => {
			let i = !1;
			return (
				zo(e, t, r).then((o) => {
					i || a(o);
				}),
				() => {
					i = !0;
				}
			);
		}, [e, t, r]),
		n
	);
}
function Pl({ page: e, matches: t, ...r }) {
	let n = Pe(),
		{ future: a, manifest: i, routeModules: o } = Xe(),
		{ loaderData: s, matches: l } = Jt(),
		u = f.useMemo(() => an(e, t, l, i, n, "data"), [e, t, l, i, n]),
		h = f.useMemo(() => {
			if (!a.unstable_singleFetch) return Wo(e, u, i);
			if (e === n.pathname + n.search + n.hash) return [];
			let v = new Set(),
				E = !1;
			if (
				(t.forEach((P) => {
					var x;
					i.routes[P.route.id].hasLoader &&
						((!u.some((C) => C.route.id === P.route.id) &&
							P.route.id in s &&
							(x = o[P.route.id]) !== null &&
							x !== void 0 &&
							x.shouldRevalidate) ||
						i.routes[P.route.id].hasClientLoader
							? (E = !0)
							: v.add(P.route.id));
				}),
				v.size === 0)
			)
				return [];
			let R = Wt(e);
			return (
				E &&
					v.size > 0 &&
					R.searchParams.set(
						"_routes",
						t
							.filter((P) => v.has(P.route.id))
							.map((P) => P.route.id)
							.join(","),
					),
				[R.pathname + R.search]
			);
		}, [a.unstable_singleFetch, s, n, i, u, t, e, o]),
		c = f.useMemo(() => an(e, t, l, i, n, "assets"), [e, t, l, i, n]),
		p = f.useMemo(() => Jo(c, i), [c, i]),
		w = Ll(c);
	return f.createElement(
		f.Fragment,
		null,
		h.map((v) =>
			f.createElement(
				"link",
				te({ key: v, rel: "prefetch", as: "fetch", href: v }, r),
			),
		),
		p.map((v) =>
			f.createElement(
				"link",
				te({ key: v, rel: "modulepreload", href: v }, r),
			),
		),
		w.map(({ key: v, link: E }) =>
			f.createElement("link", te({ key: v }, E)),
		),
	);
}
function Vl() {
	let { isSpaMode: e, routeModules: t } = Xe(),
		{ errors: r, matches: n, loaderData: a } = Jt(),
		i = Pe(),
		o = Lr(n, r, e),
		s = null;
	r && (s = r[o[o.length - 1].route.id]);
	let l = [],
		u = null,
		h = [];
	for (let c = 0; c < o.length; c++) {
		let p = o[c],
			w = p.route.id,
			v = a[w],
			E = p.params,
			R = t[w],
			P = [],
			x = {
				id: w,
				data: v,
				meta: [],
				params: p.params,
				pathname: p.pathname,
				handle: p.route.handle,
				error: s,
			};
		if (
			((h[c] = x),
			R != null && R.meta
				? (P =
						typeof R.meta == "function"
							? R.meta({
									data: v,
									params: E,
									location: i,
									matches: h,
									error: s,
								})
							: Array.isArray(R.meta)
								? [...R.meta]
								: R.meta)
				: u && (P = [...u]),
			(P = P || []),
			!Array.isArray(P))
		)
			throw new Error(
				"The route at " +
					p.route.path +
					` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`,
			);
		(x.meta = P), (h[c] = x), (l = [...P]), (u = l);
	}
	return f.createElement(
		f.Fragment,
		null,
		l.flat().map((c) => {
			if (!c) return null;
			if ("tagName" in c) {
				let { tagName: p, ...w } = c;
				if (!Dl(p))
					return (
						console.warn(
							`A meta object uses an invalid tagName: ${p}. Expected either 'link' or 'meta'`,
						),
						null
					);
				let v = p;
				return f.createElement(v, te({ key: JSON.stringify(w) }, w));
			}
			if ("title" in c)
				return f.createElement(
					"title",
					{ key: "title" },
					String(c.title),
				);
			if (
				("charset" in c &&
					(c.charSet ?? (c.charSet = c.charset), delete c.charset),
				"charSet" in c && c.charSet != null)
			)
				return typeof c.charSet == "string"
					? f.createElement("meta", {
							key: "charSet",
							charSet: c.charSet,
						})
					: null;
			if ("script:ld+json" in c)
				try {
					let p = JSON.stringify(c["script:ld+json"]);
					return f.createElement("script", {
						key: `script:ld+json:${p}`,
						type: "application/ld+json",
						dangerouslySetInnerHTML: { __html: p },
					});
				} catch {
					return null;
				}
			return f.createElement("meta", te({ key: JSON.stringify(c) }, c));
		}),
	);
}
function Dl(e) {
	return typeof e == "string" && /^(meta|link)$/.test(e);
}
function Cl(e) {
	return f.createElement(ki, e);
}
let Nt = !1;
function _l(e) {
	let {
			manifest: t,
			serverHandoffString: r,
			abortDelay: n,
			serializeError: a,
			isSpaMode: i,
			future: o,
			renderMeta: s,
		} = Xe(),
		{ router: l, static: u, staticContext: h } = Wn(),
		{ matches: c } = Jt(),
		p = Sr(o, i);
	s && (s.didRenderScripts = !0);
	let w = Lr(c, null, i);
	f.useEffect(() => {
		Nt = !0;
	}, []);
	let v = (D, U) => {
			let y;
			return (
				a && U instanceof Error ? (y = a(U)) : (y = U),
				`${JSON.stringify(D)}:__remixContext.p(!1, ${_t(JSON.stringify(y))})`
			);
		},
		E = (D, U, y) => {
			let F;
			try {
				F = JSON.stringify(y);
			} catch (B) {
				return v(U, B);
			}
			return `${JSON.stringify(U)}:__remixContext.p(${_t(F)})`;
		},
		R = (D, U, y) => {
			let F;
			return (
				a && y instanceof Error ? (F = a(y)) : (F = y),
				`__remixContext.r(${JSON.stringify(D)}, ${JSON.stringify(U)}, !1, ${_t(JSON.stringify(F))})`
			);
		},
		P = (D, U, y) => {
			let F;
			try {
				F = JSON.stringify(y);
			} catch (B) {
				return R(D, U, B);
			}
			return `__remixContext.r(${JSON.stringify(D)}, ${JSON.stringify(U)}, ${_t(F)})`;
		},
		x = [],
		C = f.useMemo(() => {
			var D;
			let U = o.unstable_singleFetch
					? "window.__remixContext.stream = new ReadableStream({start(controller){window.__remixContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
					: "",
				y = h ? `window.__remixContext = ${r};${U}` : " ",
				F =
					o.unstable_singleFetch || h == null
						? void 0
						: h.activeDeferreds;
			y += F
				? [
						"__remixContext.p = function(v,e,p,x) {",
						"  if (typeof e !== 'undefined') {",
						`    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,
						"    p=Promise.reject(x);",
						"  } else {",
						"    p=Promise.resolve(v);",
						"  }",
						"  return p;",
						"};",
						"__remixContext.n = function(i,k) {",
						"  __remixContext.t = __remixContext.t || {};",
						"  __remixContext.t[i] = __remixContext.t[i] || {};",
						"  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});",
						typeof n == "number"
							? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${n});`
							: "",
						"  return p;",
						"};",
						"__remixContext.r = function(i,k,v,e,p,x) {",
						"  p = __remixContext.t[i][k];",
						"  if (typeof e !== 'undefined') {",
						`    x=new Error("Unexpected Server Error");
    x.stack=undefined;`,
						"    p.e(x);",
						"  } else {",
						"    p.r(v);",
						"  }",
						"};",
					].join(`
`) +
					Object.entries(F).map(([I, W]) => {
						let ae = new Set(W.pendingKeys),
							Q = W.deferredKeys.map((ne) => {
								if (ae.has(ne))
									return (
										x.push(
											f.createElement(cn, {
												key: `${I} | ${ne}`,
												deferredData: W,
												routeId: I,
												dataKey: ne,
												scriptProps: e,
												serializeData: P,
												serializeError: R,
											}),
										),
										`${JSON.stringify(ne)}:__remixContext.n(${JSON.stringify(I)}, ${JSON.stringify(ne)})`
									);
								{
									let de = W.data[ne];
									return typeof de._error < "u"
										? v(ne, de._error)
										: E(I, ne, de._data);
								}
							}).join(`,
`);
						return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(I)}], {${Q}});`;
					}).join(`
`) +
					(x.length > 0 ? `__remixContext.a=${x.length};` : "")
				: "";
			let B = u
				? `${(D = t.hmr) !== null && D !== void 0 && D.runtime ? `import ${JSON.stringify(t.hmr.runtime)};` : ""}${p ? "" : `import ${JSON.stringify(t.url)}`};
${w.map(
	(I, W) =>
		`import * as route${W} from ${JSON.stringify(t.routes[I.route.id].module)};`,
).join(`
`)}
${p ? `window.__remixManifest = ${JSON.stringify(wl(t, l), null, 2)};` : ""}
window.__remixRouteModules = {${w.map((I, W) => `${JSON.stringify(I.route.id)}:route${W}`).join(",")}};

import(${JSON.stringify(t.entry.module)});`
				: " ";
			return f.createElement(
				f.Fragment,
				null,
				f.createElement(
					"script",
					te({}, e, {
						suppressHydrationWarning: !0,
						dangerouslySetInnerHTML: on(y),
						type: void 0,
					}),
				),
				f.createElement(
					"script",
					te({}, e, {
						suppressHydrationWarning: !0,
						dangerouslySetInnerHTML: on(B),
						type: "module",
						async: !0,
					}),
				),
			);
		}, []);
	if (!u && typeof __remixContext == "object" && __remixContext.a)
		for (let D = 0; D < __remixContext.a; D++)
			x.push(
				f.createElement(cn, {
					key: D,
					scriptProps: e,
					serializeData: P,
					serializeError: R,
				}),
			);
	let S = w
			.map((D) => {
				let U = t.routes[D.route.id];
				return (U.imports || []).concat([U.module]);
			})
			.flat(1),
		j = Nt ? [] : t.entry.imports.concat(S);
	return Nt
		? null
		: f.createElement(
				f.Fragment,
				null,
				p
					? null
					: f.createElement("link", {
							rel: "modulepreload",
							href: t.url,
							crossOrigin: e.crossOrigin,
						}),
				f.createElement("link", {
					rel: "modulepreload",
					href: t.entry.module,
					crossOrigin: e.crossOrigin,
				}),
				Ol(j).map((D) =>
					f.createElement("link", {
						key: D,
						rel: "modulepreload",
						href: D,
						crossOrigin: e.crossOrigin,
					}),
				),
				C,
				x,
			);
}
function cn({
	dataKey: e,
	deferredData: t,
	routeId: r,
	scriptProps: n,
	serializeData: a,
	serializeError: i,
}) {
	return (
		typeof document > "u" &&
			t &&
			e &&
			r &&
			Re(
				t.pendingKeys.includes(e),
				`Deferred data for route ${r} with key ${e} was not pending but tried to render a script for it.`,
			),
		f.createElement(
			f.Suspense,
			{
				fallback:
					typeof document > "u" && t && e && r
						? null
						: f.createElement(
								"script",
								te({}, n, {
									async: !0,
									suppressHydrationWarning: !0,
									dangerouslySetInnerHTML: { __html: " " },
								}),
							),
			},
			typeof document > "u" && t && e && r
				? f.createElement(Cl, {
						resolve: t.data[e],
						errorElement: f.createElement(Tl, {
							dataKey: e,
							routeId: r,
							scriptProps: n,
							serializeError: i,
						}),
						children: (o) =>
							f.createElement(
								"script",
								te({}, n, {
									async: !0,
									suppressHydrationWarning: !0,
									dangerouslySetInnerHTML: {
										__html: a(r, e, o),
									},
								}),
							),
					})
				: f.createElement(
						"script",
						te({}, n, {
							async: !0,
							suppressHydrationWarning: !0,
							dangerouslySetInnerHTML: { __html: " " },
						}),
					),
		)
	);
}
function Tl({ dataKey: e, routeId: t, scriptProps: r, serializeError: n }) {
	let a = Ni();
	return f.createElement(
		"script",
		te({}, r, {
			suppressHydrationWarning: !0,
			dangerouslySetInnerHTML: { __html: n(t, e, a) },
		}),
	);
}
function Ol(e) {
	return [...new Set(e)];
}
function Yl() {
	return Mi();
}
const Xl = () => null;
function Vn(...e) {
	return (t) => {
		e.forEach((r) => {
			typeof r == "function" ? r(t) : r != null && (r.current = t);
		});
	};
}
export {
	Ie as E,
	Rl as L,
	Vl as M,
	Al as O,
	Jn as R,
	_l as S,
	te as _,
	Xe as a,
	Pe as b,
	Oi as c,
	$l as d,
	Kl as e,
	Xl as f,
	zl as g,
	ul as h,
	Re as i,
	Er as j,
	Fl as k,
	Nl as l,
	Ee as m,
	kl as n,
	Bl as o,
	Wl as p,
	Jl as q,
	Hl as r,
	yl as s,
	Ul as t,
	Yl as u,
};