'use strict';

// TODO: redo Sizing test module.  Jest and CSS modules break most of this

import * as assert from 'assert';
import {Sizes, Sizing} from '../sizing';

test('Testing creation of the Sizing object', () => {
	const sizes = new Sizes();
	assert(sizes);
	assert(typeof sizes.toString() === 'string');
});

test('Testing contents of FontSize xxsmall', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xxsmall;

	assert(sizes.type === Sizing.xxsmall);
	assert(sizes.currentSizing === Sizing.xxsmall);
	assert(sizes.font.sizeem === '0.375em');
	assert(sizes.font.sizepx === '6px');

	assert(sizes.fontSize === 6);
	assert(sizes.font.size === 6);

	assert(sizes.fontStyle === Sizing.xxsmall);
	assert(sizes.font.style === Sizing.xxsmall);

	assert(sizes.borderStyle === 'xxsmallBorder');
	assert(sizes.boxStyle === 'xxsmallBox');
	assert(sizes.next.type === Sizing.xsmall);
	assert(sizes.prev.type === Sizing.xxsmall);

	assert(sizes.getSizing(Sizing.xxsmall).type === Sizing.xxsmall);
});

test('Testing contents of FontSize xsmall', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xsmall;

	assert(sizes.type === Sizing.xsmall);
	assert(sizes.currentSizing === Sizing.xsmall);
	assert(sizes.font.sizeem === '0.5em');
	assert(sizes.font.sizepx === '8px');

	assert(sizes.fontSize === 8);
	assert(sizes.font.size === 8);

	assert(sizes.fontStyle === Sizing.xsmall);
	assert(sizes.font.style === Sizing.xsmall);

	assert(sizes.borderStyle === 'xsmallBorder');
	assert(sizes.boxStyle === 'xsmallBox');
	assert(sizes.next.type === Sizing.small);
	assert(sizes.prev.type === Sizing.xxsmall);

	assert(sizes.getSizing(Sizing.xsmall).type === Sizing.xsmall);
});

test('Testing contents of FontSize small', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.small;

	assert(sizes.type === Sizing.small);
	assert(sizes.currentSizing === Sizing.small);
	assert(sizes.font.sizeem === '0.75em');
	assert(sizes.font.sizepx === '12px');

	assert(sizes.fontSize === 12);
	assert(sizes.font.size === 12);

	assert(sizes.fontStyle === Sizing.small);
	assert(sizes.font.style === Sizing.small);

	assert(sizes.borderStyle === 'smallBorder');
	assert(sizes.boxStyle === 'smallBox');
	assert(sizes.next.type === Sizing.normal);
	assert(sizes.prev.type === Sizing.xsmall);

	assert(sizes.getSizing(Sizing.small).type === Sizing.small);
});

test('Testing contents of FontSize normal', () => {
	const sizes = new Sizes();

	assert(sizes);

	assert(sizes.type === Sizing.normal);
	assert(sizes.currentSizing === Sizing.normal);
	assert(sizes.font.sizeem === '1em');
	assert(sizes.font.sizepx === '16px');

	assert(sizes.fontSize === 16);
	assert(sizes.font.size === 16);

	assert(sizes.fontStyle === Sizing.normal);
	assert(sizes.font.style === Sizing.normal);

	assert(sizes.borderStyle === 'normalBorder');
	assert(sizes.boxStyle === 'normalBox');
	assert(sizes.next.type === Sizing.large);
	assert(sizes.prev.type === Sizing.small);

	assert(sizes.getSizing(Sizing.normal).type === Sizing.normal);
});

test('Testing contents of FontSize large', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.large;

	assert(sizes.type === Sizing.large);
	assert(sizes.currentSizing === Sizing.large);
	assert(sizes.font.sizeem === '1.5em');
	assert(sizes.font.sizepx === '24px');

	assert(sizes.fontSize === 24);
	assert(sizes.font.size === 24);

	assert(sizes.fontStyle === Sizing.large);
	assert(sizes.font.style === Sizing.large);

	assert(sizes.borderStyle === 'largeBorder');
	assert(sizes.boxStyle === 'largeBox');
	assert(sizes.next.type === Sizing.xlarge);
	assert(sizes.prev.type === Sizing.normal);

	assert(sizes.getSizing(Sizing.large).type === Sizing.large);
});

test('Testing contents of FontSize xlarge', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xlarge;

	assert(sizes.type === Sizing.xlarge);
	assert(sizes.currentSizing === Sizing.xlarge);
	assert(sizes.font.sizeem === '2em');
	assert(sizes.font.sizepx === '32px');

	assert(sizes.fontSize === 32);
	assert(sizes.font.size === 32);

	assert(sizes.fontStyle === Sizing.xlarge);
	assert(sizes.font.style === Sizing.xlarge);

	assert(sizes.borderStyle === 'xlargeBorder');
	assert(sizes.boxStyle === 'xlargeBox');
	assert(sizes.next.type === Sizing.xxlarge);
	assert(sizes.prev.type === Sizing.large);

	assert(sizes.getSizing(Sizing.xlarge).type === Sizing.xlarge);
});

test('Testing contents of FontSize xxlarge', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xxlarge;

	assert(sizes.type === Sizing.xxlarge);
	assert(sizes.currentSizing === Sizing.xxlarge);
	assert(sizes.font.sizeem === '3em');
	assert(sizes.font.sizepx === '48px');

	assert(sizes.fontSize === 48);
	assert(sizes.font.size === 48);

	assert(sizes.fontStyle === Sizing.xxlarge);
	assert(sizes.font.style === Sizing.xxlarge);

	assert(sizes.borderStyle === 'xxlargeBorder');
	assert(sizes.boxStyle === 'xxlargeBox');
	assert(sizes.next.type === Sizing.xxlarge);
	assert(sizes.prev.type === Sizing.xlarge);

	assert(sizes.getSizing(Sizing.xxlarge).type === Sizing.xxlarge);
});

// TODO: create a sizing object with different base
