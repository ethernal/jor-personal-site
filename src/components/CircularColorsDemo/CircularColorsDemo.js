'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
	{ label: 'red', value: 'hsl(348deg 100% 60%)' },
	{ label: 'yellow', value: 'hsl(50deg 100% 55%)' },
	{ label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [state, setState] = useState('paused');

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			if (state === 'on') {
				setTimeElapsed((currentValue) => currentValue + 1);
			}
		}, 1000);

		return () => window.clearInterval(intervalId);
	}, [state]);

	// COLORS array:
	const selectedColor = COLORS[timeElapsed % COLORS.length];

	return (
		<Card as="section" className={styles.wrapper}>
			<ul className={styles.colorsWrapper}>
				{COLORS.map((color, index) => {
					const isSelected = color.value === selectedColor.value;

					return (
						<li className={styles.color} key={index}>
							{isSelected && (
								<motion.div
									layoutId="outline"
									className={styles.selectedColorOutline}
									style={{ zIndex: 2 }}
								/>
							)}
							<motion.div
								className={clsx(
									styles.colorBox,
									isSelected && styles.selectedColorBox,
								)}
								style={{
									backgroundColor: color.value,
								}}
							>
								<VisuallyHidden>{color.label}</VisuallyHidden>
							</motion.div>
						</li>
					);
				})}
			</ul>

			<div className={styles.timeWrapper}>
				<dl className={styles.timeDisplay}>
					<dt>Time Elapsed</dt>
					<dd>{timeElapsed}</dd>
				</dl>
				<div className={styles.actions}>
					<button
						type="button"
						onClick={() => setState(state === 'on' ? 'pause' : 'on')}
					>
						{state === 'on' ? (
							<>
								<Pause />
								<VisuallyHidden>Pause</VisuallyHidden>
							</>
						) : (
							<>
								<Play />
								<VisuallyHidden>Play</VisuallyHidden>
							</>
						)}
					</button>
					<button type="button" onClick={() => setTimeElapsed(0)}>
						<RotateCcw />
						<VisuallyHidden>Reset</VisuallyHidden>
					</button>
				</div>
			</div>
		</Card>
	);
}

export default CircularColorsDemo;
