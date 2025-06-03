
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Enhanced fallback UI
function createFallbackUI(error: string) {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f9fafb; font-family: system-ui, -apple-system, sans-serif;">
      <div style="max-width: 28rem; margin: 0 auto; text-align: center; padding: 2rem;">
        <div style="margin-bottom: 1.5rem;">
          <svg style="margin: 0 auto; height: 4rem; width: 4rem; color: #ef4444;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Application Error</h1>
        <p style="color: #6b7280; margin-bottom: 1.5rem; line-height: 1.5;">
          The Customer Experience Checklist failed to initialize.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
          <button onclick="window.location.reload()" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border: none; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; background-color: #2563eb; cursor: pointer;">
            Reload Page
          </button>
        </div>
      </div>
    </div>
  `;
}

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error('Root element with id "root" not found in DOM');
  }
  
  const root = createRoot(rootElement);
  
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
} catch (error) {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = createFallbackUI(error instanceof Error ? error.message : String(error));
  }
}
