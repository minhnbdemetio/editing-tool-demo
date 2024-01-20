import { useActiveMoveablePhotoObject } from '@/app/hooks/useActiveMoveableObject';
import { Button, Slider } from '@nextui-org/react';
import { FC, useState } from 'react';
import { HuePicker, SliderPicker } from 'react-color';

export const ManuallyFilterProperty: FC = () => {
  const photo = useActiveMoveablePhotoObject();

  const [contrast, setContrast] = useState(photo?.contrast || 0);
  const [brightness, setBrightness] = useState(photo?.brightness || 0);
  const [saturation, setSaturation] = useState(photo?.saturation || 0);
  const [temperature, setTemperature] = useState(photo?.temperature || 0);
  const [vignette, setVignette] = useState(photo?.vignette || 0);
  const [blur, setBlur] = useState(photo?.blur || 0);
  const [hue, setHue] = useState<
    { r: number; g: number; b: number } | undefined
  >(photo?.hue || { r: 255, g: 255, b: 255 });

  return (
    <div className="">
      <Slider
        label="Contrast"
        step={1}
        maxValue={100}
        minValue={-100}
        value={contrast}
        onChange={value => {
          setContrast(value as number);
          photo?.changeContrast(value as number);
        }}
        classNames={{ base: 'w-full !max-w-none' }}
        className="max-w-md text-black"
      />
      <Slider
        label="Brightness"
        step={1}
        maxValue={100}
        minValue={-100}
        value={brightness}
        onChange={value => {
          setBrightness(value as number);
          photo?.changeBrightness(value as number);
        }}
        classNames={{ base: 'w-full !max-w-none' }}
        className="max-w-md text-black"
      />
      <Slider
        label="Saturation"
        step={1}
        maxValue={100}
        minValue={-100}
        value={saturation}
        onChange={value => {
          setSaturation(value as number);
          photo?.changeSaturation(value as number);
        }}
        classNames={{ base: 'w-full !max-w-none' }}
        className="max-w-md text-black"
      />
      <HuePicker
        color={hue}
        className="!w-full"
        onChange={color => {
          setHue(color.rgb);
          photo?.changeHue(color.rgb);
        }}
      />
      <Slider
        label="Temperature"
        step={1}
        maxValue={100}
        minValue={-100}
        value={temperature}
        onChange={value => {
          setTemperature(value as number);
          photo?.changeTemperature(value as number);
        }}
        classNames={{
          base: 'w-full !max-w-none ',
          track:
            'bg-gradient-to-r to-yellow-500 from-blue-500 w-full !border-none rounded-md',
          trackWrapper: ' overflow-hidden',
          filler: 'bg-transparent',
        }}
        className="max-w-md text-black"
      />
      <Slider
        label="Sharp/blur"
        step={1}
        maxValue={100}
        minValue={-100}
        value={blur}
        onChange={value => {
          setBlur(value as number);
          photo?.changeBlur(value as number);
        }}
        classNames={{ base: 'w-full !max-w-none' }}
        className="max-w-md text-black"
      />{' '}
      <Slider
        label="Vignette"
        step={1}
        maxValue={100}
        minValue={0}
        value={vignette}
        onChange={vignette => {
          setVignette(vignette as number);
          photo?.changeVignette(vignette as number);
        }}
        classNames={{ base: 'w-full !max-w-none' }}
        className="max-w-md text-black"
      />
    </div>
  );
};
