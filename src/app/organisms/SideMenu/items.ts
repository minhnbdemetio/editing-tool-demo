import {
  AdjustmentsHorizontal,
  ArchiveBox,
  Background,
  Barcode,
  CloudArrowUp,
  Heart,
  MusicalNote,
  Palette,
  Photo,
  PlayCircle,
  Text,
  UserPlus,
  ViewColumns,
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
    key: 'templates',
    icon: ViewColumns,
    label: 'Templates',
  },
  {
    key: 'workspaces',
    icon: ArchiveBox,
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
    key: 'backgrounds',
    icon: Background,
    label: 'Backgrounds',
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
