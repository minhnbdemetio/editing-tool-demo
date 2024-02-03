import { ListFonts } from '@/app/atoms/ListFonts';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { TextFontStyle } from '@/app/lib/moveable/text/TextFormat';

interface FontPropertyProps {}

export const FontProperty: React.FC<FontPropertyProps> = ({}) => {
  const textObject = useActiveTextObject();

  const onChangeFontStyle = (
    fontFamily: string,
    fontStyle: TextFontStyle,
    fontWeight: string,
  ) => {
    textObject?.setFontFamily(fontFamily);
    textObject?.setFontStyle(fontStyle);
    textObject?.setFontWeight(fontWeight);

    textObject?.render();
  };

  return (
    <>
      <ListFonts
        onChange={onChangeFontStyle}
        fontFamily={textObject?.getFontFamily()}
        fontStyle={textObject?.getFontStyle()}
        fontWeight={textObject?.getFontWeight()}
      />
    </>
  );
};
