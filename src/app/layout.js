import React from 'react';
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google';
import clsx from 'clsx';
import { cookies } from 'next/headers';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import MotionPreferencesConfig from '@/components/MotionPreferencesConfig/MotionPreferencesConfig';

const mainFont = Work_Sans({
	subsets: ['latin'],
	display: 'fallback',
	weight: 'variable',
	variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
	subsets: ['latin'],
	display: 'fallback',
	weight: 'variable',
	variable: '--font-family-mono',
});

function RootLayout({ children }) {
	// TODO: Dynamic theme depending on user preference
	const savedTheme = cookies().get('theme');
	const theme = savedTheme?.value ?? 'light';

	const toggleTheme = () => {
		coockies((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<MotionPreferencesConfig>
			<html
				lang="en"
				className={clsx(mainFont.variable, monoFont.variable)}
				data-color-theme={theme}
				style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
			>
				<body>
					<Header initialTheme={theme} />
					<main>{children}</main>
					<Footer />
				</body>
			</html>
		</MotionPreferencesConfig>
	);
}

export default RootLayout;
