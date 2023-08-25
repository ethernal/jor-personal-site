const {
	default: CodeSnippet,
} = require('@/components/CodeSnippet/CodeSnippet');

import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import Image from 'next/image';
import ResponsiveImage from '@/components/ResponsiveImage/ResponsiveImage';

export const COMPONENT_MAP = {
	pre: CodeSnippet,
	DivisionGroupsDemo,
	CircularColorsDemo,
	ResponsiveImage,
	Image,
};
