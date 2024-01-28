import { FC } from 'react';
import { useActiveMoveableShapeObject } from '@/app/hooks/useActiveMoveableObject';
import { ListFonts } from '@/app/atoms/ListFonts';
import { FontStyle } from '@/app/lib/moveable/text/MoveableText';

export const ShapeTextFontProperty: FC = () => {
  const shapeObject = useActiveMoveableShapeObject();

  return (
    <ListFonts
      fontFamily={shapeObject?.shapeText.getFontFamily()}
      fontStyle={shapeObject?.shapeText.getFontStyle()}
      onChange={(fontFamily: string, fontStyle: FontStyle) => {
        shapeObject?.shapeText.setFontFamily(fontFamily);
        shapeObject?.shapeText.setFontStyle(fontStyle);
        shapeObject?.shapeText.render();
      }}
    />
  );
};
