import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useLoaderData, Link } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { handleLoader } from "@keystatic/remix/api";
import { fields, config, singleton, collection } from "@keystatic/core";
import { makePage } from "@keystatic/remix/ui";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const markdocConfig = fields.markdoc.createMarkdocConfig({});
const keystaticConfig = config({
  storage: {
    kind: "local"
  },
  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "src/content/singletons/homepage/",
      format: {
        data: "json"
      },
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({
          label: "Description",
          multiline: true
        }),
        keywords: fields.array(
          fields.text({ label: "Enter Keyword for your website" }),
          { label: "Keywords", itemLabel: (props) => props.value }
        ),
        highlights: fields.array(
          fields.text({
            label: "Highlight",
            description: "Highlights that will be displayed on the homepage, such as software developer, youtuber"
          }),
          {
            label: "Whatever You Want to Highlight",
            description: "Items will be present over homepage",
            itemLabel: (props) => props.value
          }
        )
      }
    })
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "app/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({ label: "Content" })
      }
    })
  }
});
const loader$2 = (args) => handleLoader({ config: keystaticConfig }, args);
const action = (args) => handleLoader({ config: keystaticConfig }, args);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const keystatic_$ = makePage(keystaticConfig);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: keystatic_$
}, Symbol.toStringTag, { value: "Module" }));
const reader = createReader(process.cwd(), keystaticConfig);
async function loader$1({ params }) {
  const slug = params.slug;
  if (!slug) throw json("Not Found", { status: 404 });
  const post = await reader.collections.posts.read(slug, {
    resolveLinkedFiles: true
  });
  if (!post) throw json("Not Found", { status: 404 });
  const errors = Markdoc.validate(post.content.node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const content = Markdoc.transform(post.content.node, markdocConfig);
  return json({
    post: {
      title: post.title,
      content
    }
  });
}
function PostPage() {
  const { post } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsx("h1", { children: post.title }),
    Markdoc.renderers.react(post.content, React)
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PostPage,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix + Keystatic!" }
  ];
};
async function loader() {
  const posts = await reader.collections.posts.all();
  return json({ posts });
}
function Index() {
  const { posts } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "content", children: [
    /* @__PURE__ */ jsx("h1", { children: "Keystatic ⚡️" }),
    /* @__PURE__ */ jsx("p", { children: "This homepage shows how to load a collection from the reader API." }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx(Link, { to: "/keystatic", children: "Click here to visit the Admin UI" }),
      ", or the link below to view a post in the collection."
    ] }),
    /* @__PURE__ */ jsx("h2", { children: "Posts" }),
    posts.length ? /* @__PURE__ */ jsx("ul", { children: posts.map((post) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/posts/${post.slug}`, children: post.entry.title }) }, post.slug)) }) : /* @__PURE__ */ jsxs("p", { children: [
      "There are currently no posts. Go",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/keystatic/collection/posts/create", children: "create one in Keystatic" }),
      "!"
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CfmtkiP9.js", "imports": ["/assets/index-DFWxKLZT.js", "/assets/components-DuNu-YZ6.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BT9N8_XD.js", "imports": ["/assets/index-DFWxKLZT.js", "/assets/components-DuNu-YZ6.js"], "css": ["/assets/root-C_nZ8B_o.css"] }, "routes/api.keystatic.$": { "id": "routes/api.keystatic.$", "parentId": "root", "path": "api/keystatic/*", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.keystatic._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/keystatic.$": { "id": "routes/keystatic.$", "parentId": "root", "path": "keystatic/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/keystatic._-uaeISFt4.js", "imports": ["/assets/index-DFWxKLZT.js", "/assets/index-1h9o7eJh.js"], "css": [] }, "routes/posts.$slug": { "id": "routes/posts.$slug", "parentId": "root", "path": "posts/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/posts._slug-DM5BKevZ.js", "imports": ["/assets/index-DFWxKLZT.js", "/assets/index-1h9o7eJh.js", "/assets/components-DuNu-YZ6.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DnK16LYq.js", "imports": ["/assets/index-DFWxKLZT.js", "/assets/components-DuNu-YZ6.js"], "css": [] } }, "url": "/assets/manifest-d2aca31e.js", "version": "d2aca31e" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/api.keystatic.$": {
    id: "routes/api.keystatic.$",
    parentId: "root",
    path: "api/keystatic/*",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/keystatic.$": {
    id: "routes/keystatic.$",
    parentId: "root",
    path: "keystatic/*",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/posts.$slug": {
    id: "routes/posts.$slug",
    parentId: "root",
    path: "posts/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
