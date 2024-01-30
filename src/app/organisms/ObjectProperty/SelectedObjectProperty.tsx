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
import { PositionProperty } from './PositionProperty';

import { ColorProperty as LineColorProperty } from './Line/ColorProperty';
import { LineProperty } from './Line/StyleProperty';
import { LineStartProperty } from './Line/LineStartProperty';
import { LineEndProperty } from './Line/LineEndProperty';
import { LineTypeProperty } from './Line/LineTypeProperty';
import { LineTransparencyProperty } from './Line/LineTransparencyProperty';
import { LineNudgeProperty } from './Line/LineNudgeProperty';
import { TransparencyProperty } from './Text/TransparencyProperty';
import { LineAlignProperty } from './Line/LineAlignProperty';
import { LineShadowProperty } from './Line/LineShadowProperty';
import { LineFlipProperty } from './Line/LineFlipProperty';
import { LayerProperty } from './Common/LayerProperty';
import { PhotoAlignProperty } from './Photo/AlignProperty';
import { NudgeProperty } from './Common/NudgeProperty';
import { ManuallyFilterProperty } from './Photo/ManuallyFilterProperty';
import { OpacityProperty } from './Common/OpacityProperty';
import { FiltersProperty } from './Photo/FiltersProperty';
import { PhotoEffectProperty } from './Photo/PhotoEffectProperty';
import { PhotoFlipProperty } from './Photo/PhotoFlipProperty';
import { PhotoCropProperty } from './Photo/CropProperty';
import { PhotoMoreProperty } from './Photo/More';
import { ShapeFillColor } from './Shape/ShapeColorProperty';
import { ShapeOutline } from './Shape/ShapeBorderProperty';
import { ShapeAlignProperty } from './Shape/ShapeAlignProperty';
import { ShapePositionProperty } from './Shape/ShapePositionProperty';

import { ShapeTextFontProperty } from './Shape/ShapeTextFontProperty';
import { ShapeTextColorProperty } from './Shape/ShapeTextColorProperty';
import { ShapeFontSizeProperty } from './Shape/ShapeFontSizeProperty';
import { ShapeFormatProperty } from './Shape/ShapeFormatProperty';
import { ShapeMoreProperty } from './Shape/ShapeMoreProperty';

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
      case SelectedProperty.TextTransparency: {
        return <TransparencyProperty />;
      }
      case SelectedProperty.TextStyles: {
        return <StylesProperty />;
      }
      case SelectedProperty.TextNudge: {
        return <NudgeProperty />;
      }
      case SelectedProperty.Position: {
        return <PositionProperty />;
      }
      case SelectedProperty.LineColor: {
        return <LineColorProperty />;
      }
      case SelectedProperty.LineStyle: {
        return <LineProperty />;
      }
      case SelectedProperty.TextLayers: {
        return <LayerProperty />;
      }
      case SelectedProperty.LineStart: {
        return <LineStartProperty />;
      }
      case SelectedProperty.LineEnd: {
        return <LineEndProperty />;
      }
      case SelectedProperty.LineType: {
        return <LineTypeProperty />;
      }
      case SelectedProperty.LineTransparency: {
        return <LineTransparencyProperty />;
      }
      case SelectedProperty.LineNudge: {
        return <LineNudgeProperty />;
      }
      case SelectedProperty.LineAlign: {
        return <LineAlignProperty />;
      }
      case SelectedProperty.LineShadow: {
        return <LineShadowProperty />;
      }
      case SelectedProperty.LineFlip: {
        return <LineFlipProperty />;
      }
      case SelectedProperty.TextLayers: {
        return <LayerProperty />;
      }
      case SelectedProperty.PhotoAlign: {
        return <PhotoAlignProperty />;
      }
      case SelectedProperty.PhotoNudge: {
        return <NudgeProperty />;
      }
      case SelectedProperty.PhotoLayer: {
        return <LayerProperty />;
      }
      case SelectedProperty.PhotoManualFilter: {
        return <ManuallyFilterProperty />;
      }
      case SelectedProperty.PhotoOpacity: {
        return <OpacityProperty />;
      }
      case SelectedProperty.PhotoFilter: {
        return <FiltersProperty />;
      }
      case SelectedProperty.PhotoEffect: {
        return <PhotoEffectProperty />;
      }
      case SelectedProperty.PhotoFlip: {
        return <PhotoFlipProperty />;
      }

      case SelectedProperty.PhotoCrop: {
        return <PhotoCropProperty />;
      }
      case SelectedProperty.PhotoMore: {
        return <PhotoMoreProperty />;
      }
      case SelectedProperty.ShapeNudge: {
        return <NudgeProperty />;
      }
      case SelectedProperty.ShapePosition: {
        return <ShapePositionProperty />;
      }
      case SelectedProperty.ShapeColor: {
        return <ShapeFillColor />;
      }
      case SelectedProperty.ShapeOutline: {
        return <ShapeOutline />;
      }
      case SelectedProperty.ShapeAlign: {
        return <ShapeAlignProperty />;
      }
      case SelectedProperty.ShapeLayer: {
        return <LayerProperty />;
      }
      case SelectedProperty.ShapeOpacity: {
        return <OpacityProperty />;
      }
      case SelectedProperty.ShapeColor: {
        return <ShapeFillColor />;
      }
      case SelectedProperty.ShapeOutline: {
        return <ShapeOutline />;
      }
      case SelectedProperty.ShapeTextColor: {
        return <ShapeTextColorProperty />;
      }
      case SelectedProperty.ShapeTextFont: {
        return <ShapeTextFontProperty />;
      }
      case SelectedProperty.ShapeTextFontSize: {
        return <ShapeFontSizeProperty />;
      }
      case SelectedProperty.ShapeTextFormat: {
        return <ShapeFormatProperty />;
      }
      case SelectedProperty.ShapeMore: {
        return <ShapeMoreProperty  />;
      }
      default: {
        return null;
      }
    }
  };

  return renderObjectPropertyComponent();
};
