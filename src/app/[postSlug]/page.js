import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import dynamic from 'next/dynamic';

export async function generateMetadata({ params }) {
	const post = await loadBlogPost(params.postSlug);

	const { title, abstract, publishedOn } = post.frontmatter;

	return {
		title: title,
		name: `${title} • ${BLOG_TITLE}`,
		content: abstract,
		created: publishedOn,
	};
}

async function BlogPost({ params }) {
	const post = await loadBlogPost(params.postSlug);
	const { title, publishedOn } = post.frontmatter;
	const DivisionGroupsDemo = dynamic(() =>
		import('@/components/DivisionGroupsDemo/DivisionGroupsDemo'),
	);
	const CircularColorsDemo = dynamic(() =>
		import('@/components/CircularColorsDemo/CircularColorsDemo'),
	);

	const components = {
		pre: CodeSnippet,
		DivisionGroupsDemo,
		CircularColorsDemo,
	};

	return (
		<article className={styles.wrapper}>
			<BlogHero title={title} publishedOn={publishedOn} />
			<div className={styles.page}>
				<MDXRemote source={post?.content} components={components} />
			</div>
		</article>
	);
}

export default BlogPost;
