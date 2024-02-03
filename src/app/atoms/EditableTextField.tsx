import React, {
  HtmlHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Edit } from '@/app/icons';
import clsx from 'clsx';
import { twMerge } from '../utilities/tailwind';
import { Save } from '../icons/Save';

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
    <div className="w-full">
      <div
        onClick={() => {
          if (!edit) {
            setEdit(true);
            setTimeout(() => {
              inputRef.current?.focus();
              if (value === fallbackValue) {
                inputRef.current?.select();
              }
            }, 0);
          }
        }}
        className={twMerge('flex items-center gap-4 text-md w-full')}
      >
        <div
          className={clsx(
            'text-md leading-[22px] min-h-6 flex-1',
            'border-b-[1px] hover:border-b-default9/20 border-dashed',
            {
              'border-b-transparent': !edit,
              'border-b border-b-default9/20': edit,
            },
          )}
        >
          <p
            className={twMerge(
              'text-md leading-[22px] text-ellipsis w-full overflow-hidden',
              {
                hidden: edit,
                'font-medium text-default6': isEmpty,
                'font-bold': !isEmpty,
              },
            )}
          >
            {value}
          </p>
          <input
            className={twMerge(
              'hidden outline-none w-[200px] placeholder:text-default6',
              'text-primaryGray font-bold text-md leading-[22px]',
              {
                block: edit,
              },
            )}
            value={value}
            ref={inputRef}
            {...rest}
            onBlur={() => setEdit(false)}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        {edit ? <Save /> : <Edit />}
      </div>
    </div>
  );
});
