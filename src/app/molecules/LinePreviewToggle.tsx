import { Switch } from '@nextui-org/react';
import { FC } from 'react';
import { useLineEnabled } from '../store/line-preview';

export const LinePreviewToggle: FC = () => {
  const { lineEnabled, setLineEnabled } = useLineEnabled();

  return (
    <Switch
      isSelected={lineEnabled}
      onValueChange={setLineEnabled}
      classNames={{
        wrapper: 'group-data-[selected=true]:!bg-green-500 bg-black',
      }}
    >
      {lineEnabled ? 'Disable line' : 'Enable line'}
    </Switch>
  );
};
