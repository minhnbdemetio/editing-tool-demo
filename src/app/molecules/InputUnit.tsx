import { FC } from 'react';

interface InputUnitProps {
  label: string;
  value: string;
  onChangeValue: (value: string) => void;
  onSetValue: (value: string) => void;
  unit?: string;
}

export const InputUnit: FC<InputUnitProps> = ({
  label,
  value,
  onChangeValue,
  onSetValue,
  unit = 'px',
}) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, '');
    onSetValue(newValue);
  };
  const handleFocus = () => {
    const numericString = value.replace(/[^\d.]/g, '');
    const dotCount = numericString.split('.').length - 1;
    if (dotCount > 1) {
      return numericString.replace(/\./g, (match, offset) =>
        offset ? '' : match,
      );
    }
    onChangeValue(numericString);
  };
  const handleBlur = () => {
    onChangeValue(value + unit);
  };
  return (
    <div className="w-full">
      <b>{label}</b>
      <input
        value={value}
        type="text"
        onChange={handleChangeInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full mt-1 border-px border-border border-solid text-md rounded-sm font-normal text-black-500  p-2"
      />
    </div>
  );
};
