import React, { FC, useRef } from 'react';
import { Button, Image } from '@nextui-org/react';
import { Next, Prev } from '@/app/icons';
import { SliderItem } from './sliderShow';

const delay = 2500;

export interface SlideshowProps {
  items?: SliderItem[];
  title: string;
}

const Slideshow: FC<SlideshowProps> = ({ items = [], title }) => {
  const [indexTransform, setIndexTransform] = React.useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    if (timeoutRef.current)
      timeoutRef.current = setTimeout(
        () =>
          setIndexTransform(prevIndex =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1,
          ),
        delay,
      );

    return () => {
      resetTimeout();
    };
  }, [indexTransform, items]);

  const itemEls = useRef(new Array());

  const isNext = () => {
    return (
      itemEls.current[items.length - 1]?.offsetLeft -
        itemEls.current[indexTransform - 1]?.offsetLeft <
      360
    );
  };

  return (
    <div className="max-w-full">
      <div className="flex justify-between align-center my-1 items-center	">
        <span className="text-[#70798f] text-md cursor-default">{title}</span>
        <div>
          <Button variant="light" color="primary">
            Show all
          </Button>
        </div>
      </div>
      <div className="mx-auto my-0 overflow-hidden max-w-full relative">
        <div
          className={`absolute left-0 top-[calc(50%-20px)] z-10 ${
            indexTransform === 0 && 'hidden'
          }`}
        >
          <Button
            size="sm"
            isIconOnly
            color="primary"
            variant="faded"
            onClick={() => setIndexTransform(indexTransform - 1)}
          >
            <Prev className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
          </Button>
        </div>
        <div
          className={`absolute right-0 top-[calc(50%-20px)] z-10 ${
            isNext() && 'hidden'
          }`}
        >
          <Button
            size="sm"
            isIconOnly
            color="primary"
            variant="faded"
            onClick={() => setIndexTransform(indexTransform + 1)}
          >
            <Next className="text-2xl text-default-400 pointer-events-none flex-shrink-0 w-4 h-4" />
          </Button>
        </div>
        <div>
          <div
            className="transition ease duration-1000 whitespace-nowrap z-0 relative"
            style={{
              transform: `translate3d(${-itemEls.current[indexTransform]
                ?.offsetLeft}px, 0, 0)`,
            }}
          >
            {items.map((item, index) => (
              <div
                ref={element => {
                  return itemEls.current[index]
                    ? itemEls.current[index]
                    : itemEls.current.push(element);
                }}
                className="inline-block h-28 w-fit rounded-lg mx-1 cursor-pointer"
                key={index}
              >
                <Image
                  className="object-contain h-28"
                  isZoomed
                  alt={item.key}
                  src={item.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
