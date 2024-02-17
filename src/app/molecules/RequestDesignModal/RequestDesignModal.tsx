import { CenterModal, CenterModalProps } from '@/app/atoms/CenterModal';
import { RequestDesignService } from './RequestDesignService';
import { REQUEST_DESIGN_SERVICES } from './items';
import { useState } from 'react';
import { Button } from '@/app/atoms/Button';

interface Props extends Omit<CenterModalProps, 'children'> {}

export const RequestDesignModal = (props: Props) => {
  const [selectedService, setSelectedService] = useState('');

  return (
    <CenterModal
      header="Request a design"
      classes={{ header: 'py-6 justify-center' }}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="space-y-2">
            <p className="text-smm leading-4">
              If editting is difficult, try requesting design services
            </p>
            {REQUEST_DESIGN_SERVICES.map(({ name, price }) => (
              <RequestDesignService
                key={name}
                name={name}
                price={price}
                selectedService={selectedService}
                onClick={() => setSelectedService(name)}
              />
            ))}
          </div>

          <label className="font-bold text-smd leading-4.5 flex flex-col gap-2 mt-4">
            <span>Request note</span>
            <textarea
              placeholder="Type your request here"
              className="bg-default13 border-none py-[9px] px-3.5 rounded-[10px] font-normal placeholder:text-default6 h-[123px]"
            />
          </label>
        </div>

        <Button
          color="primary"
          className="w-[210px] max-w-full mx-auto"
          isDisabled={!selectedService}
          onClick={props.onClose}
        >
          Send
        </Button>
      </div>
    </CenterModal>
  );
};
