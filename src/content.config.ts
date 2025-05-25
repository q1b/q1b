import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const articles = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdoc", base: "./src/data/articles" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    visible: z.boolean(),
    pubDate: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

const youTubeVideos = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/youtube_videos" }),
  schema: z.object({
    label: z.string(),
    summary: z.string().optional(),
    URL: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/categories" }),
  schema: z.object({
    name: z.string(),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/tags" }),
  schema: z.object({
    name: z.string(),
    category: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdoc", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    visible: z.boolean().default(false),
    isMajorProject: z.boolean().default(false),
    githubURL: z.string().optional(),
    websiteURL: z.string().optional(),
  }),
});

export const collections = {
  articles,
  tags,
  categories,
  projects,
  "youtube-videos": youTubeVideos,
};
