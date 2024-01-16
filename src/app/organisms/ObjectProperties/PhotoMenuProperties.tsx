import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';
import { Button } from '@nextui-org/react';
import { FC } from 'react';

export const PhotoMenuProperties: FC = () => {
  const { setSelectedProperty } = useSelectedProperty();

  return (
    <div className="flex gap-1 items-center overflow-x-scroll">
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoNudge)}>
        Nudge
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoFilter)}>
        Filter
      </Button>
      <Button
        onClick={() => setSelectedProperty(SelectedProperty.PhotoManualFilter)}
      >
        ManualFilter
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoEffect)}>
        Effect
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoCrop)}>
        Crop
      </Button>
      <Button
        onClick={() => setSelectedProperty(SelectedProperty.PhotoOpacity)}
      >
        Opacity
      </Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoAlign)}>
        Align
      </Button>
      <Button>Order</Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoOrder)}>
        Flip
      </Button>
      <Button>Set as background</Button>
      <Button onClick={() => setSelectedProperty(SelectedProperty.PhotoMore)}>
        More
      </Button>
    </div>
  );
};
