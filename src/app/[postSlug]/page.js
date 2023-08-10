import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';

import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

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

	return (
		<article className={styles.wrapper}>
			<BlogHero title={title} publishedOn={publishedOn} />
			<div className={styles.page}>
				<MDXRemote source={post?.content} components={{ pre: CodeSnippet }} />
			</div>
		</article>
	);
}

export default BlogPost;
