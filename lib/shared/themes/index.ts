export enum Theme {
	base,
	custom,
	dark,
	light
}

const themes: any = {
	[Theme.base]: require('./base.json'),
	[Theme.dark]: require('./dark.json'),
	[Theme.light]: require('./light.json'),
	[Theme.custom]: {}
};

let currentTheme: Theme = Theme.base;

export function getTheme(theme: Theme = currentTheme) {
	if (theme in Theme) {
		return themes[theme];
	} else {
		return {};
	}
}

export function setTheme(custom: any, theme: Theme = Theme.custom) {
	themes[theme] = custom;

	if (theme in Theme) {
		currentTheme = theme;
	} else {
		currentTheme = Theme.base;
	}

	return getTheme();
}
