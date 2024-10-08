var bu = Object.create,
	Re = Object.defineProperty,
	Au = Object.getOwnPropertyDescriptor,
	vu = Object.getOwnPropertyNames,
	ku = Object.getPrototypeOf,
	Cu = Object.prototype.hasOwnProperty,
	Mr = (r) => Re(r, "__esModule", { value: !0 }),
	z = (r, s) =>
		function () {
			return (
				s ||
					(0, r[Object.keys(r)[0]])((s = { exports: {} }).exports, s),
				s.exports
			);
		},
	Pr = (r, s) => {
		Mr(r);
		for (var l in s) Re(r, l, { get: s[l], enumerable: !0 });
	},
	yu = (r, s, l) => {
		if ((s && typeof s == "object") || typeof s == "function")
			for (let u of vu(s))
				!Cu.call(r, u) &&
					u !== "default" &&
					Re(r, u, {
						get: () => s[u],
						enumerable: !(l = Au(s, u)) || l.enumerable,
					});
		return r;
	},
	Me = (r) =>
		yu(
			Mr(
				Re(
					r != null ? bu(ku(r)) : {},
					"default",
					r && r.__esModule && "default" in r
						? { get: () => r.default, enumerable: !0 }
						: { value: r, enumerable: !0 },
				),
			),
			r,
		),
	Nr = z({
		"src/grammar/tag.js"(r, s) {
			function l(t, n) {
				function e() {
					this.constructor = t;
				}
				(e.prototype = n.prototype), (t.prototype = new e());
			}
			function u(t, n, e, o) {
				(this.message = t),
					(this.expected = n),
					(this.found = e),
					(this.location = o),
					(this.name = "SyntaxError"),
					typeof Error.captureStackTrace == "function" &&
						Error.captureStackTrace(this, u);
			}
			l(u, Error),
				(u.buildMessage = function (t, n, e) {
					var o = {
						literal: function (m) {
							return '"' + p(m.text) + '"';
						},
						class: function (m) {
							var A = m.parts.map(function (E) {
								return Array.isArray(E)
									? c(E[0]) + "-" + c(E[1])
									: c(E);
							});
							return "[" + (m.inverted ? "^" : "") + A + "]";
						},
						any: function () {
							return "any character";
						},
						end: function () {
							return "end of input";
						},
						other: function (m) {
							return m.description;
						},
						not: function (m) {
							return "not " + d(m.expected);
						},
					};
					function a(m) {
						return m.charCodeAt(0).toString(16).toUpperCase();
					}
					function p(m) {
						return m
							.replace(/\\/g, "\\\\")
							.replace(/"/g, '\\"')
							.replace(/\0/g, "\\0")
							.replace(/\t/g, "\\t")
							.replace(/\n/g, "\\n")
							.replace(/\r/g, "\\r")
							.replace(/[\x00-\x0F]/g, function (A) {
								return "\\x0" + a(A);
							})
							.replace(/[\x10-\x1F\x7F-\x9F]/g, function (A) {
								return "\\x" + a(A);
							});
					}
					function c(m) {
						return m
							.replace(/\\/g, "\\\\")
							.replace(/\]/g, "\\]")
							.replace(/\^/g, "\\^")
							.replace(/-/g, "\\-")
							.replace(/\0/g, "\\0")
							.replace(/\t/g, "\\t")
							.replace(/\n/g, "\\n")
							.replace(/\r/g, "\\r")
							.replace(/[\x00-\x0F]/g, function (A) {
								return "\\x0" + a(A);
							})
							.replace(/[\x10-\x1F\x7F-\x9F]/g, function (A) {
								return "\\x" + a(A);
							});
					}
					function d(m) {
						return o[m.type](m);
					}
					function h(m) {
						var A = m.map(d),
							E,
							w;
						if ((A.sort(), A.length > 0)) {
							for (E = 1, w = 1; E < A.length; E++)
								A[E - 1] !== A[E] && ((A[w] = A[E]), w++);
							A.length = w;
						}
						switch (A.length) {
							case 1:
								return A[0];
							case 2:
								return A[0] + " or " + A[1];
							default:
								return (
									A.slice(0, -1).join(", ") +
									", or " +
									A[A.length - 1]
								);
						}
					}
					function y(m) {
						return m ? '"' + p(m) + '"' : "end of input";
					}
					return "Expected " + h(t) + " but " + y(n) + " found.";
				});
			function i(t, n) {
				n = n !== void 0 ? n : {};
				var e = {},
					o = { Top: hr },
					a = hr,
					p = "/",
					c = ".",
					d = "#",
					h = "=",
					y = "(",
					m = ")",
					A = ",",
					E = "[",
					w = "]",
					C = "null",
					x = "true",
					v = "false",
					k = "{",
					F = "}",
					B = ":",
					I = '"',
					S = "\\",
					O = "n",
					j = "r",
					R = "t",
					q = /^[$@]/,
					T = /^[0-9]/,
					M = /^[^\0-\x1F"\\]/,
					N = /^[a-zA-Z0-9_\-]/,
					V = /^[ \n\t]/,
					W = pe("/", !1),
					K = he("tag name"),
					re = he("class"),
					H = he("id"),
					X = pe("=", !1),
					ue = pe("(", !1),
					ne = pe(")", !1),
					oe = pe(",", !1),
					ce = he("variable"),
					me = he("null"),
					Ae = he("boolean"),
					Ee = pe("[", !1),
					ht = pe("]", !1),
					dt = pe("{", !1),
					mt = pe("}", !1),
					gt = pe(":", !1),
					_t = he("number"),
					bt = he("string"),
					At = he("identifier"),
					vt = he("whitespace"),
					kt = function (f) {
						return { type: "variable", meta: { variable: f } };
					},
					Ct = function (f) {
						return { type: "annotation", meta: { attributes: f } };
					},
					yt = function (f, g) {
						return g;
					},
					Dt = function (f, g, b, D) {
						g &&
							((b = b || []),
							b.unshift({
								type: "attribute",
								name: "primary",
								value: g,
							}));
						const [$, P] = D ? ["tag", 0] : ["tag_open", 1];
						return {
							type: $,
							nesting: P,
							meta: { tag: f, attributes: b },
						};
					},
					xt = function (f) {
						return {
							type: "tag_close",
							nesting: -1,
							meta: { tag: f },
						};
					},
					Et = function (f, g) {
						return f ? [f, ...g] : [];
					},
					lr = function (f) {
						return f;
					},
					Ft = function (f) {
						return f;
					},
					wt = function (f) {
						return f;
					},
					Bt = function (f) {
						return f;
					},
					qt = function (f) {
						return { type: "class", name: f, value: !0 };
					},
					St = function (f) {
						return { type: "attribute", name: "id", value: f };
					},
					$t = function (f, g) {
						return { type: "attribute", name: f, value: g };
					},
					Tt = function (f, g, b) {
						return g ? [g, ...b] : [];
					},
					jt = function (f, g) {
						let b = {};
						for (let [D, { name: $, value: P }] of g.entries())
							b[$ || D] = P;
						return new gu(f, b);
					},
					cr = function (f) {
						return f;
					},
					It = function (f, g) {
						return { name: f, value: g };
					},
					Ue = function (f) {
						return f;
					},
					Ot = function (f, g, b) {
						return f === "@" ? [g, ...b] : new mu([g, ...b]);
					},
					zt = function () {
						return null;
					},
					Rt = function () {
						return !0;
					},
					Mt = function () {
						return !1;
					},
					Pt = function (f, g) {
						return [f, ...g];
					},
					Nt = function (f) {
						return f || [];
					},
					Lt = function (f, g) {
						return Object.assign(f, ...g);
					},
					Vt = function (f) {
						return f || {};
					},
					Ut = function (f, g) {
						return f === "$$mdtype" ? {} : { [f]: g };
					},
					Zt = function () {
						return parseFloat(Qt());
					},
					Gt = function (f) {
						return f.join("");
					},
					Ht = function () {
						return `
`;
					},
					Wt = function () {
						return "\r";
					},
					Jt = function () {
						return "	";
					},
					Yt = function (f) {
						return f;
					},
					_ = 0,
					U = 0,
					Fe = [{ line: 1, column: 1 }],
					we = [],
					L = 0,
					Be;
				if ("startRule" in n) {
					if (!(n.startRule in o))
						throw new Error(
							`Can't start parsing from rule "` +
								n.startRule +
								'".',
						);
					a = o[n.startRule];
				}
				function Qt() {
					return t.substring(U, _);
				}
				function pe(f, g) {
					return { type: "literal", text: f, ignoreCase: g };
				}
				function Kt() {
					return { type: "end" };
				}
				function he(f) {
					return { type: "other", description: f };
				}
				function fr(f) {
					var g = Fe[f],
						b;
					if (g) return g;
					for (b = f - 1; !Fe[b]; ) b--;
					for (
						g = Fe[b], g = { line: g.line, column: g.column };
						b < f;

					)
						t.charCodeAt(b) === 10
							? (g.line++, (g.column = 1))
							: g.column++,
							b++;
					return (Fe[f] = g), g;
				}
				var Xt = typeof n.filename == "string" && n.filename.length > 0;
				function pr(f, g) {
					var b = {};
					Xt && (b.filename = n.filename);
					var D = fr(f);
					b.start = { offset: f, line: D.line, column: D.column };
					var $ = fr(g);
					return (
						(b.end = { offset: g, line: $.line, column: $.column }),
						b
					);
				}
				function eu() {
					we.push({ pos: _, variants: [] });
				}
				function Q(f) {
					var g = we[we.length - 1];
					_ < g.pos ||
						(_ > g.pos && ((g.pos = _), (g.variants = [])),
						g.variants.push(f));
				}
				function ru(f, g, b) {
					return new u(u.buildMessage(f, g, b), f, g, b);
				}
				function tu() {
					var f = we[0],
						g = f.pos;
					return ru(
						f.variants,
						g < t.length ? t.charAt(g) : null,
						g < t.length ? pr(g, g + 1) : pr(g, g),
					);
				}
				function hr() {
					var f;
					return (
						(f = uu()),
						f === e &&
							((f = nu()),
							f === e && ((f = iu()), f === e && (f = ou()))),
						f
					);
				}
				function uu() {
					var f, g;
					return (
						(f = _),
						(g = Cr()),
						g === e && (g = br()),
						g !== e && ((U = f), (g = kt(g))),
						(f = g),
						f
					);
				}
				function nu() {
					var f, g, b, D;
					if (((f = _), (g = mr()), g !== e)) {
						for (b = [], D = G(); D !== e; ) b.push(D), (D = G());
						(U = f), (f = Ct(g));
					} else (_ = f), (f = e);
					return f;
				}
				function iu() {
					var f,
						g,
						b,
						D,
						$,
						P,
						Z,
						se = function (be) {
							L === 0 && Q(be);
						};
					if (((f = _), (g = dr()), g !== e)) {
						for (b = [], D = G(); D !== e; ) b.push(D), (D = G());
						for (
							D = _,
								$ = ke(),
								$ !== e
									? ((P = G()),
										P === e && (P = null),
										(U = D),
										(D = yt(g, $)))
									: ((_ = D), (D = e)),
								D === e && (D = null),
								$ = mr(),
								$ === e && ($ = null),
								P = [],
								Z = G();
							Z !== e;

						)
							P.push(Z), (Z = G());
						se(W),
							t.charCodeAt(_) === 47 ? ((Z = p), _++) : (Z = e),
							Z === e && (Z = null),
							(U = f),
							(f = Dt(g, D, $, Z));
					} else (_ = f), (f = e);
					return f;
				}
				function ou() {
					var f,
						g,
						b,
						D = function ($) {
							L === 0 && Q($);
						};
					return (
						(f = _),
						D(W),
						t.charCodeAt(_) === 47 ? ((g = p), _++) : (g = e),
						g !== e
							? ((b = dr()),
								b !== e
									? ((U = f), (f = xt(b)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						f
					);
				}
				function dr() {
					var f,
						g = function (b) {
							L === 0 && Q(b);
						};
					return g(K), L++, (f = ge()), L--, f;
				}
				function mr() {
					var f, g, b, D;
					if (((f = _), (g = _r()), g !== e)) {
						for (b = [], D = gr(); D !== e; ) b.push(D), (D = gr());
						(U = f), (f = Et(g, b));
					} else (_ = f), (f = e);
					return f;
				}
				function gr() {
					var f, g, b;
					if (((f = _), (g = []), (b = G()), b !== e))
						for (; b !== e; ) g.push(b), (b = G());
					else g = e;
					return (
						g !== e
							? ((b = _r()),
								b !== e
									? ((U = f), (f = lr(b)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						f
					);
				}
				function _r() {
					var f, g;
					return (
						(f = _),
						(g = au()),
						g !== e && ((U = f), (g = Ft(g))),
						(f = g),
						f === e &&
							((f = _),
							(g = su()),
							g !== e && ((U = f), (g = wt(g))),
							(f = g),
							f === e &&
								((f = _),
								(g = lu()),
								g !== e && ((U = f), (g = Bt(g))),
								(f = g))),
						f
					);
				}
				function su() {
					var f,
						g,
						b,
						D = function ($) {
							L === 0 && Q($);
						};
					return (
						D(re),
						L++,
						(f = _),
						t.charCodeAt(_) === 46 ? ((g = c), _++) : (g = e),
						g !== e
							? ((b = ge()),
								b !== e
									? ((U = f), (f = qt(b)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						L--,
						f
					);
				}
				function au() {
					var f,
						g,
						b,
						D = function ($) {
							L === 0 && Q($);
						};
					return (
						D(H),
						L++,
						(f = _),
						t.charCodeAt(_) === 35 ? ((g = d), _++) : (g = e),
						g !== e
							? ((b = ge()),
								b !== e
									? ((U = f), (f = St(b)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						L--,
						f
					);
				}
				function lu() {
					var f,
						g,
						b,
						D,
						$ = function (P) {
							L === 0 && Q(P);
						};
					return (
						(f = _),
						(g = ge()),
						g !== e
							? ($(X),
								t.charCodeAt(_) === 61
									? ((b = h), _++)
									: (b = e),
								b !== e
									? ((D = ke()),
										D !== e
											? ((U = f), (f = $t(g, D)))
											: ((_ = f), (f = e)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						f
					);
				}
				function br() {
					var f,
						g,
						b,
						D,
						$,
						P,
						Z,
						se,
						be = function (_u) {
							L === 0 && Q(_u);
						};
					if (((f = _), (g = ge()), g !== e))
						if (
							(be(ue),
							t.charCodeAt(_) === 40 ? ((b = y), _++) : (b = e),
							b !== e)
						) {
							for (D = [], $ = G(); $ !== e; )
								D.push($), ($ = G());
							for (
								$ = _,
									P = Ar(),
									P === e && (P = null),
									Z = [],
									se = vr();
								se !== e;

							)
								Z.push(se), (se = vr());
							(U = $),
								($ = Tt(g, P, Z)),
								be(ne),
								t.charCodeAt(_) === 41
									? ((P = m), _++)
									: (P = e),
								P !== e
									? ((U = f), (f = jt(g, $)))
									: ((_ = f), (f = e));
						} else (_ = f), (f = e);
					else (_ = f), (f = e);
					return f;
				}
				function Ar() {
					var f,
						g,
						b,
						D,
						$ = function (P) {
							L === 0 && Q(P);
						};
					return (
						(f = _),
						(g = _),
						(b = ge()),
						b !== e
							? ($(X),
								t.charCodeAt(_) === 61
									? ((D = h), _++)
									: (D = e),
								D !== e
									? ((U = g), (g = cr(b)))
									: ((_ = g), (g = e)))
							: ((_ = g), (g = e)),
						g === e && (g = null),
						(b = ke()),
						b !== e
							? ((U = f), (f = It(g, b)))
							: ((_ = f), (f = e)),
						f
					);
				}
				function vr() {
					var f,
						g,
						b,
						D,
						$,
						P = function (Z) {
							L === 0 && Q(Z);
						};
					for (f = _, g = [], b = G(); b !== e; )
						g.push(b), (b = G());
					if (
						(P(oe),
						t.charCodeAt(_) === 44 ? ((b = A), _++) : (b = e),
						b !== e)
					) {
						for (D = [], $ = G(); $ !== e; ) D.push($), ($ = G());
						($ = Ar()),
							$ !== e
								? ((U = f), (f = Ue($)))
								: ((_ = f), (f = e));
					} else (_ = f), (f = e);
					return f;
				}
				function kr() {
					var f,
						g,
						b,
						D = function ($) {
							L === 0 && Q($);
						};
					for (f = _, g = [], b = G(); b !== e; )
						g.push(b), (b = G());
					return (
						D(oe),
						t.charCodeAt(_) === 44 ? ((b = A), _++) : (b = e),
						b !== e ? ((g = [g, b]), (f = g)) : ((_ = f), (f = e)),
						f === e && (f = null),
						f
					);
				}
				function Cr() {
					var f,
						g,
						b,
						D,
						$,
						P = function (Z) {
							L === 0 && Q(Z);
						};
					if (
						(P(ce),
						L++,
						(f = _),
						q.test(t.charAt(_))
							? ((g = t.charAt(_)), _++)
							: (g = e),
						g !== e)
					)
						if (((b = ge()), b !== e)) {
							for (D = [], $ = yr(); $ !== e; )
								D.push($), ($ = yr());
							(U = f), (f = Ot(g, b, D));
						} else (_ = f), (f = e);
					else (_ = f), (f = e);
					return L--, f;
				}
				function yr() {
					var f, g, b, D;
					return (
						(f = _),
						t.charCodeAt(_) === 46 ? ((g = c), _++) : (g = e),
						g !== e
							? ((b = ge()),
								b !== e
									? ((U = f), (f = cr(b)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						f === e &&
							((f = _),
							t.charCodeAt(_) === 91 ? ((g = E), _++) : (g = e),
							g !== e
								? ((b = Fr()),
									b === e && (b = Ze()),
									b !== e
										? (t.charCodeAt(_) === 93
												? ((D = w), _++)
												: (D = e),
											D !== e
												? ((U = f), (f = Ue(b)))
												: ((_ = f), (f = e)))
										: ((_ = f), (f = e)))
								: ((_ = f), (f = e))),
						f
					);
				}
				function ke() {
					var f;
					return (
						(f = cu()),
						f === e &&
							((f = fu()),
							f === e &&
								((f = Ze()),
								f === e &&
									((f = Fr()),
									f === e &&
										((f = pu()),
										f === e &&
											((f = hu()),
											f === e &&
												((f = br()),
												f === e && (f = Cr()))))))),
						f
					);
				}
				function cu() {
					var f,
						g,
						b = function (D) {
							L === 0 && Q(D);
						};
					return (
						b(me),
						L++,
						(f = _),
						t.substr(_, 4) === C ? ((g = C), (_ += 4)) : (g = e),
						g !== e && ((U = f), (g = zt())),
						(f = g),
						L--,
						f
					);
				}
				function fu() {
					var f,
						g,
						b = function (D) {
							L === 0 && Q(D);
						};
					return (
						b(Ae),
						L++,
						(f = _),
						t.substr(_, 4) === x ? ((g = x), (_ += 4)) : (g = e),
						g !== e && ((U = f), (g = Rt())),
						(f = g),
						f === e &&
							((f = _),
							t.substr(_, 5) === v
								? ((g = v), (_ += 5))
								: (g = e),
							g !== e && ((U = f), (g = Mt())),
							(f = g)),
						L--,
						f
					);
				}
				function pu() {
					var f,
						g,
						b,
						D,
						$,
						P,
						Z,
						se = function (be) {
							L === 0 && Q(be);
						};
					if (
						((f = _),
						se(Ee),
						t.charCodeAt(_) === 91 ? ((g = E), _++) : (g = e),
						g !== e)
					) {
						for (b = [], D = G(); D !== e; ) b.push(D), (D = G());
						if (((D = _), ($ = ke()), $ !== e)) {
							for (P = [], Z = Dr(); Z !== e; )
								P.push(Z), (Z = Dr());
							(Z = kr()), (U = D), (D = Pt($, P));
						} else (_ = D), (D = e);
						for (D === e && (D = null), $ = [], P = G(); P !== e; )
							$.push(P), (P = G());
						se(ht),
							t.charCodeAt(_) === 93 ? ((P = w), _++) : (P = e),
							P !== e
								? ((U = f), (f = Nt(D)))
								: ((_ = f), (f = e));
					} else (_ = f), (f = e);
					return f;
				}
				function Dr() {
					var f,
						g,
						b,
						D,
						$,
						P = function (Z) {
							L === 0 && Q(Z);
						};
					for (f = _, g = [], b = G(); b !== e; )
						g.push(b), (b = G());
					if (
						(P(oe),
						t.charCodeAt(_) === 44 ? ((b = A), _++) : (b = e),
						b !== e)
					) {
						for (D = [], $ = G(); $ !== e; ) D.push($), ($ = G());
						($ = ke()),
							$ !== e
								? ((U = f), (f = Ue($)))
								: ((_ = f), (f = e));
					} else (_ = f), (f = e);
					return f;
				}
				function hu() {
					var f,
						g,
						b,
						D,
						$,
						P,
						Z,
						se = function (be) {
							L === 0 && Q(be);
						};
					if (
						((f = _),
						se(dt),
						t.charCodeAt(_) === 123 ? ((g = k), _++) : (g = e),
						g !== e)
					) {
						for (b = [], D = G(); D !== e; ) b.push(D), (D = G());
						if (((D = _), ($ = Er()), $ !== e)) {
							for (P = [], Z = xr(); Z !== e; )
								P.push(Z), (Z = xr());
							(Z = kr()), (U = D), (D = Lt($, P));
						} else (_ = D), (D = e);
						for (D === e && (D = null), $ = [], P = G(); P !== e; )
							$.push(P), (P = G());
						se(mt),
							t.charCodeAt(_) === 125 ? ((P = F), _++) : (P = e),
							P !== e
								? ((U = f), (f = Vt(D)))
								: ((_ = f), (f = e));
					} else (_ = f), (f = e);
					return f;
				}
				function xr() {
					var f,
						g,
						b,
						D,
						$,
						P = function (Z) {
							L === 0 && Q(Z);
						};
					for (f = _, g = [], b = G(); b !== e; )
						g.push(b), (b = G());
					if (
						(P(oe),
						t.charCodeAt(_) === 44 ? ((b = A), _++) : (b = e),
						b !== e)
					) {
						for (D = [], $ = G(); $ !== e; ) D.push($), ($ = G());
						($ = Er()),
							$ !== e
								? ((U = f), (f = lr($)))
								: ((_ = f), (f = e));
					} else (_ = f), (f = e);
					return f;
				}
				function Er() {
					var f,
						g,
						b,
						D,
						$,
						P = function (Z) {
							L === 0 && Q(Z);
						};
					if (((f = _), (g = ge()), g === e && (g = Ze()), g !== e))
						if (
							(P(gt),
							t.charCodeAt(_) === 58 ? ((b = B), _++) : (b = e),
							b !== e)
						) {
							for (D = [], $ = G(); $ !== e; )
								D.push($), ($ = G());
							($ = ke()),
								$ !== e
									? ((U = f), (f = Ut(g, $)))
									: ((_ = f), (f = e));
						} else (_ = f), (f = e);
					else (_ = f), (f = e);
					return f;
				}
				function Fr() {
					var f,
						g,
						b,
						D,
						$,
						P,
						Z = function (se) {
							L === 0 && Q(se);
						};
					if (
						(Z(_t),
						L++,
						(f = _),
						t.charCodeAt(_) === 45 && _++,
						(g = []),
						T.test(t.charAt(_))
							? ((b = t.charAt(_)), _++)
							: (b = e),
						b !== e)
					)
						for (; b !== e; )
							g.push(b),
								T.test(t.charAt(_))
									? ((b = t.charAt(_)), _++)
									: (b = e);
					else g = e;
					if (g !== e) {
						if (
							((b = _),
							t.charCodeAt(_) === 46 ? ((D = c), _++) : (D = e),
							D !== e)
						) {
							if (
								(($ = []),
								T.test(t.charAt(_))
									? ((P = t.charAt(_)), _++)
									: (P = e),
								P !== e)
							)
								for (; P !== e; )
									$.push(P),
										T.test(t.charAt(_))
											? ((P = t.charAt(_)), _++)
											: (P = e);
							else $ = e;
							$ !== e
								? ((D = [D, $]), (b = D))
								: ((_ = b), (b = e));
						} else (_ = b), (b = e);
						b === e && (b = null), (U = f), (f = Zt());
					} else (_ = f), (f = e);
					return L--, f;
				}
				function Ze() {
					var f,
						g,
						b,
						D,
						$ = function (P) {
							L === 0 && Q(P);
						};
					if (
						($(bt),
						L++,
						(f = _),
						t.charCodeAt(_) === 34 ? ((g = I), _++) : (g = e),
						g !== e)
					) {
						for (b = [], D = wr(); D !== e; ) b.push(D), (D = wr());
						t.charCodeAt(_) === 34 ? ((D = I), _++) : (D = e),
							D !== e
								? ((U = f), (f = Gt(b)))
								: ((_ = f), (f = e));
					} else (_ = f), (f = e);
					return L--, f;
				}
				function wr() {
					var f;
					return (
						M.test(t.charAt(_))
							? ((f = t.charAt(_)), _++)
							: (f = e),
						f === e && (f = du()),
						f
					);
				}
				function du() {
					var f, g, b, D;
					return (
						(f = _),
						t.charCodeAt(_) === 92 ? ((g = S), _++) : (g = e),
						g !== e
							? (t.charCodeAt(_) === 34
									? ((b = I), _++)
									: (b = e),
								b === e &&
									(t.charCodeAt(_) === 92
										? ((b = S), _++)
										: (b = e),
									b === e &&
										((b = _),
										t.charCodeAt(_) === 110
											? ((D = O), _++)
											: (D = e),
										D !== e && ((U = b), (D = Ht())),
										(b = D),
										b === e &&
											((b = _),
											t.charCodeAt(_) === 114
												? ((D = j), _++)
												: (D = e),
											D !== e && ((U = b), (D = Wt())),
											(b = D),
											b === e &&
												((b = _),
												t.charCodeAt(_) === 116
													? ((D = R), _++)
													: (D = e),
												D !== e &&
													((U = b), (D = Jt())),
												(b = D))))),
								b !== e
									? ((U = f), (f = Yt(b)))
									: ((_ = f), (f = e)))
							: ((_ = f), (f = e)),
						f
					);
				}
				function ge() {
					var f,
						g,
						b,
						D = function ($) {
							L === 0 && Q($);
						};
					if (
						(D(At),
						L++,
						(f = _),
						(g = []),
						N.test(t.charAt(_))
							? ((b = t.charAt(_)), _++)
							: (b = e),
						b !== e)
					)
						for (; b !== e; )
							g.push(b),
								N.test(t.charAt(_))
									? ((b = t.charAt(_)), _++)
									: (b = e);
					else g = e;
					return g !== e ? (f = t.substring(f, _)) : (f = g), L--, f;
				}
				function G() {
					var f,
						g = function (b) {
							L === 0 && Q(b);
						};
					return (
						g(vt),
						L++,
						V.test(t.charAt(_))
							? ((f = t.charAt(_)), _++)
							: (f = e),
						L--,
						f
					);
				}
				const { Variable: mu, Function: gu } = n;
				if ((eu(), (Be = a()), Be !== e && _ === t.length)) return Be;
				throw (Be !== e && _ < t.length && Q(Kt()), tu());
			}
			s.exports = { SyntaxError: u, parse: i };
		},
	}),
	Du = z({
		"node_modules/entities/lib/maps/entities.json"(r, s) {
			s.exports = {
				Aacute: "Á",
				aacute: "á",
				Abreve: "Ă",
				abreve: "ă",
				ac: "∾",
				acd: "∿",
				acE: "∾̳",
				Acirc: "Â",
				acirc: "â",
				acute: "´",
				Acy: "А",
				acy: "а",
				AElig: "Æ",
				aelig: "æ",
				af: "⁡",
				Afr: "𝔄",
				afr: "𝔞",
				Agrave: "À",
				agrave: "à",
				alefsym: "ℵ",
				aleph: "ℵ",
				Alpha: "Α",
				alpha: "α",
				Amacr: "Ā",
				amacr: "ā",
				amalg: "⨿",
				amp: "&",
				AMP: "&",
				andand: "⩕",
				And: "⩓",
				and: "∧",
				andd: "⩜",
				andslope: "⩘",
				andv: "⩚",
				ang: "∠",
				ange: "⦤",
				angle: "∠",
				angmsdaa: "⦨",
				angmsdab: "⦩",
				angmsdac: "⦪",
				angmsdad: "⦫",
				angmsdae: "⦬",
				angmsdaf: "⦭",
				angmsdag: "⦮",
				angmsdah: "⦯",
				angmsd: "∡",
				angrt: "∟",
				angrtvb: "⊾",
				angrtvbd: "⦝",
				angsph: "∢",
				angst: "Å",
				angzarr: "⍼",
				Aogon: "Ą",
				aogon: "ą",
				Aopf: "𝔸",
				aopf: "𝕒",
				apacir: "⩯",
				ap: "≈",
				apE: "⩰",
				ape: "≊",
				apid: "≋",
				apos: "'",
				ApplyFunction: "⁡",
				approx: "≈",
				approxeq: "≊",
				Aring: "Å",
				aring: "å",
				Ascr: "𝒜",
				ascr: "𝒶",
				Assign: "≔",
				ast: "*",
				asymp: "≈",
				asympeq: "≍",
				Atilde: "Ã",
				atilde: "ã",
				Auml: "Ä",
				auml: "ä",
				awconint: "∳",
				awint: "⨑",
				backcong: "≌",
				backepsilon: "϶",
				backprime: "‵",
				backsim: "∽",
				backsimeq: "⋍",
				Backslash: "∖",
				Barv: "⫧",
				barvee: "⊽",
				barwed: "⌅",
				Barwed: "⌆",
				barwedge: "⌅",
				bbrk: "⎵",
				bbrktbrk: "⎶",
				bcong: "≌",
				Bcy: "Б",
				bcy: "б",
				bdquo: "„",
				becaus: "∵",
				because: "∵",
				Because: "∵",
				bemptyv: "⦰",
				bepsi: "϶",
				bernou: "ℬ",
				Bernoullis: "ℬ",
				Beta: "Β",
				beta: "β",
				beth: "ℶ",
				between: "≬",
				Bfr: "𝔅",
				bfr: "𝔟",
				bigcap: "⋂",
				bigcirc: "◯",
				bigcup: "⋃",
				bigodot: "⨀",
				bigoplus: "⨁",
				bigotimes: "⨂",
				bigsqcup: "⨆",
				bigstar: "★",
				bigtriangledown: "▽",
				bigtriangleup: "△",
				biguplus: "⨄",
				bigvee: "⋁",
				bigwedge: "⋀",
				bkarow: "⤍",
				blacklozenge: "⧫",
				blacksquare: "▪",
				blacktriangle: "▴",
				blacktriangledown: "▾",
				blacktriangleleft: "◂",
				blacktriangleright: "▸",
				blank: "␣",
				blk12: "▒",
				blk14: "░",
				blk34: "▓",
				block: "█",
				bne: "=⃥",
				bnequiv: "≡⃥",
				bNot: "⫭",
				bnot: "⌐",
				Bopf: "𝔹",
				bopf: "𝕓",
				bot: "⊥",
				bottom: "⊥",
				bowtie: "⋈",
				boxbox: "⧉",
				boxdl: "┐",
				boxdL: "╕",
				boxDl: "╖",
				boxDL: "╗",
				boxdr: "┌",
				boxdR: "╒",
				boxDr: "╓",
				boxDR: "╔",
				boxh: "─",
				boxH: "═",
				boxhd: "┬",
				boxHd: "╤",
				boxhD: "╥",
				boxHD: "╦",
				boxhu: "┴",
				boxHu: "╧",
				boxhU: "╨",
				boxHU: "╩",
				boxminus: "⊟",
				boxplus: "⊞",
				boxtimes: "⊠",
				boxul: "┘",
				boxuL: "╛",
				boxUl: "╜",
				boxUL: "╝",
				boxur: "└",
				boxuR: "╘",
				boxUr: "╙",
				boxUR: "╚",
				boxv: "│",
				boxV: "║",
				boxvh: "┼",
				boxvH: "╪",
				boxVh: "╫",
				boxVH: "╬",
				boxvl: "┤",
				boxvL: "╡",
				boxVl: "╢",
				boxVL: "╣",
				boxvr: "├",
				boxvR: "╞",
				boxVr: "╟",
				boxVR: "╠",
				bprime: "‵",
				breve: "˘",
				Breve: "˘",
				brvbar: "¦",
				bscr: "𝒷",
				Bscr: "ℬ",
				bsemi: "⁏",
				bsim: "∽",
				bsime: "⋍",
				bsolb: "⧅",
				bsol: "\\",
				bsolhsub: "⟈",
				bull: "•",
				bullet: "•",
				bump: "≎",
				bumpE: "⪮",
				bumpe: "≏",
				Bumpeq: "≎",
				bumpeq: "≏",
				Cacute: "Ć",
				cacute: "ć",
				capand: "⩄",
				capbrcup: "⩉",
				capcap: "⩋",
				cap: "∩",
				Cap: "⋒",
				capcup: "⩇",
				capdot: "⩀",
				CapitalDifferentialD: "ⅅ",
				caps: "∩︀",
				caret: "⁁",
				caron: "ˇ",
				Cayleys: "ℭ",
				ccaps: "⩍",
				Ccaron: "Č",
				ccaron: "č",
				Ccedil: "Ç",
				ccedil: "ç",
				Ccirc: "Ĉ",
				ccirc: "ĉ",
				Cconint: "∰",
				ccups: "⩌",
				ccupssm: "⩐",
				Cdot: "Ċ",
				cdot: "ċ",
				cedil: "¸",
				Cedilla: "¸",
				cemptyv: "⦲",
				cent: "¢",
				centerdot: "·",
				CenterDot: "·",
				cfr: "𝔠",
				Cfr: "ℭ",
				CHcy: "Ч",
				chcy: "ч",
				check: "✓",
				checkmark: "✓",
				Chi: "Χ",
				chi: "χ",
				circ: "ˆ",
				circeq: "≗",
				circlearrowleft: "↺",
				circlearrowright: "↻",
				circledast: "⊛",
				circledcirc: "⊚",
				circleddash: "⊝",
				CircleDot: "⊙",
				circledR: "®",
				circledS: "Ⓢ",
				CircleMinus: "⊖",
				CirclePlus: "⊕",
				CircleTimes: "⊗",
				cir: "○",
				cirE: "⧃",
				cire: "≗",
				cirfnint: "⨐",
				cirmid: "⫯",
				cirscir: "⧂",
				ClockwiseContourIntegral: "∲",
				CloseCurlyDoubleQuote: "”",
				CloseCurlyQuote: "’",
				clubs: "♣",
				clubsuit: "♣",
				colon: ":",
				Colon: "∷",
				Colone: "⩴",
				colone: "≔",
				coloneq: "≔",
				comma: ",",
				commat: "@",
				comp: "∁",
				compfn: "∘",
				complement: "∁",
				complexes: "ℂ",
				cong: "≅",
				congdot: "⩭",
				Congruent: "≡",
				conint: "∮",
				Conint: "∯",
				ContourIntegral: "∮",
				copf: "𝕔",
				Copf: "ℂ",
				coprod: "∐",
				Coproduct: "∐",
				copy: "©",
				COPY: "©",
				copysr: "℗",
				CounterClockwiseContourIntegral: "∳",
				crarr: "↵",
				cross: "✗",
				Cross: "⨯",
				Cscr: "𝒞",
				cscr: "𝒸",
				csub: "⫏",
				csube: "⫑",
				csup: "⫐",
				csupe: "⫒",
				ctdot: "⋯",
				cudarrl: "⤸",
				cudarrr: "⤵",
				cuepr: "⋞",
				cuesc: "⋟",
				cularr: "↶",
				cularrp: "⤽",
				cupbrcap: "⩈",
				cupcap: "⩆",
				CupCap: "≍",
				cup: "∪",
				Cup: "⋓",
				cupcup: "⩊",
				cupdot: "⊍",
				cupor: "⩅",
				cups: "∪︀",
				curarr: "↷",
				curarrm: "⤼",
				curlyeqprec: "⋞",
				curlyeqsucc: "⋟",
				curlyvee: "⋎",
				curlywedge: "⋏",
				curren: "¤",
				curvearrowleft: "↶",
				curvearrowright: "↷",
				cuvee: "⋎",
				cuwed: "⋏",
				cwconint: "∲",
				cwint: "∱",
				cylcty: "⌭",
				dagger: "†",
				Dagger: "‡",
				daleth: "ℸ",
				darr: "↓",
				Darr: "↡",
				dArr: "⇓",
				dash: "‐",
				Dashv: "⫤",
				dashv: "⊣",
				dbkarow: "⤏",
				dblac: "˝",
				Dcaron: "Ď",
				dcaron: "ď",
				Dcy: "Д",
				dcy: "д",
				ddagger: "‡",
				ddarr: "⇊",
				DD: "ⅅ",
				dd: "ⅆ",
				DDotrahd: "⤑",
				ddotseq: "⩷",
				deg: "°",
				Del: "∇",
				Delta: "Δ",
				delta: "δ",
				demptyv: "⦱",
				dfisht: "⥿",
				Dfr: "𝔇",
				dfr: "𝔡",
				dHar: "⥥",
				dharl: "⇃",
				dharr: "⇂",
				DiacriticalAcute: "´",
				DiacriticalDot: "˙",
				DiacriticalDoubleAcute: "˝",
				DiacriticalGrave: "`",
				DiacriticalTilde: "˜",
				diam: "⋄",
				diamond: "⋄",
				Diamond: "⋄",
				diamondsuit: "♦",
				diams: "♦",
				die: "¨",
				DifferentialD: "ⅆ",
				digamma: "ϝ",
				disin: "⋲",
				div: "÷",
				divide: "÷",
				divideontimes: "⋇",
				divonx: "⋇",
				DJcy: "Ђ",
				djcy: "ђ",
				dlcorn: "⌞",
				dlcrop: "⌍",
				dollar: "$",
				Dopf: "𝔻",
				dopf: "𝕕",
				Dot: "¨",
				dot: "˙",
				DotDot: "⃜",
				doteq: "≐",
				doteqdot: "≑",
				DotEqual: "≐",
				dotminus: "∸",
				dotplus: "∔",
				dotsquare: "⊡",
				doublebarwedge: "⌆",
				DoubleContourIntegral: "∯",
				DoubleDot: "¨",
				DoubleDownArrow: "⇓",
				DoubleLeftArrow: "⇐",
				DoubleLeftRightArrow: "⇔",
				DoubleLeftTee: "⫤",
				DoubleLongLeftArrow: "⟸",
				DoubleLongLeftRightArrow: "⟺",
				DoubleLongRightArrow: "⟹",
				DoubleRightArrow: "⇒",
				DoubleRightTee: "⊨",
				DoubleUpArrow: "⇑",
				DoubleUpDownArrow: "⇕",
				DoubleVerticalBar: "∥",
				DownArrowBar: "⤓",
				downarrow: "↓",
				DownArrow: "↓",
				Downarrow: "⇓",
				DownArrowUpArrow: "⇵",
				DownBreve: "̑",
				downdownarrows: "⇊",
				downharpoonleft: "⇃",
				downharpoonright: "⇂",
				DownLeftRightVector: "⥐",
				DownLeftTeeVector: "⥞",
				DownLeftVectorBar: "⥖",
				DownLeftVector: "↽",
				DownRightTeeVector: "⥟",
				DownRightVectorBar: "⥗",
				DownRightVector: "⇁",
				DownTeeArrow: "↧",
				DownTee: "⊤",
				drbkarow: "⤐",
				drcorn: "⌟",
				drcrop: "⌌",
				Dscr: "𝒟",
				dscr: "𝒹",
				DScy: "Ѕ",
				dscy: "ѕ",
				dsol: "⧶",
				Dstrok: "Đ",
				dstrok: "đ",
				dtdot: "⋱",
				dtri: "▿",
				dtrif: "▾",
				duarr: "⇵",
				duhar: "⥯",
				dwangle: "⦦",
				DZcy: "Џ",
				dzcy: "џ",
				dzigrarr: "⟿",
				Eacute: "É",
				eacute: "é",
				easter: "⩮",
				Ecaron: "Ě",
				ecaron: "ě",
				Ecirc: "Ê",
				ecirc: "ê",
				ecir: "≖",
				ecolon: "≕",
				Ecy: "Э",
				ecy: "э",
				eDDot: "⩷",
				Edot: "Ė",
				edot: "ė",
				eDot: "≑",
				ee: "ⅇ",
				efDot: "≒",
				Efr: "𝔈",
				efr: "𝔢",
				eg: "⪚",
				Egrave: "È",
				egrave: "è",
				egs: "⪖",
				egsdot: "⪘",
				el: "⪙",
				Element: "∈",
				elinters: "⏧",
				ell: "ℓ",
				els: "⪕",
				elsdot: "⪗",
				Emacr: "Ē",
				emacr: "ē",
				empty: "∅",
				emptyset: "∅",
				EmptySmallSquare: "◻",
				emptyv: "∅",
				EmptyVerySmallSquare: "▫",
				emsp13: " ",
				emsp14: " ",
				emsp: " ",
				ENG: "Ŋ",
				eng: "ŋ",
				ensp: " ",
				Eogon: "Ę",
				eogon: "ę",
				Eopf: "𝔼",
				eopf: "𝕖",
				epar: "⋕",
				eparsl: "⧣",
				eplus: "⩱",
				epsi: "ε",
				Epsilon: "Ε",
				epsilon: "ε",
				epsiv: "ϵ",
				eqcirc: "≖",
				eqcolon: "≕",
				eqsim: "≂",
				eqslantgtr: "⪖",
				eqslantless: "⪕",
				Equal: "⩵",
				equals: "=",
				EqualTilde: "≂",
				equest: "≟",
				Equilibrium: "⇌",
				equiv: "≡",
				equivDD: "⩸",
				eqvparsl: "⧥",
				erarr: "⥱",
				erDot: "≓",
				escr: "ℯ",
				Escr: "ℰ",
				esdot: "≐",
				Esim: "⩳",
				esim: "≂",
				Eta: "Η",
				eta: "η",
				ETH: "Ð",
				eth: "ð",
				Euml: "Ë",
				euml: "ë",
				euro: "€",
				excl: "!",
				exist: "∃",
				Exists: "∃",
				expectation: "ℰ",
				exponentiale: "ⅇ",
				ExponentialE: "ⅇ",
				fallingdotseq: "≒",
				Fcy: "Ф",
				fcy: "ф",
				female: "♀",
				ffilig: "ﬃ",
				fflig: "ﬀ",
				ffllig: "ﬄ",
				Ffr: "𝔉",
				ffr: "𝔣",
				filig: "ﬁ",
				FilledSmallSquare: "◼",
				FilledVerySmallSquare: "▪",
				fjlig: "fj",
				flat: "♭",
				fllig: "ﬂ",
				fltns: "▱",
				fnof: "ƒ",
				Fopf: "𝔽",
				fopf: "𝕗",
				forall: "∀",
				ForAll: "∀",
				fork: "⋔",
				forkv: "⫙",
				Fouriertrf: "ℱ",
				fpartint: "⨍",
				frac12: "½",
				frac13: "⅓",
				frac14: "¼",
				frac15: "⅕",
				frac16: "⅙",
				frac18: "⅛",
				frac23: "⅔",
				frac25: "⅖",
				frac34: "¾",
				frac35: "⅗",
				frac38: "⅜",
				frac45: "⅘",
				frac56: "⅚",
				frac58: "⅝",
				frac78: "⅞",
				frasl: "⁄",
				frown: "⌢",
				fscr: "𝒻",
				Fscr: "ℱ",
				gacute: "ǵ",
				Gamma: "Γ",
				gamma: "γ",
				Gammad: "Ϝ",
				gammad: "ϝ",
				gap: "⪆",
				Gbreve: "Ğ",
				gbreve: "ğ",
				Gcedil: "Ģ",
				Gcirc: "Ĝ",
				gcirc: "ĝ",
				Gcy: "Г",
				gcy: "г",
				Gdot: "Ġ",
				gdot: "ġ",
				ge: "≥",
				gE: "≧",
				gEl: "⪌",
				gel: "⋛",
				geq: "≥",
				geqq: "≧",
				geqslant: "⩾",
				gescc: "⪩",
				ges: "⩾",
				gesdot: "⪀",
				gesdoto: "⪂",
				gesdotol: "⪄",
				gesl: "⋛︀",
				gesles: "⪔",
				Gfr: "𝔊",
				gfr: "𝔤",
				gg: "≫",
				Gg: "⋙",
				ggg: "⋙",
				gimel: "ℷ",
				GJcy: "Ѓ",
				gjcy: "ѓ",
				gla: "⪥",
				gl: "≷",
				glE: "⪒",
				glj: "⪤",
				gnap: "⪊",
				gnapprox: "⪊",
				gne: "⪈",
				gnE: "≩",
				gneq: "⪈",
				gneqq: "≩",
				gnsim: "⋧",
				Gopf: "𝔾",
				gopf: "𝕘",
				grave: "`",
				GreaterEqual: "≥",
				GreaterEqualLess: "⋛",
				GreaterFullEqual: "≧",
				GreaterGreater: "⪢",
				GreaterLess: "≷",
				GreaterSlantEqual: "⩾",
				GreaterTilde: "≳",
				Gscr: "𝒢",
				gscr: "ℊ",
				gsim: "≳",
				gsime: "⪎",
				gsiml: "⪐",
				gtcc: "⪧",
				gtcir: "⩺",
				gt: ">",
				GT: ">",
				Gt: "≫",
				gtdot: "⋗",
				gtlPar: "⦕",
				gtquest: "⩼",
				gtrapprox: "⪆",
				gtrarr: "⥸",
				gtrdot: "⋗",
				gtreqless: "⋛",
				gtreqqless: "⪌",
				gtrless: "≷",
				gtrsim: "≳",
				gvertneqq: "≩︀",
				gvnE: "≩︀",
				Hacek: "ˇ",
				hairsp: " ",
				half: "½",
				hamilt: "ℋ",
				HARDcy: "Ъ",
				hardcy: "ъ",
				harrcir: "⥈",
				harr: "↔",
				hArr: "⇔",
				harrw: "↭",
				Hat: "^",
				hbar: "ℏ",
				Hcirc: "Ĥ",
				hcirc: "ĥ",
				hearts: "♥",
				heartsuit: "♥",
				hellip: "…",
				hercon: "⊹",
				hfr: "𝔥",
				Hfr: "ℌ",
				HilbertSpace: "ℋ",
				hksearow: "⤥",
				hkswarow: "⤦",
				hoarr: "⇿",
				homtht: "∻",
				hookleftarrow: "↩",
				hookrightarrow: "↪",
				hopf: "𝕙",
				Hopf: "ℍ",
				horbar: "―",
				HorizontalLine: "─",
				hscr: "𝒽",
				Hscr: "ℋ",
				hslash: "ℏ",
				Hstrok: "Ħ",
				hstrok: "ħ",
				HumpDownHump: "≎",
				HumpEqual: "≏",
				hybull: "⁃",
				hyphen: "‐",
				Iacute: "Í",
				iacute: "í",
				ic: "⁣",
				Icirc: "Î",
				icirc: "î",
				Icy: "И",
				icy: "и",
				Idot: "İ",
				IEcy: "Е",
				iecy: "е",
				iexcl: "¡",
				iff: "⇔",
				ifr: "𝔦",
				Ifr: "ℑ",
				Igrave: "Ì",
				igrave: "ì",
				ii: "ⅈ",
				iiiint: "⨌",
				iiint: "∭",
				iinfin: "⧜",
				iiota: "℩",
				IJlig: "Ĳ",
				ijlig: "ĳ",
				Imacr: "Ī",
				imacr: "ī",
				image: "ℑ",
				ImaginaryI: "ⅈ",
				imagline: "ℐ",
				imagpart: "ℑ",
				imath: "ı",
				Im: "ℑ",
				imof: "⊷",
				imped: "Ƶ",
				Implies: "⇒",
				incare: "℅",
				in: "∈",
				infin: "∞",
				infintie: "⧝",
				inodot: "ı",
				intcal: "⊺",
				int: "∫",
				Int: "∬",
				integers: "ℤ",
				Integral: "∫",
				intercal: "⊺",
				Intersection: "⋂",
				intlarhk: "⨗",
				intprod: "⨼",
				InvisibleComma: "⁣",
				InvisibleTimes: "⁢",
				IOcy: "Ё",
				iocy: "ё",
				Iogon: "Į",
				iogon: "į",
				Iopf: "𝕀",
				iopf: "𝕚",
				Iota: "Ι",
				iota: "ι",
				iprod: "⨼",
				iquest: "¿",
				iscr: "𝒾",
				Iscr: "ℐ",
				isin: "∈",
				isindot: "⋵",
				isinE: "⋹",
				isins: "⋴",
				isinsv: "⋳",
				isinv: "∈",
				it: "⁢",
				Itilde: "Ĩ",
				itilde: "ĩ",
				Iukcy: "І",
				iukcy: "і",
				Iuml: "Ï",
				iuml: "ï",
				Jcirc: "Ĵ",
				jcirc: "ĵ",
				Jcy: "Й",
				jcy: "й",
				Jfr: "𝔍",
				jfr: "𝔧",
				jmath: "ȷ",
				Jopf: "𝕁",
				jopf: "𝕛",
				Jscr: "𝒥",
				jscr: "𝒿",
				Jsercy: "Ј",
				jsercy: "ј",
				Jukcy: "Є",
				jukcy: "є",
				Kappa: "Κ",
				kappa: "κ",
				kappav: "ϰ",
				Kcedil: "Ķ",
				kcedil: "ķ",
				Kcy: "К",
				kcy: "к",
				Kfr: "𝔎",
				kfr: "𝔨",
				kgreen: "ĸ",
				KHcy: "Х",
				khcy: "х",
				KJcy: "Ќ",
				kjcy: "ќ",
				Kopf: "𝕂",
				kopf: "𝕜",
				Kscr: "𝒦",
				kscr: "𝓀",
				lAarr: "⇚",
				Lacute: "Ĺ",
				lacute: "ĺ",
				laemptyv: "⦴",
				lagran: "ℒ",
				Lambda: "Λ",
				lambda: "λ",
				lang: "⟨",
				Lang: "⟪",
				langd: "⦑",
				langle: "⟨",
				lap: "⪅",
				Laplacetrf: "ℒ",
				laquo: "«",
				larrb: "⇤",
				larrbfs: "⤟",
				larr: "←",
				Larr: "↞",
				lArr: "⇐",
				larrfs: "⤝",
				larrhk: "↩",
				larrlp: "↫",
				larrpl: "⤹",
				larrsim: "⥳",
				larrtl: "↢",
				latail: "⤙",
				lAtail: "⤛",
				lat: "⪫",
				late: "⪭",
				lates: "⪭︀",
				lbarr: "⤌",
				lBarr: "⤎",
				lbbrk: "❲",
				lbrace: "{",
				lbrack: "[",
				lbrke: "⦋",
				lbrksld: "⦏",
				lbrkslu: "⦍",
				Lcaron: "Ľ",
				lcaron: "ľ",
				Lcedil: "Ļ",
				lcedil: "ļ",
				lceil: "⌈",
				lcub: "{",
				Lcy: "Л",
				lcy: "л",
				ldca: "⤶",
				ldquo: "“",
				ldquor: "„",
				ldrdhar: "⥧",
				ldrushar: "⥋",
				ldsh: "↲",
				le: "≤",
				lE: "≦",
				LeftAngleBracket: "⟨",
				LeftArrowBar: "⇤",
				leftarrow: "←",
				LeftArrow: "←",
				Leftarrow: "⇐",
				LeftArrowRightArrow: "⇆",
				leftarrowtail: "↢",
				LeftCeiling: "⌈",
				LeftDoubleBracket: "⟦",
				LeftDownTeeVector: "⥡",
				LeftDownVectorBar: "⥙",
				LeftDownVector: "⇃",
				LeftFloor: "⌊",
				leftharpoondown: "↽",
				leftharpoonup: "↼",
				leftleftarrows: "⇇",
				leftrightarrow: "↔",
				LeftRightArrow: "↔",
				Leftrightarrow: "⇔",
				leftrightarrows: "⇆",
				leftrightharpoons: "⇋",
				leftrightsquigarrow: "↭",
				LeftRightVector: "⥎",
				LeftTeeArrow: "↤",
				LeftTee: "⊣",
				LeftTeeVector: "⥚",
				leftthreetimes: "⋋",
				LeftTriangleBar: "⧏",
				LeftTriangle: "⊲",
				LeftTriangleEqual: "⊴",
				LeftUpDownVector: "⥑",
				LeftUpTeeVector: "⥠",
				LeftUpVectorBar: "⥘",
				LeftUpVector: "↿",
				LeftVectorBar: "⥒",
				LeftVector: "↼",
				lEg: "⪋",
				leg: "⋚",
				leq: "≤",
				leqq: "≦",
				leqslant: "⩽",
				lescc: "⪨",
				les: "⩽",
				lesdot: "⩿",
				lesdoto: "⪁",
				lesdotor: "⪃",
				lesg: "⋚︀",
				lesges: "⪓",
				lessapprox: "⪅",
				lessdot: "⋖",
				lesseqgtr: "⋚",
				lesseqqgtr: "⪋",
				LessEqualGreater: "⋚",
				LessFullEqual: "≦",
				LessGreater: "≶",
				lessgtr: "≶",
				LessLess: "⪡",
				lesssim: "≲",
				LessSlantEqual: "⩽",
				LessTilde: "≲",
				lfisht: "⥼",
				lfloor: "⌊",
				Lfr: "𝔏",
				lfr: "𝔩",
				lg: "≶",
				lgE: "⪑",
				lHar: "⥢",
				lhard: "↽",
				lharu: "↼",
				lharul: "⥪",
				lhblk: "▄",
				LJcy: "Љ",
				ljcy: "љ",
				llarr: "⇇",
				ll: "≪",
				Ll: "⋘",
				llcorner: "⌞",
				Lleftarrow: "⇚",
				llhard: "⥫",
				lltri: "◺",
				Lmidot: "Ŀ",
				lmidot: "ŀ",
				lmoustache: "⎰",
				lmoust: "⎰",
				lnap: "⪉",
				lnapprox: "⪉",
				lne: "⪇",
				lnE: "≨",
				lneq: "⪇",
				lneqq: "≨",
				lnsim: "⋦",
				loang: "⟬",
				loarr: "⇽",
				lobrk: "⟦",
				longleftarrow: "⟵",
				LongLeftArrow: "⟵",
				Longleftarrow: "⟸",
				longleftrightarrow: "⟷",
				LongLeftRightArrow: "⟷",
				Longleftrightarrow: "⟺",
				longmapsto: "⟼",
				longrightarrow: "⟶",
				LongRightArrow: "⟶",
				Longrightarrow: "⟹",
				looparrowleft: "↫",
				looparrowright: "↬",
				lopar: "⦅",
				Lopf: "𝕃",
				lopf: "𝕝",
				loplus: "⨭",
				lotimes: "⨴",
				lowast: "∗",
				lowbar: "_",
				LowerLeftArrow: "↙",
				LowerRightArrow: "↘",
				loz: "◊",
				lozenge: "◊",
				lozf: "⧫",
				lpar: "(",
				lparlt: "⦓",
				lrarr: "⇆",
				lrcorner: "⌟",
				lrhar: "⇋",
				lrhard: "⥭",
				lrm: "‎",
				lrtri: "⊿",
				lsaquo: "‹",
				lscr: "𝓁",
				Lscr: "ℒ",
				lsh: "↰",
				Lsh: "↰",
				lsim: "≲",
				lsime: "⪍",
				lsimg: "⪏",
				lsqb: "[",
				lsquo: "‘",
				lsquor: "‚",
				Lstrok: "Ł",
				lstrok: "ł",
				ltcc: "⪦",
				ltcir: "⩹",
				lt: "<",
				LT: "<",
				Lt: "≪",
				ltdot: "⋖",
				lthree: "⋋",
				ltimes: "⋉",
				ltlarr: "⥶",
				ltquest: "⩻",
				ltri: "◃",
				ltrie: "⊴",
				ltrif: "◂",
				ltrPar: "⦖",
				lurdshar: "⥊",
				luruhar: "⥦",
				lvertneqq: "≨︀",
				lvnE: "≨︀",
				macr: "¯",
				male: "♂",
				malt: "✠",
				maltese: "✠",
				Map: "⤅",
				map: "↦",
				mapsto: "↦",
				mapstodown: "↧",
				mapstoleft: "↤",
				mapstoup: "↥",
				marker: "▮",
				mcomma: "⨩",
				Mcy: "М",
				mcy: "м",
				mdash: "—",
				mDDot: "∺",
				measuredangle: "∡",
				MediumSpace: " ",
				Mellintrf: "ℳ",
				Mfr: "𝔐",
				mfr: "𝔪",
				mho: "℧",
				micro: "µ",
				midast: "*",
				midcir: "⫰",
				mid: "∣",
				middot: "·",
				minusb: "⊟",
				minus: "−",
				minusd: "∸",
				minusdu: "⨪",
				MinusPlus: "∓",
				mlcp: "⫛",
				mldr: "…",
				mnplus: "∓",
				models: "⊧",
				Mopf: "𝕄",
				mopf: "𝕞",
				mp: "∓",
				mscr: "𝓂",
				Mscr: "ℳ",
				mstpos: "∾",
				Mu: "Μ",
				mu: "μ",
				multimap: "⊸",
				mumap: "⊸",
				nabla: "∇",
				Nacute: "Ń",
				nacute: "ń",
				nang: "∠⃒",
				nap: "≉",
				napE: "⩰̸",
				napid: "≋̸",
				napos: "ŉ",
				napprox: "≉",
				natural: "♮",
				naturals: "ℕ",
				natur: "♮",
				nbsp: " ",
				nbump: "≎̸",
				nbumpe: "≏̸",
				ncap: "⩃",
				Ncaron: "Ň",
				ncaron: "ň",
				Ncedil: "Ņ",
				ncedil: "ņ",
				ncong: "≇",
				ncongdot: "⩭̸",
				ncup: "⩂",
				Ncy: "Н",
				ncy: "н",
				ndash: "–",
				nearhk: "⤤",
				nearr: "↗",
				neArr: "⇗",
				nearrow: "↗",
				ne: "≠",
				nedot: "≐̸",
				NegativeMediumSpace: "​",
				NegativeThickSpace: "​",
				NegativeThinSpace: "​",
				NegativeVeryThinSpace: "​",
				nequiv: "≢",
				nesear: "⤨",
				nesim: "≂̸",
				NestedGreaterGreater: "≫",
				NestedLessLess: "≪",
				NewLine: `
`,
				nexist: "∄",
				nexists: "∄",
				Nfr: "𝔑",
				nfr: "𝔫",
				ngE: "≧̸",
				nge: "≱",
				ngeq: "≱",
				ngeqq: "≧̸",
				ngeqslant: "⩾̸",
				nges: "⩾̸",
				nGg: "⋙̸",
				ngsim: "≵",
				nGt: "≫⃒",
				ngt: "≯",
				ngtr: "≯",
				nGtv: "≫̸",
				nharr: "↮",
				nhArr: "⇎",
				nhpar: "⫲",
				ni: "∋",
				nis: "⋼",
				nisd: "⋺",
				niv: "∋",
				NJcy: "Њ",
				njcy: "њ",
				nlarr: "↚",
				nlArr: "⇍",
				nldr: "‥",
				nlE: "≦̸",
				nle: "≰",
				nleftarrow: "↚",
				nLeftarrow: "⇍",
				nleftrightarrow: "↮",
				nLeftrightarrow: "⇎",
				nleq: "≰",
				nleqq: "≦̸",
				nleqslant: "⩽̸",
				nles: "⩽̸",
				nless: "≮",
				nLl: "⋘̸",
				nlsim: "≴",
				nLt: "≪⃒",
				nlt: "≮",
				nltri: "⋪",
				nltrie: "⋬",
				nLtv: "≪̸",
				nmid: "∤",
				NoBreak: "⁠",
				NonBreakingSpace: " ",
				nopf: "𝕟",
				Nopf: "ℕ",
				Not: "⫬",
				not: "¬",
				NotCongruent: "≢",
				NotCupCap: "≭",
				NotDoubleVerticalBar: "∦",
				NotElement: "∉",
				NotEqual: "≠",
				NotEqualTilde: "≂̸",
				NotExists: "∄",
				NotGreater: "≯",
				NotGreaterEqual: "≱",
				NotGreaterFullEqual: "≧̸",
				NotGreaterGreater: "≫̸",
				NotGreaterLess: "≹",
				NotGreaterSlantEqual: "⩾̸",
				NotGreaterTilde: "≵",
				NotHumpDownHump: "≎̸",
				NotHumpEqual: "≏̸",
				notin: "∉",
				notindot: "⋵̸",
				notinE: "⋹̸",
				notinva: "∉",
				notinvb: "⋷",
				notinvc: "⋶",
				NotLeftTriangleBar: "⧏̸",
				NotLeftTriangle: "⋪",
				NotLeftTriangleEqual: "⋬",
				NotLess: "≮",
				NotLessEqual: "≰",
				NotLessGreater: "≸",
				NotLessLess: "≪̸",
				NotLessSlantEqual: "⩽̸",
				NotLessTilde: "≴",
				NotNestedGreaterGreater: "⪢̸",
				NotNestedLessLess: "⪡̸",
				notni: "∌",
				notniva: "∌",
				notnivb: "⋾",
				notnivc: "⋽",
				NotPrecedes: "⊀",
				NotPrecedesEqual: "⪯̸",
				NotPrecedesSlantEqual: "⋠",
				NotReverseElement: "∌",
				NotRightTriangleBar: "⧐̸",
				NotRightTriangle: "⋫",
				NotRightTriangleEqual: "⋭",
				NotSquareSubset: "⊏̸",
				NotSquareSubsetEqual: "⋢",
				NotSquareSuperset: "⊐̸",
				NotSquareSupersetEqual: "⋣",
				NotSubset: "⊂⃒",
				NotSubsetEqual: "⊈",
				NotSucceeds: "⊁",
				NotSucceedsEqual: "⪰̸",
				NotSucceedsSlantEqual: "⋡",
				NotSucceedsTilde: "≿̸",
				NotSuperset: "⊃⃒",
				NotSupersetEqual: "⊉",
				NotTilde: "≁",
				NotTildeEqual: "≄",
				NotTildeFullEqual: "≇",
				NotTildeTilde: "≉",
				NotVerticalBar: "∤",
				nparallel: "∦",
				npar: "∦",
				nparsl: "⫽⃥",
				npart: "∂̸",
				npolint: "⨔",
				npr: "⊀",
				nprcue: "⋠",
				nprec: "⊀",
				npreceq: "⪯̸",
				npre: "⪯̸",
				nrarrc: "⤳̸",
				nrarr: "↛",
				nrArr: "⇏",
				nrarrw: "↝̸",
				nrightarrow: "↛",
				nRightarrow: "⇏",
				nrtri: "⋫",
				nrtrie: "⋭",
				nsc: "⊁",
				nsccue: "⋡",
				nsce: "⪰̸",
				Nscr: "𝒩",
				nscr: "𝓃",
				nshortmid: "∤",
				nshortparallel: "∦",
				nsim: "≁",
				nsime: "≄",
				nsimeq: "≄",
				nsmid: "∤",
				nspar: "∦",
				nsqsube: "⋢",
				nsqsupe: "⋣",
				nsub: "⊄",
				nsubE: "⫅̸",
				nsube: "⊈",
				nsubset: "⊂⃒",
				nsubseteq: "⊈",
				nsubseteqq: "⫅̸",
				nsucc: "⊁",
				nsucceq: "⪰̸",
				nsup: "⊅",
				nsupE: "⫆̸",
				nsupe: "⊉",
				nsupset: "⊃⃒",
				nsupseteq: "⊉",
				nsupseteqq: "⫆̸",
				ntgl: "≹",
				Ntilde: "Ñ",
				ntilde: "ñ",
				ntlg: "≸",
				ntriangleleft: "⋪",
				ntrianglelefteq: "⋬",
				ntriangleright: "⋫",
				ntrianglerighteq: "⋭",
				Nu: "Ν",
				nu: "ν",
				num: "#",
				numero: "№",
				numsp: " ",
				nvap: "≍⃒",
				nvdash: "⊬",
				nvDash: "⊭",
				nVdash: "⊮",
				nVDash: "⊯",
				nvge: "≥⃒",
				nvgt: ">⃒",
				nvHarr: "⤄",
				nvinfin: "⧞",
				nvlArr: "⤂",
				nvle: "≤⃒",
				nvlt: "<⃒",
				nvltrie: "⊴⃒",
				nvrArr: "⤃",
				nvrtrie: "⊵⃒",
				nvsim: "∼⃒",
				nwarhk: "⤣",
				nwarr: "↖",
				nwArr: "⇖",
				nwarrow: "↖",
				nwnear: "⤧",
				Oacute: "Ó",
				oacute: "ó",
				oast: "⊛",
				Ocirc: "Ô",
				ocirc: "ô",
				ocir: "⊚",
				Ocy: "О",
				ocy: "о",
				odash: "⊝",
				Odblac: "Ő",
				odblac: "ő",
				odiv: "⨸",
				odot: "⊙",
				odsold: "⦼",
				OElig: "Œ",
				oelig: "œ",
				ofcir: "⦿",
				Ofr: "𝔒",
				ofr: "𝔬",
				ogon: "˛",
				Ograve: "Ò",
				ograve: "ò",
				ogt: "⧁",
				ohbar: "⦵",
				ohm: "Ω",
				oint: "∮",
				olarr: "↺",
				olcir: "⦾",
				olcross: "⦻",
				oline: "‾",
				olt: "⧀",
				Omacr: "Ō",
				omacr: "ō",
				Omega: "Ω",
				omega: "ω",
				Omicron: "Ο",
				omicron: "ο",
				omid: "⦶",
				ominus: "⊖",
				Oopf: "𝕆",
				oopf: "𝕠",
				opar: "⦷",
				OpenCurlyDoubleQuote: "“",
				OpenCurlyQuote: "‘",
				operp: "⦹",
				oplus: "⊕",
				orarr: "↻",
				Or: "⩔",
				or: "∨",
				ord: "⩝",
				order: "ℴ",
				orderof: "ℴ",
				ordf: "ª",
				ordm: "º",
				origof: "⊶",
				oror: "⩖",
				orslope: "⩗",
				orv: "⩛",
				oS: "Ⓢ",
				Oscr: "𝒪",
				oscr: "ℴ",
				Oslash: "Ø",
				oslash: "ø",
				osol: "⊘",
				Otilde: "Õ",
				otilde: "õ",
				otimesas: "⨶",
				Otimes: "⨷",
				otimes: "⊗",
				Ouml: "Ö",
				ouml: "ö",
				ovbar: "⌽",
				OverBar: "‾",
				OverBrace: "⏞",
				OverBracket: "⎴",
				OverParenthesis: "⏜",
				para: "¶",
				parallel: "∥",
				par: "∥",
				parsim: "⫳",
				parsl: "⫽",
				part: "∂",
				PartialD: "∂",
				Pcy: "П",
				pcy: "п",
				percnt: "%",
				period: ".",
				permil: "‰",
				perp: "⊥",
				pertenk: "‱",
				Pfr: "𝔓",
				pfr: "𝔭",
				Phi: "Φ",
				phi: "φ",
				phiv: "ϕ",
				phmmat: "ℳ",
				phone: "☎",
				Pi: "Π",
				pi: "π",
				pitchfork: "⋔",
				piv: "ϖ",
				planck: "ℏ",
				planckh: "ℎ",
				plankv: "ℏ",
				plusacir: "⨣",
				plusb: "⊞",
				pluscir: "⨢",
				plus: "+",
				plusdo: "∔",
				plusdu: "⨥",
				pluse: "⩲",
				PlusMinus: "±",
				plusmn: "±",
				plussim: "⨦",
				plustwo: "⨧",
				pm: "±",
				Poincareplane: "ℌ",
				pointint: "⨕",
				popf: "𝕡",
				Popf: "ℙ",
				pound: "£",
				prap: "⪷",
				Pr: "⪻",
				pr: "≺",
				prcue: "≼",
				precapprox: "⪷",
				prec: "≺",
				preccurlyeq: "≼",
				Precedes: "≺",
				PrecedesEqual: "⪯",
				PrecedesSlantEqual: "≼",
				PrecedesTilde: "≾",
				preceq: "⪯",
				precnapprox: "⪹",
				precneqq: "⪵",
				precnsim: "⋨",
				pre: "⪯",
				prE: "⪳",
				precsim: "≾",
				prime: "′",
				Prime: "″",
				primes: "ℙ",
				prnap: "⪹",
				prnE: "⪵",
				prnsim: "⋨",
				prod: "∏",
				Product: "∏",
				profalar: "⌮",
				profline: "⌒",
				profsurf: "⌓",
				prop: "∝",
				Proportional: "∝",
				Proportion: "∷",
				propto: "∝",
				prsim: "≾",
				prurel: "⊰",
				Pscr: "𝒫",
				pscr: "𝓅",
				Psi: "Ψ",
				psi: "ψ",
				puncsp: " ",
				Qfr: "𝔔",
				qfr: "𝔮",
				qint: "⨌",
				qopf: "𝕢",
				Qopf: "ℚ",
				qprime: "⁗",
				Qscr: "𝒬",
				qscr: "𝓆",
				quaternions: "ℍ",
				quatint: "⨖",
				quest: "?",
				questeq: "≟",
				quot: '"',
				QUOT: '"',
				rAarr: "⇛",
				race: "∽̱",
				Racute: "Ŕ",
				racute: "ŕ",
				radic: "√",
				raemptyv: "⦳",
				rang: "⟩",
				Rang: "⟫",
				rangd: "⦒",
				range: "⦥",
				rangle: "⟩",
				raquo: "»",
				rarrap: "⥵",
				rarrb: "⇥",
				rarrbfs: "⤠",
				rarrc: "⤳",
				rarr: "→",
				Rarr: "↠",
				rArr: "⇒",
				rarrfs: "⤞",
				rarrhk: "↪",
				rarrlp: "↬",
				rarrpl: "⥅",
				rarrsim: "⥴",
				Rarrtl: "⤖",
				rarrtl: "↣",
				rarrw: "↝",
				ratail: "⤚",
				rAtail: "⤜",
				ratio: "∶",
				rationals: "ℚ",
				rbarr: "⤍",
				rBarr: "⤏",
				RBarr: "⤐",
				rbbrk: "❳",
				rbrace: "}",
				rbrack: "]",
				rbrke: "⦌",
				rbrksld: "⦎",
				rbrkslu: "⦐",
				Rcaron: "Ř",
				rcaron: "ř",
				Rcedil: "Ŗ",
				rcedil: "ŗ",
				rceil: "⌉",
				rcub: "}",
				Rcy: "Р",
				rcy: "р",
				rdca: "⤷",
				rdldhar: "⥩",
				rdquo: "”",
				rdquor: "”",
				rdsh: "↳",
				real: "ℜ",
				realine: "ℛ",
				realpart: "ℜ",
				reals: "ℝ",
				Re: "ℜ",
				rect: "▭",
				reg: "®",
				REG: "®",
				ReverseElement: "∋",
				ReverseEquilibrium: "⇋",
				ReverseUpEquilibrium: "⥯",
				rfisht: "⥽",
				rfloor: "⌋",
				rfr: "𝔯",
				Rfr: "ℜ",
				rHar: "⥤",
				rhard: "⇁",
				rharu: "⇀",
				rharul: "⥬",
				Rho: "Ρ",
				rho: "ρ",
				rhov: "ϱ",
				RightAngleBracket: "⟩",
				RightArrowBar: "⇥",
				rightarrow: "→",
				RightArrow: "→",
				Rightarrow: "⇒",
				RightArrowLeftArrow: "⇄",
				rightarrowtail: "↣",
				RightCeiling: "⌉",
				RightDoubleBracket: "⟧",
				RightDownTeeVector: "⥝",
				RightDownVectorBar: "⥕",
				RightDownVector: "⇂",
				RightFloor: "⌋",
				rightharpoondown: "⇁",
				rightharpoonup: "⇀",
				rightleftarrows: "⇄",
				rightleftharpoons: "⇌",
				rightrightarrows: "⇉",
				rightsquigarrow: "↝",
				RightTeeArrow: "↦",
				RightTee: "⊢",
				RightTeeVector: "⥛",
				rightthreetimes: "⋌",
				RightTriangleBar: "⧐",
				RightTriangle: "⊳",
				RightTriangleEqual: "⊵",
				RightUpDownVector: "⥏",
				RightUpTeeVector: "⥜",
				RightUpVectorBar: "⥔",
				RightUpVector: "↾",
				RightVectorBar: "⥓",
				RightVector: "⇀",
				ring: "˚",
				risingdotseq: "≓",
				rlarr: "⇄",
				rlhar: "⇌",
				rlm: "‏",
				rmoustache: "⎱",
				rmoust: "⎱",
				rnmid: "⫮",
				roang: "⟭",
				roarr: "⇾",
				robrk: "⟧",
				ropar: "⦆",
				ropf: "𝕣",
				Ropf: "ℝ",
				roplus: "⨮",
				rotimes: "⨵",
				RoundImplies: "⥰",
				rpar: ")",
				rpargt: "⦔",
				rppolint: "⨒",
				rrarr: "⇉",
				Rrightarrow: "⇛",
				rsaquo: "›",
				rscr: "𝓇",
				Rscr: "ℛ",
				rsh: "↱",
				Rsh: "↱",
				rsqb: "]",
				rsquo: "’",
				rsquor: "’",
				rthree: "⋌",
				rtimes: "⋊",
				rtri: "▹",
				rtrie: "⊵",
				rtrif: "▸",
				rtriltri: "⧎",
				RuleDelayed: "⧴",
				ruluhar: "⥨",
				rx: "℞",
				Sacute: "Ś",
				sacute: "ś",
				sbquo: "‚",
				scap: "⪸",
				Scaron: "Š",
				scaron: "š",
				Sc: "⪼",
				sc: "≻",
				sccue: "≽",
				sce: "⪰",
				scE: "⪴",
				Scedil: "Ş",
				scedil: "ş",
				Scirc: "Ŝ",
				scirc: "ŝ",
				scnap: "⪺",
				scnE: "⪶",
				scnsim: "⋩",
				scpolint: "⨓",
				scsim: "≿",
				Scy: "С",
				scy: "с",
				sdotb: "⊡",
				sdot: "⋅",
				sdote: "⩦",
				searhk: "⤥",
				searr: "↘",
				seArr: "⇘",
				searrow: "↘",
				sect: "§",
				semi: ";",
				seswar: "⤩",
				setminus: "∖",
				setmn: "∖",
				sext: "✶",
				Sfr: "𝔖",
				sfr: "𝔰",
				sfrown: "⌢",
				sharp: "♯",
				SHCHcy: "Щ",
				shchcy: "щ",
				SHcy: "Ш",
				shcy: "ш",
				ShortDownArrow: "↓",
				ShortLeftArrow: "←",
				shortmid: "∣",
				shortparallel: "∥",
				ShortRightArrow: "→",
				ShortUpArrow: "↑",
				shy: "­",
				Sigma: "Σ",
				sigma: "σ",
				sigmaf: "ς",
				sigmav: "ς",
				sim: "∼",
				simdot: "⩪",
				sime: "≃",
				simeq: "≃",
				simg: "⪞",
				simgE: "⪠",
				siml: "⪝",
				simlE: "⪟",
				simne: "≆",
				simplus: "⨤",
				simrarr: "⥲",
				slarr: "←",
				SmallCircle: "∘",
				smallsetminus: "∖",
				smashp: "⨳",
				smeparsl: "⧤",
				smid: "∣",
				smile: "⌣",
				smt: "⪪",
				smte: "⪬",
				smtes: "⪬︀",
				SOFTcy: "Ь",
				softcy: "ь",
				solbar: "⌿",
				solb: "⧄",
				sol: "/",
				Sopf: "𝕊",
				sopf: "𝕤",
				spades: "♠",
				spadesuit: "♠",
				spar: "∥",
				sqcap: "⊓",
				sqcaps: "⊓︀",
				sqcup: "⊔",
				sqcups: "⊔︀",
				Sqrt: "√",
				sqsub: "⊏",
				sqsube: "⊑",
				sqsubset: "⊏",
				sqsubseteq: "⊑",
				sqsup: "⊐",
				sqsupe: "⊒",
				sqsupset: "⊐",
				sqsupseteq: "⊒",
				square: "□",
				Square: "□",
				SquareIntersection: "⊓",
				SquareSubset: "⊏",
				SquareSubsetEqual: "⊑",
				SquareSuperset: "⊐",
				SquareSupersetEqual: "⊒",
				SquareUnion: "⊔",
				squarf: "▪",
				squ: "□",
				squf: "▪",
				srarr: "→",
				Sscr: "𝒮",
				sscr: "𝓈",
				ssetmn: "∖",
				ssmile: "⌣",
				sstarf: "⋆",
				Star: "⋆",
				star: "☆",
				starf: "★",
				straightepsilon: "ϵ",
				straightphi: "ϕ",
				strns: "¯",
				sub: "⊂",
				Sub: "⋐",
				subdot: "⪽",
				subE: "⫅",
				sube: "⊆",
				subedot: "⫃",
				submult: "⫁",
				subnE: "⫋",
				subne: "⊊",
				subplus: "⪿",
				subrarr: "⥹",
				subset: "⊂",
				Subset: "⋐",
				subseteq: "⊆",
				subseteqq: "⫅",
				SubsetEqual: "⊆",
				subsetneq: "⊊",
				subsetneqq: "⫋",
				subsim: "⫇",
				subsub: "⫕",
				subsup: "⫓",
				succapprox: "⪸",
				succ: "≻",
				succcurlyeq: "≽",
				Succeeds: "≻",
				SucceedsEqual: "⪰",
				SucceedsSlantEqual: "≽",
				SucceedsTilde: "≿",
				succeq: "⪰",
				succnapprox: "⪺",
				succneqq: "⪶",
				succnsim: "⋩",
				succsim: "≿",
				SuchThat: "∋",
				sum: "∑",
				Sum: "∑",
				sung: "♪",
				sup1: "¹",
				sup2: "²",
				sup3: "³",
				sup: "⊃",
				Sup: "⋑",
				supdot: "⪾",
				supdsub: "⫘",
				supE: "⫆",
				supe: "⊇",
				supedot: "⫄",
				Superset: "⊃",
				SupersetEqual: "⊇",
				suphsol: "⟉",
				suphsub: "⫗",
				suplarr: "⥻",
				supmult: "⫂",
				supnE: "⫌",
				supne: "⊋",
				supplus: "⫀",
				supset: "⊃",
				Supset: "⋑",
				supseteq: "⊇",
				supseteqq: "⫆",
				supsetneq: "⊋",
				supsetneqq: "⫌",
				supsim: "⫈",
				supsub: "⫔",
				supsup: "⫖",
				swarhk: "⤦",
				swarr: "↙",
				swArr: "⇙",
				swarrow: "↙",
				swnwar: "⤪",
				szlig: "ß",
				Tab: "	",
				target: "⌖",
				Tau: "Τ",
				tau: "τ",
				tbrk: "⎴",
				Tcaron: "Ť",
				tcaron: "ť",
				Tcedil: "Ţ",
				tcedil: "ţ",
				Tcy: "Т",
				tcy: "т",
				tdot: "⃛",
				telrec: "⌕",
				Tfr: "𝔗",
				tfr: "𝔱",
				there4: "∴",
				therefore: "∴",
				Therefore: "∴",
				Theta: "Θ",
				theta: "θ",
				thetasym: "ϑ",
				thetav: "ϑ",
				thickapprox: "≈",
				thicksim: "∼",
				ThickSpace: "  ",
				ThinSpace: " ",
				thinsp: " ",
				thkap: "≈",
				thksim: "∼",
				THORN: "Þ",
				thorn: "þ",
				tilde: "˜",
				Tilde: "∼",
				TildeEqual: "≃",
				TildeFullEqual: "≅",
				TildeTilde: "≈",
				timesbar: "⨱",
				timesb: "⊠",
				times: "×",
				timesd: "⨰",
				tint: "∭",
				toea: "⤨",
				topbot: "⌶",
				topcir: "⫱",
				top: "⊤",
				Topf: "𝕋",
				topf: "𝕥",
				topfork: "⫚",
				tosa: "⤩",
				tprime: "‴",
				trade: "™",
				TRADE: "™",
				triangle: "▵",
				triangledown: "▿",
				triangleleft: "◃",
				trianglelefteq: "⊴",
				triangleq: "≜",
				triangleright: "▹",
				trianglerighteq: "⊵",
				tridot: "◬",
				trie: "≜",
				triminus: "⨺",
				TripleDot: "⃛",
				triplus: "⨹",
				trisb: "⧍",
				tritime: "⨻",
				trpezium: "⏢",
				Tscr: "𝒯",
				tscr: "𝓉",
				TScy: "Ц",
				tscy: "ц",
				TSHcy: "Ћ",
				tshcy: "ћ",
				Tstrok: "Ŧ",
				tstrok: "ŧ",
				twixt: "≬",
				twoheadleftarrow: "↞",
				twoheadrightarrow: "↠",
				Uacute: "Ú",
				uacute: "ú",
				uarr: "↑",
				Uarr: "↟",
				uArr: "⇑",
				Uarrocir: "⥉",
				Ubrcy: "Ў",
				ubrcy: "ў",
				Ubreve: "Ŭ",
				ubreve: "ŭ",
				Ucirc: "Û",
				ucirc: "û",
				Ucy: "У",
				ucy: "у",
				udarr: "⇅",
				Udblac: "Ű",
				udblac: "ű",
				udhar: "⥮",
				ufisht: "⥾",
				Ufr: "𝔘",
				ufr: "𝔲",
				Ugrave: "Ù",
				ugrave: "ù",
				uHar: "⥣",
				uharl: "↿",
				uharr: "↾",
				uhblk: "▀",
				ulcorn: "⌜",
				ulcorner: "⌜",
				ulcrop: "⌏",
				ultri: "◸",
				Umacr: "Ū",
				umacr: "ū",
				uml: "¨",
				UnderBar: "_",
				UnderBrace: "⏟",
				UnderBracket: "⎵",
				UnderParenthesis: "⏝",
				Union: "⋃",
				UnionPlus: "⊎",
				Uogon: "Ų",
				uogon: "ų",
				Uopf: "𝕌",
				uopf: "𝕦",
				UpArrowBar: "⤒",
				uparrow: "↑",
				UpArrow: "↑",
				Uparrow: "⇑",
				UpArrowDownArrow: "⇅",
				updownarrow: "↕",
				UpDownArrow: "↕",
				Updownarrow: "⇕",
				UpEquilibrium: "⥮",
				upharpoonleft: "↿",
				upharpoonright: "↾",
				uplus: "⊎",
				UpperLeftArrow: "↖",
				UpperRightArrow: "↗",
				upsi: "υ",
				Upsi: "ϒ",
				upsih: "ϒ",
				Upsilon: "Υ",
				upsilon: "υ",
				UpTeeArrow: "↥",
				UpTee: "⊥",
				upuparrows: "⇈",
				urcorn: "⌝",
				urcorner: "⌝",
				urcrop: "⌎",
				Uring: "Ů",
				uring: "ů",
				urtri: "◹",
				Uscr: "𝒰",
				uscr: "𝓊",
				utdot: "⋰",
				Utilde: "Ũ",
				utilde: "ũ",
				utri: "▵",
				utrif: "▴",
				uuarr: "⇈",
				Uuml: "Ü",
				uuml: "ü",
				uwangle: "⦧",
				vangrt: "⦜",
				varepsilon: "ϵ",
				varkappa: "ϰ",
				varnothing: "∅",
				varphi: "ϕ",
				varpi: "ϖ",
				varpropto: "∝",
				varr: "↕",
				vArr: "⇕",
				varrho: "ϱ",
				varsigma: "ς",
				varsubsetneq: "⊊︀",
				varsubsetneqq: "⫋︀",
				varsupsetneq: "⊋︀",
				varsupsetneqq: "⫌︀",
				vartheta: "ϑ",
				vartriangleleft: "⊲",
				vartriangleright: "⊳",
				vBar: "⫨",
				Vbar: "⫫",
				vBarv: "⫩",
				Vcy: "В",
				vcy: "в",
				vdash: "⊢",
				vDash: "⊨",
				Vdash: "⊩",
				VDash: "⊫",
				Vdashl: "⫦",
				veebar: "⊻",
				vee: "∨",
				Vee: "⋁",
				veeeq: "≚",
				vellip: "⋮",
				verbar: "|",
				Verbar: "‖",
				vert: "|",
				Vert: "‖",
				VerticalBar: "∣",
				VerticalLine: "|",
				VerticalSeparator: "❘",
				VerticalTilde: "≀",
				VeryThinSpace: " ",
				Vfr: "𝔙",
				vfr: "𝔳",
				vltri: "⊲",
				vnsub: "⊂⃒",
				vnsup: "⊃⃒",
				Vopf: "𝕍",
				vopf: "𝕧",
				vprop: "∝",
				vrtri: "⊳",
				Vscr: "𝒱",
				vscr: "𝓋",
				vsubnE: "⫋︀",
				vsubne: "⊊︀",
				vsupnE: "⫌︀",
				vsupne: "⊋︀",
				Vvdash: "⊪",
				vzigzag: "⦚",
				Wcirc: "Ŵ",
				wcirc: "ŵ",
				wedbar: "⩟",
				wedge: "∧",
				Wedge: "⋀",
				wedgeq: "≙",
				weierp: "℘",
				Wfr: "𝔚",
				wfr: "𝔴",
				Wopf: "𝕎",
				wopf: "𝕨",
				wp: "℘",
				wr: "≀",
				wreath: "≀",
				Wscr: "𝒲",
				wscr: "𝓌",
				xcap: "⋂",
				xcirc: "◯",
				xcup: "⋃",
				xdtri: "▽",
				Xfr: "𝔛",
				xfr: "𝔵",
				xharr: "⟷",
				xhArr: "⟺",
				Xi: "Ξ",
				xi: "ξ",
				xlarr: "⟵",
				xlArr: "⟸",
				xmap: "⟼",
				xnis: "⋻",
				xodot: "⨀",
				Xopf: "𝕏",
				xopf: "𝕩",
				xoplus: "⨁",
				xotime: "⨂",
				xrarr: "⟶",
				xrArr: "⟹",
				Xscr: "𝒳",
				xscr: "𝓍",
				xsqcup: "⨆",
				xuplus: "⨄",
				xutri: "△",
				xvee: "⋁",
				xwedge: "⋀",
				Yacute: "Ý",
				yacute: "ý",
				YAcy: "Я",
				yacy: "я",
				Ycirc: "Ŷ",
				ycirc: "ŷ",
				Ycy: "Ы",
				ycy: "ы",
				yen: "¥",
				Yfr: "𝔜",
				yfr: "𝔶",
				YIcy: "Ї",
				yicy: "ї",
				Yopf: "𝕐",
				yopf: "𝕪",
				Yscr: "𝒴",
				yscr: "𝓎",
				YUcy: "Ю",
				yucy: "ю",
				yuml: "ÿ",
				Yuml: "Ÿ",
				Zacute: "Ź",
				zacute: "ź",
				Zcaron: "Ž",
				zcaron: "ž",
				Zcy: "З",
				zcy: "з",
				Zdot: "Ż",
				zdot: "ż",
				zeetrf: "ℨ",
				ZeroWidthSpace: "​",
				Zeta: "Ζ",
				zeta: "ζ",
				zfr: "𝔷",
				Zfr: "ℨ",
				ZHcy: "Ж",
				zhcy: "ж",
				zigrarr: "⇝",
				zopf: "𝕫",
				Zopf: "ℤ",
				Zscr: "𝒵",
				zscr: "𝓏",
				zwj: "‍",
				zwnj: "‌",
			};
		},
	}),
	Lr = z({
		"node_modules/markdown-it/lib/common/entities.js"(r, s) {
			s.exports = Du();
		},
	}),
	er = z({
		"node_modules/uc.micro/categories/P/regex.js"(r, s) {
			s.exports =
				/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
		},
	}),
	xu = z({
		"node_modules/mdurl/encode.js"(r, s) {
			var l = {};
			function u(t) {
				var n,
					e,
					o = l[t];
				if (o) return o;
				for (o = l[t] = [], n = 0; n < 128; n++)
					(e = String.fromCharCode(n)),
						/^[0-9a-z]$/i.test(e)
							? o.push(e)
							: o.push(
									"%" +
										(
											"0" + n.toString(16).toUpperCase()
										).slice(-2),
								);
				for (n = 0; n < t.length; n++) o[t.charCodeAt(n)] = t[n];
				return o;
			}
			function i(t, n, e) {
				var o,
					a,
					p,
					c,
					d,
					h = "";
				for (
					typeof n != "string" && ((e = n), (n = i.defaultChars)),
						typeof e > "u" && (e = !0),
						d = u(n),
						o = 0,
						a = t.length;
					o < a;
					o++
				) {
					if (
						((p = t.charCodeAt(o)),
						e &&
							p === 37 &&
							o + 2 < a &&
							/^[0-9a-f]{2}$/i.test(t.slice(o + 1, o + 3)))
					) {
						(h += t.slice(o, o + 3)), (o += 2);
						continue;
					}
					if (p < 128) {
						h += d[p];
						continue;
					}
					if (p >= 55296 && p <= 57343) {
						if (
							p >= 55296 &&
							p <= 56319 &&
							o + 1 < a &&
							((c = t.charCodeAt(o + 1)),
							c >= 56320 && c <= 57343)
						) {
							(h += encodeURIComponent(t[o] + t[o + 1])), o++;
							continue;
						}
						h += "%EF%BF%BD";
						continue;
					}
					h += encodeURIComponent(t[o]);
				}
				return h;
			}
			(i.defaultChars = ";/?:@&=+$,-_.!~*'()#"),
				(i.componentChars = "-_.!~*'()"),
				(s.exports = i);
		},
	}),
	Eu = z({
		"node_modules/mdurl/decode.js"(r, s) {
			var l = {};
			function u(t) {
				var n,
					e,
					o = l[t];
				if (o) return o;
				for (o = l[t] = [], n = 0; n < 128; n++)
					(e = String.fromCharCode(n)), o.push(e);
				for (n = 0; n < t.length; n++)
					(e = t.charCodeAt(n)),
						(o[e] =
							"%" +
							("0" + e.toString(16).toUpperCase()).slice(-2));
				return o;
			}
			function i(t, n) {
				var e;
				return (
					typeof n != "string" && (n = i.defaultChars),
					(e = u(n)),
					t.replace(/(%[a-f0-9]{2})+/gi, function (o) {
						var a,
							p,
							c,
							d,
							h,
							y,
							m,
							A = "";
						for (a = 0, p = o.length; a < p; a += 3) {
							if (
								((c = parseInt(o.slice(a + 1, a + 3), 16)),
								c < 128)
							) {
								A += e[c];
								continue;
							}
							if (
								(c & 224) === 192 &&
								a + 3 < p &&
								((d = parseInt(o.slice(a + 4, a + 6), 16)),
								(d & 192) === 128)
							) {
								(m = ((c << 6) & 1984) | (d & 63)),
									m < 128
										? (A += "��")
										: (A += String.fromCharCode(m)),
									(a += 3);
								continue;
							}
							if (
								(c & 240) === 224 &&
								a + 6 < p &&
								((d = parseInt(o.slice(a + 4, a + 6), 16)),
								(h = parseInt(o.slice(a + 7, a + 9), 16)),
								(d & 192) === 128 && (h & 192) === 128)
							) {
								(m =
									((c << 12) & 61440) |
									((d << 6) & 4032) |
									(h & 63)),
									m < 2048 || (m >= 55296 && m <= 57343)
										? (A += "���")
										: (A += String.fromCharCode(m)),
									(a += 6);
								continue;
							}
							if (
								(c & 248) === 240 &&
								a + 9 < p &&
								((d = parseInt(o.slice(a + 4, a + 6), 16)),
								(h = parseInt(o.slice(a + 7, a + 9), 16)),
								(y = parseInt(o.slice(a + 10, a + 12), 16)),
								(d & 192) === 128 &&
									(h & 192) === 128 &&
									(y & 192) === 128)
							) {
								(m =
									((c << 18) & 1835008) |
									((d << 12) & 258048) |
									((h << 6) & 4032) |
									(y & 63)),
									m < 65536 || m > 1114111
										? (A += "����")
										: ((m -= 65536),
											(A += String.fromCharCode(
												55296 + (m >> 10),
												56320 + (m & 1023),
											))),
									(a += 9);
								continue;
							}
							A += "�";
						}
						return A;
					})
				);
			}
			(i.defaultChars = ";/?:@&=+$,#"),
				(i.componentChars = ""),
				(s.exports = i);
		},
	}),
	Fu = z({
		"node_modules/mdurl/format.js"(r, s) {
			s.exports = function (u) {
				var i = "";
				return (
					(i += u.protocol || ""),
					(i += u.slashes ? "//" : ""),
					(i += u.auth ? u.auth + "@" : ""),
					u.hostname && u.hostname.indexOf(":") !== -1
						? (i += "[" + u.hostname + "]")
						: (i += u.hostname || ""),
					(i += u.port ? ":" + u.port : ""),
					(i += u.pathname || ""),
					(i += u.search || ""),
					(i += u.hash || ""),
					i
				);
			};
		},
	}),
	wu = z({
		"node_modules/mdurl/parse.js"(r, s) {
			function l() {
				(this.protocol = null),
					(this.slashes = null),
					(this.auth = null),
					(this.port = null),
					(this.hostname = null),
					(this.hash = null),
					(this.search = null),
					(this.pathname = null);
			}
			var u = /^([a-z0-9.+-]+:)/i,
				i = /:[0-9]*$/,
				t = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
				n = [
					"<",
					">",
					'"',
					"`",
					" ",
					"\r",
					`
`,
					"	",
				],
				e = ["{", "}", "|", "\\", "^", "`"].concat(n),
				o = ["'"].concat(e),
				a = ["%", "/", "?", ";", "#"].concat(o),
				p = ["/", "?", "#"],
				c = 255,
				d = /^[+a-z0-9A-Z_-]{0,63}$/,
				h = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
				y = { javascript: !0, "javascript:": !0 },
				m = {
					http: !0,
					https: !0,
					ftp: !0,
					gopher: !0,
					file: !0,
					"http:": !0,
					"https:": !0,
					"ftp:": !0,
					"gopher:": !0,
					"file:": !0,
				};
			function A(E, w) {
				if (E && E instanceof l) return E;
				var C = new l();
				return C.parse(E, w), C;
			}
			(l.prototype.parse = function (E, w) {
				var C,
					x,
					v,
					k,
					F,
					B = E;
				if (((B = B.trim()), !w && E.split("#").length === 1)) {
					var I = t.exec(B);
					if (I)
						return (
							(this.pathname = I[1]),
							I[2] && (this.search = I[2]),
							this
						);
				}
				var S = u.exec(B);
				if (
					(S &&
						((S = S[0]),
						(v = S.toLowerCase()),
						(this.protocol = S),
						(B = B.substr(S.length))),
					(w || S || B.match(/^\/\/[^@\/]+@[^@\/]+/)) &&
						((F = B.substr(0, 2) === "//"),
						F &&
							!(S && y[S]) &&
							((B = B.substr(2)), (this.slashes = !0))),
					!y[S] && (F || (S && !m[S])))
				) {
					var O = -1;
					for (C = 0; C < p.length; C++)
						(k = B.indexOf(p[C])),
							k !== -1 && (O === -1 || k < O) && (O = k);
					var j, R;
					for (
						O === -1
							? (R = B.lastIndexOf("@"))
							: (R = B.lastIndexOf("@", O)),
							R !== -1 &&
								((j = B.slice(0, R)),
								(B = B.slice(R + 1)),
								(this.auth = j)),
							O = -1,
							C = 0;
						C < a.length;
						C++
					)
						(k = B.indexOf(a[C])),
							k !== -1 && (O === -1 || k < O) && (O = k);
					O === -1 && (O = B.length), B[O - 1] === ":" && O--;
					var q = B.slice(0, O);
					(B = B.slice(O)),
						this.parseHost(q),
						(this.hostname = this.hostname || "");
					var T =
						this.hostname[0] === "[" &&
						this.hostname[this.hostname.length - 1] === "]";
					if (!T) {
						var M = this.hostname.split(/\./);
						for (C = 0, x = M.length; C < x; C++) {
							var N = M[C];
							if (N && !N.match(d)) {
								for (
									var V = "", W = 0, K = N.length;
									W < K;
									W++
								)
									N.charCodeAt(W) > 127
										? (V += "x")
										: (V += N[W]);
								if (!V.match(d)) {
									var re = M.slice(0, C),
										H = M.slice(C + 1),
										X = N.match(h);
									X && (re.push(X[1]), H.unshift(X[2])),
										H.length && (B = H.join(".") + B),
										(this.hostname = re.join("."));
									break;
								}
							}
						}
					}
					this.hostname.length > c && (this.hostname = ""),
						T &&
							(this.hostname = this.hostname.substr(
								1,
								this.hostname.length - 2,
							));
				}
				var ue = B.indexOf("#");
				ue !== -1 && ((this.hash = B.substr(ue)), (B = B.slice(0, ue)));
				var ne = B.indexOf("?");
				return (
					ne !== -1 &&
						((this.search = B.substr(ne)), (B = B.slice(0, ne))),
					B && (this.pathname = B),
					m[v] &&
						this.hostname &&
						!this.pathname &&
						(this.pathname = ""),
					this
				);
			}),
				(l.prototype.parseHost = function (E) {
					var w = i.exec(E);
					w &&
						((w = w[0]),
						w !== ":" && (this.port = w.substr(1)),
						(E = E.substr(0, E.length - w.length))),
						E && (this.hostname = E);
				}),
				(s.exports = A);
		},
	}),
	Vr = z({
		"node_modules/mdurl/index.js"(r, s) {
			(s.exports.encode = xu()),
				(s.exports.decode = Eu()),
				(s.exports.format = Fu()),
				(s.exports.parse = wu());
		},
	}),
	Ur = z({
		"node_modules/uc.micro/properties/Any/regex.js"(r, s) {
			s.exports =
				/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
		},
	}),
	Zr = z({
		"node_modules/uc.micro/categories/Cc/regex.js"(r, s) {
			s.exports = /[\0-\x1F\x7F-\x9F]/;
		},
	}),
	Bu = z({
		"node_modules/uc.micro/categories/Cf/regex.js"(r, s) {
			s.exports =
				/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
		},
	}),
	Gr = z({
		"node_modules/uc.micro/categories/Z/regex.js"(r, s) {
			s.exports =
				/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
		},
	}),
	qu = z({
		"node_modules/uc.micro/index.js"(r) {
			(r.Any = Ur()),
				(r.Cc = Zr()),
				(r.Cf = Bu()),
				(r.P = er()),
				(r.Z = Gr());
		},
	}),
	Y = z({
		"node_modules/markdown-it/lib/common/utils.js"(r) {
			function s(q) {
				return Object.prototype.toString.call(q);
			}
			function l(q) {
				return s(q) === "[object String]";
			}
			var u = Object.prototype.hasOwnProperty;
			function i(q, T) {
				return u.call(q, T);
			}
			function t(q) {
				var T = Array.prototype.slice.call(arguments, 1);
				return (
					T.forEach(function (M) {
						if (M) {
							if (typeof M != "object")
								throw new TypeError(M + "must be object");
							Object.keys(M).forEach(function (N) {
								q[N] = M[N];
							});
						}
					}),
					q
				);
			}
			function n(q, T, M) {
				return [].concat(q.slice(0, T), M, q.slice(T + 1));
			}
			function e(q) {
				return !(
					(q >= 55296 && q <= 57343) ||
					(q >= 64976 && q <= 65007) ||
					(q & 65535) === 65535 ||
					(q & 65535) === 65534 ||
					(q >= 0 && q <= 8) ||
					q === 11 ||
					(q >= 14 && q <= 31) ||
					(q >= 127 && q <= 159) ||
					q > 1114111
				);
			}
			function o(q) {
				if (q > 65535) {
					q -= 65536;
					var T = 55296 + (q >> 10),
						M = 56320 + (q & 1023);
					return String.fromCharCode(T, M);
				}
				return String.fromCharCode(q);
			}
			var a = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
				p = /&([a-z#][a-z0-9]{1,31});/gi,
				c = new RegExp(a.source + "|" + p.source, "gi"),
				d = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
				h = Lr();
			function y(q, T) {
				var M = 0;
				return i(h, T)
					? h[T]
					: T.charCodeAt(0) === 35 &&
						  d.test(T) &&
						  ((M =
								T[1].toLowerCase() === "x"
									? parseInt(T.slice(2), 16)
									: parseInt(T.slice(1), 10)),
						  e(M))
						? o(M)
						: q;
			}
			function m(q) {
				return q.indexOf("\\") < 0 ? q : q.replace(a, "$1");
			}
			function A(q) {
				return q.indexOf("\\") < 0 && q.indexOf("&") < 0
					? q
					: q.replace(c, function (T, M, N) {
							return M || y(T, N);
						});
			}
			var E = /[&<>"]/,
				w = /[&<>"]/g,
				C = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
			function x(q) {
				return C[q];
			}
			function v(q) {
				return E.test(q) ? q.replace(w, x) : q;
			}
			var k = /[.?*+^$[\]\\(){}|-]/g;
			function F(q) {
				return q.replace(k, "\\$&");
			}
			function B(q) {
				switch (q) {
					case 9:
					case 32:
						return !0;
				}
				return !1;
			}
			function I(q) {
				if (q >= 8192 && q <= 8202) return !0;
				switch (q) {
					case 9:
					case 10:
					case 11:
					case 12:
					case 13:
					case 32:
					case 160:
					case 5760:
					case 8239:
					case 8287:
					case 12288:
						return !0;
				}
				return !1;
			}
			var S = er();
			function O(q) {
				return S.test(q);
			}
			function j(q) {
				switch (q) {
					case 33:
					case 34:
					case 35:
					case 36:
					case 37:
					case 38:
					case 39:
					case 40:
					case 41:
					case 42:
					case 43:
					case 44:
					case 45:
					case 46:
					case 47:
					case 58:
					case 59:
					case 60:
					case 61:
					case 62:
					case 63:
					case 64:
					case 91:
					case 92:
					case 93:
					case 94:
					case 95:
					case 96:
					case 123:
					case 124:
					case 125:
					case 126:
						return !0;
					default:
						return !1;
				}
			}
			function R(q) {
				return (
					(q = q.trim().replace(/\s+/g, " ")),
					"ẞ".toLowerCase() === "Ṿ" && (q = q.replace(/ẞ/g, "ß")),
					q.toLowerCase().toUpperCase()
				);
			}
			(r.lib = {}),
				(r.lib.mdurl = Vr()),
				(r.lib.ucmicro = qu()),
				(r.assign = t),
				(r.isString = l),
				(r.has = i),
				(r.unescapeMd = m),
				(r.unescapeAll = A),
				(r.isValidEntityCode = e),
				(r.fromCodePoint = o),
				(r.escapeHtml = v),
				(r.arrayReplaceAt = n),
				(r.isSpace = B),
				(r.isWhiteSpace = I),
				(r.isMdAsciiPunct = j),
				(r.isPunctChar = O),
				(r.escapeRE = F),
				(r.normalizeReference = R);
		},
	}),
	Su = z({
		"node_modules/markdown-it/lib/helpers/parse_link_label.js"(r, s) {
			s.exports = function (u, i, t) {
				var n,
					e,
					o,
					a,
					p = -1,
					c = u.posMax,
					d = u.pos;
				for (u.pos = i + 1, n = 1; u.pos < c; ) {
					if (
						((o = u.src.charCodeAt(u.pos)),
						o === 93 && (n--, n === 0))
					) {
						e = !0;
						break;
					}
					if (((a = u.pos), u.md.inline.skipToken(u), o === 91)) {
						if (a === u.pos - 1) n++;
						else if (t) return (u.pos = d), -1;
					}
				}
				return e && (p = u.pos), (u.pos = d), p;
			};
		},
	}),
	$u = z({
		"node_modules/markdown-it/lib/helpers/parse_link_destination.js"(r, s) {
			var l = Y().unescapeAll;
			s.exports = function (i, t, n) {
				var e,
					o,
					a = 0,
					p = t,
					c = { ok: !1, pos: 0, lines: 0, str: "" };
				if (i.charCodeAt(t) === 60) {
					for (t++; t < n; ) {
						if (((e = i.charCodeAt(t)), e === 10 || e === 60))
							return c;
						if (e === 62)
							return (
								(c.pos = t + 1),
								(c.str = l(i.slice(p + 1, t))),
								(c.ok = !0),
								c
							);
						if (e === 92 && t + 1 < n) {
							t += 2;
							continue;
						}
						t++;
					}
					return c;
				}
				for (
					o = 0;
					t < n &&
					((e = i.charCodeAt(t)), !(e === 32 || e < 32 || e === 127));

				) {
					if (e === 92 && t + 1 < n) {
						if (i.charCodeAt(t + 1) === 32) break;
						t += 2;
						continue;
					}
					if (e === 40 && (o++, o > 32)) return c;
					if (e === 41) {
						if (o === 0) break;
						o--;
					}
					t++;
				}
				return (
					p === t ||
						o !== 0 ||
						((c.str = l(i.slice(p, t))),
						(c.lines = a),
						(c.pos = t),
						(c.ok = !0)),
					c
				);
			};
		},
	}),
	Tu = z({
		"node_modules/markdown-it/lib/helpers/parse_link_title.js"(r, s) {
			var l = Y().unescapeAll;
			s.exports = function (i, t, n) {
				var e,
					o,
					a = 0,
					p = t,
					c = { ok: !1, pos: 0, lines: 0, str: "" };
				if (
					t >= n ||
					((o = i.charCodeAt(t)), o !== 34 && o !== 39 && o !== 40)
				)
					return c;
				for (t++, o === 40 && (o = 41); t < n; ) {
					if (((e = i.charCodeAt(t)), e === o))
						return (
							(c.pos = t + 1),
							(c.lines = a),
							(c.str = l(i.slice(p + 1, t))),
							(c.ok = !0),
							c
						);
					if (e === 40 && o === 41) return c;
					e === 10
						? a++
						: e === 92 &&
							t + 1 < n &&
							(t++, i.charCodeAt(t) === 10 && a++),
						t++;
				}
				return c;
			};
		},
	}),
	ju = z({
		"node_modules/markdown-it/lib/helpers/index.js"(r) {
			(r.parseLinkLabel = Su()),
				(r.parseLinkDestination = $u()),
				(r.parseLinkTitle = Tu());
		},
	}),
	Iu = z({
		"node_modules/markdown-it/lib/renderer.js"(r, s) {
			var l = Y().assign,
				u = Y().unescapeAll,
				i = Y().escapeHtml,
				t = {};
			(t.code_inline = function (e, o, a, p, c) {
				var d = e[o];
				return (
					"<code" +
					c.renderAttrs(d) +
					">" +
					i(e[o].content) +
					"</code>"
				);
			}),
				(t.code_block = function (e, o, a, p, c) {
					var d = e[o];
					return (
						"<pre" +
						c.renderAttrs(d) +
						"><code>" +
						i(e[o].content) +
						`</code></pre>
`
					);
				}),
				(t.fence = function (e, o, a, p, c) {
					var d = e[o],
						h = d.info ? u(d.info).trim() : "",
						y = "",
						m = "",
						A,
						E,
						w,
						C,
						x;
					return (
						h &&
							((w = h.split(/(\s+)/g)),
							(y = w[0]),
							(m = w.slice(2).join(""))),
						a.highlight
							? (A = a.highlight(d.content, y, m) || i(d.content))
							: (A = i(d.content)),
						A.indexOf("<pre") === 0
							? A +
								`
`
							: h
								? ((E = d.attrIndex("class")),
									(C = d.attrs ? d.attrs.slice() : []),
									E < 0
										? C.push(["class", a.langPrefix + y])
										: ((C[E] = C[E].slice()),
											(C[E][1] +=
												" " + a.langPrefix + y)),
									(x = { attrs: C }),
									"<pre><code" +
										c.renderAttrs(x) +
										">" +
										A +
										`</code></pre>
`)
								: "<pre><code" +
									c.renderAttrs(d) +
									">" +
									A +
									`</code></pre>
`
					);
				}),
				(t.image = function (e, o, a, p, c) {
					var d = e[o];
					return (
						(d.attrs[d.attrIndex("alt")][1] = c.renderInlineAsText(
							d.children,
							a,
							p,
						)),
						c.renderToken(e, o, a)
					);
				}),
				(t.hardbreak = function (e, o, a) {
					return a.xhtmlOut
						? `<br />
`
						: `<br>
`;
				}),
				(t.softbreak = function (e, o, a) {
					return a.breaks
						? a.xhtmlOut
							? `<br />
`
							: `<br>
`
						: `
`;
				}),
				(t.text = function (e, o) {
					return i(e[o].content);
				}),
				(t.html_block = function (e, o) {
					return e[o].content;
				}),
				(t.html_inline = function (e, o) {
					return e[o].content;
				});
			function n() {
				this.rules = l({}, t);
			}
			(n.prototype.renderAttrs = function (o) {
				var a, p, c;
				if (!o.attrs) return "";
				for (c = "", a = 0, p = o.attrs.length; a < p; a++)
					c += " " + i(o.attrs[a][0]) + '="' + i(o.attrs[a][1]) + '"';
				return c;
			}),
				(n.prototype.renderToken = function (o, a, p) {
					var c,
						d = "",
						h = !1,
						y = o[a];
					return y.hidden
						? ""
						: (y.block &&
								y.nesting !== -1 &&
								a &&
								o[a - 1].hidden &&
								(d += `
`),
							(d += (y.nesting === -1 ? "</" : "<") + y.tag),
							(d += this.renderAttrs(y)),
							y.nesting === 0 && p.xhtmlOut && (d += " /"),
							y.block &&
								((h = !0),
								y.nesting === 1 &&
									a + 1 < o.length &&
									((c = o[a + 1]),
									(c.type === "inline" ||
										c.hidden ||
										(c.nesting === -1 &&
											c.tag === y.tag)) &&
										(h = !1))),
							(d += h
								? `>
`
								: ">"),
							d);
				}),
				(n.prototype.renderInline = function (e, o, a) {
					for (
						var p, c = "", d = this.rules, h = 0, y = e.length;
						h < y;
						h++
					)
						(p = e[h].type),
							typeof d[p] < "u"
								? (c += d[p](e, h, o, a, this))
								: (c += this.renderToken(e, h, o));
					return c;
				}),
				(n.prototype.renderInlineAsText = function (e, o, a) {
					for (var p = "", c = 0, d = e.length; c < d; c++)
						e[c].type === "text"
							? (p += e[c].content)
							: e[c].type === "image"
								? (p += this.renderInlineAsText(
										e[c].children,
										o,
										a,
									))
								: e[c].type === "softbreak" &&
									(p += `
`);
					return p;
				}),
				(n.prototype.render = function (e, o, a) {
					var p,
						c,
						d,
						h = "",
						y = this.rules;
					for (p = 0, c = e.length; p < c; p++)
						(d = e[p].type),
							d === "inline"
								? (h += this.renderInline(e[p].children, o, a))
								: typeof y[d] < "u"
									? (h += y[e[p].type](e, p, o, a, this))
									: (h += this.renderToken(e, p, o, a));
					return h;
				}),
				(s.exports = n);
		},
	}),
	rr = z({
		"node_modules/markdown-it/lib/ruler.js"(r, s) {
			function l() {
				(this.__rules__ = []), (this.__cache__ = null);
			}
			(l.prototype.__find__ = function (u) {
				for (var i = 0; i < this.__rules__.length; i++)
					if (this.__rules__[i].name === u) return i;
				return -1;
			}),
				(l.prototype.__compile__ = function () {
					var u = this,
						i = [""];
					u.__rules__.forEach(function (t) {
						t.enabled &&
							t.alt.forEach(function (n) {
								i.indexOf(n) < 0 && i.push(n);
							});
					}),
						(u.__cache__ = {}),
						i.forEach(function (t) {
							(u.__cache__[t] = []),
								u.__rules__.forEach(function (n) {
									n.enabled &&
										((t && n.alt.indexOf(t) < 0) ||
											u.__cache__[t].push(n.fn));
								});
						});
				}),
				(l.prototype.at = function (u, i, t) {
					var n = this.__find__(u),
						e = t || {};
					if (n === -1)
						throw new Error("Parser rule not found: " + u);
					(this.__rules__[n].fn = i),
						(this.__rules__[n].alt = e.alt || []),
						(this.__cache__ = null);
				}),
				(l.prototype.before = function (u, i, t, n) {
					var e = this.__find__(u),
						o = n || {};
					if (e === -1)
						throw new Error("Parser rule not found: " + u);
					this.__rules__.splice(e, 0, {
						name: i,
						enabled: !0,
						fn: t,
						alt: o.alt || [],
					}),
						(this.__cache__ = null);
				}),
				(l.prototype.after = function (u, i, t, n) {
					var e = this.__find__(u),
						o = n || {};
					if (e === -1)
						throw new Error("Parser rule not found: " + u);
					this.__rules__.splice(e + 1, 0, {
						name: i,
						enabled: !0,
						fn: t,
						alt: o.alt || [],
					}),
						(this.__cache__ = null);
				}),
				(l.prototype.push = function (u, i, t) {
					var n = t || {};
					this.__rules__.push({
						name: u,
						enabled: !0,
						fn: i,
						alt: n.alt || [],
					}),
						(this.__cache__ = null);
				}),
				(l.prototype.enable = function (u, i) {
					Array.isArray(u) || (u = [u]);
					var t = [];
					return (
						u.forEach(function (n) {
							var e = this.__find__(n);
							if (e < 0) {
								if (i) return;
								throw new Error(
									"Rules manager: invalid rule name " + n,
								);
							}
							(this.__rules__[e].enabled = !0), t.push(n);
						}, this),
						(this.__cache__ = null),
						t
					);
				}),
				(l.prototype.enableOnly = function (u, i) {
					Array.isArray(u) || (u = [u]),
						this.__rules__.forEach(function (t) {
							t.enabled = !1;
						}),
						this.enable(u, i);
				}),
				(l.prototype.disable = function (u, i) {
					Array.isArray(u) || (u = [u]);
					var t = [];
					return (
						u.forEach(function (n) {
							var e = this.__find__(n);
							if (e < 0) {
								if (i) return;
								throw new Error(
									"Rules manager: invalid rule name " + n,
								);
							}
							(this.__rules__[e].enabled = !1), t.push(n);
						}, this),
						(this.__cache__ = null),
						t
					);
				}),
				(l.prototype.getRules = function (u) {
					return (
						this.__cache__ === null && this.__compile__(),
						this.__cache__[u] || []
					);
				}),
				(s.exports = l);
		},
	}),
	Ou = z({
		"node_modules/markdown-it/lib/rules_core/normalize.js"(r, s) {
			var l = /\r\n?|\n/g,
				u = /\0/g;
			s.exports = function (t) {
				var n;
				(n = t.src.replace(
					l,
					`
`,
				)),
					(n = n.replace(u, "�")),
					(t.src = n);
			};
		},
	}),
	zu = z({
		"node_modules/markdown-it/lib/rules_core/block.js"(r, s) {
			s.exports = function (u) {
				var i;
				u.inlineMode
					? ((i = new u.Token("inline", "", 0)),
						(i.content = u.src),
						(i.map = [0, 1]),
						(i.children = []),
						u.tokens.push(i))
					: u.md.block.parse(u.src, u.md, u.env, u.tokens);
			};
		},
	}),
	Ru = z({
		"node_modules/markdown-it/lib/rules_core/inline.js"(r, s) {
			s.exports = function (u) {
				var i = u.tokens,
					t,
					n,
					e;
				for (n = 0, e = i.length; n < e; n++)
					(t = i[n]),
						t.type === "inline" &&
							u.md.inline.parse(
								t.content,
								u.md,
								u.env,
								t.children,
							);
			};
		},
	}),
	Mu = z({
		"node_modules/markdown-it/lib/rules_core/linkify.js"(r, s) {
			var l = Y().arrayReplaceAt;
			function u(t) {
				return /^<a[>\s]/i.test(t);
			}
			function i(t) {
				return /^<\/a\s*>/i.test(t);
			}
			s.exports = function (n) {
				var e,
					o,
					a,
					p,
					c,
					d,
					h,
					y,
					m,
					A,
					E,
					w,
					C,
					x,
					v,
					k,
					F = n.tokens,
					B;
				if (n.md.options.linkify) {
					for (o = 0, a = F.length; o < a; o++)
						if (
							!(
								F[o].type !== "inline" ||
								!n.md.linkify.pretest(F[o].content)
							)
						)
							for (
								p = F[o].children, C = 0, e = p.length - 1;
								e >= 0;
								e--
							) {
								if (((d = p[e]), d.type === "link_close")) {
									for (
										e--;
										p[e].level !== d.level &&
										p[e].type !== "link_open";

									)
										e--;
									continue;
								}
								if (
									(d.type === "html_inline" &&
										(u(d.content) && C > 0 && C--,
										i(d.content) && C++),
									!(C > 0) &&
										d.type === "text" &&
										n.md.linkify.test(d.content))
								) {
									for (
										m = d.content,
											B = n.md.linkify.match(m),
											h = [],
											w = d.level,
											E = 0,
											y = 0;
										y < B.length;
										y++
									)
										(x = B[y].url),
											(v = n.md.normalizeLink(x)),
											n.md.validateLink(v) &&
												((k = B[y].text),
												B[y].schema
													? B[y].schema ===
															"mailto:" &&
														!/^mailto:/i.test(k)
														? (k = n.md
																.normalizeLinkText(
																	"mailto:" +
																		k,
																)
																.replace(
																	/^mailto:/,
																	"",
																))
														: (k =
																n.md.normalizeLinkText(
																	k,
																))
													: (k = n.md
															.normalizeLinkText(
																"http://" + k,
															)
															.replace(
																/^http:\/\//,
																"",
															)),
												(A = B[y].index),
												A > E &&
													((c = new n.Token(
														"text",
														"",
														0,
													)),
													(c.content = m.slice(E, A)),
													(c.level = w),
													h.push(c)),
												(c = new n.Token(
													"link_open",
													"a",
													1,
												)),
												(c.attrs = [["href", v]]),
												(c.level = w++),
												(c.markup = "linkify"),
												(c.info = "auto"),
												h.push(c),
												(c = new n.Token(
													"text",
													"",
													0,
												)),
												(c.content = k),
												(c.level = w),
												h.push(c),
												(c = new n.Token(
													"link_close",
													"a",
													-1,
												)),
												(c.level = --w),
												(c.markup = "linkify"),
												(c.info = "auto"),
												h.push(c),
												(E = B[y].lastIndex));
									E < m.length &&
										((c = new n.Token("text", "", 0)),
										(c.content = m.slice(E)),
										(c.level = w),
										h.push(c)),
										(F[o].children = p = l(p, e, h));
								}
							}
				}
			};
		},
	}),
	Pu = z({
		"node_modules/markdown-it/lib/rules_core/replacements.js"(r, s) {
			var l = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
				u = /\((c|tm|r|p)\)/i,
				i = /\((c|tm|r|p)\)/gi,
				t = { c: "©", r: "®", p: "§", tm: "™" };
			function n(a, p) {
				return t[p.toLowerCase()];
			}
			function e(a) {
				var p,
					c,
					d = 0;
				for (p = a.length - 1; p >= 0; p--)
					(c = a[p]),
						c.type === "text" &&
							!d &&
							(c.content = c.content.replace(i, n)),
						c.type === "link_open" && c.info === "auto" && d--,
						c.type === "link_close" && c.info === "auto" && d++;
			}
			function o(a) {
				var p,
					c,
					d = 0;
				for (p = a.length - 1; p >= 0; p--)
					(c = a[p]),
						c.type === "text" &&
							!d &&
							l.test(c.content) &&
							(c.content = c.content
								.replace(/\+-/g, "±")
								.replace(/\.{2,}/g, "…")
								.replace(/([?!])…/g, "$1..")
								.replace(/([?!]){4,}/g, "$1$1$1")
								.replace(/,{2,}/g, ",")
								.replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—")
								.replace(/(^|\s)--(?=\s|$)/gm, "$1–")
								.replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")),
						c.type === "link_open" && c.info === "auto" && d--,
						c.type === "link_close" && c.info === "auto" && d++;
			}
			s.exports = function (p) {
				var c;
				if (p.md.options.typographer)
					for (c = p.tokens.length - 1; c >= 0; c--)
						p.tokens[c].type === "inline" &&
							(u.test(p.tokens[c].content) &&
								e(p.tokens[c].children),
							l.test(p.tokens[c].content) &&
								o(p.tokens[c].children));
			};
		},
	}),
	Nu = z({
		"node_modules/markdown-it/lib/rules_core/smartquotes.js"(r, s) {
			var l = Y().isWhiteSpace,
				u = Y().isPunctChar,
				i = Y().isMdAsciiPunct,
				t = /['"]/,
				n = /['"]/g,
				e = "’";
			function o(p, c, d) {
				return p.substr(0, c) + d + p.substr(c + 1);
			}
			function a(p, c) {
				var d,
					h,
					y,
					m,
					A,
					E,
					w,
					C,
					x,
					v,
					k,
					F,
					B,
					I,
					S,
					O,
					j,
					R,
					q,
					T,
					M;
				for (q = [], d = 0; d < p.length; d++) {
					for (
						h = p[d], w = p[d].level, j = q.length - 1;
						j >= 0 && !(q[j].level <= w);
						j--
					);
					if (((q.length = j + 1), h.type === "text")) {
						(y = h.content), (A = 0), (E = y.length);
						e: for (
							;
							A < E && ((n.lastIndex = A), (m = n.exec(y)), !!m);

						) {
							if (
								((S = O = !0),
								(A = m.index + 1),
								(R = m[0] === "'"),
								(x = 32),
								m.index - 1 >= 0)
							)
								x = y.charCodeAt(m.index - 1);
							else
								for (
									j = d - 1;
									j >= 0 &&
									!(
										p[j].type === "softbreak" ||
										p[j].type === "hardbreak"
									);
									j--
								)
									if (p[j].content) {
										x = p[j].content.charCodeAt(
											p[j].content.length - 1,
										);
										break;
									}
							if (((v = 32), A < E)) v = y.charCodeAt(A);
							else
								for (
									j = d + 1;
									j < p.length &&
									!(
										p[j].type === "softbreak" ||
										p[j].type === "hardbreak"
									);
									j++
								)
									if (p[j].content) {
										v = p[j].content.charCodeAt(0);
										break;
									}
							if (
								((k = i(x) || u(String.fromCharCode(x))),
								(F = i(v) || u(String.fromCharCode(v))),
								(B = l(x)),
								(I = l(v)),
								I ? (S = !1) : F && (B || k || (S = !1)),
								B ? (O = !1) : k && (I || F || (O = !1)),
								v === 34 &&
									m[0] === '"' &&
									x >= 48 &&
									x <= 57 &&
									(O = S = !1),
								S && O && ((S = k), (O = F)),
								!S && !O)
							) {
								R && (h.content = o(h.content, m.index, e));
								continue;
							}
							if (O) {
								for (
									j = q.length - 1;
									j >= 0 && ((C = q[j]), !(q[j].level < w));
									j--
								)
									if (C.single === R && q[j].level === w) {
										(C = q[j]),
											R
												? ((T = c.md.options.quotes[2]),
													(M =
														c.md.options.quotes[3]))
												: ((T = c.md.options.quotes[0]),
													(M =
														c.md.options
															.quotes[1])),
											(h.content = o(
												h.content,
												m.index,
												M,
											)),
											(p[C.token].content = o(
												p[C.token].content,
												C.pos,
												T,
											)),
											(A += M.length - 1),
											C.token === d &&
												(A += T.length - 1),
											(y = h.content),
											(E = y.length),
											(q.length = j);
										continue e;
									}
							}
							S
								? q.push({
										token: d,
										pos: m.index,
										single: R,
										level: w,
									})
								: O &&
									R &&
									(h.content = o(h.content, m.index, e));
						}
					}
				}
			}
			s.exports = function (c) {
				var d;
				if (c.md.options.typographer)
					for (d = c.tokens.length - 1; d >= 0; d--)
						c.tokens[d].type !== "inline" ||
							!t.test(c.tokens[d].content) ||
							a(c.tokens[d].children, c);
			};
		},
	}),
	tr = z({
		"node_modules/markdown-it/lib/token.js"(r, s) {
			function l(u, i, t) {
				(this.type = u),
					(this.tag = i),
					(this.attrs = null),
					(this.map = null),
					(this.nesting = t),
					(this.level = 0),
					(this.children = null),
					(this.content = ""),
					(this.markup = ""),
					(this.info = ""),
					(this.meta = null),
					(this.block = !1),
					(this.hidden = !1);
			}
			(l.prototype.attrIndex = function (i) {
				var t, n, e;
				if (!this.attrs) return -1;
				for (t = this.attrs, n = 0, e = t.length; n < e; n++)
					if (t[n][0] === i) return n;
				return -1;
			}),
				(l.prototype.attrPush = function (i) {
					this.attrs ? this.attrs.push(i) : (this.attrs = [i]);
				}),
				(l.prototype.attrSet = function (i, t) {
					var n = this.attrIndex(i),
						e = [i, t];
					n < 0 ? this.attrPush(e) : (this.attrs[n] = e);
				}),
				(l.prototype.attrGet = function (i) {
					var t = this.attrIndex(i),
						n = null;
					return t >= 0 && (n = this.attrs[t][1]), n;
				}),
				(l.prototype.attrJoin = function (i, t) {
					var n = this.attrIndex(i);
					n < 0
						? this.attrPush([i, t])
						: (this.attrs[n][1] = this.attrs[n][1] + " " + t);
				}),
				(s.exports = l);
		},
	}),
	Lu = z({
		"node_modules/markdown-it/lib/rules_core/state_core.js"(r, s) {
			var l = tr();
			function u(i, t, n) {
				(this.src = i),
					(this.env = n),
					(this.tokens = []),
					(this.inlineMode = !1),
					(this.md = t);
			}
			(u.prototype.Token = l), (s.exports = u);
		},
	}),
	Vu = z({
		"node_modules/markdown-it/lib/parser_core.js"(r, s) {
			var l = rr(),
				u = [
					["normalize", Ou()],
					["block", zu()],
					["inline", Ru()],
					["linkify", Mu()],
					["replacements", Pu()],
					["smartquotes", Nu()],
				];
			function i() {
				this.ruler = new l();
				for (var t = 0; t < u.length; t++)
					this.ruler.push(u[t][0], u[t][1]);
			}
			(i.prototype.process = function (t) {
				var n, e, o;
				for (
					o = this.ruler.getRules(""), n = 0, e = o.length;
					n < e;
					n++
				)
					o[n](t);
			}),
				(i.prototype.State = Lu()),
				(s.exports = i);
		},
	}),
	Uu = z({
		"node_modules/markdown-it/lib/rules_block/table.js"(r, s) {
			var l = Y().isSpace;
			function u(t, n) {
				var e = t.bMarks[n] + t.tShift[n],
					o = t.eMarks[n];
				return t.src.substr(e, o - e);
			}
			function i(t) {
				var n = [],
					e = 0,
					o = t.length,
					a,
					p = !1,
					c = 0,
					d = "";
				for (a = t.charCodeAt(e); e < o; )
					a === 124 &&
						(p
							? ((d += t.substring(c, e - 1)), (c = e))
							: (n.push(d + t.substring(c, e)),
								(d = ""),
								(c = e + 1))),
						(p = a === 92),
						e++,
						(a = t.charCodeAt(e));
				return n.push(d + t.substring(c)), n;
			}
			s.exports = function (n, e, o, a) {
				var p, c, d, h, y, m, A, E, w, C, x, v, k, F, B, I, S, O;
				if (
					e + 2 > o ||
					((m = e + 1), n.sCount[m] < n.blkIndent) ||
					(!n.md.options.allowIndentation &&
						n.sCount[m] - n.blkIndent >= 4) ||
					((d = n.bMarks[m] + n.tShift[m]), d >= n.eMarks[m]) ||
					((S = n.src.charCodeAt(d++)),
					S !== 124 && S !== 45 && S !== 58) ||
					d >= n.eMarks[m] ||
					((O = n.src.charCodeAt(d++)),
					O !== 124 && O !== 45 && O !== 58 && !l(O)) ||
					(S === 45 && l(O))
				)
					return !1;
				for (; d < n.eMarks[m]; ) {
					if (
						((p = n.src.charCodeAt(d)),
						p !== 124 && p !== 45 && p !== 58 && !l(p))
					)
						return !1;
					d++;
				}
				for (
					c = u(n, e + 1), A = c.split("|"), C = [], h = 0;
					h < A.length;
					h++
				) {
					if (((x = A[h].trim()), !x)) {
						if (h === 0 || h === A.length - 1) continue;
						return !1;
					}
					if (!/^:?-+:?$/.test(x)) return !1;
					x.charCodeAt(x.length - 1) === 58
						? C.push(x.charCodeAt(0) === 58 ? "center" : "right")
						: x.charCodeAt(0) === 58
							? C.push("left")
							: C.push("");
				}
				if (
					((c = u(n, e).trim()),
					c.indexOf("|") === -1 ||
						(!n.md.options.allowIndentation &&
							n.sCount[e] - n.blkIndent >= 4) ||
						((A = i(c)),
						A.length && A[0] === "" && A.shift(),
						A.length && A[A.length - 1] === "" && A.pop(),
						(E = A.length),
						E === 0 || E !== C.length))
				)
					return !1;
				if (a) return !0;
				for (
					F = n.parentType,
						n.parentType = "table",
						I = n.md.block.ruler.getRules("blockquote"),
						w = n.push("table_open", "table", 1),
						w.map = v = [e, 0],
						w = n.push("thead_open", "thead", 1),
						w.map = [e, e + 1],
						w = n.push("tr_open", "tr", 1),
						w.map = [e, e + 1],
						h = 0;
					h < A.length;
					h++
				)
					(w = n.push("th_open", "th", 1)),
						C[h] && (w.attrs = [["style", "text-align:" + C[h]]]),
						(w = n.push("inline", "", 0)),
						(w.content = A[h].trim()),
						(w.children = []),
						(w = n.push("th_close", "th", -1));
				for (
					w = n.push("tr_close", "tr", -1),
						w = n.push("thead_close", "thead", -1),
						m = e + 2;
					m < o && !(n.sCount[m] < n.blkIndent);
					m++
				) {
					for (B = !1, h = 0, y = I.length; h < y; h++)
						if (I[h](n, m, o, !0)) {
							B = !0;
							break;
						}
					if (
						B ||
						((c = u(n, m).trim()), !c) ||
						(!n.md.options.allowIndentation &&
							n.sCount[m] - n.blkIndent >= 4)
					)
						break;
					for (
						A = i(c),
							A.length && A[0] === "" && A.shift(),
							A.length && A[A.length - 1] === "" && A.pop(),
							m === e + 2 &&
								((w = n.push("tbody_open", "tbody", 1)),
								(w.map = k = [e + 2, 0])),
							w = n.push("tr_open", "tr", 1),
							w.map = [m, m + 1],
							h = 0;
						h < E;
						h++
					)
						(w = n.push("td_open", "td", 1)),
							C[h] &&
								(w.attrs = [["style", "text-align:" + C[h]]]),
							(w = n.push("inline", "", 0)),
							(w.content = A[h] ? A[h].trim() : ""),
							(w.children = []),
							(w = n.push("td_close", "td", -1));
					w = n.push("tr_close", "tr", -1);
				}
				return (
					k && ((w = n.push("tbody_close", "tbody", -1)), (k[1] = m)),
					(w = n.push("table_close", "table", -1)),
					(v[1] = m),
					(n.parentType = F),
					(n.line = m),
					!0
				);
			};
		},
	}),
	Zu = z({
		"node_modules/markdown-it/lib/rules_block/code.js"(r, s) {
			s.exports = function (u, i, t) {
				if (u.md.options.allowIndentation) return !1;
				var n, e, o;
				if (u.sCount[i] - u.blkIndent < 4) return !1;
				for (e = n = i + 1; n < t; ) {
					if (u.isEmpty(n)) {
						n++;
						continue;
					}
					if (u.sCount[n] - u.blkIndent >= 4) {
						n++, (e = n);
						continue;
					}
					break;
				}
				return (
					(u.line = e),
					(o = u.push("code_block", "code", 0)),
					(o.content =
						u.getLines(i, e, 4 + u.blkIndent, !1) +
						`
`),
					(o.map = [i, u.line]),
					!0
				);
			};
		},
	}),
	Gu = z({
		"node_modules/markdown-it/lib/rules_block/fence.js"(r, s) {
			s.exports = function (u, i, t, n) {
				var e,
					o,
					a,
					p,
					c,
					d,
					h,
					y = !1,
					m = u.bMarks[i] + u.tShift[i],
					A = u.eMarks[i];
				if (
					(!u.md.options.allowIndentation &&
						u.sCount[i] - u.blkIndent >= 4) ||
					m + 3 > A ||
					((e = u.src.charCodeAt(m)), e !== 126 && e !== 96) ||
					((c = m), (m = u.skipChars(m, e)), (o = m - c), o < 3) ||
					((h = u.src.slice(c, m)),
					(a = u.src.slice(m, A)),
					e === 96 && a.indexOf(String.fromCharCode(e)) >= 0)
				)
					return !1;
				if (n) return !0;
				for (
					p = i;
					p++,
						!(
							p >= t ||
							((m = c = u.bMarks[p] + u.tShift[p]),
							(A = u.eMarks[p]),
							m < A && u.sCount[p] < u.blkIndent)
						);

				)
					if (
						u.src.charCodeAt(m) === e &&
						!(
							!u.md.options.allowIndentation &&
							u.sCount[p] - u.blkIndent >= 4
						) &&
						((m = u.skipChars(m, e)),
						!(m - c < o) && ((m = u.skipSpaces(m)), !(m < A)))
					) {
						y = !0;
						break;
					}
				return (
					(o = u.sCount[i]),
					(u.line = p + (y ? 1 : 0)),
					(d = u.push("fence", "code", 0)),
					(d.info = a),
					(d.content = u.getLines(i + 1, p, o, !0)),
					(d.markup = h),
					(d.map = [i, u.line]),
					!0
				);
			};
		},
	}),
	Hu = z({
		"node_modules/markdown-it/lib/rules_block/blockquote.js"(r, s) {
			var l = Y().isSpace;
			s.exports = function (i, t, n, e) {
				var o,
					a,
					p,
					c,
					d,
					h,
					y,
					m,
					A,
					E,
					w,
					C,
					x,
					v,
					k,
					F,
					B,
					I,
					S,
					O,
					j = i.lineMax,
					R = i.bMarks[t] + i.tShift[t],
					q = i.eMarks[t];
				if (
					(!i.md.options.allowIndentation &&
						i.sCount[t] - i.blkIndent >= 4) ||
					i.src.charCodeAt(R++) !== 62
				)
					return !1;
				if (e) return !0;
				for (
					c = A = i.sCount[t] + 1,
						i.src.charCodeAt(R) === 32
							? (R++, c++, A++, (o = !1), (F = !0))
							: i.src.charCodeAt(R) === 9
								? ((F = !0),
									(i.bsCount[t] + A) % 4 === 3
										? (R++, c++, A++, (o = !1))
										: (o = !0))
								: (F = !1),
						E = [i.bMarks[t]],
						i.bMarks[t] = R;
					R < q && ((a = i.src.charCodeAt(R)), l(a));

				) {
					a === 9
						? (A += 4 - ((A + i.bsCount[t] + (o ? 1 : 0)) % 4))
						: A++;
					R++;
				}
				for (
					w = [i.bsCount[t]],
						i.bsCount[t] = i.sCount[t] + 1 + (F ? 1 : 0),
						h = R >= q,
						v = [i.sCount[t]],
						i.sCount[t] = A - c,
						k = [i.tShift[t]],
						i.tShift[t] = R - i.bMarks[t],
						I = i.md.block.ruler.getRules("blockquote"),
						x = i.parentType,
						i.parentType = "blockquote",
						m = t + 1;
					m < n &&
					((O = i.sCount[m] < i.blkIndent),
					(R = i.bMarks[m] + i.tShift[m]),
					(q = i.eMarks[m]),
					!(R >= q));
					m++
				) {
					if (i.src.charCodeAt(R++) === 62 && !O) {
						for (
							c = A = i.sCount[m] + 1,
								i.src.charCodeAt(R) === 32
									? (R++, c++, A++, (o = !1), (F = !0))
									: i.src.charCodeAt(R) === 9
										? ((F = !0),
											(i.bsCount[m] + A) % 4 === 3
												? (R++, c++, A++, (o = !1))
												: (o = !0))
										: (F = !1),
								E.push(i.bMarks[m]),
								i.bMarks[m] = R;
							R < q && ((a = i.src.charCodeAt(R)), l(a));

						) {
							a === 9
								? (A +=
										4 -
										((A + i.bsCount[m] + (o ? 1 : 0)) % 4))
								: A++;
							R++;
						}
						(h = R >= q),
							w.push(i.bsCount[m]),
							(i.bsCount[m] = i.sCount[m] + 1 + (F ? 1 : 0)),
							v.push(i.sCount[m]),
							(i.sCount[m] = A - c),
							k.push(i.tShift[m]),
							(i.tShift[m] = R - i.bMarks[m]);
						continue;
					}
					if (h) break;
					for (B = !1, p = 0, d = I.length; p < d; p++)
						if (I[p](i, m, n, !0)) {
							B = !0;
							break;
						}
					if (B) {
						(i.lineMax = m),
							i.blkIndent !== 0 &&
								(E.push(i.bMarks[m]),
								w.push(i.bsCount[m]),
								k.push(i.tShift[m]),
								v.push(i.sCount[m]),
								(i.sCount[m] -= i.blkIndent));
						break;
					}
					E.push(i.bMarks[m]),
						w.push(i.bsCount[m]),
						k.push(i.tShift[m]),
						v.push(i.sCount[m]),
						(i.sCount[m] = -1);
				}
				for (
					C = i.blkIndent,
						i.blkIndent = 0,
						S = i.push("blockquote_open", "blockquote", 1),
						S.markup = ">",
						S.map = y = [t, 0],
						i.md.block.tokenize(i, t, m),
						S = i.push("blockquote_close", "blockquote", -1),
						S.markup = ">",
						i.lineMax = j,
						i.parentType = x,
						y[1] = i.line,
						p = 0;
					p < k.length;
					p++
				)
					(i.bMarks[p + t] = E[p]),
						(i.tShift[p + t] = k[p]),
						(i.sCount[p + t] = v[p]),
						(i.bsCount[p + t] = w[p]);
				return (i.blkIndent = C), !0;
			};
		},
	}),
	Wu = z({
		"node_modules/markdown-it/lib/rules_block/hr.js"(r, s) {
			var l = Y().isSpace;
			s.exports = function (i, t, n, e) {
				var o,
					a,
					p,
					c,
					d = i.bMarks[t] + i.tShift[t],
					h = i.eMarks[t];
				if (
					(!i.md.options.allowIndentation &&
						i.sCount[t] - i.blkIndent >= 4) ||
					((o = i.src.charCodeAt(d++)),
					o !== 42 && o !== 45 && o !== 95)
				)
					return !1;
				for (a = 1; d < h; ) {
					if (((p = i.src.charCodeAt(d++)), p !== o && !l(p)))
						return !1;
					p === o && a++;
				}
				return a < 3
					? !1
					: (e ||
							((i.line = t + 1),
							(c = i.push("hr", "hr", 0)),
							(c.map = [t, i.line]),
							(c.markup = Array(a + 1).join(
								String.fromCharCode(o),
							))),
						!0);
			};
		},
	}),
	Ju = z({
		"node_modules/markdown-it/lib/rules_block/list.js"(r, s) {
			var l = Y().isSpace;
			function u(n, e) {
				var o, a, p, c;
				return (
					(a = n.bMarks[e] + n.tShift[e]),
					(p = n.eMarks[e]),
					(o = n.src.charCodeAt(a++)),
					(o !== 42 && o !== 45 && o !== 43) ||
					(a < p && ((c = n.src.charCodeAt(a)), !l(c)))
						? -1
						: a
				);
			}
			function i(n, e) {
				var o,
					a = n.bMarks[e] + n.tShift[e],
					p = a,
					c = n.eMarks[e];
				if (
					p + 1 >= c ||
					((o = n.src.charCodeAt(p++)), o < 48 || o > 57)
				)
					return -1;
				for (;;) {
					if (p >= c) return -1;
					if (((o = n.src.charCodeAt(p++)), o >= 48 && o <= 57)) {
						if (p - a >= 10) return -1;
						continue;
					}
					if (o === 41 || o === 46) break;
					return -1;
				}
				return p < c && ((o = n.src.charCodeAt(p)), !l(o)) ? -1 : p;
			}
			function t(n, e) {
				var o,
					a,
					p = n.level + 2;
				for (o = e + 2, a = n.tokens.length - 2; o < a; o++)
					n.tokens[o].level === p &&
						n.tokens[o].type === "paragraph_open" &&
						((n.tokens[o + 2].hidden = !0),
						(n.tokens[o].hidden = !0),
						(o += 2));
			}
			s.exports = function (e, o, a, p) {
				var c,
					d,
					h,
					y,
					m,
					A,
					E,
					w,
					C,
					x,
					v,
					k,
					F,
					B,
					I,
					S,
					O,
					j,
					R,
					q,
					T,
					M,
					N,
					V,
					W,
					K,
					re,
					H,
					X = !1,
					ue = !0;
				if (
					(!e.md.options.allowIndentation &&
						e.sCount[o] - e.blkIndent >= 4) ||
					(!e.md.options.allowIndentation &&
						e.listIndent >= 0 &&
						e.sCount[o] - e.listIndent >= 4 &&
						e.sCount[o] < e.blkIndent)
				)
					return !1;
				if (
					(p &&
						e.parentType === "paragraph" &&
						e.sCount[o] >= e.blkIndent &&
						(X = !0),
					(N = i(e, o)) >= 0)
				) {
					if (
						((E = !0),
						(W = e.bMarks[o] + e.tShift[o]),
						(F = Number(e.src.slice(W, N - 1))),
						X && F !== 1)
					)
						return !1;
				} else if ((N = u(e, o)) >= 0) E = !1;
				else return !1;
				if (X && e.skipSpaces(N) >= e.eMarks[o]) return !1;
				if (((k = e.src.charCodeAt(N - 1)), p)) return !0;
				for (
					v = e.tokens.length,
						E
							? ((H = e.push("ordered_list_open", "ol", 1)),
								F !== 1 && (H.attrs = [["start", F]]))
							: (H = e.push("bullet_list_open", "ul", 1)),
						H.map = x = [o, 0],
						H.markup = String.fromCharCode(k),
						I = o,
						V = !1,
						re = e.md.block.ruler.getRules("list"),
						j = e.parentType,
						e.parentType = "list";
					I < a;

				) {
					for (
						M = N,
							B = e.eMarks[I],
							A = S =
								e.sCount[I] + N - (e.bMarks[o] + e.tShift[o]);
						M < B;

					) {
						if (((c = e.src.charCodeAt(M)), c === 9))
							S += 4 - ((S + e.bsCount[I]) % 4);
						else if (c === 32) S++;
						else break;
						M++;
					}
					if (
						((d = M),
						d >= B ? (m = 1) : (m = S - A),
						!e.md.options.allowIndentation && m > 4 && (m = 1),
						(y = A + m),
						(H = e.push("list_item_open", "li", 1)),
						(H.markup = String.fromCharCode(k)),
						(H.map = w = [o, 0]),
						E && (H.info = e.src.slice(W, N - 1)),
						(T = e.tight),
						(q = e.tShift[o]),
						(R = e.sCount[o]),
						(O = e.listIndent),
						(e.listIndent = e.blkIndent),
						(e.blkIndent = y),
						(e.tight = !0),
						(e.tShift[o] = d - e.bMarks[o]),
						(e.sCount[o] = S),
						d >= B && e.isEmpty(o + 1)
							? (e.line = Math.min(e.line + 2, a))
							: e.md.block.tokenize(e, o, a, !0),
						(!e.tight || V) && (ue = !1),
						(V = e.line - o > 1 && e.isEmpty(e.line - 1)),
						(e.blkIndent = e.listIndent),
						(e.listIndent = O),
						(e.tShift[o] = q),
						(e.sCount[o] = R),
						(e.tight = T),
						(H = e.push("list_item_close", "li", -1)),
						(H.markup = String.fromCharCode(k)),
						(I = o = e.line),
						(w[1] = I),
						(d = e.bMarks[o]),
						I >= a ||
							e.sCount[I] < e.blkIndent ||
							(!e.md.options.allowIndentation &&
								e.sCount[o] - e.blkIndent >= 4))
					)
						break;
					for (K = !1, h = 0, C = re.length; h < C; h++)
						if (re[h](e, I, a, !0)) {
							K = !0;
							break;
						}
					if (K) break;
					if (E) {
						if (((N = i(e, I)), N < 0)) break;
						W = e.bMarks[I] + e.tShift[I];
					} else if (((N = u(e, I)), N < 0)) break;
					if (k !== e.src.charCodeAt(N - 1)) break;
				}
				return (
					E
						? (H = e.push("ordered_list_close", "ol", -1))
						: (H = e.push("bullet_list_close", "ul", -1)),
					(H.markup = String.fromCharCode(k)),
					(x[1] = I),
					(e.line = I),
					(e.parentType = j),
					ue && t(e, v),
					!0
				);
			};
		},
	}),
	Yu = z({
		"node_modules/markdown-it/lib/rules_block/reference.js"(r, s) {
			var l = Y().normalizeReference,
				u = Y().isSpace;
			s.exports = function (t, n, e, o) {
				var a,
					p,
					c,
					d,
					h,
					y,
					m,
					A,
					E,
					w,
					C,
					x,
					v,
					k,
					F,
					B,
					I = 0,
					S = t.bMarks[n] + t.tShift[n],
					O = t.eMarks[n],
					j = n + 1;
				if (
					(!t.md.options.allowIndentation &&
						t.sCount[n] - t.blkIndent >= 4) ||
					t.src.charCodeAt(S) !== 91
				)
					return !1;
				for (; ++S < O; )
					if (
						t.src.charCodeAt(S) === 93 &&
						t.src.charCodeAt(S - 1) !== 92
					) {
						if (S + 1 === O || t.src.charCodeAt(S + 1) !== 58)
							return !1;
						break;
					}
				for (
					d = t.lineMax,
						F = t.md.block.ruler.getRules("reference"),
						w = t.parentType,
						t.parentType = "reference";
					j < d && !t.isEmpty(j);
					j++
				)
					if (
						!(
							!t.md.options.allowIndentation &&
							t.sCount[j] - t.blkIndent > 3
						) &&
						!(t.sCount[j] < 0)
					) {
						for (k = !1, y = 0, m = F.length; y < m; y++)
							if (F[y](t, j, d, !0)) {
								k = !0;
								break;
							}
						if (k) break;
					}
				for (
					v = t.getLines(n, j, t.blkIndent, !1).trim(),
						O = v.length,
						S = 1;
					S < O;
					S++
				) {
					if (((a = v.charCodeAt(S)), a === 91)) return !1;
					if (a === 93) {
						E = S;
						break;
					} else
						a === 10
							? I++
							: a === 92 &&
								(S++, S < O && v.charCodeAt(S) === 10 && I++);
				}
				if (E < 0 || v.charCodeAt(E + 1) !== 58) return !1;
				for (S = E + 2; S < O; S++)
					if (((a = v.charCodeAt(S)), a === 10)) I++;
					else if (!u(a)) break;
				if (
					((C = t.md.helpers.parseLinkDestination(v, S, O)),
					!C.ok ||
						((h = t.md.normalizeLink(C.str)),
						!t.md.validateLink(h)))
				)
					return !1;
				for (S = C.pos, I += C.lines, p = S, c = I, x = S; S < O; S++)
					if (((a = v.charCodeAt(S)), a === 10)) I++;
					else if (!u(a)) break;
				for (
					C = t.md.helpers.parseLinkTitle(v, S, O),
						S < O && x !== S && C.ok
							? ((B = C.str), (S = C.pos), (I += C.lines))
							: ((B = ""), (S = p), (I = c));
					S < O && ((a = v.charCodeAt(S)), !!u(a));

				)
					S++;
				if (S < O && v.charCodeAt(S) !== 10 && B)
					for (
						B = "", S = p, I = c;
						S < O && ((a = v.charCodeAt(S)), !!u(a));

					)
						S++;
				return (S < O && v.charCodeAt(S) !== 10) ||
					((A = l(v.slice(1, E))), !A)
					? !1
					: (o ||
							(typeof t.env.references > "u" &&
								(t.env.references = {}),
							typeof t.env.references[A] > "u" &&
								(t.env.references[A] = { title: B, href: h }),
							(t.parentType = w),
							(t.line = n + I + 1)),
						!0);
			};
		},
	}),
	Qu = z({
		"node_modules/markdown-it/lib/common/html_blocks.js"(r, s) {
			s.exports = [
				"address",
				"article",
				"aside",
				"base",
				"basefont",
				"blockquote",
				"body",
				"caption",
				"center",
				"col",
				"colgroup",
				"dd",
				"details",
				"dialog",
				"dir",
				"div",
				"dl",
				"dt",
				"fieldset",
				"figcaption",
				"figure",
				"footer",
				"form",
				"frame",
				"frameset",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"head",
				"header",
				"hr",
				"html",
				"iframe",
				"legend",
				"li",
				"link",
				"main",
				"menu",
				"menuitem",
				"nav",
				"noframes",
				"ol",
				"optgroup",
				"option",
				"p",
				"param",
				"section",
				"source",
				"summary",
				"table",
				"tbody",
				"td",
				"tfoot",
				"th",
				"thead",
				"title",
				"tr",
				"track",
				"ul",
			];
		},
	}),
	Hr = z({
		"node_modules/markdown-it/lib/common/html_re.js"(r, s) {
			var l = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
				u = "[^\"'=<>`\\x00-\\x20]+",
				i = "'[^']*'",
				t = '"[^"]*"',
				n = "(?:" + u + "|" + i + "|" + t + ")",
				e = "(?:\\s+" + l + "(?:\\s*=\\s*" + n + ")?)",
				o = "<[A-Za-z][A-Za-z0-9\\-]*" + e + "*\\s*\\/?>",
				a = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
				p = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->",
				c = "<[?][\\s\\S]*?[?]>",
				d = "<![A-Z]+\\s+[^>]*>",
				h = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
				y = new RegExp(
					"^(?:" +
						o +
						"|" +
						a +
						"|" +
						p +
						"|" +
						c +
						"|" +
						d +
						"|" +
						h +
						")",
				),
				m = new RegExp("^(?:" + o + "|" + a + ")");
			(s.exports.HTML_TAG_RE = y), (s.exports.HTML_OPEN_CLOSE_TAG_RE = m);
		},
	}),
	Ku = z({
		"node_modules/markdown-it/lib/rules_block/html_block.js"(r, s) {
			var l = Qu(),
				u = Hr().HTML_OPEN_CLOSE_TAG_RE,
				i = [
					[
						/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
						/<\/(script|pre|style|textarea)>/i,
						!0,
					],
					[/^<!--/, /-->/, !0],
					[/^<\?/, /\?>/, !0],
					[/^<![A-Z]/, />/, !0],
					[/^<!\[CDATA\[/, /\]\]>/, !0],
					[
						new RegExp(
							"^</?(" + l.join("|") + ")(?=(\\s|/?>|$))",
							"i",
						),
						/^$/,
						!0,
					],
					[new RegExp(u.source + "\\s*$"), /^$/, !1],
				];
			s.exports = function (n, e, o, a) {
				var p,
					c,
					d,
					h,
					y = n.bMarks[e] + n.tShift[e],
					m = n.eMarks[e];
				if (
					(!n.md.options.allowIndentation &&
						n.sCount[e] - n.blkIndent >= 4) ||
					!n.md.options.html ||
					n.src.charCodeAt(y) !== 60
				)
					return !1;
				for (
					h = n.src.slice(y, m), p = 0;
					p < i.length && !i[p][0].test(h);
					p++
				);
				if (p === i.length) return !1;
				if (a) return i[p][2];
				if (((c = e + 1), !i[p][1].test(h))) {
					for (; c < o && !(n.sCount[c] < n.blkIndent); c++)
						if (
							((y = n.bMarks[c] + n.tShift[c]),
							(m = n.eMarks[c]),
							(h = n.src.slice(y, m)),
							i[p][1].test(h))
						) {
							h.length !== 0 && c++;
							break;
						}
				}
				return (
					(n.line = c),
					(d = n.push("html_block", "", 0)),
					(d.map = [e, c]),
					(d.content = n.getLines(e, c, n.blkIndent, !0)),
					!0
				);
			};
		},
	}),
	Xu = z({
		"node_modules/markdown-it/lib/rules_block/heading.js"(r, s) {
			var l = Y().isSpace;
			s.exports = function (i, t, n, e) {
				var o,
					a,
					p,
					c,
					d = i.bMarks[t] + i.tShift[t],
					h = i.eMarks[t];
				if (
					(!i.md.options.allowIndentation &&
						i.sCount[t] - i.blkIndent >= 4) ||
					((o = i.src.charCodeAt(d)), o !== 35 || d >= h)
				)
					return !1;
				for (
					a = 1, o = i.src.charCodeAt(++d);
					o === 35 && d < h && a <= 6;

				)
					a++, (o = i.src.charCodeAt(++d));
				return a > 6 || (d < h && !l(o))
					? !1
					: (e ||
							((h = i.skipSpacesBack(h, d)),
							(p = i.skipCharsBack(h, 35, d)),
							p > d && l(i.src.charCodeAt(p - 1)) && (h = p),
							(i.line = t + 1),
							(c = i.push("heading_open", "h" + String(a), 1)),
							(c.markup = "########".slice(0, a)),
							(c.map = [t, i.line]),
							(c = i.push("inline", "", 0)),
							(c.content = i.src.slice(d, h).trim()),
							(c.map = [t, i.line]),
							(c.children = []),
							(c = i.push("heading_close", "h" + String(a), -1)),
							(c.markup = "########".slice(0, a))),
						!0);
			};
		},
	}),
	en = z({
		"node_modules/markdown-it/lib/rules_block/lheading.js"(r, s) {
			s.exports = function (u, i, t) {
				var n,
					e,
					o,
					a,
					p,
					c,
					d,
					h,
					y,
					m = i + 1,
					A,
					E = u.md.block.ruler.getRules("paragraph");
				if (
					!u.md.options.allowIndentation &&
					u.sCount[i] - u.blkIndent >= 4
				)
					return !1;
				for (
					A = u.parentType, u.parentType = "paragraph";
					m < t && !u.isEmpty(m);
					m++
				)
					if (
						!(
							!u.md.options.allowIndentation &&
							u.sCount[m] - u.blkIndent > 3
						)
					) {
						if (
							u.sCount[m] >= u.blkIndent &&
							((c = u.bMarks[m] + u.tShift[m]),
							(d = u.eMarks[m]),
							c < d &&
								((y = u.src.charCodeAt(c)),
								(y === 45 || y === 61) &&
									((c = u.skipChars(c, y)),
									(c = u.skipSpaces(c)),
									c >= d)))
						) {
							h = y === 61 ? 1 : 2;
							break;
						}
						if (!(u.sCount[m] < 0)) {
							for (e = !1, o = 0, a = E.length; o < a; o++)
								if (E[o](u, m, t, !0)) {
									e = !0;
									break;
								}
							if (e) break;
						}
					}
				return h
					? ((n = u.getLines(i, m, u.blkIndent, !1).trim()),
						(u.line = m + 1),
						(p = u.push("heading_open", "h" + String(h), 1)),
						(p.markup = String.fromCharCode(y)),
						(p.map = [i, u.line]),
						(p = u.push("inline", "", 0)),
						(p.content = n),
						(p.map = [i, u.line - 1]),
						(p.children = []),
						(p = u.push("heading_close", "h" + String(h), -1)),
						(p.markup = String.fromCharCode(y)),
						(u.parentType = A),
						!0)
					: !1;
			};
		},
	}),
	rn = z({
		"node_modules/markdown-it/lib/rules_block/paragraph.js"(r, s) {
			s.exports = function (u, i) {
				var t,
					n,
					e,
					o,
					a,
					p,
					c = i + 1,
					d = u.md.block.ruler.getRules("paragraph"),
					h = u.lineMax;
				for (
					p = u.parentType, u.parentType = "paragraph";
					c < h && !u.isEmpty(c);
					c++
				)
					if (
						!(
							!u.md.options.allowIndentation &&
							u.sCount[c] - u.blkIndent > 3
						) &&
						!(u.sCount[c] < 0)
					) {
						for (n = !1, e = 0, o = d.length; e < o; e++)
							if (d[e](u, c, h, !0)) {
								n = !0;
								break;
							}
						if (n) break;
					}
				return (
					(t = u.getLines(i, c, u.blkIndent, !1).trim()),
					(u.line = c),
					(a = u.push("paragraph_open", "p", 1)),
					(a.map = [i, u.line]),
					(a = u.push("inline", "", 0)),
					(a.content = t),
					(a.map = [i, u.line]),
					(a.children = []),
					(a = u.push("paragraph_close", "p", -1)),
					(u.parentType = p),
					!0
				);
			};
		},
	}),
	tn = z({
		"node_modules/markdown-it/lib/rules_block/state_block.js"(r, s) {
			var l = tr(),
				u = Y().isSpace;
			function i(t, n, e, o) {
				var a, p, c, d, h, y, m, A;
				for (
					this.src = t,
						this.md = n,
						this.env = e,
						this.tokens = o,
						this.bMarks = [],
						this.eMarks = [],
						this.tShift = [],
						this.sCount = [],
						this.bsCount = [],
						this.blkIndent = 0,
						this.line = 0,
						this.lineMax = 0,
						this.tight = !1,
						this.ddIndent = -1,
						this.listIndent = -1,
						this.parentType = "root",
						this.level = 0,
						this.result = "",
						p = this.src,
						A = !1,
						c = d = y = m = 0,
						h = p.length;
					d < h;
					d++
				) {
					if (((a = p.charCodeAt(d)), !A))
						if (u(a)) {
							y++, a === 9 ? (m += 4 - (m % 4)) : m++;
							continue;
						} else A = !0;
					(a === 10 || d === h - 1) &&
						(a !== 10 && d++,
						this.bMarks.push(c),
						this.eMarks.push(d),
						this.tShift.push(y),
						this.sCount.push(m),
						this.bsCount.push(0),
						(A = !1),
						(y = 0),
						(m = 0),
						(c = d + 1));
				}
				this.bMarks.push(p.length),
					this.eMarks.push(p.length),
					this.tShift.push(0),
					this.sCount.push(0),
					this.bsCount.push(0),
					(this.lineMax = this.bMarks.length - 1);
			}
			(i.prototype.push = function (t, n, e) {
				var o = new l(t, n, e);
				return (
					(o.block = !0),
					e < 0 && this.level--,
					(o.level = this.level),
					e > 0 && this.level++,
					this.tokens.push(o),
					o
				);
			}),
				(i.prototype.isEmpty = function (n) {
					return this.bMarks[n] + this.tShift[n] >= this.eMarks[n];
				}),
				(i.prototype.skipEmptyLines = function (n) {
					for (
						var e = this.lineMax;
						n < e &&
						!(this.bMarks[n] + this.tShift[n] < this.eMarks[n]);
						n++
					);
					return n;
				}),
				(i.prototype.skipSpaces = function (n) {
					for (
						var e, o = this.src.length;
						n < o && ((e = this.src.charCodeAt(n)), !!u(e));
						n++
					);
					return n;
				}),
				(i.prototype.skipSpacesBack = function (n, e) {
					if (n <= e) return n;
					for (; n > e; )
						if (!u(this.src.charCodeAt(--n))) return n + 1;
					return n;
				}),
				(i.prototype.skipChars = function (n, e) {
					for (
						var o = this.src.length;
						n < o && this.src.charCodeAt(n) === e;
						n++
					);
					return n;
				}),
				(i.prototype.skipCharsBack = function (n, e, o) {
					if (n <= o) return n;
					for (; n > o; )
						if (e !== this.src.charCodeAt(--n)) return n + 1;
					return n;
				}),
				(i.prototype.getLines = function (n, e, o, a) {
					var p,
						c,
						d,
						h,
						y,
						m,
						A,
						E = n;
					if (n >= e) return "";
					for (m = new Array(e - n), p = 0; E < e; E++, p++) {
						for (
							c = 0,
								A = h = this.bMarks[E],
								E + 1 < e || a
									? (y = this.eMarks[E] + 1)
									: (y = this.eMarks[E]);
							h < y && c < o;

						) {
							if (((d = this.src.charCodeAt(h)), u(d)))
								d === 9
									? (c += 4 - ((c + this.bsCount[E]) % 4))
									: c++;
							else if (h - A < this.tShift[E]) c++;
							else break;
							h++;
						}
						c > o
							? (m[p] =
									new Array(c - o + 1).join(" ") +
									this.src.slice(h, y))
							: (m[p] = this.src.slice(h, y));
					}
					return m.join("");
				}),
				(i.prototype.Token = l),
				(s.exports = i);
		},
	}),
	un = z({
		"node_modules/markdown-it/lib/parser_block.js"(r, s) {
			var l = rr(),
				u = [
					["table", Uu(), ["paragraph", "reference"]],
					["code", Zu()],
					[
						"fence",
						Gu(),
						["paragraph", "reference", "blockquote", "list"],
					],
					[
						"blockquote",
						Hu(),
						["paragraph", "reference", "blockquote", "list"],
					],
					[
						"hr",
						Wu(),
						["paragraph", "reference", "blockquote", "list"],
					],
					["list", Ju(), ["paragraph", "reference", "blockquote"]],
					["reference", Yu()],
					[
						"html_block",
						Ku(),
						["paragraph", "reference", "blockquote"],
					],
					["heading", Xu(), ["paragraph", "reference", "blockquote"]],
					["lheading", en()],
					["paragraph", rn()],
				];
			function i() {
				this.ruler = new l();
				for (var t = 0; t < u.length; t++)
					this.ruler.push(u[t][0], u[t][1], {
						alt: (u[t][2] || []).slice(),
					});
			}
			(i.prototype.tokenize = function (t, n, e) {
				for (
					var o,
						a,
						p = this.ruler.getRules(""),
						c = p.length,
						d = n,
						h = !1,
						y = t.md.options.maxNesting;
					d < e &&
					((t.line = d = t.skipEmptyLines(d)),
					!(d >= e || t.sCount[d] < t.blkIndent));

				) {
					if (t.level >= y) {
						t.line = e;
						break;
					}
					for (a = 0; a < c && ((o = p[a](t, d, e, !1)), !o); a++);
					(t.tight = !h),
						t.isEmpty(t.line - 1) && (h = !0),
						(d = t.line),
						d < e && t.isEmpty(d) && ((h = !0), d++, (t.line = d));
				}
			}),
				(i.prototype.parse = function (t, n, e, o) {
					var a;
					t &&
						((a = new this.State(t, n, e, o)),
						this.tokenize(a, a.line, a.lineMax));
				}),
				(i.prototype.State = tn()),
				(s.exports = i);
		},
	}),
	nn = z({
		"node_modules/markdown-it/lib/rules_inline/text.js"(r, s) {
			function l(u) {
				switch (u) {
					case 10:
					case 33:
					case 35:
					case 36:
					case 37:
					case 38:
					case 42:
					case 43:
					case 45:
					case 58:
					case 60:
					case 61:
					case 62:
					case 64:
					case 91:
					case 92:
					case 93:
					case 94:
					case 95:
					case 96:
					case 123:
					case 125:
					case 126:
						return !0;
					default:
						return !1;
				}
			}
			s.exports = function (i, t) {
				for (var n = i.pos; n < i.posMax && !l(i.src.charCodeAt(n)); )
					n++;
				return n === i.pos
					? !1
					: (t || (i.pending += i.src.slice(i.pos, n)),
						(i.pos = n),
						!0);
			};
		},
	}),
	on = z({
		"node_modules/markdown-it/lib/rules_inline/newline.js"(r, s) {
			var l = Y().isSpace;
			s.exports = function (i, t) {
				var n,
					e,
					o,
					a = i.pos;
				if (i.src.charCodeAt(a) !== 10) return !1;
				if (((n = i.pending.length - 1), (e = i.posMax), !t))
					if (n >= 0 && i.pending.charCodeAt(n) === 32)
						if (n >= 1 && i.pending.charCodeAt(n - 1) === 32) {
							for (
								o = n - 1;
								o >= 1 && i.pending.charCodeAt(o - 1) === 32;

							)
								o--;
							(i.pending = i.pending.slice(0, o)),
								i.push("hardbreak", "br", 0);
						} else
							(i.pending = i.pending.slice(0, -1)),
								i.push("softbreak", "br", 0);
					else i.push("softbreak", "br", 0);
				for (a++; a < e && l(i.src.charCodeAt(a)); ) a++;
				return (i.pos = a), !0;
			};
		},
	}),
	sn = z({
		"node_modules/markdown-it/lib/rules_inline/escape.js"(r, s) {
			var l = Y().isSpace,
				u = [];
			for (i = 0; i < 256; i++) u.push(0);
			var i;
			"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-"
				.split("")
				.forEach(function (t) {
					u[t.charCodeAt(0)] = 1;
				}),
				(s.exports = function (n, e) {
					var o,
						a = n.pos,
						p = n.posMax;
					if (n.src.charCodeAt(a) !== 92) return !1;
					if ((a++, a < p)) {
						if (((o = n.src.charCodeAt(a)), o < 256 && u[o] !== 0))
							return (
								e || (n.pending += n.src[a]), (n.pos += 2), !0
							);
						if (o === 10) {
							for (
								e || n.push("hardbreak", "br", 0), a++;
								a < p && ((o = n.src.charCodeAt(a)), !!l(o));

							)
								a++;
							return (n.pos = a), !0;
						}
					}
					return e || (n.pending += "\\"), n.pos++, !0;
				});
		},
	}),
	an = z({
		"node_modules/markdown-it/lib/rules_inline/backticks.js"(r, s) {
			s.exports = function (u, i) {
				var t,
					n,
					e,
					o,
					a,
					p,
					c,
					d,
					h = u.pos,
					y = u.src.charCodeAt(h);
				if (y !== 96) return !1;
				for (
					t = h, h++, n = u.posMax;
					h < n && u.src.charCodeAt(h) === 96;

				)
					h++;
				if (
					((e = u.src.slice(t, h)),
					(c = e.length),
					u.backticksScanned && (u.backticks[c] || 0) <= t)
				)
					return i || (u.pending += e), (u.pos += c), !0;
				for (a = p = h; (a = u.src.indexOf("`", p)) !== -1; ) {
					for (p = a + 1; p < n && u.src.charCodeAt(p) === 96; ) p++;
					if (((d = p - a), d === c))
						return (
							i ||
								((o = u.push("code_inline", "code", 0)),
								(o.markup = e),
								(o.content = u.src
									.slice(h, a)
									.replace(/\n/g, " ")
									.replace(/^ (.+) $/, "$1"))),
							(u.pos = p),
							!0
						);
					u.backticks[d] = a;
				}
				return (
					(u.backticksScanned = !0),
					i || (u.pending += e),
					(u.pos += c),
					!0
				);
			};
		},
	}),
	Br = z({
		"node_modules/markdown-it/lib/rules_inline/strikethrough.js"(r, s) {
			s.exports.tokenize = function (i, t) {
				var n,
					e,
					o,
					a,
					p,
					c = i.pos,
					d = i.src.charCodeAt(c);
				if (
					t ||
					d !== 126 ||
					((e = i.scanDelims(i.pos, !0)),
					(a = e.length),
					(p = String.fromCharCode(d)),
					a < 2)
				)
					return !1;
				for (
					a % 2 &&
						((o = i.push("text", "", 0)), (o.content = p), a--),
						n = 0;
					n < a;
					n += 2
				)
					(o = i.push("text", "", 0)),
						(o.content = p + p),
						i.delimiters.push({
							marker: d,
							length: 0,
							token: i.tokens.length - 1,
							end: -1,
							open: e.can_open,
							close: e.can_close,
						});
				return (i.pos += e.length), !0;
			};
			function l(u, i) {
				var t,
					n,
					e,
					o,
					a,
					p = [],
					c = i.length;
				for (t = 0; t < c; t++)
					(e = i[t]),
						e.marker === 126 &&
							e.end !== -1 &&
							((o = i[e.end]),
							(a = u.tokens[e.token]),
							(a.type = "s_open"),
							(a.tag = "s"),
							(a.nesting = 1),
							(a.markup = "~~"),
							(a.content = ""),
							(a = u.tokens[o.token]),
							(a.type = "s_close"),
							(a.tag = "s"),
							(a.nesting = -1),
							(a.markup = "~~"),
							(a.content = ""),
							u.tokens[o.token - 1].type === "text" &&
								u.tokens[o.token - 1].content === "~" &&
								p.push(o.token - 1));
				for (; p.length; ) {
					for (
						t = p.pop(), n = t + 1;
						n < u.tokens.length && u.tokens[n].type === "s_close";

					)
						n++;
					n--,
						t !== n &&
							((a = u.tokens[n]),
							(u.tokens[n] = u.tokens[t]),
							(u.tokens[t] = a));
				}
			}
			s.exports.postProcess = function (i) {
				var t,
					n = i.tokens_meta,
					e = i.tokens_meta.length;
				for (l(i, i.delimiters), t = 0; t < e; t++)
					n[t] && n[t].delimiters && l(i, n[t].delimiters);
			};
		},
	}),
	qr = z({
		"node_modules/markdown-it/lib/rules_inline/emphasis.js"(r, s) {
			s.exports.tokenize = function (i, t) {
				var n,
					e,
					o,
					a = i.pos,
					p = i.src.charCodeAt(a);
				if (t || (p !== 95 && p !== 42)) return !1;
				for (
					e = i.scanDelims(i.pos, p === 42), n = 0;
					n < e.length;
					n++
				)
					(o = i.push("text", "", 0)),
						(o.content = String.fromCharCode(p)),
						i.delimiters.push({
							marker: p,
							length: e.length,
							token: i.tokens.length - 1,
							end: -1,
							open: e.can_open,
							close: e.can_close,
						});
				return (i.pos += e.length), !0;
			};
			function l(u, i) {
				var t,
					n,
					e,
					o,
					a,
					p,
					c = i.length;
				for (t = c - 1; t >= 0; t--)
					(n = i[t]),
						!(n.marker !== 95 && n.marker !== 42) &&
							n.end !== -1 &&
							((e = i[n.end]),
							(p =
								t > 0 &&
								i[t - 1].end === n.end + 1 &&
								i[t - 1].marker === n.marker &&
								i[t - 1].token === n.token - 1 &&
								i[n.end + 1].token === e.token + 1),
							(a = String.fromCharCode(n.marker)),
							(o = u.tokens[n.token]),
							(o.type = p ? "strong_open" : "em_open"),
							(o.tag = p ? "strong" : "em"),
							(o.nesting = 1),
							(o.markup = p ? a + a : a),
							(o.content = ""),
							(o = u.tokens[e.token]),
							(o.type = p ? "strong_close" : "em_close"),
							(o.tag = p ? "strong" : "em"),
							(o.nesting = -1),
							(o.markup = p ? a + a : a),
							(o.content = ""),
							p &&
								((u.tokens[i[t - 1].token].content = ""),
								(u.tokens[i[n.end + 1].token].content = ""),
								t--));
			}
			s.exports.postProcess = function (i) {
				var t,
					n = i.tokens_meta,
					e = i.tokens_meta.length;
				for (l(i, i.delimiters), t = 0; t < e; t++)
					n[t] && n[t].delimiters && l(i, n[t].delimiters);
			};
		},
	}),
	ln = z({
		"node_modules/markdown-it/lib/rules_inline/link.js"(r, s) {
			var l = Y().normalizeReference,
				u = Y().isSpace;
			s.exports = function (t, n) {
				var e,
					o,
					a,
					p,
					c,
					d,
					h,
					y,
					m,
					A = "",
					E = "",
					w = t.pos,
					C = t.posMax,
					x = t.pos,
					v = !0;
				if (
					t.src.charCodeAt(t.pos) !== 91 ||
					((c = t.pos + 1),
					(p = t.md.helpers.parseLinkLabel(t, t.pos, !0)),
					p < 0)
				)
					return !1;
				if (((d = p + 1), d < C && t.src.charCodeAt(d) === 40)) {
					for (
						v = !1, d++;
						d < C &&
						((o = t.src.charCodeAt(d)), !(!u(o) && o !== 10));
						d++
					);
					if (d >= C) return !1;
					if (
						((x = d),
						(h = t.md.helpers.parseLinkDestination(
							t.src,
							d,
							t.posMax,
						)),
						h.ok)
					) {
						for (
							A = t.md.normalizeLink(h.str),
								t.md.validateLink(A) ? (d = h.pos) : (A = ""),
								x = d;
							d < C &&
							((o = t.src.charCodeAt(d)), !(!u(o) && o !== 10));
							d++
						);
						if (
							((h = t.md.helpers.parseLinkTitle(
								t.src,
								d,
								t.posMax,
							)),
							d < C && x !== d && h.ok)
						)
							for (
								E = h.str, d = h.pos;
								d < C &&
								((o = t.src.charCodeAt(d)),
								!(!u(o) && o !== 10));
								d++
							);
					}
					(d >= C || t.src.charCodeAt(d) !== 41) && (v = !0), d++;
				}
				if (v) {
					if (typeof t.env.references > "u") return !1;
					if (
						(d < C && t.src.charCodeAt(d) === 91
							? ((x = d + 1),
								(d = t.md.helpers.parseLinkLabel(t, d)),
								d >= 0
									? (a = t.src.slice(x, d++))
									: (d = p + 1))
							: (d = p + 1),
						a || (a = t.src.slice(c, p)),
						(y = t.env.references[l(a)]),
						!y)
					)
						return (t.pos = w), !1;
					(A = y.href), (E = y.title);
				}
				return (
					n ||
						((t.pos = c),
						(t.posMax = p),
						(m = t.push("link_open", "a", 1)),
						(m.attrs = e = [["href", A]]),
						E && e.push(["title", E]),
						t.md.inline.tokenize(t),
						(m = t.push("link_close", "a", -1))),
					(t.pos = d),
					(t.posMax = C),
					!0
				);
			};
		},
	}),
	cn = z({
		"node_modules/markdown-it/lib/rules_inline/image.js"(r, s) {
			var l = Y().normalizeReference,
				u = Y().isSpace;
			s.exports = function (t, n) {
				var e,
					o,
					a,
					p,
					c,
					d,
					h,
					y,
					m,
					A,
					E,
					w,
					C,
					x = "",
					v = t.pos,
					k = t.posMax;
				if (
					t.src.charCodeAt(t.pos) !== 33 ||
					t.src.charCodeAt(t.pos + 1) !== 91 ||
					((d = t.pos + 2),
					(c = t.md.helpers.parseLinkLabel(t, t.pos + 1, !1)),
					c < 0)
				)
					return !1;
				if (((h = c + 1), h < k && t.src.charCodeAt(h) === 40)) {
					for (
						h++;
						h < k &&
						((o = t.src.charCodeAt(h)), !(!u(o) && o !== 10));
						h++
					);
					if (h >= k) return !1;
					for (
						C = h,
							m = t.md.helpers.parseLinkDestination(
								t.src,
								h,
								t.posMax,
							),
							m.ok &&
								((x = t.md.normalizeLink(m.str)),
								t.md.validateLink(x) ? (h = m.pos) : (x = "")),
							C = h;
						h < k &&
						((o = t.src.charCodeAt(h)), !(!u(o) && o !== 10));
						h++
					);
					if (
						((m = t.md.helpers.parseLinkTitle(t.src, h, t.posMax)),
						h < k && C !== h && m.ok)
					)
						for (
							A = m.str, h = m.pos;
							h < k &&
							((o = t.src.charCodeAt(h)), !(!u(o) && o !== 10));
							h++
						);
					else A = "";
					if (h >= k || t.src.charCodeAt(h) !== 41)
						return (t.pos = v), !1;
					h++;
				} else {
					if (typeof t.env.references > "u") return !1;
					if (
						(h < k && t.src.charCodeAt(h) === 91
							? ((C = h + 1),
								(h = t.md.helpers.parseLinkLabel(t, h)),
								h >= 0
									? (p = t.src.slice(C, h++))
									: (h = c + 1))
							: (h = c + 1),
						p || (p = t.src.slice(d, c)),
						(y = t.env.references[l(p)]),
						!y)
					)
						return (t.pos = v), !1;
					(x = y.href), (A = y.title);
				}
				return (
					n ||
						((a = t.src.slice(d, c)),
						t.md.inline.parse(a, t.md, t.env, (w = [])),
						(E = t.push("image", "img", 0)),
						(E.attrs = e =
							[
								["src", x],
								["alt", ""],
							]),
						(E.children = w),
						(E.content = a),
						A && e.push(["title", A])),
					(t.pos = h),
					(t.posMax = k),
					!0
				);
			};
		},
	}),
	fn = z({
		"node_modules/markdown-it/lib/rules_inline/autolink.js"(r, s) {
			var l =
					/^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
				u = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
			s.exports = function (t, n) {
				var e,
					o,
					a,
					p,
					c,
					d,
					h = t.pos;
				if (t.src.charCodeAt(h) !== 60) return !1;
				for (c = t.pos, d = t.posMax; ; ) {
					if (++h >= d || ((p = t.src.charCodeAt(h)), p === 60))
						return !1;
					if (p === 62) break;
				}
				return (
					(e = t.src.slice(c + 1, h)),
					u.test(e)
						? ((o = t.md.normalizeLink(e)),
							t.md.validateLink(o)
								? (n ||
										((a = t.push("link_open", "a", 1)),
										(a.attrs = [["href", o]]),
										(a.markup = "autolink"),
										(a.info = "auto"),
										(a = t.push("text", "", 0)),
										(a.content = t.md.normalizeLinkText(e)),
										(a = t.push("link_close", "a", -1)),
										(a.markup = "autolink"),
										(a.info = "auto")),
									(t.pos += e.length + 2),
									!0)
								: !1)
						: l.test(e)
							? ((o = t.md.normalizeLink("mailto:" + e)),
								t.md.validateLink(o)
									? (n ||
											((a = t.push("link_open", "a", 1)),
											(a.attrs = [["href", o]]),
											(a.markup = "autolink"),
											(a.info = "auto"),
											(a = t.push("text", "", 0)),
											(a.content =
												t.md.normalizeLinkText(e)),
											(a = t.push("link_close", "a", -1)),
											(a.markup = "autolink"),
											(a.info = "auto")),
										(t.pos += e.length + 2),
										!0)
									: !1)
							: !1
				);
			};
		},
	}),
	pn = z({
		"node_modules/markdown-it/lib/rules_inline/html_inline.js"(r, s) {
			var l = Hr().HTML_TAG_RE;
			function u(i) {
				var t = i | 32;
				return t >= 97 && t <= 122;
			}
			s.exports = function (t, n) {
				var e,
					o,
					a,
					p,
					c = t.pos;
				return !t.md.options.html ||
					((a = t.posMax),
					t.src.charCodeAt(c) !== 60 || c + 2 >= a) ||
					((e = t.src.charCodeAt(c + 1)),
					e !== 33 && e !== 63 && e !== 47 && !u(e)) ||
					((o = t.src.slice(c).match(l)), !o)
					? !1
					: (n ||
							((p = t.push("html_inline", "", 0)),
							(p.content = t.src.slice(c, c + o[0].length))),
						(t.pos += o[0].length),
						!0);
			};
		},
	}),
	hn = z({
		"node_modules/markdown-it/lib/rules_inline/entity.js"(r, s) {
			var l = Lr(),
				u = Y().has,
				i = Y().isValidEntityCode,
				t = Y().fromCodePoint,
				n = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
				e = /^&([a-z][a-z0-9]{1,31});/i;
			s.exports = function (a, p) {
				var c,
					d,
					h,
					y = a.pos,
					m = a.posMax;
				if (a.src.charCodeAt(y) !== 38) return !1;
				if (y + 1 < m) {
					if (((c = a.src.charCodeAt(y + 1)), c === 35)) {
						if (((h = a.src.slice(y).match(n)), h))
							return (
								p ||
									((d =
										h[1][0].toLowerCase() === "x"
											? parseInt(h[1].slice(1), 16)
											: parseInt(h[1], 10)),
									(a.pending += i(d) ? t(d) : t(65533))),
								(a.pos += h[0].length),
								!0
							);
					} else if (((h = a.src.slice(y).match(e)), h && u(l, h[1])))
						return (
							p || (a.pending += l[h[1]]),
							(a.pos += h[0].length),
							!0
						);
				}
				return p || (a.pending += "&"), a.pos++, !0;
			};
		},
	}),
	dn = z({
		"node_modules/markdown-it/lib/rules_inline/balance_pairs.js"(r, s) {
			function l(u, i) {
				var t,
					n,
					e,
					o,
					a,
					p,
					c,
					d,
					h = {},
					y = i.length;
				if (y) {
					var m = 0,
						A = -2,
						E = [];
					for (t = 0; t < y; t++)
						if (
							((e = i[t]),
							E.push(0),
							(i[m].marker !== e.marker || A !== e.token - 1) &&
								(m = t),
							(A = e.token),
							(e.length = e.length || 0),
							!!e.close)
						) {
							for (
								h.hasOwnProperty(e.marker) ||
									(h[e.marker] = [-1, -1, -1, -1, -1, -1]),
									a =
										h[e.marker][
											(e.open ? 3 : 0) + (e.length % 3)
										],
									n = m - E[m] - 1,
									p = n;
								n > a;
								n -= E[n] + 1
							)
								if (
									((o = i[n]),
									o.marker === e.marker &&
										o.open &&
										o.end < 0 &&
										((c = !1),
										(o.close || e.open) &&
											(o.length + e.length) % 3 === 0 &&
											(o.length % 3 !== 0 ||
												e.length % 3 !== 0) &&
											(c = !0),
										!c))
								) {
									(d =
										n > 0 && !i[n - 1].open
											? E[n - 1] + 1
											: 0),
										(E[t] = t - n + d),
										(E[n] = d),
										(e.open = !1),
										(o.end = t),
										(o.close = !1),
										(p = -1),
										(A = -2);
									break;
								}
							p !== -1 &&
								(h[e.marker][
									(e.open ? 3 : 0) + ((e.length || 0) % 3)
								] = p);
						}
				}
			}
			s.exports = function (i) {
				var t,
					n = i.tokens_meta,
					e = i.tokens_meta.length;
				for (l(i, i.delimiters), t = 0; t < e; t++)
					n[t] && n[t].delimiters && l(i, n[t].delimiters);
			};
		},
	}),
	mn = z({
		"node_modules/markdown-it/lib/rules_inline/text_collapse.js"(r, s) {
			s.exports = function (u) {
				var i,
					t,
					n = 0,
					e = u.tokens,
					o = u.tokens.length;
				for (i = t = 0; i < o; i++)
					e[i].nesting < 0 && n--,
						(e[i].level = n),
						e[i].nesting > 0 && n++,
						e[i].type === "text" &&
						i + 1 < o &&
						e[i + 1].type === "text"
							? (e[i + 1].content =
									e[i].content + e[i + 1].content)
							: (i !== t && (e[t] = e[i]), t++);
				i !== t && (e.length = t);
			};
		},
	}),
	gn = z({
		"node_modules/markdown-it/lib/rules_inline/state_inline.js"(r, s) {
			var l = tr(),
				u = Y().isWhiteSpace,
				i = Y().isPunctChar,
				t = Y().isMdAsciiPunct;
			function n(e, o, a, p) {
				(this.src = e),
					(this.env = a),
					(this.md = o),
					(this.tokens = p),
					(this.tokens_meta = Array(p.length)),
					(this.pos = 0),
					(this.posMax = this.src.length),
					(this.level = 0),
					(this.pending = ""),
					(this.pendingLevel = 0),
					(this.cache = {}),
					(this.delimiters = []),
					(this._prev_delimiters = []),
					(this.backticks = {}),
					(this.backticksScanned = !1);
			}
			(n.prototype.pushPending = function () {
				var e = new l("text", "", 0);
				return (
					(e.content = this.pending),
					(e.level = this.pendingLevel),
					this.tokens.push(e),
					(this.pending = ""),
					e
				);
			}),
				(n.prototype.push = function (e, o, a) {
					this.pending && this.pushPending();
					var p = new l(e, o, a),
						c = null;
					return (
						a < 0 &&
							(this.level--,
							(this.delimiters = this._prev_delimiters.pop())),
						(p.level = this.level),
						a > 0 &&
							(this.level++,
							this._prev_delimiters.push(this.delimiters),
							(this.delimiters = []),
							(c = { delimiters: this.delimiters })),
						(this.pendingLevel = this.level),
						this.tokens.push(p),
						this.tokens_meta.push(c),
						p
					);
				}),
				(n.prototype.scanDelims = function (e, o) {
					var a = e,
						p,
						c,
						d,
						h,
						y,
						m,
						A,
						E,
						w,
						C = !0,
						x = !0,
						v = this.posMax,
						k = this.src.charCodeAt(e);
					for (
						p = e > 0 ? this.src.charCodeAt(e - 1) : 32;
						a < v && this.src.charCodeAt(a) === k;

					)
						a++;
					return (
						(d = a - e),
						(c = a < v ? this.src.charCodeAt(a) : 32),
						(A = t(p) || i(String.fromCharCode(p))),
						(w = t(c) || i(String.fromCharCode(c))),
						(m = u(p)),
						(E = u(c)),
						E ? (C = !1) : w && (m || A || (C = !1)),
						m ? (x = !1) : A && (E || w || (x = !1)),
						o
							? ((h = C), (y = x))
							: ((h = C && (!x || A)), (y = x && (!C || w))),
						{ can_open: h, can_close: y, length: d }
					);
				}),
				(n.prototype.Token = l),
				(s.exports = n);
		},
	}),
	_n = z({
		"node_modules/markdown-it/lib/parser_inline.js"(r, s) {
			var l = rr(),
				u = [
					["text", nn()],
					["newline", on()],
					["escape", sn()],
					["backticks", an()],
					["strikethrough", Br().tokenize],
					["emphasis", qr().tokenize],
					["link", ln()],
					["image", cn()],
					["autolink", fn()],
					["html_inline", pn()],
					["entity", hn()],
				],
				i = [
					["balance_pairs", dn()],
					["strikethrough", Br().postProcess],
					["emphasis", qr().postProcess],
					["text_collapse", mn()],
				];
			function t() {
				var n;
				for (this.ruler = new l(), n = 0; n < u.length; n++)
					this.ruler.push(u[n][0], u[n][1]);
				for (this.ruler2 = new l(), n = 0; n < i.length; n++)
					this.ruler2.push(i[n][0], i[n][1]);
			}
			(t.prototype.skipToken = function (n) {
				var e,
					o,
					a = n.pos,
					p = this.ruler.getRules(""),
					c = p.length,
					d = n.md.options.maxNesting,
					h = n.cache;
				if (typeof h[a] < "u") {
					n.pos = h[a];
					return;
				}
				if (n.level < d)
					for (
						o = 0;
						o < c && (n.level++, (e = p[o](n, !0)), n.level--, !e);
						o++
					);
				else n.pos = n.posMax;
				e || n.pos++, (h[a] = n.pos);
			}),
				(t.prototype.tokenize = function (n) {
					for (
						var e,
							o,
							a = this.ruler.getRules(""),
							p = a.length,
							c = n.posMax,
							d = n.md.options.maxNesting;
						n.pos < c;

					) {
						if (n.level < d)
							for (o = 0; o < p && ((e = a[o](n, !1)), !e); o++);
						if (e) {
							if (n.pos >= c) break;
							continue;
						}
						n.pending += n.src[n.pos++];
					}
					n.pending && n.pushPending();
				}),
				(t.prototype.parse = function (n, e, o, a) {
					var p,
						c,
						d,
						h = new this.State(n, e, o, a);
					for (
						this.tokenize(h),
							c = this.ruler2.getRules(""),
							d = c.length,
							p = 0;
						p < d;
						p++
					)
						c[p](h);
				}),
				(t.prototype.State = gn()),
				(s.exports = t);
		},
	}),
	bn = z({
		"node_modules/linkify-it/lib/re.js"(r, s) {
			s.exports = function (l) {
				var u = {};
				(u.src_Any = Ur().source),
					(u.src_Cc = Zr().source),
					(u.src_Z = Gr().source),
					(u.src_P = er().source),
					(u.src_ZPCc = [u.src_Z, u.src_P, u.src_Cc].join("|")),
					(u.src_ZCc = [u.src_Z, u.src_Cc].join("|"));
				var i = "[><｜]";
				return (
					(u.src_pseudo_letter =
						"(?:(?!" +
						i +
						"|" +
						u.src_ZPCc +
						")" +
						u.src_Any +
						")"),
					(u.src_ip4 =
						"(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"),
					(u.src_auth =
						"(?:(?:(?!" + u.src_ZCc + "|[@/\\[\\]()]).)+@)?"),
					(u.src_port =
						"(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?"),
					(u.src_host_terminator =
						"(?=$|" +
						i +
						"|" +
						u.src_ZPCc +
						")(?!-|_|:\\d|\\.-|\\.(?!$|" +
						u.src_ZPCc +
						"))"),
					(u.src_path =
						"(?:[/?#](?:(?!" +
						u.src_ZCc +
						"|" +
						i +
						`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` +
						u.src_ZCc +
						"|\\]).)*\\]|\\((?:(?!" +
						u.src_ZCc +
						"|[)]).)*\\)|\\{(?:(?!" +
						u.src_ZCc +
						'|[}]).)*\\}|\\"(?:(?!' +
						u.src_ZCc +
						`|["]).)+\\"|\\'(?:(?!` +
						u.src_ZCc +
						"|[']).)+\\'|\\'(?=" +
						u.src_pseudo_letter +
						"|[-]).|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" +
						u.src_ZCc +
						"|[.]).|" +
						(l && l["---"]
							? "\\-(?!--(?:[^-]|$))(?:-*)|"
							: "\\-+|") +
						",(?!" +
						u.src_ZCc +
						").|;(?!" +
						u.src_ZCc +
						").|\\!+(?!" +
						u.src_ZCc +
						"|[!]).|\\?(?!" +
						u.src_ZCc +
						"|[?]).)+|\\/)?"),
					(u.src_email_name =
						'[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*'),
					(u.src_xn = "xn--[a-z0-9\\-]{1,59}"),
					(u.src_domain_root =
						"(?:" +
						u.src_xn +
						"|" +
						u.src_pseudo_letter +
						"{1,63})"),
					(u.src_domain =
						"(?:" +
						u.src_xn +
						"|(?:" +
						u.src_pseudo_letter +
						")|(?:" +
						u.src_pseudo_letter +
						"(?:-|" +
						u.src_pseudo_letter +
						"){0,61}" +
						u.src_pseudo_letter +
						"))"),
					(u.src_host =
						"(?:(?:(?:(?:" +
						u.src_domain +
						")\\.)*" +
						u.src_domain +
						"))"),
					(u.tpl_host_fuzzy =
						"(?:" +
						u.src_ip4 +
						"|(?:(?:(?:" +
						u.src_domain +
						")\\.)+(?:%TLDS%)))"),
					(u.tpl_host_no_ip_fuzzy =
						"(?:(?:(?:" + u.src_domain + ")\\.)+(?:%TLDS%))"),
					(u.src_host_strict = u.src_host + u.src_host_terminator),
					(u.tpl_host_fuzzy_strict =
						u.tpl_host_fuzzy + u.src_host_terminator),
					(u.src_host_port_strict =
						u.src_host + u.src_port + u.src_host_terminator),
					(u.tpl_host_port_fuzzy_strict =
						u.tpl_host_fuzzy + u.src_port + u.src_host_terminator),
					(u.tpl_host_port_no_ip_fuzzy_strict =
						u.tpl_host_no_ip_fuzzy +
						u.src_port +
						u.src_host_terminator),
					(u.tpl_host_fuzzy_test =
						"localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" +
						u.src_ZPCc +
						"|>|$))"),
					(u.tpl_email_fuzzy =
						"(^|" +
						i +
						'|"|\\(|' +
						u.src_ZCc +
						")(" +
						u.src_email_name +
						"@" +
						u.tpl_host_fuzzy_strict +
						")"),
					(u.tpl_link_fuzzy =
						"(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" +
						u.src_ZPCc +
						"))((?![$+<=>^`|｜])" +
						u.tpl_host_port_fuzzy_strict +
						u.src_path +
						")"),
					(u.tpl_link_no_ip_fuzzy =
						"(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" +
						u.src_ZPCc +
						"))((?![$+<=>^`|｜])" +
						u.tpl_host_port_no_ip_fuzzy_strict +
						u.src_path +
						")"),
					u
				);
			};
		},
	}),
	An = z({
		"node_modules/linkify-it/index.js"(r, s) {
			function l(v) {
				var k = Array.prototype.slice.call(arguments, 1);
				return (
					k.forEach(function (F) {
						F &&
							Object.keys(F).forEach(function (B) {
								v[B] = F[B];
							});
					}),
					v
				);
			}
			function u(v) {
				return Object.prototype.toString.call(v);
			}
			function i(v) {
				return u(v) === "[object String]";
			}
			function t(v) {
				return u(v) === "[object Object]";
			}
			function n(v) {
				return u(v) === "[object RegExp]";
			}
			function e(v) {
				return u(v) === "[object Function]";
			}
			function o(v) {
				return v.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
			}
			var a = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 };
			function p(v) {
				return Object.keys(v || {}).reduce(function (k, F) {
					return k || a.hasOwnProperty(F);
				}, !1);
			}
			var c = {
					"http:": {
						validate: function (v, k, F) {
							var B = v.slice(k);
							return (
								F.re.http ||
									(F.re.http = new RegExp(
										"^\\/\\/" +
											F.re.src_auth +
											F.re.src_host_port_strict +
											F.re.src_path,
										"i",
									)),
								F.re.http.test(B)
									? B.match(F.re.http)[0].length
									: 0
							);
						},
					},
					"https:": "http:",
					"ftp:": "http:",
					"//": {
						validate: function (v, k, F) {
							var B = v.slice(k);
							return (
								F.re.no_http ||
									(F.re.no_http = new RegExp(
										"^" +
											F.re.src_auth +
											"(?:localhost|(?:(?:" +
											F.re.src_domain +
											")\\.)+" +
											F.re.src_domain_root +
											")" +
											F.re.src_port +
											F.re.src_host_terminator +
											F.re.src_path,
										"i",
									)),
								F.re.no_http.test(B)
									? (k >= 3 && v[k - 3] === ":") ||
										(k >= 3 && v[k - 3] === "/")
										? 0
										: B.match(F.re.no_http)[0].length
									: 0
							);
						},
					},
					"mailto:": {
						validate: function (v, k, F) {
							var B = v.slice(k);
							return (
								F.re.mailto ||
									(F.re.mailto = new RegExp(
										"^" +
											F.re.src_email_name +
											"@" +
											F.re.src_host_strict,
										"i",
									)),
								F.re.mailto.test(B)
									? B.match(F.re.mailto)[0].length
									: 0
							);
						},
					},
				},
				d =
					"a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
				h =
					"biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split(
						"|",
					);
			function y(v) {
				(v.__index__ = -1), (v.__text_cache__ = "");
			}
			function m(v) {
				return function (k, F) {
					var B = k.slice(F);
					return v.test(B) ? B.match(v)[0].length : 0;
				};
			}
			function A() {
				return function (v, k) {
					k.normalize(v);
				};
			}
			function E(v) {
				var k = (v.re = bn()(v.__opts__)),
					F = v.__tlds__.slice();
				v.onCompile(),
					v.__tlds_replaced__ || F.push(d),
					F.push(k.src_xn),
					(k.src_tlds = F.join("|"));
				function B(j) {
					return j.replace("%TLDS%", k.src_tlds);
				}
				(k.email_fuzzy = RegExp(B(k.tpl_email_fuzzy), "i")),
					(k.link_fuzzy = RegExp(B(k.tpl_link_fuzzy), "i")),
					(k.link_no_ip_fuzzy = RegExp(
						B(k.tpl_link_no_ip_fuzzy),
						"i",
					)),
					(k.host_fuzzy_test = RegExp(B(k.tpl_host_fuzzy_test), "i"));
				var I = [];
				v.__compiled__ = {};
				function S(j, R) {
					throw new Error(
						'(LinkifyIt) Invalid schema "' + j + '": ' + R,
					);
				}
				Object.keys(v.__schemas__).forEach(function (j) {
					var R = v.__schemas__[j];
					if (R !== null) {
						var q = { validate: null, link: null };
						if (((v.__compiled__[j] = q), t(R))) {
							n(R.validate)
								? (q.validate = m(R.validate))
								: e(R.validate)
									? (q.validate = R.validate)
									: S(j, R),
								e(R.normalize)
									? (q.normalize = R.normalize)
									: R.normalize
										? S(j, R)
										: (q.normalize = A());
							return;
						}
						if (i(R)) {
							I.push(j);
							return;
						}
						S(j, R);
					}
				}),
					I.forEach(function (j) {
						v.__compiled__[v.__schemas__[j]] &&
							((v.__compiled__[j].validate =
								v.__compiled__[v.__schemas__[j]].validate),
							(v.__compiled__[j].normalize =
								v.__compiled__[v.__schemas__[j]].normalize));
					}),
					(v.__compiled__[""] = { validate: null, normalize: A() });
				var O = Object.keys(v.__compiled__)
					.filter(function (j) {
						return j.length > 0 && v.__compiled__[j];
					})
					.map(o)
					.join("|");
				(v.re.schema_test = RegExp(
					"(^|(?!_)(?:[><｜]|" + k.src_ZPCc + "))(" + O + ")",
					"i",
				)),
					(v.re.schema_search = RegExp(
						"(^|(?!_)(?:[><｜]|" + k.src_ZPCc + "))(" + O + ")",
						"ig",
					)),
					(v.re.pretest = RegExp(
						"(" +
							v.re.schema_test.source +
							")|(" +
							v.re.host_fuzzy_test.source +
							")|@",
						"i",
					)),
					y(v);
			}
			function w(v, k) {
				var F = v.__index__,
					B = v.__last_index__,
					I = v.__text_cache__.slice(F, B);
				(this.schema = v.__schema__.toLowerCase()),
					(this.index = F + k),
					(this.lastIndex = B + k),
					(this.raw = I),
					(this.text = I),
					(this.url = I);
			}
			function C(v, k) {
				var F = new w(v, k);
				return v.__compiled__[F.schema].normalize(F, v), F;
			}
			function x(v, k) {
				if (!(this instanceof x)) return new x(v, k);
				k || (p(v) && ((k = v), (v = {}))),
					(this.__opts__ = l({}, a, k)),
					(this.__index__ = -1),
					(this.__last_index__ = -1),
					(this.__schema__ = ""),
					(this.__text_cache__ = ""),
					(this.__schemas__ = l({}, c, v)),
					(this.__compiled__ = {}),
					(this.__tlds__ = h),
					(this.__tlds_replaced__ = !1),
					(this.re = {}),
					E(this);
			}
			(x.prototype.add = function (k, F) {
				return (this.__schemas__[k] = F), E(this), this;
			}),
				(x.prototype.set = function (k) {
					return (this.__opts__ = l(this.__opts__, k)), this;
				}),
				(x.prototype.test = function (k) {
					if (
						((this.__text_cache__ = k),
						(this.__index__ = -1),
						!k.length)
					)
						return !1;
					var F, B, I, S, O, j, R, q, T;
					if (this.re.schema_test.test(k)) {
						for (
							R = this.re.schema_search, R.lastIndex = 0;
							(F = R.exec(k)) !== null;

						)
							if (
								((S = this.testSchemaAt(k, F[2], R.lastIndex)),
								S)
							) {
								(this.__schema__ = F[2]),
									(this.__index__ = F.index + F[1].length),
									(this.__last_index__ =
										F.index + F[0].length + S);
								break;
							}
					}
					return (
						this.__opts__.fuzzyLink &&
							this.__compiled__["http:"] &&
							((q = k.search(this.re.host_fuzzy_test)),
							q >= 0 &&
								(this.__index__ < 0 || q < this.__index__) &&
								(B = k.match(
									this.__opts__.fuzzyIP
										? this.re.link_fuzzy
										: this.re.link_no_ip_fuzzy,
								)) !== null &&
								((O = B.index + B[1].length),
								(this.__index__ < 0 || O < this.__index__) &&
									((this.__schema__ = ""),
									(this.__index__ = O),
									(this.__last_index__ =
										B.index + B[0].length)))),
						this.__opts__.fuzzyEmail &&
							this.__compiled__["mailto:"] &&
							((T = k.indexOf("@")),
							T >= 0 &&
								(I = k.match(this.re.email_fuzzy)) !== null &&
								((O = I.index + I[1].length),
								(j = I.index + I[0].length),
								(this.__index__ < 0 ||
									O < this.__index__ ||
									(O === this.__index__ &&
										j > this.__last_index__)) &&
									((this.__schema__ = "mailto:"),
									(this.__index__ = O),
									(this.__last_index__ = j)))),
						this.__index__ >= 0
					);
				}),
				(x.prototype.pretest = function (k) {
					return this.re.pretest.test(k);
				}),
				(x.prototype.testSchemaAt = function (k, F, B) {
					return this.__compiled__[F.toLowerCase()]
						? this.__compiled__[F.toLowerCase()].validate(
								k,
								B,
								this,
							)
						: 0;
				}),
				(x.prototype.match = function (k) {
					var F = 0,
						B = [];
					this.__index__ >= 0 &&
						this.__text_cache__ === k &&
						(B.push(C(this, F)), (F = this.__last_index__));
					for (var I = F ? k.slice(F) : k; this.test(I); )
						B.push(C(this, F)),
							(I = I.slice(this.__last_index__)),
							(F += this.__last_index__);
					return B.length ? B : null;
				}),
				(x.prototype.tlds = function (k, F) {
					return (
						(k = Array.isArray(k) ? k : [k]),
						F
							? ((this.__tlds__ = this.__tlds__
									.concat(k)
									.sort()
									.filter(function (B, I, S) {
										return B !== S[I - 1];
									})
									.reverse()),
								E(this),
								this)
							: ((this.__tlds__ = k.slice()),
								(this.__tlds_replaced__ = !0),
								E(this),
								this)
					);
				}),
				(x.prototype.normalize = function (k) {
					k.schema || (k.url = "http://" + k.url),
						k.schema === "mailto:" &&
							!/^mailto:/i.test(k.url) &&
							(k.url = "mailto:" + k.url);
				}),
				(x.prototype.onCompile = function () {}),
				(s.exports = x);
		},
	}),
	vn = z({
		"node_modules/punycode/punycode.js"(r, s) {
			var l = 2147483647,
				u = 36,
				i = 1,
				t = 26,
				n = 38,
				e = 700,
				o = 72,
				a = 128,
				p = "-",
				c = /^xn--/,
				d = /[^\0-\x7E]/,
				h = /[\x2E\u3002\uFF0E\uFF61]/g,
				y = {
					overflow: "Overflow: input needs wider integers to process",
					"not-basic":
						"Illegal input >= 0x80 (not a basic code point)",
					"invalid-input": "Invalid input",
				},
				m = u - i,
				A = Math.floor,
				E = String.fromCharCode;
			function w(T) {
				throw new RangeError(y[T]);
			}
			function C(T, M) {
				const N = [];
				let V = T.length;
				for (; V--; ) N[V] = M(T[V]);
				return N;
			}
			function x(T, M) {
				const N = T.split("@");
				let V = "";
				N.length > 1 && ((V = N[0] + "@"), (T = N[1])),
					(T = T.replace(h, "."));
				const W = T.split("."),
					K = C(W, M).join(".");
				return V + K;
			}
			function v(T) {
				const M = [];
				let N = 0;
				const V = T.length;
				for (; N < V; ) {
					const W = T.charCodeAt(N++);
					if (W >= 55296 && W <= 56319 && N < V) {
						const K = T.charCodeAt(N++);
						(K & 64512) == 56320
							? M.push(((W & 1023) << 10) + (K & 1023) + 65536)
							: (M.push(W), N--);
					} else M.push(W);
				}
				return M;
			}
			var k = (T) => String.fromCodePoint(...T),
				F = function (T) {
					return T - 48 < 10
						? T - 22
						: T - 65 < 26
							? T - 65
							: T - 97 < 26
								? T - 97
								: u;
				},
				B = function (T, M) {
					return T + 22 + 75 * (T < 26) - ((M != 0) << 5);
				},
				I = function (T, M, N) {
					let V = 0;
					for (
						T = N ? A(T / e) : T >> 1, T += A(T / M);
						T > (m * t) >> 1;
						V += u
					)
						T = A(T / m);
					return A(V + ((m + 1) * T) / (T + n));
				},
				S = function (T) {
					const M = [],
						N = T.length;
					let V = 0,
						W = a,
						K = o,
						re = T.lastIndexOf(p);
					re < 0 && (re = 0);
					for (let H = 0; H < re; ++H)
						T.charCodeAt(H) >= 128 && w("not-basic"),
							M.push(T.charCodeAt(H));
					for (let H = re > 0 ? re + 1 : 0; H < N; ) {
						let X = V;
						for (let ne = 1, oe = u; ; oe += u) {
							H >= N && w("invalid-input");
							const ce = F(T.charCodeAt(H++));
							(ce >= u || ce > A((l - V) / ne)) && w("overflow"),
								(V += ce * ne);
							const me = oe <= K ? i : oe >= K + t ? t : oe - K;
							if (ce < me) break;
							const Ae = u - me;
							ne > A(l / Ae) && w("overflow"), (ne *= Ae);
						}
						const ue = M.length + 1;
						(K = I(V - X, ue, X == 0)),
							A(V / ue) > l - W && w("overflow"),
							(W += A(V / ue)),
							(V %= ue),
							M.splice(V++, 0, W);
					}
					return String.fromCodePoint(...M);
				},
				O = function (T) {
					const M = [];
					T = v(T);
					let N = T.length,
						V = a,
						W = 0,
						K = o;
					for (const X of T) X < 128 && M.push(E(X));
					let re = M.length,
						H = re;
					for (re && M.push(p); H < N; ) {
						let X = l;
						for (const ne of T) ne >= V && ne < X && (X = ne);
						const ue = H + 1;
						X - V > A((l - W) / ue) && w("overflow"),
							(W += (X - V) * ue),
							(V = X);
						for (const ne of T)
							if ((ne < V && ++W > l && w("overflow"), ne == V)) {
								let oe = W;
								for (let ce = u; ; ce += u) {
									const me =
										ce <= K ? i : ce >= K + t ? t : ce - K;
									if (oe < me) break;
									const Ae = oe - me,
										Ee = u - me;
									M.push(E(B(me + (Ae % Ee), 0))),
										(oe = A(Ae / Ee));
								}
								M.push(E(B(oe, 0))),
									(K = I(W, ue, H == re)),
									(W = 0),
									++H;
							}
						++W, ++V;
					}
					return M.join("");
				},
				j = function (T) {
					return x(T, function (M) {
						return c.test(M) ? S(M.slice(4).toLowerCase()) : M;
					});
				},
				R = function (T) {
					return x(T, function (M) {
						return d.test(M) ? "xn--" + O(M) : M;
					});
				},
				q = {
					version: "2.1.0",
					ucs2: { decode: v, encode: k },
					decode: S,
					encode: O,
					toASCII: R,
					toUnicode: j,
				};
			s.exports = q;
		},
	}),
	kn = z({
		"node_modules/markdown-it/lib/presets/default.js"(r, s) {
			s.exports = {
				options: {
					html: !1,
					xhtmlOut: !1,
					breaks: !1,
					langPrefix: "language-",
					linkify: !1,
					typographer: !1,
					quotes: "“”‘’",
					highlight: null,
					maxNesting: 100,
				},
				components: { core: {}, block: {}, inline: {} },
			};
		},
	}),
	Cn = z({
		"node_modules/markdown-it/lib/presets/zero.js"(r, s) {
			s.exports = {
				options: {
					html: !1,
					xhtmlOut: !1,
					breaks: !1,
					langPrefix: "language-",
					linkify: !1,
					typographer: !1,
					quotes: "“”‘’",
					highlight: null,
					maxNesting: 20,
				},
				components: {
					core: { rules: ["normalize", "block", "inline"] },
					block: { rules: ["paragraph"] },
					inline: {
						rules: ["text"],
						rules2: ["balance_pairs", "text_collapse"],
					},
				},
			};
		},
	}),
	yn = z({
		"node_modules/markdown-it/lib/presets/commonmark.js"(r, s) {
			s.exports = {
				options: {
					html: !0,
					xhtmlOut: !0,
					breaks: !1,
					langPrefix: "language-",
					linkify: !1,
					typographer: !1,
					quotes: "“”‘’",
					highlight: null,
					maxNesting: 20,
				},
				components: {
					core: { rules: ["normalize", "block", "inline"] },
					block: {
						rules: [
							"blockquote",
							"code",
							"fence",
							"heading",
							"hr",
							"html_block",
							"lheading",
							"list",
							"reference",
							"paragraph",
						],
					},
					inline: {
						rules: [
							"autolink",
							"backticks",
							"emphasis",
							"entity",
							"escape",
							"html_inline",
							"image",
							"link",
							"newline",
							"text",
						],
						rules2: ["balance_pairs", "emphasis", "text_collapse"],
					},
				},
			};
		},
	}),
	Wr = z({
		"node_modules/markdown-it/lib/index.js"(r, s) {
			var l = Y(),
				u = ju(),
				i = Iu(),
				t = Vu(),
				n = un(),
				e = _n(),
				o = An(),
				a = Vr(),
				p = vn(),
				c = { default: kn(), zero: Cn(), commonmark: yn() },
				d = /^(vbscript|javascript|file|data):/,
				h = /^data:image\/(gif|png|jpeg|webp);/;
			function y(C) {
				var x = C.trim().toLowerCase();
				return d.test(x) ? !!h.test(x) : !0;
			}
			var m = ["http:", "https:", "mailto:"];
			function A(C) {
				var x = a.parse(C, !0);
				if (x.hostname && (!x.protocol || m.indexOf(x.protocol) >= 0))
					try {
						x.hostname = p.toASCII(x.hostname);
					} catch {}
				return a.encode(a.format(x));
			}
			function E(C) {
				var x = a.parse(C, !0);
				if (x.hostname && (!x.protocol || m.indexOf(x.protocol) >= 0))
					try {
						x.hostname = p.toUnicode(x.hostname);
					} catch {}
				return a.decode(a.format(x), a.decode.defaultChars + "%");
			}
			function w(C, x) {
				if (!(this instanceof w)) return new w(C, x);
				x || l.isString(C) || ((x = C || {}), (C = "default")),
					(this.inline = new e()),
					(this.block = new n()),
					(this.core = new t()),
					(this.renderer = new i()),
					(this.linkify = new o()),
					(this.validateLink = y),
					(this.normalizeLink = A),
					(this.normalizeLinkText = E),
					(this.utils = l),
					(this.helpers = l.assign({}, u)),
					(this.options = {}),
					this.configure(C),
					x && this.set(x);
			}
			(w.prototype.set = function (C) {
				return l.assign(this.options, C), this;
			}),
				(w.prototype.configure = function (C) {
					var x = this,
						v;
					if (l.isString(C) && ((v = C), (C = c[v]), !C))
						throw new Error(
							'Wrong `markdown-it` preset "' +
								v +
								'", check name',
						);
					if (!C)
						throw new Error(
							"Wrong `markdown-it` preset, can't be empty",
						);
					return (
						C.options && x.set(C.options),
						C.components &&
							Object.keys(C.components).forEach(function (k) {
								C.components[k].rules &&
									x[k].ruler.enableOnly(
										C.components[k].rules,
									),
									C.components[k].rules2 &&
										x[k].ruler2.enableOnly(
											C.components[k].rules2,
										);
							}),
						this
					);
				}),
				(w.prototype.enable = function (C, x) {
					var v = [];
					Array.isArray(C) || (C = [C]),
						["core", "block", "inline"].forEach(function (F) {
							v = v.concat(this[F].ruler.enable(C, !0));
						}, this),
						(v = v.concat(this.inline.ruler2.enable(C, !0)));
					var k = C.filter(function (F) {
						return v.indexOf(F) < 0;
					});
					if (k.length && !x)
						throw new Error(
							"MarkdownIt. Failed to enable unknown rule(s): " +
								k,
						);
					return this;
				}),
				(w.prototype.disable = function (C, x) {
					var v = [];
					Array.isArray(C) || (C = [C]),
						["core", "block", "inline"].forEach(function (F) {
							v = v.concat(this[F].ruler.disable(C, !0));
						}, this),
						(v = v.concat(this.inline.ruler2.disable(C, !0)));
					var k = C.filter(function (F) {
						return v.indexOf(F) < 0;
					});
					if (k.length && !x)
						throw new Error(
							"MarkdownIt. Failed to disable unknown rule(s): " +
								k,
						);
					return this;
				}),
				(w.prototype.use = function (C) {
					var x = [this].concat(
						Array.prototype.slice.call(arguments, 1),
					);
					return C.apply(C, x), this;
				}),
				(w.prototype.parse = function (C, x) {
					if (typeof C != "string")
						throw new Error("Input data should be a String");
					var v = new this.core.State(C, this, x);
					return this.core.process(v), v.tokens;
				}),
				(w.prototype.render = function (C, x) {
					return (
						(x = x || {}),
						this.renderer.render(this.parse(C, x), this.options, x)
					);
				}),
				(w.prototype.parseInline = function (C, x) {
					var v = new this.core.State(C, this, x);
					return (v.inlineMode = !0), this.core.process(v), v.tokens;
				}),
				(w.prototype.renderInline = function (C, x) {
					return (
						(x = x || {}),
						this.renderer.render(
							this.parseInline(C, x),
							this.options,
							x,
						)
					);
				}),
				(s.exports = w);
		},
	}),
	Dn = z({
		"node_modules/markdown-it/index.js"(r, s) {
			s.exports = Wr();
		},
	}),
	Jr = {};
Pr(Jr, {
	getAstValues: () => Je,
	isAst: () => ur,
	isFunction: () => xn,
	isVariable: () => En,
	resolve: () => De,
});
function ur(r) {
	return !!(r != null && r.$$mdtype);
}
function xn(r) {
	return (r == null ? void 0 : r.$$mdtype) === "Function";
}
function En(r) {
	return (r == null ? void 0 : r.$$mdtype) === "Variable";
}
function* Je(r) {
	if (!(r == null || typeof r != "object")) {
		if (Array.isArray(r)) for (const s of r) yield* Je(s);
		if ((ur(r) && (yield r), Object.getPrototypeOf(r) === Object.prototype))
			for (const s of Object.values(r)) yield* Je(s);
	}
}
function De(r, s = {}) {
	if (r == null || typeof r != "object") return r;
	if (Array.isArray(r)) return r.map((u) => De(u, s));
	if (ur(r) && (r == null ? void 0 : r.resolve) instanceof Function)
		return r.resolve(s);
	if (Object.getPrototypeOf(r) !== Object.prototype) return r;
	const l = {};
	for (const [u, i] of Object.entries(r)) l[u] = De(i, s);
	return l;
}
var fe = class {
	constructor(r = "div", s = {}, l = []) {
		(this.$$mdtype = "Tag"),
			(this.name = r),
			(this.attributes = s),
			(this.children = l);
	}
};
fe.isTag = (r) => (r == null ? void 0 : r.$$mdtype) === "Tag";
var Fn = class {
		validate(r, s, l) {
			return typeof r == "string" || typeof r == "object"
				? []
				: [
						{
							id: "attribute-type-invalid",
							level: "error",
							message: `Attribute '${l}' must be type 'string | object'`,
						},
					];
		}
		transform(r) {
			if (!r || typeof r == "string") return r;
			const s = [];
			for (const [l, u] of Object.entries(r ?? {})) u && s.push(l);
			return s.join(" ");
		}
	},
	wn = class {
		validate(r) {
			return typeof r == "string" && r.match(/^[a-zA-Z]/)
				? []
				: [
						{
							id: "attribute-value-invalid",
							level: "error",
							message:
								"The 'id' attribute must start with a letter",
						},
					];
		}
	},
	Sr = Me(Nr()),
	Pe = class {
		constructor(r = []) {
			(this.$$mdtype = "Variable"), (this.path = r);
		}
		resolve({ variables: r } = {}) {
			return r instanceof Function
				? r(this.path)
				: this.path.reduce((s = {}, l) => s[l], r);
		}
	},
	Ne = class {
		constructor(r, s) {
			(this.$$mdtype = "Function"),
				(this.name = r),
				(this.parameters = s);
		}
		resolve(r = {}) {
			var u, i;
			const s =
				(u = r == null ? void 0 : r.functions) == null
					? void 0
					: u[this.name];
			if (!s) return null;
			const l = De(this.parameters, r);
			return (i = s.transform) == null ? void 0 : i.call(s, l, r);
		}
	},
	$r;
(function (r) {
	(r[(r.normal = 0)] = "normal"),
		(r[(r.string = 1)] = "string"),
		(r[(r.escape = 2)] = "escape");
})($r || ($r = {}));
var ie = "{%",
	de = "%}",
	Bn = /^[a-zA-Z0-9_-]+$/;
function Te(r) {
	return typeof r == "string" && Bn.test(r);
}
function ve(r) {
	return r && typeof r == "object" && typeof r.then == "function";
}
function Le(r, s = 0) {
	let l = 0;
	for (let u = s; u < r.length; u++) {
		const i = r[u];
		switch (l) {
			case 1:
				switch (i) {
					case '"':
						l = 0;
						break;
					case "\\":
						l = 2;
						break;
				}
				break;
			case 2:
				l = 1;
				break;
			case 0:
				if (i === '"') l = 1;
				else if (r.startsWith(de, u)) return u;
		}
	}
	return null;
}
function qn(r, s, l) {
	try {
		return (0, Sr.parse)(r, { Variable: Pe, Function: Ne });
	} catch (u) {
		if (!(u instanceof Sr.SyntaxError)) throw u;
		const {
				message: i,
				location: { start: t, end: n },
			} = u,
			e = {
				start: { line: s, character: t.offset + l },
				end: { line: s + 1, character: n.offset + l },
			};
		return { type: "error", meta: { error: { message: i, location: e } } };
	}
}
function Yr(r, s = 0) {
	let l = s + 1;
	const u = [];
	let i = 0;
	for (let t = 0; t < r.length; t++) {
		if (
			r[t] ===
			`
`
		) {
			l++;
			continue;
		}
		if (!r.startsWith(ie, t)) continue;
		const n = Le(r, t);
		if (n == null) {
			t = t + ie.length;
			continue;
		}
		const e = r.slice(t, n + de.length),
			o = r.slice(t + ie.length, n),
			a = r.lastIndexOf(
				`
`,
				t,
			),
			p = r.indexOf(
				`
`,
				n,
			),
			c = r.slice(a, p),
			d = qn(o.trim(), l, t - a),
			h = c.trim() === e ? a : t,
			y = r.slice(i, h);
		u.push({ type: "text", start: i, end: t - 1, content: y }),
			u.push({
				map: [l, l + 1],
				position: { start: t - a, end: t - a + e.length },
				start: t,
				end: t + e.length - 1,
				info: e,
				...d,
			}),
			(i = n + de.length),
			(t = i - 1);
	}
	return (
		u.push({
			type: "text",
			start: i,
			end: r.length - 1,
			content: r.slice(i),
		}),
		u
	);
}
var nr = { class: { type: Fn, render: !0 }, id: { type: wn, render: !0 } },
	ye = {
		findSchema(r, { nodes: s = {}, tags: l = {} } = {}) {
			return r.tag ? l[r.tag] : s[r.type];
		},
		attributes(r, s = {}) {
			const l = this.findSchema(r, s) ?? {},
				u = {},
				i = { ...nr, ...l.attributes };
			for (const [t, n] of Object.entries(i)) {
				if (n.render == !1) continue;
				const e = typeof n.render == "string" ? n.render : t;
				let o = r.attributes[t];
				if (typeof n.type == "function") {
					const a = new n.type();
					a.transform && (o = a.transform(o, s));
				}
				(o = o === void 0 ? n.default : o), o !== void 0 && (u[e] = o);
			}
			if (l.slots)
				for (const [t, n] of Object.entries(l.slots)) {
					if (n.render === !1) continue;
					const e = typeof n.render == "string" ? n.render : t;
					r.slots[t] && (u[e] = this.node(r.slots[t], s));
				}
			return u;
		},
		children(r, s = {}) {
			const l = r.children.flatMap((u) => this.node(u, s));
			return l.some(ve) ? Promise.all(l) : l;
		},
		node(r, s = {}) {
			const l = this.findSchema(r, s) ?? {};
			if (l && l.transform instanceof Function) return l.transform(r, s);
			const u = this.children(r, s);
			if (!l || !l.render) return u;
			const i = this.attributes(r, s);
			return ve(i) || ve(u)
				? Promise.all([i, u]).then((t) => new fe(l.render, ...t))
				: new fe(l.render, i, u);
		},
	},
	Ve = class {
		constructor(r = "node", s = {}, l = [], u) {
			(this.$$mdtype = "Node"),
				(this.errors = []),
				(this.lines = []),
				(this.inline = !1),
				(this.attributes = s),
				(this.children = l),
				(this.type = r),
				(this.tag = u),
				(this.annotations = []),
				(this.slots = {});
		}
		*walk() {
			for (const r of [...Object.values(this.slots), ...this.children])
				yield r, yield* r.walk();
		}
		push(r) {
			this.children.push(r);
		}
		resolve(r = {}) {
			return Object.assign(new Ve(), this, {
				children: this.children.map((s) => s.resolve(r)),
				attributes: De(this.attributes, r),
				slots: Object.fromEntries(
					Object.entries(this.slots).map(([s, l]) => [
						s,
						l.resolve(r),
					]),
				),
			});
		}
		findSchema(r = {}) {
			return ye.findSchema(this, r);
		}
		transformAttributes(r = {}) {
			return ye.attributes(this, r);
		}
		transformChildren(r) {
			return ye.children(this, r);
		}
		transform(r) {
			return ye.node(this, r);
		}
	},
	Qr = { Function: Ne, Node: Ve, Variable: Pe };
function Sn(r, s) {
	if (!s) return s;
	const l = Qr[s.$$mdtype];
	return l ? Object.assign(new l(), s) : s;
}
function $n(r) {
	return JSON.parse(r, Sn);
}
var le = { ...Qr, ...Jr, fromJSON: $n },
	ee = " ",
	Ye = ", ",
	J = `
`,
	Tn = ".",
	Tr = "-",
	jn = 80,
	In = ["strong", "em", "s"],
	On = (r, s) => Math.max(r, s),
	Ge = (r, s = 2) => ({ ...r, indent: (r.indent || 0) + s });
function* ae(r, s) {
	for (const l of r.children) yield* _e(l, s);
}
function* qe(r) {
	yield [...r].join("").trim();
}
function* He(r) {
	yield `| ${r.join(" | ")} |`;
}
function je(r) {
	if (r !== void 0)
		return le.isAst(r)
			? Ie(r)
			: r === null
				? "null"
				: Array.isArray(r)
					? "[" + r.map(je).join(Ye) + "]"
					: typeof r == "object"
						? "{" +
							Object.entries(r)
								.map(
									([s, l]) =>
										`${Te(s) ? s : `"${s}"`}: ${je(l)}`,
								)
								.join(Ye) +
							"}"
						: JSON.stringify(r);
}
function Qe(r) {
	const s = je(r.value);
	if (s !== void 0)
		return r.name === "primary"
			? s
			: r.name === "id" && typeof r.value == "string" && Te(r.value)
				? "#" + r.value
				: r.type === "class" && Te(r.name)
					? "." + r.name
					: `${r.name}=${s}`;
}
function* zn(r) {
	for (const [s, l] of Object.entries(r.attributes))
		if (s === "class" && typeof l == "object" && !le.isAst(l))
			for (const u of Object.keys(l))
				yield Qe({ type: "class", name: u, value: l });
		else yield Qe({ type: "attribute", name: s, value: l });
}
function* Ce(r) {
	r.annotations.length &&
		(yield ie + ee, yield r.annotations.map(Qe).join(ee), yield ee + de);
}
function* Rn(r) {
	yield "$",
		yield r.path
			.map((s, l) =>
				l === 0
					? s
					: Te(s)
						? "." + s
						: typeof s == "number"
							? `[${s}]`
							: `["${s}"]`,
			)
			.join("");
}
function* Mn(r) {
	yield r.name,
		yield "(",
		yield Object.values(r.parameters).map(je).join(Ye),
		yield ")";
}
function* jr(r) {
	let s;
	do {
		const { value: l, done: u } = r.next();
		if (u) return;
		s = l.trimStart();
	} while (!s.length);
	yield s, yield* r;
}
function* Se(r, s) {
	yield r.replace(s, "\\$&").replace(new RegExp(" ", "g"), "&nbsp;");
}
function* Pn(r, s = {}) {
	const l = { ...s, parent: r },
		u = ee.repeat(l.indent || 0);
	switch (r.type) {
		case "document": {
			r.attributes.frontmatter &&
				r.attributes.frontmatter.length &&
				(yield "---" +
					J +
					r.attributes.frontmatter +
					J +
					"---" +
					J +
					J),
				yield* jr(ae(r, l));
			break;
		}
		case "heading": {
			yield J,
				yield u,
				yield "#".repeat(r.attributes.level || 1),
				yield ee,
				yield* jr(ae(r, l)),
				yield* Ce(r),
				yield J;
			break;
		}
		case "paragraph": {
			yield J, yield* ae(r, l), yield* Ce(r), yield J;
			break;
		}
		case "inline": {
			yield u, yield* ae(r, l);
			break;
		}
		case "image": {
			yield "!",
				yield "[",
				yield* _e(r.attributes.alt, l),
				yield "]",
				yield "(",
				yield* typeof r.attributes.src == "string"
					? Se(r.attributes.src, /[()]/)
					: _e(r.attributes.src, l),
				r.attributes.title && (yield ee + `"${r.attributes.title}"`),
				yield ")";
			break;
		}
		case "link": {
			yield "[",
				yield* ae(r, l),
				yield "]",
				yield "(",
				yield* typeof r.attributes.href == "string"
					? Se(r.attributes.href, /[()]/g)
					: _e(r.attributes.href, l),
				r.attributes.title && (yield ee + `"${r.attributes.title}"`),
				yield ")";
			break;
		}
		case "text": {
			const { content: i } = r.attributes;
			le.isAst(i)
				? (yield ie + ee, yield* _e(i, l), yield ee + de)
				: s.parent && In.includes(s.parent.type)
					? yield* Se(i, /[*_~]/g)
					: yield* Se(i, /^[*>#]/);
			break;
		}
		case "blockquote": {
			const i = ">" + ee;
			yield r.children
				.map((t) => Ie(t, l).trimStart())
				.map((t) => J + u + i + t)
				.join(u + i);
			break;
		}
		case "hr": {
			yield J, yield u, yield "---", yield J;
			break;
		}
		case "fence": {
			yield J, yield u;
			const t = (r.attributes.content.match(/`{3,}/g) || [])
					.map((e) => e.length)
					.reduce(On, 0),
				n = "`".repeat(t ? t + 1 : 3);
			yield n,
				r.attributes.language && (yield r.attributes.language),
				r.annotations.length && (yield ee),
				yield* Ce(r),
				yield J,
				yield u,
				yield r.attributes.content.split(J).join(J + u),
				yield n,
				yield J;
			break;
		}
		case "tag": {
			r.inline || (yield J, yield u);
			const i = ie + ee,
				t = [...zn(r)].filter((a) => a !== void 0),
				n = [i + r.tag, ...t],
				e = n.join(ee),
				o = e.length + i.length * 2 > (s.maxTagOpeningWidth || jn);
			yield (!r.inline && o ? n.join(J + ee.repeat(i.length) + u) : e) +
				ee +
				(r.children.length ? "" : "/") +
				de,
				r.children.length &&
					(yield* ae(r, l.allowIndentation ? Ge(l) : l),
					r.inline || (yield u),
					yield ie + ee + "/" + r.tag + ee + de),
				r.inline || (yield J);
			break;
		}
		case "list": {
			const i = r.children.some((t) =>
				t.children.some((n) => n.type === "paragraph"),
			);
			for (let t = 0; t < r.children.length; t++) {
				const n = r.attributes.ordered
					? `${t === 0 ? (r.attributes.start ?? "1") : "1"}${r.attributes.marker ?? Tn}`
					: (r.attributes.marker ?? Tr);
				let e = Ie(r.children[t], Ge(l, n.length + 1));
				(!i || t === r.children.length - 1) && (e = e.trim()),
					yield J + u + n + " " + e;
			}
			yield J;
			break;
		}
		case "item": {
			for (let i = 0; i < r.children.length; i++)
				yield* _e(r.children[i], l), i === 0 && (yield* Ce(r));
			break;
		}
		case "strong": {
			yield r.attributes.marker ?? "**",
				yield* qe(ae(r, l)),
				yield r.attributes.marker ?? "**";
			break;
		}
		case "em": {
			yield r.attributes.marker ?? "*",
				yield* qe(ae(r, l)),
				yield r.attributes.marker ?? "*";
			break;
		}
		case "code": {
			yield "`", yield* qe(_e(r.attributes.content, l)), yield "`";
			break;
		}
		case "s": {
			yield "~~", yield* qe(ae(r, l)), yield "~~";
			break;
		}
		case "hardbreak": {
			yield "\\" + J, yield u;
			break;
		}
		case "softbreak": {
			yield J, yield u;
			break;
		}
		case "table": {
			const i = [...ae(r, Ge(l))];
			if (
				s.parent &&
				s.parent.type === "tag" &&
				s.parent.tag === "table"
			) {
				for (let t = 0; t < i.length; t++) {
					const n = i[t];
					if (typeof n == "string")
						n.trim().length && (yield J, yield n);
					else {
						t !== 0 && (yield J, yield u + "---");
						for (const e of n) yield J + u + Tr + " " + e;
					}
				}
				yield J;
			} else {
				const t = [];
				for (const o of i)
					for (let a = 0; a < o.length; a++)
						t[a] = t[a] ? Math.max(t[a], o[a].length) : o[a].length;
				const [n, ...e] = i;
				yield J,
					yield* He(n.map((o, a) => o + ee.repeat(t[a] - o.length))),
					yield J,
					yield* He(n.map((o, a) => "-".repeat(t[a]))),
					yield J;
				for (const o of e)
					yield* He(o.map((a, p) => a + ee.repeat(t[p] - a.length))),
						yield J;
			}
			break;
		}
		case "thead": {
			const [i] = [...ae(r, l)];
			yield i || [];
			break;
		}
		case "tr": {
			yield [...ae(r, l)];
			break;
		}
		case "td":
		case "th": {
			yield [...ae(r, l), ...Ce(r)].join("").trim();
			break;
		}
		case "tbody": {
			yield* ae(r, l);
			break;
		}
		case "comment": {
			yield "<!-- " +
				r.attributes.content +
				` -->
`;
			break;
		}
	}
}
function* _e(r, s = {}) {
	switch (typeof r) {
		case "undefined":
			break;
		case "boolean":
		case "number":
		case "string": {
			yield r.toString();
			break;
		}
		case "object": {
			if (r === null) break;
			if (Array.isArray(r)) {
				for (const l of r) yield* _e(l, s);
				break;
			}
			switch (r.$$mdtype) {
				case "Function": {
					yield* Mn(r);
					break;
				}
				case "Node":
					yield* Pn(r, s);
					break;
				case "Variable": {
					yield* Rn(r);
					break;
				}
				default:
					throw new Error(`Unimplemented: "${r.$$mdtype}"`);
			}
			break;
		}
	}
}
function Ie(r, s) {
	let l = "";
	for (const u of _e(r, s)) l += u;
	return l.trimStart();
}
function xe(r) {
	return r !== !1 && r !== void 0 && r !== null;
}
function Nn(r) {
	const s = [{ condition: r.attributes.primary, children: [] }];
	for (const l of r.children)
		l.type === "tag" && l.tag === "else"
			? s.push({
					condition:
						"primary" in l.attributes ? l.attributes.primary : !0,
					children: [],
				})
			: s[s.length - 1].children.push(l);
	return s;
}
var Ln = {
		attributes: { primary: { type: Object, render: !1 } },
		transform(r, s) {
			const l = Nn(r);
			for (const { condition: u, children: i } of l)
				if (xe(u)) {
					const t = i.flatMap((n) => n.transform(s));
					return t.some(ve)
						? Promise.all(t).then((n) => n.flat())
						: t;
				}
			return [];
		},
	},
	Vn = {
		selfClosing: !0,
		attributes: { primary: { type: Object, render: !1 } },
	},
	Un = {
		transform(r) {
			return Object.values(r).every((s) => xe(s));
		},
	},
	Zn = {
		transform(r) {
			return Object.values(r).find((s) => xe(s)) !== void 0;
		},
	},
	Gn = {
		parameters: { 0: { required: !0 } },
		transform(r) {
			return !xe(r[0]);
		},
	},
	Hn = {
		transform(r) {
			const s = Object.values(r);
			return s.every((l) => l === s[0]);
		},
	},
	Wn = {
		transform(r) {
			return JSON.stringify(r[0], null, 2);
		},
	},
	Jn = {
		transform(r) {
			return r[0] === void 0 ? r[1] : r[0];
		},
	},
	Kr = { and: Un, or: Zn, not: Gn, equals: Hn, default: Jn, debug: Wn };
function We(r, s = "td") {
	(r.type = "tr"), (r.attributes = {});
	for (const l of r.children) l.type = s;
	return r;
}
function Yn(r) {
	for (const s of r.walk()) {
		if (s.type !== "tag" || s.tag !== "table") continue;
		const [l, ...u] = s.children;
		if (!l || l.type === "table") continue;
		const i = new le.Node("table", s.attributes, [
				new le.Node("thead"),
				new le.Node("tbody"),
			]),
			[t, n] = i.children;
		l.type === "list" && t.push(We(l, "th"));
		for (const e of u) {
			if (e.type === "list") We(e);
			else if (e.type === "tag" && e.tag === "if") {
				const o = [];
				for (const a of e.children)
					a.type !== "hr" && (a.type === "list" && We(a), o.push(a));
				e.children = o;
			} else continue;
			n.push(e);
		}
		s.children = [i];
	}
}
var Xr = [Yn],
	Ir = {
		ordered_list: "list",
		bullet_list: "list",
		code_inline: "code",
		list_item: "item",
		variable: "text",
	};
function Or(r, s) {
	for (const l of s) {
		r.annotations.push(l);
		const { name: u, value: i, type: t } = l;
		t === "attribute"
			? (r.attributes[u] !== void 0 &&
					r.errors.push({
						id: "duplicate-attribute",
						level: "warning",
						message: `Attribute '${u}' already set`,
					}),
				(r.attributes[u] = i))
			: t === "class" &&
				(r.attributes.class
					? (r.attributes.class[u] = i)
					: (r.attributes.class = { [u]: i }));
	}
}
function Qn(r, s) {
	switch (s) {
		case "heading":
			return { level: Number(r.tag.replace("h", "")) };
		case "list": {
			const l = r.attrs ? Object.fromEntries(r.attrs) : void 0,
				u = r.type.startsWith("ordered");
			return u && l != null && l.start
				? { ordered: !0, start: l.start, marker: r.markup }
				: { ordered: u, marker: r.markup };
		}
		case "link": {
			const l = Object.fromEntries(r.attrs);
			return l.title
				? { href: l.href, title: l.title }
				: { href: l.href };
		}
		case "image": {
			const l = Object.fromEntries(r.attrs);
			return l.title
				? { alt: r.content, src: l.src, title: l.title }
				: { alt: r.content, src: l.src };
		}
		case "em":
		case "strong":
			return { marker: r.markup };
		case "text":
		case "code":
		case "comment":
			return { content: (r.meta || {}).variable || r.content };
		case "fence": {
			const [l] = r.info.split(" ", 1);
			return l === "" || l === ie
				? { content: r.content }
				: { content: r.content, language: l };
		}
		case "td":
		case "th": {
			if (r.attrs) {
				const l = Object.fromEntries(r.attrs);
				let u;
				if (
					(l.style &&
						(l.style.includes("left")
							? (u = "left")
							: l.style.includes("center")
								? (u = "center")
								: l.style.includes("right") && (u = "right")),
					u)
				)
					return { align: u };
			}
			return {};
		}
		default:
			return {};
	}
}
function et(r, s, l, u, i, t) {
	if (r.type === "frontmatter") {
		s[0].attributes.frontmatter = r.content;
		return;
	}
	if (r.hidden || (r.type === "text" && r.content === "")) return;
	const n = r.errors || [],
		e = s[s.length - 1],
		{ tag: o, attributes: a, error: p } = r.meta || {};
	if (r.type === "annotation")
		return t
			? Or(t, a)
			: e.errors.push({
					id: "no-inline-annotations",
					level: "error",
					message: `Can't apply inline annotations to '${e.type}'`,
				});
	let c = r.type.replace(/_(open|close)$/, "");
	if ((Ir[c] && (c = Ir[c]), c === "error")) {
		const { message: A, location: E } = p;
		n.push({
			id: "parse-error",
			level: "critical",
			message: A,
			location: E,
		});
	}
	if (r.nesting < 0) {
		if (e.type === c && e.tag === o)
			return e.lines && r.map && e.lines.push(...r.map), s.pop();
		n.push({
			id: "missing-opening",
			level: "critical",
			message: `Node '${c}' is missing opening`,
		});
	}
	const d = Qn(r, c),
		h = new Ve(c, d, void 0, o || void 0),
		{ position: y = {} } = r;
	if (
		((h.errors = n),
		i !== !1 &&
			((h.lines = r.map || e.lines || []),
			(h.location = {
				file: l,
				start: { line: h.lines[0], character: y.start },
				end: { line: h.lines[1], character: y.end },
			})),
		t && (h.inline = !0),
		a && ["tag", "fence", "image"].includes(c) && Or(h, a),
		u && o === "slot" && typeof h.attributes.primary == "string"
			? (e.slots[h.attributes.primary] = h)
			: e.push(h),
		r.nesting > 0 && s.push(h),
		!Array.isArray(r.children))
	)
		return;
	if ((h.type === "inline" && (t = e), s.push(h), !(c === "image")))
		for (const A of r.children) et(A, s, l, u, i, t);
	s.pop();
}
function Kn(r, s) {
	const l = new Ve("document"),
		u = [l];
	typeof s == "string" && (s = { file: s });
	for (const i of r)
		et(
			i,
			u,
			s == null ? void 0 : s.file,
			s == null ? void 0 : s.slots,
			s == null ? void 0 : s.location,
		);
	if (u.length > 1)
		for (const i of u.slice(1))
			i.errors.push({
				id: "missing-closing",
				level: "critical",
				message: `Node '${i.tag || i.type}' is missing closing`,
			});
	for (const i of Xr) i(l);
	return l;
}
var ir = {};
Pr(ir, {
	blockquote: () => ni,
	code: () => Ai,
	comment: () => yi,
	document: () => Xn,
	em: () => mi,
	error: () => Di,
	fence: () => ui,
	hardbreak: () => ki,
	heading: () => ei,
	hr: () => si,
	image: () => ti,
	inline: () => _i,
	item: () => ii,
	link: () => bi,
	list: () => oi,
	node: () => xi,
	paragraph: () => ri,
	s: () => gi,
	softbreak: () => Ci,
	strong: () => di,
	table: () => ai,
	tbody: () => pi,
	td: () => li,
	text: () => vi,
	th: () => ci,
	thead: () => hi,
	tr: () => fi,
});
var Xn = {
		render: "article",
		children: [
			"heading",
			"paragraph",
			"image",
			"table",
			"tag",
			"fence",
			"blockquote",
			"comment",
			"list",
			"hr",
		],
		attributes: { frontmatter: { render: !1 } },
	},
	ei = {
		children: ["inline"],
		attributes: { level: { type: Number, render: !1, required: !0 } },
		transform(r, s) {
			return new fe(
				`h${r.attributes.level}`,
				r.transformAttributes(s),
				r.transformChildren(s),
			);
		},
	},
	ri = { render: "p", children: ["inline"] },
	ti = {
		render: "img",
		attributes: {
			src: { type: String, required: !0 },
			alt: { type: String },
			title: { type: String },
		},
	},
	ui = {
		render: "pre",
		attributes: {
			content: { type: String, render: !1, required: !0 },
			language: { type: String, render: "data-language" },
			process: { type: Boolean, render: !1, default: !0 },
		},
		transform(r, s) {
			const l = r.transformAttributes(s),
				u = r.children.length
					? r.transformChildren(s)
					: [r.attributes.content];
			return new fe("pre", l, u);
		},
	},
	ni = {
		render: "blockquote",
		children: [
			"heading",
			"paragraph",
			"image",
			"table",
			"tag",
			"fence",
			"blockquote",
			"list",
			"hr",
		],
	},
	ii = {
		render: "li",
		children: [
			"inline",
			"heading",
			"paragraph",
			"image",
			"table",
			"tag",
			"fence",
			"blockquote",
			"list",
			"hr",
		],
	},
	oi = {
		children: ["item"],
		attributes: {
			ordered: { type: Boolean, render: !1, required: !0 },
			start: { type: Number },
			marker: { type: String, render: !1 },
		},
		transform(r, s) {
			return new fe(
				r.attributes.ordered ? "ol" : "ul",
				r.transformAttributes(s),
				r.transformChildren(s),
			);
		},
	},
	si = { render: "hr" },
	ai = { render: "table" },
	li = {
		render: "td",
		children: [
			"inline",
			"heading",
			"paragraph",
			"image",
			"table",
			"tag",
			"fence",
			"blockquote",
			"list",
			"hr",
		],
		attributes: {
			align: { type: String },
			colspan: { type: Number, render: "colSpan" },
			rowspan: { type: Number, render: "rowSpan" },
		},
	},
	ci = {
		render: "th",
		attributes: {
			width: { type: String },
			align: { type: String },
			colspan: { type: Number, render: "colSpan" },
			rowspan: { type: Number, render: "rowSpan" },
		},
	},
	fi = { render: "tr", children: ["th", "td"] },
	pi = { render: "tbody", children: ["tr", "tag"] },
	hi = { render: "thead", children: ["tr"] },
	di = {
		render: "strong",
		children: ["em", "s", "link", "code", "text", "tag"],
		attributes: { marker: { type: String, render: !1 } },
	},
	mi = {
		render: "em",
		children: ["strong", "s", "link", "code", "text", "tag"],
		attributes: { marker: { type: String, render: !1 } },
	},
	gi = {
		render: "s",
		children: ["strong", "em", "link", "code", "text", "tag"],
	},
	_i = {
		children: [
			"strong",
			"em",
			"s",
			"code",
			"text",
			"tag",
			"link",
			"image",
			"hardbreak",
			"softbreak",
			"comment",
		],
	},
	bi = {
		render: "a",
		children: ["strong", "em", "s", "code", "text", "tag"],
		attributes: {
			href: { type: String, required: !0 },
			title: { type: String },
		},
	},
	Ai = {
		render: "code",
		attributes: { content: { type: String, render: !1, required: !0 } },
		transform(r, s) {
			const l = r.transformAttributes(s);
			return new fe("code", l, [r.attributes.content]);
		},
	},
	vi = {
		attributes: { content: { type: String, required: !0 } },
		transform(r) {
			return r.attributes.content;
		},
	},
	ki = { render: "br" },
	Ci = {
		transform() {
			return " ";
		},
	},
	yi = { attributes: { content: { type: String, required: !0 } } },
	Di = {},
	xi = {},
	Ei = Me(Dn()),
	{ escapeHtml: zr } = (0, Ei.default)().utils,
	Fi = new Set([
		"area",
		"base",
		"br",
		"col",
		"embed",
		"hr",
		"img",
		"input",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr",
	]);
function $e(r) {
	if (typeof r == "string" || typeof r == "number") return zr(String(r));
	if (Array.isArray(r)) return r.map($e).join("");
	if (r === null || typeof r != "object" || !fe.isTag(r)) return "";
	const { name: s, attributes: l, children: u = [] } = r;
	if (!s) return $e(u);
	let i = `<${s}`;
	for (const [t, n] of Object.entries(l ?? {}))
		i += ` ${t.toLowerCase()}="${zr(String(n))}"`;
	return (
		(i += ">"), Fi.has(s) || (u.length && (i += $e(u)), (i += `</${s}>`)), i
	);
}
function wi(r, s) {
	return typeof r != "string" || r[0] !== r[0].toUpperCase()
		? r
		: s instanceof Function
			? s(r)
			: s[r];
}
function Bi(r, s, { components: l = {} } = {}) {
	function u(t) {
		if (t == null || typeof t != "object") return t;
		if (Array.isArray(t)) return t.map((e) => u(e));
		if (t.$$mdtype === "Tag") return i(t);
		if (typeof t != "object") return t;
		const n = {};
		for (const [e, o] of Object.entries(t)) n[e] = u(o);
		return n;
	}
	function i(t) {
		if (Array.isArray(t))
			return s.createElement(s.Fragment, null, ...t.map(i));
		if (t === null || typeof t != "object" || !fe.isTag(t)) return t;
		const {
			name: n,
			attributes: { class: e, ...o } = {},
			children: a = [],
		} = t;
		return (
			e && (o.className = e),
			s.createElement(
				wi(n, l),
				Object.keys(o).length == 0 ? null : u(o),
				...a.map(i),
			)
		);
	}
	return i(r);
}
function qi(r, s) {
	return typeof r != "string"
		? "Fragment"
		: r[0] !== r[0].toUpperCase()
			? r
			: s instanceof Function
				? s(r)
				: s[r];
}
function Rr(r) {
	return r.map(or).join(", ");
}
function Ke(r) {
	return r == null || typeof r != "object"
		? JSON.stringify(r)
		: Array.isArray(r)
			? `[${r.map((l) => Ke(l)).join(", ")}]`
			: r.$$mdtype === "Tag"
				? or(r)
				: typeof r != "object"
					? JSON.stringify(r)
					: `{${Object.entries(r)
							.map(([l, u]) =>
								[JSON.stringify(l), Ke(u)].join(": "),
							)
							.join(", ")}}`;
}
function or(r) {
	if (Array.isArray(r))
		return `React.createElement(React.Fragment, null, ${Rr(r)})`;
	if (r === null || typeof r != "object" || !fe.isTag(r))
		return JSON.stringify(r);
	const {
		name: s,
		attributes: { class: l, ...u } = {},
		children: i = [],
	} = r;
	return (
		l && (u.className = l),
		`React.createElement(
    tagName(${JSON.stringify(s)}, components),
    ${Object.keys(u).length == 0 ? "null" : Ke(u)},
    ${Rr(i)})`
	);
}
function Si(r) {
	return `
  (({components = {}} = {}) => {
    ${qi}
    return ${or(r)};
  })
`;
}
var $i = { html: $e, react: Bi, reactStatic: Si },
	Ti = class {
		validate(r, s) {
			const { partials: l = {} } = s;
			return l[r]
				? []
				: [
						{
							id: "attribute-value-invalid",
							level: "error",
							message: `Partial \`${r}\` not found. The 'file' attribute must be set in \`config.partials\``,
						},
					];
		}
	},
	ji = {
		inline: !1,
		selfClosing: !0,
		attributes: {
			file: { type: Ti, render: !1, required: !0 },
			variables: { type: Object, render: !1 },
		},
		transform(r, s) {
			const { partials: l = {} } = s,
				{ file: u, variables: i } = r.attributes,
				t = l[u];
			if (!t) return null;
			const n = {
					...s,
					variables: {
						...s.variables,
						...i,
						"$$partial:filename": u,
					},
				},
				e = (o) => o.resolve(n).transformChildren(n);
			return Array.isArray(t) ? t.flatMap(e) : e(t);
		},
	},
	Ii = { children: ["table"], inline: !1 },
	Oi = { attributes: { primary: { type: String, required: !0 } } },
	rt = { else: Vn, if: Ln, partial: ji, slot: Oi, table: Ii },
	zi = Me(Wr()),
	Oe = Me(Nr());
function tt(r, s, l) {
	try {
		const {
				type: u,
				meta: i,
				nesting: t = 0,
			} = (0, Oe.parse)(s, { Variable: Pe, Function: Ne }),
			n = r.push(u, "", t);
		return (
			(n.info = s), (n.meta = i), r.delimiters || (r.delimiters = []), n
		);
	} catch (u) {
		if (!(u instanceof Oe.SyntaxError)) throw u;
		const {
				message: i,
				location: { start: t, end: n },
			} = u,
			e = l
				? {
						start: { offset: t.offset + l },
						end: { offset: n.offset + l },
					}
				: null,
			o = r.push("error", "", 0);
		return (o.meta = { error: { message: i, location: e } }), o;
	}
}
function Ri(r, s, l, u) {
	const i = r.bMarks[s] + r.tShift[s],
		t = r.eMarks[s];
	if (!r.src.startsWith(ie, i)) return !1;
	const n = Le(r.src, i),
		e = r.src.slice(0, t).trim().length;
	if (!n || n < e - de.length) return !1;
	const o = i + ie.length,
		a = r.src.slice(o, n).trim(),
		p = r.src.slice(i, n + de.length).split(`
`).length;
	if (a[0] === "$") return !1;
	if (u) return !0;
	const c = tt(r, a, o);
	return (c.map = [s, s + p]), (r.line += p), !0;
}
function Mi(r, s) {
	if (!r.src.startsWith(ie, r.pos)) return !1;
	const l = Le(r.src, r.pos);
	if (!l) return !1;
	const u = r.src.slice(r.pos + ie.length, l);
	return s || tt(r, u.trim()), (r.pos = l + de.length), !0;
}
function Pi(r) {
	var l, u;
	let s;
	for (s of r.tokens)
		if (s.type === "fence") {
			if (s.info.includes(ie)) {
				const i = s.info.indexOf(ie),
					t = Le(s.info, i),
					n = s.info.slice(i + ie.length, t);
				try {
					const { meta: e } = (0, Oe.parse)(n.trim(), {
						Variable: Pe,
						Function: Ne,
					});
					s.meta = e;
				} catch (e) {
					if (!(e instanceof Oe.SyntaxError)) throw e;
					s.errors || (s.errors = []),
						s.errors.push({
							id: "fence-tag-error",
							level: "error",
							message: `Syntax error in fence tag: ${e.message}`,
						});
				}
			}
			((u =
				(l = s == null ? void 0 : s.meta) == null
					? void 0
					: l.attributes) != null &&
				u.find((i) => i.name === "process" && !i.value)) ||
				(s.children = Yr(s.content, s.map[0]));
		}
}
function Ni(r) {
	r.block.ruler.before("paragraph", "annotations", Ri, {
		alt: ["paragraph", "blockquote"],
	}),
		r.inline.ruler.push("containers", Mi),
		r.core.ruler.push("annotations", Pi);
}
var ut = "---";
function nt(r, s) {
	return r.src.slice(r.bMarks[s], r.eMarks[s]).trim();
}
function Li(r, s) {
	for (let l = 1; l < s; l++) if (nt(r, l) === ut) return l;
}
function Vi(r, s, l, u) {
	if (s != 0 || nt(r, 0) != ut) return !1;
	const i = Li(r, l);
	if (!i) return !1;
	if (u) return !0;
	const t = r.push("frontmatter", "", 0);
	return (
		(t.content = r.src.slice(r.eMarks[0], r.bMarks[i]).trim()),
		(t.map = [0, i]),
		(t.hidden = !0),
		(r.line = i + 1),
		!0
	);
}
function Ui(r) {
	r.block.ruler.before("hr", "frontmatter", Vi);
}
var ze = "<!--",
	Xe = "-->";
function Zi(r, s, l, u) {
	const i = r.bMarks[s] + r.tShift[s];
	if (!r.src.startsWith(ze, i)) return !1;
	const t = r.src.indexOf(Xe, i);
	if (!t) return !1;
	if (u) return !0;
	const n = r.src.slice(i + ze.length, t),
		e = n.split(`
`).length,
		o = r.push("comment", "", 0);
	return (o.content = n.trim()), (o.map = [s, s + e]), (r.line += e), !0;
}
function Gi(r, s) {
	if (!r.src.startsWith(ze, r.pos)) return !1;
	const l = r.src.indexOf(Xe, r.pos);
	if (!l) return !1;
	if (s) return !0;
	const u = r.src.slice(r.pos + ze.length, l),
		i = r.push("comment", "", 0);
	return (i.content = u.trim()), (r.pos = l + Xe.length), !0;
}
function Hi(r) {
	r.block.ruler.before("table", "comment", Zi, { alt: ["paragraph"] }),
		r.inline.ruler.push("comment", Gi);
}
var it = class {
		constructor(r = {}) {
			(this.parser = new zi.default(r)),
				this.parser.use(Ni, "annotations", {}),
				this.parser.use(Ui, "frontmatter", {}),
				this.parser.disable(["lheading", "code"]),
				r.allowComments && this.parser.use(Hi, "comments", {});
		}
		tokenize(r) {
			return this.parser.parse(r.toString(), {});
		}
	},
	Wi = { String, Number, Array, Object, Boolean };
function sr(r, s, l, u) {
	var i, t;
	if (!r) return !0;
	if (le.isFunction(s) && (i = l.validation) != null && i.validateFunctions) {
		const n = (t = l.functions) == null ? void 0 : t[s.name];
		return n != null && n.returns
			? Array.isArray(n.returns)
				? n.returns.find((e) => e === r) !== void 0
				: n.returns === r
			: !0;
	}
	if (le.isAst(s)) return !0;
	if (Array.isArray(r)) return r.some((n) => sr(n, s, l, u));
	if ((typeof r == "string" && (r = Wi[r]), typeof r == "function")) {
		const n = new r();
		if (n.validate) return n.validate(s, l, u);
	}
	return s != null && s.constructor === r;
}
function ar(r) {
	return typeof r == "string"
		? r
		: Array.isArray(r)
			? r.map(ar).join(" | ")
			: r.name;
}
function Ji(r, s) {
	var i, t;
	const l = (i = s.functions) == null ? void 0 : i[r.name],
		u = [];
	if (!l)
		return [
			{
				id: "function-undefined",
				level: "critical",
				message: `Undefined function: '${r.name}'`,
			},
		];
	if ((l.validate && u.push(...l.validate(r, s)), l.parameters))
		for (const [n, e] of Object.entries(r.parameters)) {
			const o = (t = l.parameters) == null ? void 0 : t[n];
			if (!o) {
				u.push({
					id: "parameter-undefined",
					level: "error",
					message: `Invalid parameter: '${n}'`,
				});
				continue;
			}
			if (!(le.isAst(e) && !le.isFunction(e)) && o.type) {
				const a = sr(o.type, e, s, n);
				a === !1
					? u.push({
							id: "parameter-type-invalid",
							level: "error",
							message: `Parameter '${n}' of '${r.name}' must be type of '${ar(o.type)}'`,
						})
					: Array.isArray(a) && u.push(...a);
			}
		}
	for (const [n, { required: e }] of Object.entries(l.parameters ?? {}))
		e &&
			r.parameters[n] === void 0 &&
			u.push({
				id: "parameter-missing-required",
				level: "error",
				message: `Missing required parameter: '${n}'`,
			});
	return u;
}
function Yi(r, s) {
	return r.length <= s
		? JSON.stringify(r)
		: `[${r
				.slice(0, s)
				.map((u) => JSON.stringify(u))
				.join(",")}, ... ${r.length - s} more]`;
}
function ot(r, s) {
	var t, n;
	const l = r.findSchema(s),
		u = [...(r.errors || [])];
	if (!l)
		return (
			u.push({
				id: r.tag ? "tag-undefined" : "node-undefined",
				level: "critical",
				message: r.tag
					? `Undefined tag: '${r.tag}'`
					: `Undefined node: '${r.type}'`,
			}),
			u
		);
	l.inline != null &&
		r.inline !== l.inline &&
		u.push({
			id: "tag-placement-invalid",
			level: "critical",
			message: `'${r.tag}' tag should be ${l.inline ? "inline" : "block"}`,
		}),
		l.selfClosing &&
			r.children.length > 0 &&
			u.push({
				id: "tag-selfclosing-has-children",
				level: "critical",
				message: `'${r.tag}' tag should be self-closing`,
			});
	const i = { ...nr, ...l.attributes };
	for (const e of Object.keys(r.slots))
		((t = l.slots) == null ? void 0 : t[e]) ||
			u.push({
				id: "slot-undefined",
				level: "error",
				message: `Invalid slot: '${e}'`,
			});
	for (let [e, o] of Object.entries(r.attributes)) {
		const a = i[e];
		if (!a) {
			u.push({
				id: "attribute-undefined",
				level: "error",
				message: `Invalid attribute: '${e}'`,
			});
			continue;
		}
		let { type: p, matches: c, errorLevel: d } = a;
		if (le.isAst(o))
			if (
				le.isFunction(o) &&
				(n = s.validation) != null &&
				n.validateFunctions
			)
				u.push(...Ji(o, s));
			else if (le.isVariable(o) && s.variables) {
				let h = !1,
					y = s.variables;
				for (const m of o.path) {
					if (!Object.prototype.hasOwnProperty.call(y, m)) {
						h = !0;
						break;
					}
					y = y[m];
				}
				h &&
					u.push({
						id: "variable-undefined",
						level: "error",
						message: `Undefined variable: '${o.path.join(".")}'`,
					});
			} else continue;
		if (((o = o), p)) {
			const h = sr(p, o, s, e);
			h === !1 &&
				u.push({
					id: "attribute-type-invalid",
					level: d || "error",
					message: `Attribute '${e}' must be type of '${ar(p)}'`,
				}),
				Array.isArray(h) && u.push(...h);
		}
		if (
			(typeof c == "function" && (c = c(s)),
			Array.isArray(c) &&
				!c.includes(o) &&
				u.push({
					id: "attribute-value-invalid",
					level: d || "error",
					message: `Attribute '${e}' must match one of ${Yi(c, 8)}. Got '${o}' instead.`,
				}),
			c instanceof RegExp &&
				!c.test(o) &&
				u.push({
					id: "attribute-value-invalid",
					level: d || "error",
					message: `Attribute '${e}' must match ${c}. Got '${o}' instead.`,
				}),
			typeof a.validate == "function")
		) {
			const h = a.validate(o, s, e);
			Array.isArray(h) && u.push(...h);
		}
	}
	for (const [e, { required: o }] of Object.entries(i))
		o &&
			r.attributes[e] === void 0 &&
			u.push({
				id: "attribute-missing-required",
				level: "error",
				message: `Missing required attribute: '${e}'`,
			});
	if (l.slots)
		for (const [e, { required: o }] of Object.entries(l.slots))
			o &&
				r.slots[e] === void 0 &&
				u.push({
					id: "slot-missing-required",
					level: "error",
					message: `Missing required slot: '${e}'`,
				});
	for (const { type: e } of r.children)
		l.children &&
			e !== "error" &&
			!l.children.includes(e) &&
			u.push({
				id: "child-invalid",
				level: "warning",
				message: `Can't nest '${e}' in '${r.tag || r.type}'`,
			});
	if (l.validate) {
		const e = l.validate(r, s);
		if (ve(e)) return e.then((o) => u.concat(o));
		u.push(...e);
	}
	return u;
}
function* st(r, s = []) {
	yield [r, s];
	for (const l of [...Object.values(r.slots), ...r.children])
		yield* st(l, [...s, r]);
}
function Qi(r, s) {
	const l = [...st(r)].map(([u, i]) => {
		const { type: t, lines: n, location: e } = u,
			o = { ...s, validation: { ...s.validation, parents: i } },
			a = ot(u, o);
		return ve(a)
			? a.then((p) =>
					p.map((c) => ({
						type: t,
						lines: n,
						location: e,
						error: c,
					})),
				)
			: a.map((p) => ({ type: t, lines: n, location: e, error: p }));
	});
	return l.some(ve) ? Promise.all(l).then((u) => u.flat()) : l.flat();
}
var Ki = new it();
function at(r = {}) {
	return {
		...r,
		tags: { ...rt, ...r.tags },
		nodes: { ...ir, ...r.nodes },
		functions: { ...Kr, ...r.functions },
	};
}
function lt(r, s) {
	return typeof r == "string" && (r = Ki.tokenize(r)), Kn(r, s);
}
function ct(r, s) {
	return Array.isArray(r) ? r.flatMap((l) => l.resolve(s)) : r.resolve(s);
}
function ft(r, s) {
	const l = at(s),
		u = ct(r, l);
	return Array.isArray(u) ? u.flatMap((i) => i.transform(l)) : u.transform(l);
}
function pt(r, s) {
	const l = at(s);
	return Qi(r, l);
}
function Xi(r, s = {}, ...l) {
	return { name: r, attributes: s, children: l };
}
var te = class {
	constructor(r) {
		(this.parse = lt),
			(this.resolve = (s) => ct(s, this.config)),
			(this.transform = (s) => ft(s, this.config)),
			(this.validate = (s) => pt(s, this.config)),
			(this.config = r);
	}
};
te.nodes = ir;
te.tags = rt;
te.functions = Kr;
te.globalAttributes = nr;
te.renderers = $i;
te.transforms = Xr;
te.Ast = le;
te.Tag = fe;
te.Tokenizer = it;
te.parseTags = Yr;
te.transformer = ye;
te.validator = ot;
te.parse = lt;
te.transform = ft;
te.validate = pt;
te.createElement = Xi;
te.truthy = xe;
te.format = Ie;
export { te as M, le as a, Ie as f, lt as p, ir as s };
