import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

import ArticleInfo from '@/components/ArticleInfo';
import { BLOG_TITLE } from '@/constants';
import { COMPONENT_MAP } from '@/helpers/component-map';
import { loadPageContent } from '@/helpers/file-helpers';

import styles from './styles.module.css';

export async function generateMetadata() {
	const page = await loadPageContent('/about/about.mdx');

	const { title, abstract, publishedOn } = page.frontmatter;

	return {
		title: title,
		name: `${title} • ${BLOG_TITLE}`,
		content: abstract,
		created: publishedOn,
	};
}

async function AboutPage({ params, searchParams }) {
	const components = COMPONENT_MAP;
	const aboutFile = await loadPageContent('/about/about.mdx');

	const { title, publishedOn } = aboutFile.frontmatter;

	return (
		<article className={styles.wrapper}>
			<header>
				<ArticleInfo publishedOn={publishedOn}>{title}</ArticleInfo>
			</header>
			<div className={styles.page}>
				<MDXRemote source={aboutFile.content} components={components} />
			</div>
		</article>
	);
}

export default AboutPage;
