import { defineCollection, getEntry, z } from 'astro:content';

const writings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.date(),
    isDraft: z.boolean()
  }),
});

const profile = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    about: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string().optional()
    }).optional(),
    links: z.object({
        'email': z.string().optional(),
        'github': z.string().optional(),
        'linkedin': z.string().optional(),
        'x': z.string().optional(),
      }).optional(),
  }),
});

const site = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string().optional()
    }).optional(),
  }),
});

export const collections = {
  writings
}

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const data = {
  site,
  profile,
};