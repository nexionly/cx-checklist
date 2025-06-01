
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Debug logging for GitHub Pages
console.log('Main.tsx loaded - Environment:', import.meta.env.MODE);
console.log('Main.tsx loaded - Base URL:', import.meta.env.BASE_URL);
console.log('Main.tsx loaded - Production:', import.meta.env.PROD);

// Handle GitHub Pages SPA routing
if (window.location.search.includes('/?/')) {
  const url = window.location.search.slice(1) + window.location.hash;
  window.history.replaceState(null, '', url.substring(2).replace(/~and~/g, '&'));
}

// Function to create fallback UI
function createFallbackUI(error: string) {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f9fafb; font-family: system-ui, -apple-system, sans-serif;">
      <div style="max-width: 24rem; margin: 0 auto; text-align: center; padding: 1.5rem;">
        <div style="margin-bottom: 1rem;">
          <svg style="margin: 0 auto; height: 3rem; width: 3rem; color: #ef4444;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Loading Error</h1>
        <p style="color: #6b7280; margin-bottom: 1rem;">
          Failed to load the Customer Experience Checklist application.
        </p>
        <button onclick="window.location.reload()" style="display: inline-flex; align-items: center; padding: 0.5rem 1rem; border: none; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; background-color: #2563eb; cursor: pointer;">
          Reload Page
        </button>
        <details style="margin-top: 1rem; text-align: left;">
          <summary style="cursor: pointer; font-size: 0.875rem; color: #6b7280;">Technical Details</summary>
          <pre style="margin-top: 0.5rem; font-size: 0.75rem; background-color: #f3f4f6; padding: 0.5rem; border-radius: 0.25rem; overflow: auto;">${error}</pre>
        </details>
      </div>
    </div>
  `;
}

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  
  console.log('Rendering App component with Error Boundary...');
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  console.log('React app render initiated successfully');
} catch (error) {
  console.error('Failed to mount React app:', error);
  
  // Fallback error display
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = createFallbackUI(error instanceof Error ? error.message : 'Unknown error');
  }
}

// Add additional error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Add error handling for general errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
