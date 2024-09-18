import { config, collection, fields, singleton } from "@keystatic/core";
import type { LocalConfig, GitHubConfig } from "@keystatic/core";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
	process.env.NODE_ENV === "development"
		? { kind: "local" }
		: {
			kind: "github",
			repo: {
				owner: "q1b",
				name: "q1b",
			},
		};

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
	storage,
	ui: {
		brand: {
			name: "Admin Dashboard",
		},
	},
	singletons: {
		homepage: singleton({
			label: "Homepage",
			path: "src/content/singletons/homepage/",
			format: {
				data: "json",
			},
			schema: {
				title: fields.text({ label: "Title" }),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				keywords: fields.array(
					fields.text({ label: "Enter Keyword for your website" }),
					{ label: "Keywords", itemLabel: (props) => props.value },
				),
				highlights: fields.array(
					fields.text({
						label: "Highlight",
						description:
							"Highlights that will be displayed on the homepage, such as software developer, youtuber",
					}),
					{
						label: "Whatever You Want to Highlight",
						description: "Items will be present over homepage",
						itemLabel: (props) => props.value,
					},
				),
			},
		}),
		person: singleton({
			label: "Profile",
			path: "src/content/singletons/profile/",
			format: {
				data: "json",
			},
			schema: {
				name: fields.text({ label: "Name" }),
				email_address: fields.text({
					label: "Email Address",
					description:
						"Be aware of the email address you are typing as this is going to be visible to everyone who is going to visit this website!",
				}),
				image: fields.image({
					label: "Profile Image",
					directory: "src/assets/images/profile",
					publicPath: "/src/assets/images/profile/",
				}),
				worksFor: fields.conditional(
					fields.checkbox({
						label: "Are you Currently Working ?",
						defaultValue: false,
					}),
					{
						true: fields.text({ label: "Works For" }),
						false: fields.empty(),
					},
				),
				knowsAbout: fields.array(
					fields.object({
						name: fields.text({ label: "Name" }),
						public: fields.checkbox({
							label: "Public",
							defaultValue: true,
						}),
					}),
					{
						label: "Knows About",
						itemLabel: (props) => props.fields.name.value,
					},
				),
				githubURL: fields.url({ label: "GitHub URL" }),
				xURL: fields.url({ label: "X URL" }),
				linkedInURL: fields.url({ label: "LinkedIn URL" }),
				resumePDF: fields.file({
					label: "PDF File of your Resume",
					directory: "src/assets/files/resume",
					publicPath: "/src/assets/files/resume/",
				}),
			},
		}),
	},
	collections: {
		projects: collection({
			label: "Projects",
			slugField: "title",
			path: "src/data/projects/*",
			format: {
				data: "json",
				contentField: "content",
			},
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				shortDescription: fields.text({ label: "Short Description" }),
				visible: fields.checkbox({
					label: "Visible",
				}),
				isMajorProject: fields.checkbox({
					label: "Is Major Project",
				}),
				githubURL: fields.url({ label: "GitHub URL" }),
				websiteURL: fields.url({ label: "Website URL" }),
				article: fields.conditional(
					fields.checkbox({
						label: "Is Article",
					}),
					{
						true: fields.object(
							{
								employmentType: fields.select({
									label: "Employment Type",
									options: [
										{
											label: "Full Time",
											value: "full-time",
										},
										{
											label: "Part Time",
											value: "part-time",
										},
										{
											label: "Self Employed",
											value: "self-employed",
										},
										{
											label: "Freelance",
											value: "freelance",
										},
										{
											label: "Internship",
											value: "internship",
										},
										{
											label: "Trainee",
											value: "trainee",
										},
									],
									defaultValue: "full-time",
								}),
								location: fields.text({ label: "Location" }),
								locationType: fields.select({
									label: "Location Type",
									options: [
										{
											label: "On-site",
											value: "on-site",
										},
										{
											label: "Hybrid",
											value: "hybrid",
										},
										{
											label: "Remote",
											value: "remote",
										},
									],
									defaultValue: "remote",
								}),
								startDate: fields.date({ label: "Start Date" }),
								endDate: fields.date({ label: "End Date" }),
								media: fields.array(
									fields.object({
										name: fields.text({ label: "Name" }),
										file: fields.file({
											label: "Media",
											directory:
												"src/assets/images/projects",
											// Use the @assets path alias
											// publicPath: '@assets/images/articles/'
											publicPath:
												"/src/assets/images/projects/",
										}),
									}),
									{
										label: "Media",
										description:
											"Letter of Recommendation, Certificates, etc.",
									},
								),
								company: fields.object(
									{
										name: fields.text({ label: "Name" }),
										url: fields.url({ label: "URL" }),
									},
									{
										label: "Company",
										description:
											"Details of the Company you worked for.",
									},
								),
							},
							{
								label: "Article",
							},
						),
						false: fields.ignored(),
					},
				),
				content: fields.markdoc({ label: "Content" }),
			},
		}),
		categories: collection({
			label: "Categories",
			slugField: "name",
			path: "src/data/categories/*",
			format: {
				data: "json",
			},
			schema: {
				name: fields.slug({ name: { label: "Name" } }),
			},
		}),
		tags: collection({
			label: "Tags",
			slugField: "name",
			path: "src/data/tags/*",
			format: {
				data: "json",
			},
			schema: {
				name: fields.slug({ name: { label: "Name" } }),
				category: fields.relationship({
					label: "Category",
					collection: "categories",
				}),
			},
		}),
		articles: collection({
			label: "Articles",
			slugField: "title",
			path: "src/data/articles/*",
			entryLayout: "content",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title" } }),
				subtitle: fields.text({ label: "Subtitle", multiline: true }),
				summary: fields.text({ label: "Summary", multiline: true }),
				content: fields.markdoc({ label: "Content" }),
				visible: fields.checkbox({
					label: "Visible",
					defaultValue: false,
				}),
				pubDate: fields.date({ label: "Pub Date" }),
				thumbnail: fields.image({
					label: "Thumbnail",
					directory: "src/assets/images/articles",
					// Use the @assets path alias
					// publicPath: '@assets/images/articles/'
					publicPath: "/src/assets/images/articles/",
				}),
				tags: fields.multiRelationship({
					label: "Tags",
					collection: "tags",
				}),
			},
		}),
		webpages: collection({
			label: "Webpages",
			slugField: "path",
			path: "src/data/webpages/*",
			schema: {
				path: fields.slug({ name: { label: "Path" } }),
				title: fields.text({ label: "Title" }),
				description: fields.text({
					label: "Description",
					multiline: true,
				}),
				keywords: fields.array(fields.text({ label: "Keywords" })),
			},
		}),
	},
});
