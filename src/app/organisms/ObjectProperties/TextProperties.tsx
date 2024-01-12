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
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextStyles)}>
        Text styles
      </Button>
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
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextSpacing)}>
        Spacing
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextEffect)}>
        Effects
      </Button>
      <Button>Animate</Button>
      <Button>Transparency</Button>
      <Button>Layers</Button>
      <Button
        onClick={() => setSelectedProperty(SelectedProperty.TextPosition)}
      >
        Position
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextNudge)}>
        Nudge
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextMore)}>
        More
      </Button>
    </div>
  );
};
