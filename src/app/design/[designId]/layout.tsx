'use client';

import { Header } from '@/app/organisms/Header';
import { useCommandHistory } from '@/app/store/editor-command-history';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function DesignDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { commandHistory, undoneCommandHistory } = useCommandHistory();
  useEffect(() => {
    console.log({ commandHistory, undoneCommandHistory });
  }, [commandHistory, undoneCommandHistory]);
  
  return (
    <div className="flex flex-col h-screen">
      <div className={clsx('z-10', 'desktop:z-50')}>
        <Header />
      </div>
      <div className="h-full min-h-0">{children}</div>
    </div>
  );
}
