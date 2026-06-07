import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @vitejs/plugin-react uses the automatic JSX runtime, so files do not need
// React imported to use JSX. The app's bare `React.useState` / `React.Fragment`
// references resolve via the `const React = window.React` in screens.jsx and the
// `const React = window.React` inside designSystem.jsx (see setupGlobals.js).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
});
