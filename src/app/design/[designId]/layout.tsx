import { Header } from '@/app/organisms/Header';
import { CurrentCanvasProvider } from '@/app/providers/CurrentContextProvider';

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
