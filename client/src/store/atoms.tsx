import { atom } from 'recoil';

export const searchTermState = atom({
	key: 'searchTermState', // unique ID (with respect to other atoms/selectors)
	default: '', // default value (aka initial value)
});

export const serchTermForResultPageState = atom({
	key: 'serchTermForResultPageState',
	default: '',
});

export const categoryFilterState = atom({
	key: 'categoryFilterState',
	default: [
		{
			key: 0,
			name: 'Snacks & godteri',
			icon: 'fi fi-rr-popcorn',
			showStatus: false,
		},
		{
			key: 1,
			name: 'Personlige artikler',
			icon: 'fi fi-rr-soap',
			showStatus: false,
		},
		{ key: 2, name: 'Kjøtt', icon: 'fi fi-rr-meat', showStatus: false },
		{
			key: 3,
			name: 'Middag',
			icon: 'fi fi-rr-restaurant',
			showStatus: false,
		},
		{ key: 4, name: 'Ost', icon: 'fi fi-rr-cheese', showStatus: false },
		{ key: 5, name: 'Dessert', icon: 'fi fi-rs-pie', showStatus: false },
		{
			key: 6,
			name: 'Pålegg & frokost',
			icon: 'fi fi-rr-bread-slice',
			showStatus: false,
		},
		{
			key: 7,
			name: 'Middagstilbehør',
			icon: 'fi fi-rr-sauce',
			showStatus: false,
		},
		{
			key: 8,
			name: 'Drikke',
			icon: 'fi fi-rr-drink-alt',
			showStatus: false,
		},
	],
});

export const sortingFilterState = atom({
	key: 'sortingFilterState',
	default: [
		{
			key: 0,
			name: 'Stigende pris',
			icon: 'fi fi-rr-arrow-trend-up',
			showStatus: false,
		},
		{
			key: 1,
			name: 'Synkende pris',
			icon: 'fi fi-rr-arrow-trend-down',
			showStatus: false,
		},
	],
});

export const sliderFilterState = atom({
	key: 'sliderFilterState',
	default: [0, 200],
});

export const resetSearchBarState = atom({
	key: 'resetSearchBarState',
	default: false,
});

export const navigateHistory = atom({
	key: 'navigateHistory',
	default: '/project2/',
});

export const pageHistory = atom({
	key: 'pageHistory',
	default: 1,
})
