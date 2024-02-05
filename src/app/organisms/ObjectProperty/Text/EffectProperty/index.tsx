import {
  useActiveTextObject,
  useUpdateActiveTextShapeEffect,
  useUpdateTextStyleEffect,
} from '@/app/hooks/useActiveMoveableObject';
import { Image } from '@nextui-org/react';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { ShadowEffect } from './ShadowEffect';
import { LiftEffect } from './LiftEffect';
import { HollowEffect } from './HollowEffect';
import { SpliceEffect } from './SpliceEffect';
import { OutlineEffect } from './OutlineEffect';
import { EchoEffect } from './EchoEffect';
import { GlitchEffect } from './GlitchEffect';
import { NeonEffect } from './NeonEffect';
import { BackGroundEffect } from './BackgroundEffect';
import { CurveEffect } from './CurveEffect';
import {
  StyleEffect,
  TextBackgroundEffect,
  TextEchoEffect,
  TextGlitchEffect,
  TextHollowEffect,
  TextLiftEffect,
  TextNeonEffect,
  TextOutlineEffect,
  TextShadowEffect,
  TextSpliceEffect,
  TextStyleEffect,
} from '@/app/lib/moveable/effects/text/StyleEffect';
import { TextEffect } from '@/app/lib/moveable/effects/text/TextEffect';
import {
  ShapeEffect,
  TextCurveEffect,
  TextShapeEffect,
} from '@/app/lib/moveable/effects/text/ShapeEffect';

const TEXT_EFFECTS_STYLES: {
  id: TextStyleEffect;
  createEffect: () => TextEffect;
  name: string;
  imgUrl: string;
  effectComponent?: FC;
}[] = [
  {
    id: TextStyleEffect.NONE,
    createEffect: () => new StyleEffect(),
    name: 'None',
    imgUrl: '/text-effects/styles/none.webp',
  },
  {
    id: TextStyleEffect.SHADOW,
    createEffect: () => new TextShadowEffect(),
    name: 'Shadow',
    imgUrl: '/text-effects/styles/shadow.webp',
    effectComponent: ShadowEffect,
  },
  {
    id: TextStyleEffect.LIFT,
    createEffect: () => new TextLiftEffect(),
    name: 'Lift',
    imgUrl: '/text-effects/styles/lift.webp',
    effectComponent: LiftEffect,
  },
  {
    id: TextStyleEffect.HOLLOW,
    createEffect: () => new TextHollowEffect(),
    name: 'Hollow',
    imgUrl: '/text-effects/styles/hollow.webp',
    effectComponent: HollowEffect,
  },
  {
    id: TextStyleEffect.SPLICE,
    createEffect: () => new TextSpliceEffect(),
    name: 'Splice',
    imgUrl: '/text-effects/styles/splice.webp',
    effectComponent: SpliceEffect,
  },
  {
    id: TextStyleEffect.OUTLINE,
    createEffect: () => new TextOutlineEffect(),
    name: 'Outline',
    imgUrl: '/text-effects/styles/outline.webp',
    effectComponent: OutlineEffect,
  },

  {
    id: TextStyleEffect.ECHO,
    createEffect: () => new TextEchoEffect(),
    name: 'Echo',
    imgUrl: '/text-effects/styles/echo.webp',
    effectComponent: EchoEffect,
  },
  {
    id: TextStyleEffect.GLITCH,
    createEffect: () => new TextGlitchEffect(),
    name: 'Glitch',
    imgUrl: '/text-effects/styles/glitch.webp',
    effectComponent: GlitchEffect,
  },
  {
    id: TextStyleEffect.NEON,
    createEffect: () => new TextNeonEffect(),
    name: 'Neon',
    imgUrl: '/text-effects/styles/neon.webp',
    effectComponent: NeonEffect,
  },
  {
    id: TextStyleEffect.BACKGROUND,
    createEffect: () => new TextBackgroundEffect(),
    name: 'Background',
    imgUrl: '/text-effects/styles/background.webp',
    effectComponent: BackGroundEffect,
  },
];

const TEXT_EFFECTS_SHAPES: {
  id: TextShapeEffect;
  createEffect: () => TextEffect;
  name: string;
  imgUrl: string;
  effectComponent?: FC;
}[] = [
  {
    id: TextShapeEffect.NONE,
    createEffect: () => new ShapeEffect(),
    name: 'None',
    imgUrl: '/text-effects/shapes/none.webp',
  },
  {
    id: TextShapeEffect.CURVE,
    createEffect: () => new TextCurveEffect(),
    name: 'Curve',
    imgUrl: '/text-effects/shapes/curve.webp',
    effectComponent: CurveEffect,
  },
];

interface SpacingPropertyProps {}

export const EffectProperty: FC<SpacingPropertyProps> = ({}) => {
  const activeText = useActiveTextObject();
  const [newEffectStyle, setNewEffectStyle] = useState(
    activeText?.styleEffect?.variant || TextStyleEffect.NONE,
  );

  const [effectShape, setEffectShape] = useState(
    activeText?.shapeEffect?.variant || TextShapeEffect.NONE,
  );

  const renderNewEffectComponent = () => {
    const EffectOptions = TEXT_EFFECTS_STYLES.find(
      style => style.id === newEffectStyle,
    )?.effectComponent;
    if (!EffectOptions) return <></>;
    return <EffectOptions />;
  };

  const renderShapeEffectComponent = () => {
    const EffectOptions = TEXT_EFFECTS_SHAPES.find(
      style => style.id === effectShape,
    )?.effectComponent;
    if (!EffectOptions) return <></>;
    return <EffectOptions />;
  };
  const updateNewTextStyleEffect = useUpdateTextStyleEffect();
  const updateActiveTextShapeEffect = useUpdateActiveTextShapeEffect();
  return (
    <div className="w-full h-full">
      <div className="text-center mb-3">
        <span>Effects</span>
      </div>
      <p className="mb-[12px]">Style</p>
      <div className="flex gap-2 items-center flex-wrap">
        {TEXT_EFFECTS_STYLES.map(style => (
          <div className="effect-styles" key={style.id}>
            <div
              className="group flex flex-col flex-1 gap-1 items-center w-[60px] cursor-pointer"
              onClick={e => {
                updateNewTextStyleEffect(style.createEffect(), () =>
                  setNewEffectStyle(style.id),
                );
              }}
            >
              <Image
                className={clsx('border', {
                  'border-gray-300': newEffectStyle !== style.id,
                  'border-blue-500': newEffectStyle === style.id,
                })}
                width={60}
                alt={style.name}
                src={style.imgUrl}
                radius="sm"
                style={{ maxWidth: '60px' }}
              />
              <p className="text-center font-light text-[10px]">
                <span>{style.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="effect-options font-light text-[14px]">
        {renderNewEffectComponent()}
      </div>
      <p className="mb-[12px]">Shape</p>
      <div className="flex gap-2 items-center flex-wrap">
        {TEXT_EFFECTS_SHAPES.map(style => (
          <div className="effect-styles" key={style.id}>
            <div
              className="group flex flex-col flex-1 gap-1 items-center w-[60px] cursor-pointer"
              onClick={() => {
                updateActiveTextShapeEffect(style.createEffect(), () =>
                  setEffectShape(style.id),
                );
              }}
            >
              <Image
                className={clsx('border static', {
                  'border-gray-300': effectShape !== style.id,
                  'border-blue-500': effectShape === style.id,
                })}
                width={60}
                alt={style.name}
                src={style.imgUrl}
                radius="sm"
                style={{ maxWidth: '60px' }}
              />
              <p className="text-center font-light text-[10px]">
                <span>{style.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="effect-options font-light text-[14px]">
        {renderShapeEffectComponent()}
      </div>
    </div>
  );
};
