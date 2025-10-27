'use client';

import { usePathname } from 'next/navigation';
import TopBar from '@/components/TopBar/TopBar';

export default function ConditionalTopBar() {
  const pathname = usePathname();

  // Do not render TopBar on the homepage
  if (pathname === '/') {
    return null;
  }

  return <TopBar />;
}
