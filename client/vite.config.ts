/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/project2',
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/test/setup.ts',
	},
});
