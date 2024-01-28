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
    <div className=" flex flex-col w-full h-[calc(100dvh)] min-h-0">
      <div className={clsx('z-10', 'desktop:z-50')}>
        <Header />
      </div>
      <div className={clsx('flex-1 overflow-y-auto w-full')}>{children}</div>
    </div>
  );
}
