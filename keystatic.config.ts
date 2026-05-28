import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
		kind: 'github',
		repo: {
			name: "q1b",
			owner: "q1b"
		}
  },
  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'src/data/profile',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name' }),
        image: fields.image({
          label: 'Profile Image',
          directory: 'src/assets/images/profile',
          publicPath: '/src/assets/images/profile/',
        }),
        worksFor: fields.conditional(
          fields.checkbox({ label: 'Currently employed', defaultValue: false }),
          {
            true: fields.object({
              name: fields.text({ label: 'Organization name' }),
              URL: fields.url({ label: 'Organization URL' }),
            }),
            false: fields.empty(),
          }
        ),
        knowsAbout: fields.array(
          fields.object({
            name: fields.text({ label: 'Topic' }),
            public: fields.checkbox({ label: 'Public', defaultValue: true }),
          }),
          { label: 'Knows About', itemLabel: (props) => props.fields.name.value }
        ),
        githubURL: fields.url({ label: 'GitHub URL' }),
        linkedInURL: fields.url({ label: 'LinkedIn URL' }),
        resumePDF: fields.text({ label: 'Resume PDF path' }),
      },
    }),

    homepage: singleton({
      label: 'Homepage',
      path: 'src/data/homepage',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Page Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        keywords: fields.array(
          fields.text({ label: 'Keyword' }),
          { label: 'Keywords', itemLabel: (props) => props.value }
        ),
        highlights: fields.array(
          fields.text({ label: 'Highlight' }),
          { label: 'Highlights', itemLabel: (props) => props.value }
        ),
      },
    }),
  },

  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/data/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: false }),
        pubDate: fields.date({ label: 'Publish Date' }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'src/assets/images/articles',
          publicPath: '/src/assets/images/articles/',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.value }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/data/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        shortDescription: fields.text({ label: 'Short Description', multiline: true }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: false }),
        isMajorProject: fields.checkbox({ label: 'Major Project', defaultValue: false }),
        githubURL: fields.url({ label: 'GitHub URL' }),
        websiteURL: fields.url({ label: 'Website URL' }),
        article: fields.conditional(
          fields.checkbox({ label: 'Has linked article', defaultValue: false }),
          {
            true: fields.text({ label: 'Article slug' }),
            false: fields.empty(),
          }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    certificates: collection({
      label: 'Certificates',
      slugField: 'title',
      path: 'src/data/certificates/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        issuedBy: fields.text({ label: 'Issued By' }),
        issuerURL: fields.url({ label: 'Issuer URL' }),
        issueDate: fields.text({ label: 'Issue Date' }),
        certificateURL: fields.url({ label: 'Certificate URL' }),
        credentialID: fields.text({ label: 'Credential ID' }),
        related: fields.select({
          label: 'Related',
          options: [
            { label: 'Yoga', value: 'yoga' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'other',
        }),
      },
    }),

    videos: collection({
      label: 'Videos',
      slugField: 'label',
      path: 'src/data/videos/*',
      format: { data: 'json' },
      schema: {
        label: fields.slug({ name: { label: 'Label' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        URL: fields.url({ label: 'URL' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.value }
        ),
        related: fields.select({
          label: 'Related',
          options: [
            { label: 'Yoga', value: 'yoga' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'engineering',
        }),
      },
    }),

    photos: collection({
      label: 'Photos',
      slugField: 'label',
      path: 'src/data/photos/*',
      format: { data: 'json' },
      schema: {
        label: fields.slug({ name: { label: 'Label' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        URL: fields.url({ label: 'URL' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.value }
        ),
        related: fields.select({
          label: 'Related',
          options: [
            { label: 'Yoga', value: 'yoga' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'other',
        }),
      },
    }),

    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'src/data/categories/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
      },
    }),

    tags: collection({
      label: 'Tags',
      slugField: 'name',
      path: 'src/data/tags/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        category: fields.text({ label: 'Category' }),
      },
    }),

    'work-experience': collection({
      label: 'Work Experience',
      slugField: 'title',
      path: 'src/data/work-experience/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Job Title' } }),
        company: fields.text({ label: 'Company' }),
        companyURL: fields.url({ label: 'Company URL' }),
        employmentType: fields.select({
          label: 'Employment Type',
          options: [
            { label: 'Full-time', value: 'Full-time' },
            { label: 'Part-time', value: 'Part-time' },
            { label: 'Contract', value: 'Contract' },
            { label: 'Freelance', value: 'Freelance' },
            { label: 'Internship', value: 'Internship' },
          ],
          defaultValue: 'Full-time',
        }),
        locationType: fields.select({
          label: 'Location Type',
          options: [
            { label: 'Remote', value: 'Remote' },
            { label: 'On-site', value: 'On-site' },
            { label: 'Hybrid', value: 'Hybrid' },
          ],
          defaultValue: 'Remote',
        }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date' }),
        isCurrent: fields.checkbox({ label: 'Currently working here', defaultValue: false }),
        duration: fields.text({ label: 'Duration (e.g. 5 Months)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        githubURL: fields.url({ label: 'GitHub URL' }),
        websiteURL: fields.url({ label: 'Website URL' }),
        certificates: fields.array(
          fields.object({
            label: fields.text({ label: 'Certificate name' }),
            file: fields.file({
              label: 'Certificate file',
              directory: 'public/certificates/work-experience',
              publicPath: '/certificates/work-experience/',
            }),
          }),
          { label: 'Certificates', itemLabel: (props) => props.fields.label.value }
        ),
        technologies: fields.multiselect({
          label: 'Technologies',
          options: [
            { label: 'Astro', value: 'astro' },
            { label: 'LibSQL', value: 'libsql' },
            { label: 'SolidJS', value: 'solidjs' },
            { label: 'SQLite', value: 'sqlite' },
            { label: 'Svelte', value: 'svelte' },
            { label: 'SvelteKit', value: 'sveltekit' },
            { label: 'Tailwind CSS', value: 'tailwindcss' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Vite', value: 'vitejs' },
          ],
        }),
      },
    }),

    'knowledge-series': collection({
      label: 'Knowledge Series',
      slugField: 'title',
      path: 'src/data/knowledge-series/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        start_date: fields.date({ label: 'Start Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        topics: fields.array(
          fields.text({ label: 'Topic' }),
          { label: 'Topics', itemLabel: (props) => props.value }
        ),
        join_url: fields.url({ label: 'Join URL' }),
      },
    }),
  },
});
