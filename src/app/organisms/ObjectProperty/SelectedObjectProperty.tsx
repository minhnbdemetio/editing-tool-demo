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
import { SpacingProperty } from './Text/SpacingProperty';
import { EffectProperty } from './Text/EffectProperty';
import { StylesProperty } from './Text/StylesProperty';
import { NudgeProperty } from './Text/NudgeProperty';

import { ColorProperty as LineColorProperty } from './Line/ColorProperty';
import { LineProperty } from './Line/StyleProperty';

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
      case SelectedProperty.TextSpacing: {
        return <SpacingProperty />;
      }
      case SelectedProperty.TextEffect: {
        return <EffectProperty />;
      }
      case SelectedProperty.TextStyles: {
        return <StylesProperty />;
      }
      case SelectedProperty.TextNudge: {
        return <NudgeProperty />;
      }
      case SelectedProperty.LineColor: {
        return <LineColorProperty />;
      }
      case SelectedProperty.LineStyle: {
        return <LineProperty />;
      }
      default: {
        return null;
      }
    }
  };

  return renderObjectPropertyComponent();
};
