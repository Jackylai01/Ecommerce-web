import Link from 'next/link';
import { CSSProperties } from 'react';

const linkStyle: CSSProperties = {
  textDecoration: 'none',
};

export const StudioNavbar = () => {
  return (
    <div>
      <div
        style={{
          padding: '0.6rem 2rem',
          display: 'flex',
          gap: '2rem',
        }}
      >
        <Link href='/' style={linkStyle}>
          Back Home
        </Link>
        <Link href='/products' style={linkStyle}>
          View Products
        </Link>
      </div>
    </div>
  );
};
