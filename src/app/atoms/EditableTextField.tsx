import React, {
  HtmlHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Pencil } from '../icons';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';

interface EditableTextFieldProps extends HtmlHTMLAttributes<HTMLInputElement> {
  fallbackValue?: string;
}

// eslint-disable-next-line react/display-name
export const EditableTextField = forwardRef<
  HTMLInputElement | null,
  EditableTextFieldProps
>(({ defaultValue, fallbackValue, ...rest }: EditableTextFieldProps, ref) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(defaultValue || fallbackValue || '');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(
    ref,
    () => {
      return inputRef.current as HTMLInputElement;
    },
    [],
  );

  const isEmpty = value === fallbackValue;

  return (
    <div>
      <div
        onClick={() => {
          if (!edit) {
            setEdit(true);
            console.debug(inputRef.current);
            setTimeout(() => {
              inputRef.current?.focus();
              if (value === fallbackValue) {
                inputRef.current?.select();
              }
            }, 0);
          }
        }}
        className={twMerge('flex items-center gap-2 text-md ')}
      >
        <div
          className={clsx(
            'leading-xl max-w-[200px]',

            {
              'hover:border-b-[1px] hover:border-b-solid hover:border-b-gray-300 hover:border-dashed':
                !isEmpty,
              'border-b-[1px] border-b-solid border-b-gray-300 border-dashed':
                isEmpty || edit,
            },
          )}
        >
          <p
            className={twMerge(
              'text-black-500  w-full text-ellipsis overflow-hidden ',
              { hidden: edit },
            )}
          >
            {value}
          </p>
          <input
            className={twMerge('hidden outline-none w-[200px]', {
              block: edit,
            })}
            value={value}
            ref={inputRef}
            {...rest}
            onBlur={() => setEdit(false)}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <Pencil className="w-[18px] h-[18px] text-gray-500" />
      </div>
    </div>
  );
});
