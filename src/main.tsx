
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Enhanced debug logging
console.log('Main.tsx loading - Environment details:');
console.log('- Mode:', import.meta.env.MODE);
console.log('- Base URL:', import.meta.env.BASE_URL);
console.log('- Production:', import.meta.env.PROD);
console.log('- Current location:', window.location.href);

// GitHub Pages SPA routing fix
if (window.location.search.includes('/?/')) {
  const url = window.location.search.slice(1) + window.location.hash;
  window.history.replaceState(null, '', url.substring(2).replace(/~and~/g, '&'));
}

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
          The Customer Experience Checklist failed to initialize. This might be due to a build or deployment issue.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
          <button onclick="window.location.reload()" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border: none; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: white; background-color: #2563eb; cursor: pointer;">
            Reload Page
          </button>
          <button onclick="window.location.href = window.location.origin + '/customer-experience-essentials-checklist/'" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border: 1px solid #d1d5db; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; color: #374151; background-color: white; cursor: pointer;">
            Reset to Home
          </button>
        </div>
        <details style="text-align: left;">
          <summary style="cursor: pointer; font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">Technical Details</summary>
          <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.375rem; font-size: 0.75rem; color: #374151; overflow: auto;">
            <div><strong>Error:</strong> ${error}</div>
            <div><strong>URL:</strong> ${window.location.href}</div>
            <div><strong>Base:</strong> ${document.baseURI}</div>
            <div><strong>User Agent:</strong> ${navigator.userAgent.substring(0, 100)}...</div>
            <div style="margin-top: 0.5rem;"><em>Check the browser console (F12) for additional error details.</em></div>
          </div>
        </details>
      </div>
    </div>
  `;
}

// Performance tracking
if (window.performance?.mark) {
  window.performance.mark('app-init-start');
}

try {
  console.log('Attempting to find root element...');
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error('Root element with id "root" not found in DOM');
  }
  
  console.log('Root element found, creating React root...');
  const root = createRoot(rootElement);
  
  console.log('Rendering App component with Error Boundary...');
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  console.log('✓ React app render initiated successfully');
  
  // Verify mounting
  setTimeout(() => {
    const appContent = rootElement.children.length;
    console.log(`App mounting check: ${appContent > 0 ? 'SUCCESS' : 'FAILED'} (${appContent} child elements)`);
    
    if (window.performance?.mark) {
      window.performance.mark('app-init-complete');
      window.performance.measure('app-init-duration', 'app-init-start', 'app-init-complete');
    }
  }, 100);
  
} catch (error) {
  console.error('❌ Critical error during React app initialization:', error);
  
  // Fallback error display
  const rootElement = document.getElementById("root");
  if (rootElement) {
    console.log('Displaying fallback error UI...');
    rootElement.innerHTML = createFallbackUI(error instanceof Error ? error.message : String(error));
  } else {
    console.error('Cannot display fallback - root element not found');
  }
}

// Enhanced global error handling
window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('❌ Global error captured:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// Network connectivity check
if (navigator.onLine === false) {
  console.warn('⚠️ Application is offline - this may affect functionality');
}
