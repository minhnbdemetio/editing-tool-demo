import { Button } from '@nextui-org/react';
import { FC } from 'react';
import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';

export const TextProperties: FC = () => {
  const { setSelectedProperty } = useSelectedProperty();

  return (
    <div className="flex gap-1 items-center overflow-x-scroll">
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextFont)}>
        Font
      </Button>
      <Button>Text styles</Button>
      <Button
        onClick={() => setSelectedProperty(SelectedProperty.TextFontSize)}
      >
        Font size
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextColor)}>
        Color
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextFormat)}>
        Format
      </Button>
      <Button>Spacing</Button>
      <Button>Effects</Button>
      <Button>Animate</Button>
      <Button>Transparency</Button>
      <Button>Layers</Button>
      <Button>Position</Button>
      <Button>Nudge</Button>
      <Button>More</Button>
    </div>
  );
};
