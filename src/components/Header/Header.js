'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookie from 'js-cookie';
import { DARK_COLORS, LIGHT_COLORS } from '@/constants';
import Link from 'next/link';

function Header({ initialTheme, className, ...delegated }) {
	const [theme, setTheme] = useState(initialTheme);

	const handleThemeChange = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
		Cookie.set('theme', nextTheme, { expires: 380 });

		const root = document.documentElement;
		root.setAttribute('data-color-theme', nextTheme);

		const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
	};

	return (
		<header className={clsx(styles.wrapper, className)} {...delegated}>
			<Logo />

			<nav className="flex gap-4">
				<Link href={`/blog`}>Articles</Link>
				<Link href={`/about#cv`}>CV</Link>
				<Link href={`/about`}>About</Link>
				<Link href={`/contact`}>Contact</Link>
			</nav>

			<div className={styles.actions}>
				<button className={styles.action}>
					<Rss
						size="1.5rem"
						style={{
							// Optical alignment
							transform: 'translate(2px, -2px)',
						}}
					/>
					<VisuallyHidden>View RSS feed</VisuallyHidden>
				</button>
				<button className={styles.action} onClick={handleThemeChange}>
					{theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
					<VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
				</button>
			</div>
		</header>
	);
}

export default Header;
