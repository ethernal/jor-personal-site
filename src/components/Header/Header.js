'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookie from 'js-cookie';
import { DARK_COLORS, LIGHT_COLORS } from '@/constants';

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
