'use client';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Image from 'next/image';

export default function Home() {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [object, setObject] = useState<string>('text');
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const handleSelect = (object: string) => {
    setObject(object);
  };

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    setCanvas(canvas);

    return () => {
      setCanvas(null);
      canvas.dispose();
    };
  }, []);

  const handleAddText = () => {
    const text = new fabric.IText('Some text', {
      left: 50, // Set the left position of the text
      top: 50, // Set the top position of the text
      fontSize: 20, // Set the font size of the text
      fontFamily: 'Arial', // Set the font family of the text
      fill: 'black', // Set the fill color of the text
      hasControls: true,
      hasRotatingPoint: true,
    });
    canvas?.add(text);
  };

  const handleAddPhoto = () => {
    fabric.Image.fromURL('/dog.jpg', image => canvas?.add(image), {
      hasControls: true,
      hasRotatingPoint: true,
    });
  };

  return (
    <main className="min-h-screen">
      <div className="flex gap-20 items-stretch">
        <div className="flex gap-3">
          <div className="flex flex-col justify-start ">
            <button
              onClick={() => handleSelect('text')}
              className={`w-[70px] h-[70px] ${
                object === 'text' ? 'bg-green-200' : ''
              }`}
            >
              Text
            </button>
            <button
              onClick={() => handleSelect('photos')}
              className={`w-[70px] h-[70px] ${
                object === 'photos' ? 'bg-green-200' : ''
              }`}
            >
              Photos
            </button>
          </div>
          <div className="mt-3">
            {object === 'text' && (
              <div>
                <button onClick={handleAddText} className="bg-gray-200 p-3">
                  +Add text title
                </button>
              </div>
            )}
            {object === 'photos' && (
              <div>
                <button onClick={handleAddPhoto}>
                  <Image
                    src={'/dog.jpg'}
                    width={300}
                    height={200}
                    alt="dog image"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className=" p-3">
          <canvas
            className="border-2 border-gray-200"
            width="600"
            height="600"
            ref={canvasEl}
          />
        </div>
      </div>
    </main>
  );
}
