import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          .homepage-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background-color 0.2s;
            border: none;
          }
          .homepage-link:hover {
            background-color: #3730a3;
          }
        `}</style>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '500px',
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h1
              style={{
                fontSize: '4rem',
                margin: '0 0 1rem 0',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </h1>
            <h2
              style={{
                fontSize: '1.5rem',
                margin: '0 0 1rem 0',
                fontWeight: '600',
              }}
            >
              Page Not Found
            </h2>
            <p
              style={{
                color: '#a1a1aa',
                fontSize: '1rem',
                lineHeight: '1.5',
                margin: '0 0 2rem 0',
              }}
            >
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <Link href="/en" className="homepage-link">
            Go to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
