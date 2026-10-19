import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement == null) {
    throw new Error("Root element not found");
}

const r = createRoot(rootElement);

// component for React
function App() {
    return <h1>Hello, OrbeLinks!</h1>;
}

r.render(<App />);