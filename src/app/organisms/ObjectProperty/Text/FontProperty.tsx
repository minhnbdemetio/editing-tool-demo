import { ListFonts } from '@/app/atoms/ListFonts';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { FontStyle } from '@/app/lib/moveable/text/MoveableText';

interface FontPropertyProps {}

export const FontProperty: React.FC<FontPropertyProps> = ({}) => {
  const textObject = useActiveTextObject();

  const onChangeFontStyle = (fontFamily: string, fontStyle: FontStyle) => {
    textObject?.setFontFamily(fontFamily);
    textObject?.setFontStyle(fontStyle);

    textObject?.render();
  };

  return (
    <>
      <ListFonts
        onChange={onChangeFontStyle}
        fontFamily={textObject?.getFontFamily()}
        fontStyle={textObject?.getFontStyle()}
      />
    </>
  );
};
