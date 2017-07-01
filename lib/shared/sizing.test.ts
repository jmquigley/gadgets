'use strict';

import {mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {Sizes, Sizing} from './sizing';

test('Testing creation of the Sizing object', t => {
	const sizes = new Sizes();
	t.truthy(sizes);
	t.is(typeof sizes.toString(), 'string');
	console.log(sizes.toString());
});

test('Testing contents of FontSize xxsmall', t => {
	const sizes = new Sizes();

	t.truthy(sizes);
	sizes.currentSizing = Sizing.xxsmall;

	t.is(sizes.type, Sizing.xxsmall);
	t.is(sizes.currentSizing, Sizing.xxsmall);
	t.is(sizes.font.sizeem, '0.375em');
	t.is(sizes.font.sizepx, '6px');

	t.is(sizes.fontSize, 6);
	t.is(sizes.font.size, 6);

	t.is(sizes.fontStyle, Sizing.xxsmall);
	t.is(sizes.font.style, Sizing.xxsmall);

	t.is(sizes.borderStyle, 'xxsmallBorder');
	t.is(sizes.boxStyle, 'xxsmallBox');
	t.is(sizes.next.type, Sizing.xsmall);
	t.is(sizes.prev.type, Sizing.xxsmall);

	t.is(sizes.getSizing(Sizing.xxsmall).type, Sizing.xxsmall);
});

test('Testing contents of FontSize xsmall', t => {
	const sizes = new Sizes();

	t.truthy(sizes);
	sizes.currentSizing = Sizing.xsmall;

	t.is(sizes.type, Sizing.xsmall);
	t.is(sizes.currentSizing, Sizing.xsmall);
	t.is(sizes.font.sizeem, '0.5em');
	t.is(sizes.font.sizepx, '8px');

	t.is(sizes.fontSize, 8);
	t.is(sizes.font.size, 8);

	t.is(sizes.fontStyle, Sizing.xsmall);
	t.is(sizes.font.style, Sizing.xsmall);

	t.is(sizes.borderStyle, 'xsmallBorder');
	t.is(sizes.boxStyle, 'xsmallBox');
	t.is(sizes.next.type, Sizing.small);
	t.is(sizes.prev.type, Sizing.xxsmall);

	t.is(sizes.getSizing(Sizing.xsmall).type, Sizing.xsmall);
});

test('Testing contents of FontSize small', t => {
	const sizes = new Sizes();

	t.truthy(sizes);
	sizes.currentSizing = Sizing.small;

	t.is(sizes.type, Sizing.small);
	t.is(sizes.currentSizing, Sizing.small);
	t.is(sizes.font.sizeem, '0.75em');
	t.is(sizes.font.sizepx, '12px');

	t.is(sizes.fontSize, 12);
	t.is(sizes.font.size, 12);

	t.is(sizes.fontStyle, Sizing.small);
	t.is(sizes.font.style, Sizing.small);

	t.is(sizes.borderStyle, 'smallBorder');
	t.is(sizes.boxStyle, 'smallBox');
	t.is(sizes.next.type, Sizing.normal);
	t.is(sizes.prev.type, Sizing.xsmall);

	t.is(sizes.getSizing(Sizing.small).type, Sizing.small);
});

test('Testing contents of FontSize normal', t => {
	const sizes = new Sizes();

	t.truthy(sizes);

	t.is(sizes.type, Sizing.normal);
	t.is(sizes.currentSizing, Sizing.normal);
	t.is(sizes.font.sizeem, '1em');
	t.is(sizes.font.sizepx, '16px');

	t.is(sizes.fontSize, 16);
	t.is(sizes.font.size, 16);

	t.is(sizes.fontStyle, Sizing.normal);
	t.is(sizes.font.style, Sizing.normal);

	t.is(sizes.borderStyle, 'normalBorder');
	t.is(sizes.boxStyle, 'normalBox');
	t.is(sizes.next.type, Sizing.large);
	t.is(sizes.prev.type, Sizing.small);

	t.is(sizes.getSizing(Sizing.normal).type, Sizing.normal);
});

test('Testing contents of FontSize large', t => {
	const sizes = new Sizes();

	t.truthy(sizes);
	sizes.currentSizing = Sizing.large;

	t.is(sizes.type, Sizing.large);
	t.is(sizes.currentSizing, Sizing.large);
	t.is(sizes.font.sizeem, '1.5em');
	t.is(sizes.font.sizepx, '24px');

	t.is(sizes.fontSize, 24);
	t.is(sizes.font.size, 24);

	t.is(sizes.fontStyle, Sizing.large);
	t.is(sizes.font.style, Sizing.large);

	t.is(sizes.borderStyle, 'largeBorder');
	t.is(sizes.boxStyle, 'largeBox');
	t.is(sizes.next.type, Sizing.xlarge);
	t.is(sizes.prev.type, Sizing.normal);

	t.is(sizes.getSizing(Sizing.large).type, Sizing.large);
});

test('Testing contents of FontSize xlarge', t => {
	const sizes = new Sizes();

	t.truthy(sizes);
	sizes.currentSizing = Sizing.xlarge;

	t.is(sizes.type, Sizing.xlarge);
	t.is(sizes.currentSizing, Sizing.xlarge);
	t.is(sizes.font.sizeem, '2em');
	t.is(sizes.font.sizepx, '32px');

	t.is(sizes.fontSize, 32);
	t.is(sizes.font.size, 32);

	t.is(sizes.fontStyle, Sizing.xlarge);
	t.is(sizes.font.style, Sizing.xlarge);

	t.is(sizes.borderStyle, 'xlargeBorder');
	t.is(sizes.boxStyle, 'xlargeBox');
	t.is(sizes.next.type, Sizing.xxlarge);
	t.is(sizes.prev.type, Sizing.large);

	t.is(sizes.getSizing(Sizing.xlarge).type, Sizing.xlarge);
});

test('Testing contents of FontSize xxlarge', t => {
	const sizes = new Sizes();

	t.truthy(sizes);
	sizes.currentSizing = Sizing.xxlarge;

	t.is(sizes.type, Sizing.xxlarge);
	t.is(sizes.currentSizing, Sizing.xxlarge);
	t.is(sizes.font.sizeem, '3em');
	t.is(sizes.font.sizepx, '48px');

	t.is(sizes.fontSize, 48);
	t.is(sizes.font.size, 48);

	t.is(sizes.fontStyle, Sizing.xxlarge);
	t.is(sizes.font.style, Sizing.xxlarge);

	t.is(sizes.borderStyle, 'xxlargeBorder');
	t.is(sizes.boxStyle, 'xxlargeBox');
	t.is(sizes.next.type, Sizing.xxlarge);
	t.is(sizes.prev.type, Sizing.xlarge);

	t.is(sizes.getSizing(Sizing.xxlarge).type, Sizing.xxlarge);
});

// TODO: create a sizing object with different base
