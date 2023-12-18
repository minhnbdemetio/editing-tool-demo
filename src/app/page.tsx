'use client';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Image from 'next/image';
import { ColorResult, SketchPicker } from 'react-color';

export default function Home() {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [object, setObject] = useState<string>('text');
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const BUTTON_HEIGHT = 30;
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });

  const [fontSize, setFontSize] = useState(20);
  const [textColor, setTextColor] = useState('black');

  const [hasActiveObject, setHasActiveObject] = useState(false);

  const handleSelect = (object: string) => {
    setObject(object);
  };

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    canvas.on('selection:created', obj => {
      setButtonVisible(true);
      setHasActiveObject(true);

      const selected = obj.selected ? obj.selected[0] : null;
      if (selected?.fill) {
        setTextColor(selected?.fill.toString());
      } // @ts-ignore
      if (selected?.get('fontSize')) {
        // @ts-ignore
        setFontSize(selected.get('fontSize'));
      }
      if (selected?.type === 'i-text') {
        setObject('text');
      } else {
        setObject('photos');
      }

      const left = selected?.getBoundingRect().left;
      const top = selected?.getBoundingRect().top;

      if (left && top) {
        setButtonPosition({ left, top: top - BUTTON_HEIGHT });
      }
    });

    canvas.on('selection:updated', obj => {
      setButtonVisible(true);
      setHasActiveObject(true);

      const selected = obj.selected ? obj.selected[0] : null;
      if (selected?.fill) {
        setTextColor(selected?.fill.toString());
      }
      // @ts-ignore
      if (selected?.get('fontSize')) {
        // @ts-ignore
        setFontSize(selected.get('fontSize'));
      }
      if (selected?.type === 'i-text') {
        setObject('text');
      } else {
        setObject('photos');
      }
      const left = selected?.getBoundingRect().left;
      const top = selected?.getBoundingRect().top;

      if (left && top) {
        setButtonPosition({ left, top: top - BUTTON_HEIGHT });
      }
    });

    canvas.on('object:moving', obj => {
      setButtonVisible(true);
      const left = obj.target?.getBoundingRect().left;
      const top = obj.target?.getBoundingRect().top;
      if (left && top) {
        setButtonPosition({ left, top: top - BUTTON_HEIGHT });
      }
    });

    canvas.on('selection:cleared', () => {
      setButtonVisible(false);
      setHasActiveObject(false);
    });
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
      selectable: true,
    });
    canvas?.add(text);
  };

  const handleAddPhoto = () => {
    fabric.Image.fromURL('/dog.jpg', image => canvas?.add(image), {
      hasControls: true,
      hasRotatingPoint: true,
      selectable: true,
    });
  };

  const handleDeleteActiveObject = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      canvas?.remove(activeObject);
    }
  };

  const handleChangeFontSize = (event: any) => {
    setFontSize(+event.target.value);
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      // @ts-ignore
      activeObject.set('fontSize', +event.target.value);
    }
    canvas?.renderAll();
  };

  const handleChangeTextColor = (color: ColorResult) => {
    setTextColor(color.hex);
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.set({ fill: color.hex });
    }
    canvas?.renderAll();
  };

  return (
    <main className="min-h-screen ">
      <button onClick={() => console.log(canvas?.toJSON())}>export</button>
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
          <div className="mt-3 w-[200px]">
            {object === 'text' && (
              <div>
                {hasActiveObject && (
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label>Font size</label>
                      <input
                        type="number"
                        value={fontSize}
                        onChange={handleChangeFontSize}
                        className="border-2 border-gray-500"
                      />
                    </div>
                    <label>Text color</label>
                    <SketchPicker
                      color={textColor}
                      onChange={handleChangeTextColor}
                    />
                  </div>
                )}
                <button onClick={handleAddText} className="bg-gray-200 p-3">
                  +Add text title
                </button>
              </div>
            )}
            {object === 'photos' && (
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.item(0);

                    if (file) {
                      // Read the uploaded image file
                      const reader = new FileReader();
                      reader.onload = event => {
                        const imageUrl = event.target?.result?.toString();

                        if (imageUrl) {
                          // Create a Fabric image object
                          fabric.Image.fromURL(imageUrl, img => {
                            // Add the image to the canvas
                            canvas?.add(img);
                          });
                        }
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <p>Or use existing image:</p>
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
        <div className="relative marker:p-3">
          <canvas
            className="border-2 border-gray-200"
            width="600"
            height="600"
            ref={canvasEl}
          />
          {buttonVisible && (
            <div
              className="absolute flex gap-1 text-red-400"
              style={{
                left: buttonPosition.left,
                top: buttonPosition.top,
              }}
            >
              <button onClick={handleDeleteActiveObject}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
