import React, { CSSProperties, useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from '../icons';
import { TextFontStyle } from '../lib/moveable/text/MoveableText';

export type FontStyle = {
  value: string;
  style: Partial<CSSProperties>;
};
interface ListFontsProps {
  fontFamily: string | undefined;
  fontStyle: TextFontStyle | undefined;
  fontWeight: string | undefined;
  onChange: (
    fontFamily: string,
    fontStyle: TextFontStyle,
    fontWeight: string,
  ) => void;
}

// Todo: data Test, call api get DB
const fonts: FontFamily[] = [
  {
    label: 'Arial',
    value: 'Arial',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Verdana',
    value: 'Verdana',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Helvetica',
    value: 'Helvetica',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Trebuchet MS',
    value: 'Trebuchet MS',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Times New Roman',
    value: 'Times New Roman',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Georgia',
    value: 'Georgia',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Garamond',
    value: 'Garamond',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Courier New',
    value: 'Courier New',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Brush Script MT',
    value: 'Brush Script MT',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Comic Sans MS',
    value: 'Comic Sans MS',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
  {
    label: 'Impact',
    value: 'Impact',
    styles: [
      { value: 'Regular', style: { fontWeight: '400', fontStyle: 'normal' } },
      { value: 'Italic', style: { fontWeight: '400', fontStyle: 'italic' } },
      { value: 'SemiBold', style: { fontWeight: '600', fontStyle: 'normal' } },
      { value: 'Bold', style: { fontWeight: '700', fontStyle: 'normal' } },
    ],
  },
];

type FontFamily = {
  label: string;
  value: string;
  styles: FontStyle[];
};

const getFontSizeString = (fontWeight?: string, fontSize?: string) => {
  return `${fontWeight}:${fontSize}`;
};

export const ListFonts: React.FC<ListFontsProps> = ({
  fontFamily,
  fontStyle,
  fontWeight,
  onChange,
}) => {
  const [activeFont, setActiveFont] = useState<string>(fontFamily || '');
  const [activeFontWeight, setActiveFontWeight] = useState<string>(
    fontWeight || '',
  );
  const [activeFontStyle, setActiveFontStyle] = useState<string>(
    fontStyle || '',
  );
  const [showFontStyle, setShowFontStyle] = useState<FontFamily | null>(null);

  const onChangeFontStyle = (fontFamily: string, fontStyle: FontStyle) => {
    setActiveFontStyle(fontStyle.style.fontStyle || '');
    setActiveFontWeight(fontStyle.style.fontWeight?.toString() || '');
    setActiveFont(fontFamily);

    onChange(
      fontFamily,
      (fontStyle.style.fontStyle || 'normal') as any,
      fontStyle.style.fontWeight || ('400' as any),
    );
  };

  return (
    <>
      {showFontStyle ? (
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between mb-2">
            <div
              className="w-6 h-6 py-2 cursor-pointer"
              onClick={() => setShowFontStyle(null)}
            >
              <ChevronLeft />
            </div>
            <b className="text-center">{showFontStyle.label}</b>
            <div className="w-6 h-6"></div>
          </div>
          <ul className="overflow-y-auto flex-grow">
            {showFontStyle.styles.map((fontStyle, index) => (
              <li
                key={index}
                className="py-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
              >
                <div
                  className="flex grow"
                  onClick={() =>
                    onChangeFontStyle(showFontStyle.value, fontStyle)
                  }
                >
                  <div className="w-6 h-6 mr-3">
                    {getFontSizeString(activeFontWeight, activeFontStyle) ===
                      getFontSizeString(
                        fontStyle.style.fontWeight as any,
                        fontStyle.style.fontStyle,
                      ) && <Check />}
                  </div>
                  <span
                    style={{
                      ...fontStyle.style,
                      fontFamily: showFontStyle.value,
                    }}
                  >
                    {fontStyle.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="text-center mb-2">
            <b>Phông chữ</b>
          </div>
          <ul className="overflow-y-auto flex-grow">
            {fonts.map((font, index) => (
              <li
                key={index}
                className="py-2 cursor-pointer flex justify-between items-center hover:bg-[#e4e4e4]"
              >
                <div
                  className="flex grow"
                  onClick={() =>
                    onChangeFontStyle(
                      font.value,
                      font.styles[0] || { value: '', style: {} },
                    )
                  }
                >
                  <div className="w-6 h-6 mr-3">
                    {activeFont.replace(/"/g, '') === font.value && <Check />}
                  </div>
                  <span style={{ fontFamily: font.value }}>
                    {font.label}
                    <span className="text-[#909295]"> AaBbCc</span>
                  </span>
                </div>
                <div
                  onClick={() => {
                    setShowFontStyle(font);
                  }}
                >
                  {<ChevronRight className="mx-3" />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
