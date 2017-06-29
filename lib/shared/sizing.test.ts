'use strict';

import {mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {Sizing} from './sizing';

test('Testing creation of the Sizing object', t => {
	const sizing = new Sizing();
	t.truthy(sizing);
	t.is(typeof sizing.toString(), 'string');
	console.log(sizing.toString());
});

test('Testing contents of FontSize xxsmall', t => {
	const sizing = new Sizing(Sizing.xxsmall);

	t.truthy(sizing);

	t.is(sizing.type, 'xxsmall');
	t.is(sizing.size.fontSize, '0.375em');
	t.is(sizing.size.sizepx, '6px');
	t.is(sizing.size.size, 6);
	t.is(sizing.borderStyle, 'xxsmallBorder');
	t.is(sizing.boxStyle, 'xxsmallBox');
	t.is(sizing.fontStyle, 'xxsmall');
	t.is(sizing.next.type, Sizing.xsmall);
	t.is(sizing.prev.type, Sizing.xxsmall);
});

test('Testing contents of FontSize xsmall', t => {
	const sizing = new Sizing(Sizing.xsmall);

	t.truthy(sizing);

	t.is(sizing.type, 'xsmall');
	t.is(sizing.size.fontSize, '0.5em');
	t.is(sizing.size.sizepx, '8px');
	t.is(sizing.size.size, 8);
	t.is(sizing.borderStyle, 'xsmallBorder');
	t.is(sizing.boxStyle, 'xsmallBox');
	t.is(sizing.fontStyle, 'xsmall');
	t.is(sizing.next.type, Sizing.small);
	t.is(sizing.prev.type, Sizing.xxsmall);
});

test('Testing contents of FontSize small', t => {
	const sizing = new Sizing(Sizing.small);

	t.truthy(sizing);

	t.is(sizing.type, 'small');
	t.is(sizing.size.fontSize, '0.75em');
	t.is(sizing.size.sizepx, '12px');
	t.is(sizing.size.size, 12);
	t.is(sizing.borderStyle, 'smallBorder');
	t.is(sizing.boxStyle, 'smallBox');
	t.is(sizing.fontStyle, 'small');
	t.is(sizing.next.type, Sizing.normal);
	t.is(sizing.prev.type, Sizing.xsmall);
});

test('Testing contents of FontSize normal', t => {
	const sizing = new Sizing(Sizing.normal);

	t.truthy(sizing);

	t.is(sizing.type, 'normal');
	t.is(sizing.size.fontSize, '1em');
	t.is(sizing.size.sizepx, '16px');
	t.is(sizing.size.size, 16);
	t.is(sizing.borderStyle, 'normalBorder');
	t.is(sizing.boxStyle, 'normalBox');
	t.is(sizing.fontStyle, 'normal');
	t.is(sizing.next.type, Sizing.large);
	t.is(sizing.prev.type, Sizing.small);
});

test('Testing contents of FontSize large', t => {
	const sizing = new Sizing(Sizing.large);

	t.truthy(sizing);

	t.is(sizing.type, 'large');
	t.is(sizing.size.fontSize, '1.5em');
	t.is(sizing.size.sizepx, '24px');
	t.is(sizing.size.size, 24);
	t.is(sizing.borderStyle, 'largeBorder');
	t.is(sizing.boxStyle, 'largeBox');
	t.is(sizing.fontStyle, 'large');
	t.is(sizing.next.type, Sizing.xlarge);
	t.is(sizing.prev.type, Sizing.normal);
});

test('Testing contents of FontSize xlarge', t => {
	const sizing = new Sizing(Sizing.xlarge);

	t.truthy(sizing);

	t.is(sizing.type, 'xlarge');
	t.is(sizing.size.fontSize, '2em');
	t.is(sizing.size.sizepx, '32px');
	t.is(sizing.size.size, 32);
	t.is(sizing.borderStyle, 'xlargeBorder');
	t.is(sizing.boxStyle, 'xlargeBox');
	t.is(sizing.fontStyle, 'xlarge');
	t.is(sizing.next.type, Sizing.xxlarge);
	t.is(sizing.prev.type, Sizing.large);
});

test('Testing contents of FontSize xxlarge', t => {
	const sizing = new Sizing(Sizing.xxlarge);

	t.truthy(sizing);

	t.is(sizing.type, 'xxlarge');
	t.is(sizing.size.fontSize, '3em');
	t.is(sizing.size.sizepx, '48px');
	t.is(sizing.size.size, 48);
	t.is(sizing.borderStyle, 'xxlargeBorder');
	t.is(sizing.boxStyle, 'xxlargeBox');
	t.is(sizing.fontStyle, 'xxlarge');
	t.is(sizing.next.type, Sizing.xxlarge);
	t.is(sizing.prev.type, Sizing.xlarge);
});
