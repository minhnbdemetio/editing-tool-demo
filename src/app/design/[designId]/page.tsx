import { Editor } from '@/app/organisms/Editor';
import { Menu } from '@/app/organisms/Menu';

export default function DesignDetail() {
  return (
    <div className="h-full flex">
      <Menu />
      <div className="flex-auto overflow-auto">
        <Editor />
      </div>
    </div>
  );
}
