import { atom } from 'recoil';

export const searchTermState = atom({
	key: 'searchTermState', // unique ID (with respect to other atoms/selectors)
	default: '', // default value (aka initial value)
});

export const serchTermForResultPageState = atom({
	key: 'serchTermForResultPageState',
	default: '',
});
