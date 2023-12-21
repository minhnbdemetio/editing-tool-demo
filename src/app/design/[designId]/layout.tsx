import { Header } from '@/app/organisms/Header';
import clsx from 'clsx';

export default function DesignDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className={clsx(' relative z-10', 'desktop:z-50')}>
        <Header />
      </div>
      <div className="flex-auto overflow-hidden">{children}</div>
    </div>
  );
}
