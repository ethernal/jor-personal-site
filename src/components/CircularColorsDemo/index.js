import dynamic from 'next/dynamic';

const CircularColorsDemo = dynamic(() =>
	import('@/components/CircularColorsDemo/CircularColorsDemo'),
);

export default CircularColorsDemo;
