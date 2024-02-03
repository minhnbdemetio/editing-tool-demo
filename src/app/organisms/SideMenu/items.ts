import {
  AdjustmentsHorizontal,
  BackgroundColor,
  Barcode,
  CloudArrowUp,
  Heart,
  MusicalNote,
  Palette,
  Photo,
  PlayCircle,
  Template,
  Text,
  UserPlus,
  Workspaces,
} from '@/app/icons';

export declare type SideMenuItem = {
  key:
    | 'templates'
    | 'workspaces'
    | 'photos'
    | 'upload'
    | 'elements'
    | 'text'
    | 'creator'
    | 'videos'
    | 'audio'
    | 'color-themes'
    | 'backgrounds'
    | 'my-list'
    | 'barcode';

  icon: React.FC<{ className?: string }>;
  label: string;
};

export const SideMenuItems: SideMenuItem[] = [
  {
    key: 'backgrounds',
    icon: BackgroundColor,
    label: 'Background',
  },
  {
    key: 'templates',
    icon: Template,
    label: 'Templates',
  },
  {
    key: 'workspaces',
    icon: Workspaces,
    label: 'Workspaces',
  },
  {
    key: 'photos',
    icon: Photo,
    label: 'Photos',
  },
  {
    key: 'upload',
    icon: CloudArrowUp,
    label: 'Upload',
  },
  {
    key: 'elements',
    icon: AdjustmentsHorizontal,
    label: 'Elements',
  },
  {
    key: 'text',
    icon: Text,
    label: 'Text',
  },
  {
    key: 'creator',
    icon: UserPlus,
    label: 'Creator',
  },
  {
    key: 'videos',
    icon: PlayCircle,
    label: 'Videos',
  },
  {
    key: 'audio',
    icon: MusicalNote,
    label: 'Audio',
  },
  {
    key: 'color-themes',
    icon: Palette,
    label: 'Color themes',
  },
  {
    key: 'my-list',
    icon: Heart,
    label: 'My list',
  },
  {
    key: 'barcode',
    icon: Barcode,
    label: 'QR/Barcode',
  },
];
