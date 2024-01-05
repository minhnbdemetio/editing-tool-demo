import {
  SelectedProperty,
  useSelectedProperty,
} from '@/app/store/selected-property';
import { FC } from 'react';
import { FontProperty } from './Text/FontProperty';
import { FontSizeProperty } from './Text/FontSizeProperty';
import { ColorProperty } from './Text/ColorProperty';
import { FormatProperty } from './Text/FormatProperty';
import { TextMoreProperty } from './Text/More';

export const SelectedObjectProperty: FC = () => {
  const { selectedProperty } = useSelectedProperty();

  const renderObjectPropertyComponent = () => {
    switch (selectedProperty) {
      case SelectedProperty.TextFont: {
        return <FontProperty />;
      }
      case SelectedProperty.TextFontSize: {
        return <FontSizeProperty />;
      }
      case SelectedProperty.TextColor: {
        return <ColorProperty />;
      }
      case SelectedProperty.TextFormat: {
        return <FormatProperty />;
      }
      case SelectedProperty.TextMore: {
        return <TextMoreProperty />;
      }
      default: {
        return null;
      }
    }
  };

  return renderObjectPropertyComponent();
};
