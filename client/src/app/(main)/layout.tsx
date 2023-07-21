'use client';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Nav/Navbar';
import SideNavSkeleton from '../components/Skeletons/SideNavSkeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
        <SideNavSkeleton />
      </header>
      <main className='main__main'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
