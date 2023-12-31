'use client';

import { Header } from '@/app/organisms/Header';
import clsx from 'clsx';

export default function DesignDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className={clsx('z-10', 'desktop:z-50')}>
        <Header />
      </div>
      <div className="h-full min-h-0">{children}</div>
    </div>
  );
}
