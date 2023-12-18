import { Editor } from '@/app/organisms/Editor';
import { Menu } from '@/app/organisms/Menu';

export default function DesignDetail() {
  return (
    <div className="h-full">
      <Menu />
      <Editor />
    </div>
  );
}
