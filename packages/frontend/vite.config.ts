import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import EnvironmentPlugin from 'vite-plugin-environment';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), ViteAliases(), EnvironmentPlugin('all')],
});
