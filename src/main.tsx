
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle GitHub Pages SPA routing
if (window.location.search.includes('/?/')) {
  const url = window.location.search.slice(1) + window.location.hash;
  window.history.replaceState(null, '', url.substring(2).replace(/~and~/g, '&'));
}

createRoot(document.getElementById("root")!).render(<App />);
