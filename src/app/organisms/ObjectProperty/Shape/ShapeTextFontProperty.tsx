import { FC } from 'react';
import { useActiveMoveableShapeObject } from '@/app/hooks/useActiveMoveableObject';
import { ListFonts } from '@/app/atoms/ListFonts';
import { TextFontStyle } from '@/app/lib/moveable/text/TextFormat';

export const ShapeTextFontProperty: FC = () => {
  const shapeObject = useActiveMoveableShapeObject();

  return (
    <ListFonts
      fontWeight={shapeObject?.shapeText.getFontFamily()}
      fontFamily={shapeObject?.shapeText.getFontFamily()}
      fontStyle={shapeObject?.shapeText.getFontStyle()}
      onChange={(fontFamily: string, fontStyle: TextFontStyle) => {
        shapeObject?.shapeText.setFontFamily(fontFamily);
        shapeObject?.shapeText.setFontStyle(fontStyle);
        shapeObject?.shapeText.render();
      }}
    />
  );
};
