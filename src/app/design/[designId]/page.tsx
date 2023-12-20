import { Editor } from '@/app/organisms/Editor';
import { Menu } from '@/app/organisms/Menu';
import { twMerge } from 'tailwind-merge';

export default function DesignDetail() {
  return (
    <div className="h-full flex">
      <Menu />
      <div className="flex-auto">
        <Editor />
      </div>
    </div>
  );
}
