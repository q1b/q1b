import {
	DocumentRenderer as KeystaticDocumentRenderer,
	type DocumentRendererProps,
} from '@keystatic/core/renderer';

import {
	componentBlockRenderers,
	getDocumentRenderers,
} from '@/lib/keystatic/renderers';

import { bundledLanguages, getHighlighter, type Highlighter } from 'shiki';

const highlighter: Highlighter = await getHighlighter({
	themes: ['poimandres'],
	langs: Object.keys(bundledLanguages),
});

export function DocumentRenderer(props: DocumentRendererProps) {
	const {
		componentBlocks = componentBlockRenderers,
		renderers = getDocumentRenderers(highlighter),
		...consumerProps
	} = props;

	return (
		<KeystaticDocumentRenderer
			componentBlocks={componentBlocks}
			renderers={renderers}
			{...consumerProps}
		/>
	);
}
