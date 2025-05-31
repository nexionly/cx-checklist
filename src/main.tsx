
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug logging for GitHub Pages
console.log('Main.tsx loaded - Environment:', import.meta.env.MODE);
console.log('Main.tsx loaded - Base URL:', import.meta.env.BASE_URL);

// Handle GitHub Pages SPA routing
if (window.location.search.includes('/?/')) {
  const url = window.location.search.slice(1) + window.location.hash;
  window.history.replaceState(null, '', url.substring(2).replace(/~and~/g, '&'));
}

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  
  console.log('Rendering App component...');
  root.render(<App />);
  
  console.log('React app render initiated successfully');
} catch (error) {
  console.error('Failed to mount React app:', error);
  
  // Fallback error display
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1>Application Error</h1>
        <p>Failed to load the application. Please check the console for details.</p>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
}
