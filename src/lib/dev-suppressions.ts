// Suppress React DevTools message in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;

  // Override console.error to filter out React DevTools message
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      args[0].includes('Download the React DevTools')
    ) {
      return; // Suppress this specific message
    }
    originalError.apply(console, args);
  };

  // Override console.warn for hydration warnings from extensions
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      (args[0].includes('Extra attributes from the server') ||
        args[0].includes('cz-shortcut-listen'))
    ) {
      return; // Suppress extension-related warnings
    }
    originalWarn.apply(console, args);
  };
}

export {};
