import { Header } from '@/app/organisms/Header';
import { CurrentCanvasProvider } from '@/app/providers/CurrentCanvasProvider';

export default function DesignDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrentCanvasProvider>
      <Header />
      {children}
    </CurrentCanvasProvider>
  );
}
