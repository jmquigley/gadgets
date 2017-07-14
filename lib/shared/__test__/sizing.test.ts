'use strict';

const assert = require('assert');

// TODO: redo Sizing test module.  Jest and CSS modules break most of this

import {Sizes} from '../sizing';

test('Testing creation of the Sizing object', () => {
	const sizes = new Sizes();
	expect(sizes).toBeTruthy();
	expect(typeof sizes.toString()).toBe('string');

	let zero = 0;
	let ary = [1,2,3];
	let two = 2;

	assert(ary.indexOf(zero) === two, 'Array #indexOf() should return index when the value is present');
});

// test('Testing contents of FontSize xxsmall', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();
// 	sizes.currentSizing = Sizing.xxsmall;

// 	expect(sizes.type).toBe(Sizing.xxsmall);
// 	expect(sizes.currentSizing).toBe(Sizing.xxsmall);
// 	expect(sizes.font.sizeem).toBe('0.375em');
// 	expect(sizes.font.sizepx).toBe('6px');

// 	expect(sizes.fontSize).toBe(6);
// 	expect(sizes.font.size).toBe(6);

// 	expect(sizes.fontStyle).toBe(Sizing.xxsmall);
// 	expect(sizes.font.style).toBe(Sizing.xxsmall);

// 	expect(sizes.borderStyle).toBe('xxsmallBorder');
// 	expect(sizes.boxStyle).toBe('xxsmallBox');
// 	expect(sizes.next.type).toBe(Sizing.xsmall);
// 	expect(sizes.prev.type).toBe(Sizing.xxsmall);

// 	expect(sizes.getSizing(Sizing.xxsmall).type).toBe(Sizing.xxsmall);
// });

// test('Testing contents of FontSize xsmall', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();
// 	sizes.currentSizing = Sizing.xsmall;

// 	expect(sizes.type).toBe(Sizing.xsmall);
// 	expect(sizes.currentSizing).toBe(Sizing.xsmall);
// 	expect(sizes.font.sizeem).toBe('0.5em');
// 	expect(sizes.font.sizepx).toBe('8px');

// 	expect(sizes.fontSize).toBe(8);
// 	expect(sizes.font.size).toBe(8);

// 	expect(sizes.fontStyle).toBe(Sizing.xsmall);
// 	expect(sizes.font.style).toBe(Sizing.xsmall);

// 	expect(sizes.borderStyle).toBe('xsmallBorder');
// 	expect(sizes.boxStyle).toBe('xsmallBox');
// 	expect(sizes.next.type).toBe(Sizing.small);
// 	expect(sizes.prev.type).toBe(Sizing.xxsmall);

// 	expect(sizes.getSizing(Sizing.xsmall).type).toBe(Sizing.xsmall);
// });

// test('Testing contents of FontSize small', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();
// 	sizes.currentSizing = Sizing.small;

// 	expect(sizes.type).toBe(Sizing.small);
// 	expect(sizes.currentSizing).toBe(Sizing.small);
// 	expect(sizes.font.sizeem).toBe('0.75em');
// 	expect(sizes.font.sizepx).toBe('12px');

// 	expect(sizes.fontSize).toBe(12);
// 	expect(sizes.font.size).toBe(12);

// 	expect(sizes.fontStyle).toBe(Sizing.small);
// 	expect(sizes.font.style).toBe(Sizing.small);

// 	expect(sizes.borderStyle).toBe('smallBorder');
// 	expect(sizes.boxStyle).toBe('smallBox');
// 	expect(sizes.next.type).toBe(Sizing.normal);
// 	expect(sizes.prev.type).toBe(Sizing.xsmall);

// 	expect(sizes.getSizing(Sizing.small).type).toBe(Sizing.small);
// });

// test('Testing contents of FontSize normal', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();

// 	expect(sizes.type).toBe(Sizing.normal);
// 	expect(sizes.currentSizing).toBe(Sizing.normal);
// 	expect(sizes.font.sizeem).toBe('1em');
// 	expect(sizes.font.sizepx).toBe('16px');

// 	expect(sizes.fontSize).toBe(16);
// 	expect(sizes.font.size).toBe(16);

// 	expect(sizes.fontStyle).toBe(Sizing.normal);
// 	expect(sizes.font.style).toBe(Sizing.normal);

// 	expect(sizes.borderStyle).toBe('normalBorder');
// 	expect(sizes.boxStyle).toBe('normalBox');
// 	expect(sizes.next.type).toBe(Sizing.large);
// 	expect(sizes.prev.type).toBe(Sizing.small);

// 	expect(sizes.getSizing(Sizing.normal).type).toBe(Sizing.normal);
// });

// test('Testing contents of FontSize large', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();
// 	sizes.currentSizing = Sizing.large;

// 	expect(sizes.type).toBe(Sizing.large);
// 	expect(sizes.currentSizing).toBe(Sizing.large);
// 	expect(sizes.font.sizeem).toBe('1.5em');
// 	expect(sizes.font.sizepx).toBe('24px');

// 	expect(sizes.fontSize).toBe(24);
// 	expect(sizes.font.size).toBe(24);

// 	expect(sizes.fontStyle).toBe(Sizing.large);
// 	expect(sizes.font.style).toBe(Sizing.large);

// 	expect(sizes.borderStyle).toBe('largeBorder');
// 	expect(sizes.boxStyle).toBe('largeBox');
// 	expect(sizes.next.type).toBe(Sizing.xlarge);
// 	expect(sizes.prev.type).toBe(Sizing.normal);

// 	expect(sizes.getSizing(Sizing.large).type).toBe(Sizing.large);
// });

// test('Testing contents of FontSize xlarge', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();
// 	sizes.currentSizing = Sizing.xlarge;

// 	expect(sizes.type).toBe(Sizing.xlarge);
// 	expect(sizes.currentSizing).toBe(Sizing.xlarge);
// 	expect(sizes.font.sizeem).toBe('2em');
// 	expect(sizes.font.sizepx).toBe('32px');

// 	expect(sizes.fontSize).toBe(32);
// 	expect(sizes.font.size).toBe(32);

// 	expect(sizes.fontStyle).toBe(Sizing.xlarge);
// 	expect(sizes.font.style).toBe(Sizing.xlarge);

// 	expect(sizes.borderStyle).toBe('xlargeBorder');
// 	expect(sizes.boxStyle).toBe('xlargeBox');
// 	expect(sizes.next.type).toBe(Sizing.xxlarge);
// 	expect(sizes.prev.type).toBe(Sizing.large);

// 	expect(sizes.getSizing(Sizing.xlarge).type).toBe(Sizing.xlarge);
// });

// test('Testing contents of FontSize xxlarge', () => {
// 	const sizes = new Sizes();

// 	expect(sizes).toBeTruthy();
// 	sizes.currentSizing = Sizing.xxlarge;

// 	expect(sizes.type).toBe(Sizing.xxlarge);
// 	expect(sizes.currentSizing).toBe(Sizing.xxlarge);
// 	expect(sizes.font.sizeem).toBe('3em');
// 	expect(sizes.font.sizepx).toBe('48px');

// 	expect(sizes.fontSize).toBe(48);
// 	expect(sizes.font.size).toBe(48);

// 	expect(sizes.fontStyle).toBe(Sizing.xxlarge);
// 	expect(sizes.font.style).toBe(Sizing.xxlarge);

// 	expect(sizes.borderStyle).toBe('xxlargeBorder');
// 	expect(sizes.boxStyle).toBe('xxlargeBox');
// 	expect(sizes.next.type).toBe(Sizing.xxlarge);
// 	expect(sizes.prev.type).toBe(Sizing.xlarge);

// 	expect(sizes.getSizing(Sizing.xxlarge).type).toBe(Sizing.xxlarge);
// });

// TODO: create a sizing object with different base
