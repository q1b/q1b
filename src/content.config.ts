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

const photos = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/photos" }),
  schema: z.object({
    label: z.string(),
    summary: z.string().optional(),
    URL: z.string(),
		tags: z.array(z.string()).optional(),
		related: z.enum(["yoga", "engineering", "other"]).optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/videos" }),
  schema: z.object({
    label: z.string(),
    summary: z.string().optional(),
    URL: z.string(),
		tags: z.array(z.string()).optional(),
		related: z.enum(["yoga", "engineering", "other"]).optional(),
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

const certificates = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.json",
    base: "./src/data/certificates",
  }),
  schema: z.object({
    title: z.string(),
		issuedBy: z.string(),
		issuerURL: z.string().optional(),
    issueDate: z.string(),
    certificateURL: z.string().optional(),
		credentialID: z.string().optional(),
		related: z.enum(["yoga", "engineering", "other"]).optional(),
  }),
});

const workExperience = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/work-experience" }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyURL: z.string().optional(),
    employmentType: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"]),
    locationType: z.enum(["Remote", "On-site", "Hybrid"]),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().default(false),
    duration: z.string(),
    description: z.string(),
    githubURL: z.string().optional(),
    websiteURL: z.string().optional(),
    technologies: z.array(z.string()),
    certificates: z.array(z.object({
      label: z.string(),
      file: z.string(),
    })).optional(),
  }),
});

export const collections = {
  tags,
	photos,
	videos,
  articles,
  projects,
  categories,
  certificates,
  workExperience,
};
