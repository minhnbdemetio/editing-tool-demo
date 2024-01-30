'use client';

import { Button } from '../atoms/Button';
import { Setting, EyeSlash } from '@/app/icons';
import * as IconComponents from '../icons';

export default function Demo() {
  type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'default'
    | 'success'
    | 'warning'
    | 'danger';
  const listButton: ButtonColor[] = [
    'primary',
    'secondary',
    'default',
    'danger',
    'success',
    'warning',
  ];
  return (
    <div>
      <h1>Button</h1>
      <div className="flex flex-col gap-1 p-2">
        {listButton?.map(button => {
          return (
            <div className="flex gap-1" key={button}>
              <Button
                color={button}
                className="w-40"
                startContent={<EyeSlash />}
              >
                {button.charAt(0).toUpperCase() + button.slice(1)}
              </Button>
              <Button color={button} className="w-40" isDisabled>
                Disable {button}
              </Button>
              <Button
                color={button}
                className="w-40"
                startContent={<Setting />}
              >
                {button}
              </Button>
            </div>
          );
        })}
      </div>
      <h1>Icon</h1>
      <div className="flex flex-wrap gap-1 p-2">
        {Object.entries(IconComponents).map(([name, IconComponent]) => (
          <div
            key={name}
            className="w-48 h-48 border border-solid border-primary1 rounded-lg"
          >
            <div className="flex items-center justify-center">{name}</div>
            <div className="flex items-center justify-center">
              <IconComponent className="w-40 h-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
