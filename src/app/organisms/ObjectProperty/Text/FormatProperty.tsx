import { TextFormat } from '@/app/atoms/TextFormat';
import { useActiveTextObject } from '@/app/hooks/useActiveMoveableObject';
import { FC } from 'react';

interface FormatPropertyProps {}

export const FormatProperty: FC<FormatPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  return <TextFormat activeText={activeText} />;
};
