import React from 'react'
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';

const poppins = Poppins({subsets: ['latin'], weight: "500"})

interface AppShellProps {
  children: React.ReactElement;
};

// const noNavbar: string[] = ['/404', '/register', '/login', '/claude-ai'];

const noLayout = '/open-ai';

const AppShell = ({ children }: AppShellProps) => {
  const { pathname } = useRouter();
  // const hideNavbar = noNavbar.includes(pathname) || pathname.startsWith('/dashboard');
  return (
    <div className={`w-full bg-orange-200 border-x-2 h-fit min-h-screen overflow-x-hidden ${pathname === noLayout ? '' : 'flex justify-center'} ${poppins.className}`}>
      <div className={`w-full max-w-sm relative overflow-x-hidden`}>
        {children}
      </div>
    </div>
  )
}

export default AppShell