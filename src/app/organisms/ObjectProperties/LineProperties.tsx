import { Button } from '@nextui-org/react';
import { FC } from 'react';
import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';

export const LineProperties: FC = () => {
  const { setSelectedProperty } = useSelectedProperty();

  return (
    <div className="flex gap-1 items-center overflow-x-scroll">
      <Button onClick={() => setSelectedProperty(SelectedProperty.LineColor)}>
        Line Color
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.LineStyle)}>
        Line style
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.LineStart)}>
        Line start
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.LineEnd)}>
        Line end
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.LineType)}>
        Line type
      </Button>

      <Button
        onClick={() => setSelectedProperty(SelectedProperty.LineTransparency)}
      >
        Transparency
      </Button>
      <Button>Layers</Button>
      <Button>Position</Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.LineNudge)}>
        Nudge
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.TextMore)}>
        More
      </Button>
    </div>
  );
};
