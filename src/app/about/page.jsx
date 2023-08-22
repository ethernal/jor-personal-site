import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './styles.module.css';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { COMPONENT_MAP } from '@/helpers/component-map';

export const metadata = {
	title: 'About Sebastian Pieczyński',
	description:
		'More information about Sebastian Pieczynski (Pieczyński) - christian, husband, father, software developer and React enthusiast',
};

async function AboutPage({ params }) {
	const components = COMPONENT_MAP;

	return (
		<article className={styles.wrapper}>
			<div className={styles.page}></div>
		</article>
	);
}

export default AboutPage;
