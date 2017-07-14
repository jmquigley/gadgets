'use strict';

// TODO: redo Sizing test module.  Jest and CSS modules break most of this

import * as assert from 'assert';
import {Sizes, Sizing} from '../sizing';

test('Testing creation of the Sizing object', () => {
	const sizes = new Sizes();
	assert(sizes);
	assert.equal(typeof sizes.toString(), 'string');
});

test('Testing contents of FontSize xxsmall', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xxsmall;

	assert.equal(sizes.type, Sizing.xxsmall);
	assert.equal(sizes.currentSizing, Sizing.xxsmall);
	assert.equal(sizes.font.sizeem, '0.375em');
	assert.equal(sizes.font.sizepx, '6px');

	assert.equal(sizes.fontSize, 6);
	assert.equal(sizes.font.size, 6);

	assert.equal(sizes.fontStyle, Sizing.xxsmall);
	assert.equal(sizes.font.style, Sizing.xxsmall);

	assert.equal(sizes.borderStyle, 'xxsmallBorder');
	assert.equal(sizes.boxStyle, 'xxsmallBox');
	assert.equal(sizes.next.type, Sizing.xsmall);
	assert.equal(sizes.prev.type, Sizing.xxsmall);

	assert.equal(sizes.getSizing(Sizing.xxsmall).type, Sizing.xxsmall);
});

test('Testing contents of FontSize xsmall', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xsmall;

	assert.equal(sizes.type, Sizing.xsmall);
	assert.equal(sizes.currentSizing, Sizing.xsmall);
	assert.equal(sizes.font.sizeem, '0.5em');
	assert.equal(sizes.font.sizepx, '8px');

	assert.equal(sizes.fontSize, 8);
	assert.equal(sizes.font.size, 8);

	assert.equal(sizes.fontStyle, Sizing.xsmall);
	assert.equal(sizes.font.style, Sizing.xsmall);

	assert.equal(sizes.borderStyle, 'xsmallBorder');
	assert.equal(sizes.boxStyle, 'xsmallBox');
	assert.equal(sizes.next.type, Sizing.small);
	assert.equal(sizes.prev.type, Sizing.xxsmall);

	assert.equal(sizes.getSizing(Sizing.xsmall).type, Sizing.xsmall);
});

test('Testing contents of FontSize small', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.small;

	assert.equal(sizes.type, Sizing.small);
	assert.equal(sizes.currentSizing, Sizing.small);
	assert.equal(sizes.font.sizeem, '0.75em');
	assert.equal(sizes.font.sizepx, '12px');

	assert.equal(sizes.fontSize, 12);
	assert.equal(sizes.font.size, 12);

	assert.equal(sizes.fontStyle, Sizing.small);
	assert.equal(sizes.font.style, Sizing.small);

	assert.equal(sizes.borderStyle, 'smallBorder');
	assert.equal(sizes.boxStyle, 'smallBox');
	assert.equal(sizes.next.type, Sizing.normal);
	assert.equal(sizes.prev.type, Sizing.xsmall);

	assert.equal(sizes.getSizing(Sizing.small).type, Sizing.small);
});

test('Testing contents of FontSize normal', () => {
	const sizes = new Sizes();

	assert(sizes);

	assert.equal(sizes.type, Sizing.normal);
	assert.equal(sizes.currentSizing, Sizing.normal);
	assert.equal(sizes.font.sizeem, '1em');
	assert.equal(sizes.font.sizepx, '16px');

	assert.equal(sizes.fontSize, 16);
	assert.equal(sizes.font.size, 16);

	assert.equal(sizes.fontStyle, Sizing.normal);
	assert.equal(sizes.font.style, Sizing.normal);

	assert.equal(sizes.borderStyle, 'normalBorder');
	assert.equal(sizes.boxStyle, 'normalBox');
	assert.equal(sizes.next.type, Sizing.large);
	assert.equal(sizes.prev.type, Sizing.small);

	assert.equal(sizes.getSizing(Sizing.normal).type, Sizing.normal);
});

test('Testing contents of FontSize large', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.large;

	assert.equal(sizes.type, Sizing.large);
	assert.equal(sizes.currentSizing, Sizing.large);
	assert.equal(sizes.font.sizeem, '1.5em');
	assert.equal(sizes.font.sizepx, '24px');

	assert.equal(sizes.fontSize, 24);
	assert.equal(sizes.font.size, 24);

	assert.equal(sizes.fontStyle, Sizing.large);
	assert.equal(sizes.font.style, Sizing.large);

	assert.equal(sizes.borderStyle, 'largeBorder');
	assert.equal(sizes.boxStyle, 'largeBox');
	assert.equal(sizes.next.type, Sizing.xlarge);
	assert.equal(sizes.prev.type, Sizing.normal);

	assert.equal(sizes.getSizing(Sizing.large).type, Sizing.large);
});

test('Testing contents of FontSize xlarge', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xlarge;

	assert.equal(sizes.type, Sizing.xlarge);
	assert.equal(sizes.currentSizing, Sizing.xlarge);
	assert.equal(sizes.font.sizeem, '2em');
	assert.equal(sizes.font.sizepx, '32px');

	assert.equal(sizes.fontSize, 32);
	assert.equal(sizes.font.size, 32);

	assert.equal(sizes.fontStyle, Sizing.xlarge);
	assert.equal(sizes.font.style, Sizing.xlarge);

	assert.equal(sizes.borderStyle, 'xlargeBorder');
	assert.equal(sizes.boxStyle, 'xlargeBox');
	assert.equal(sizes.next.type, Sizing.xxlarge);
	assert.equal(sizes.prev.type, Sizing.large);

	assert.equal(sizes.getSizing(Sizing.xlarge).type, Sizing.xlarge);
});

test('Testing contents of FontSize xxlarge', () => {
	const sizes = new Sizes();

	assert(sizes);
	sizes.currentSizing = Sizing.xxlarge;

	assert.equal(sizes.type, Sizing.xxlarge);
	assert.equal(sizes.currentSizing, Sizing.xxlarge);
	assert.equal(sizes.font.sizeem, '3em');
	assert.equal(sizes.font.sizepx, '48px');

	assert.equal(sizes.fontSize, 48);
	assert.equal(sizes.font.size, 48);

	assert.equal(sizes.fontStyle, Sizing.xxlarge);
	assert.equal(sizes.font.style, Sizing.xxlarge);

	assert.equal(sizes.borderStyle, 'xxlargeBorder');
	assert.equal(sizes.boxStyle, 'xxlargeBox');
	assert.equal(sizes.next.type, Sizing.xxlarge);
	assert.equal(sizes.prev.type, Sizing.xlarge);

	assert.equal(sizes.getSizing(Sizing.xxlarge).type, Sizing.xxlarge);
});

// TODO: create a sizing object with different base
