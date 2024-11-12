import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', height: '100vh' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/">Home</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/dashboard/">Dashboard</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/dashboard/posts">Posts</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/dashboard/categories">Categories</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/dashboard/users">Users</Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
