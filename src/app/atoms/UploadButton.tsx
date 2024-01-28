import { Button } from '@nextui-org/react';
import React, { FC, useRef, useState } from 'react';

interface UploadButtonProps {
  onFileChange: (file: File) => Promise<any>;
}

export const UploadButton: FC<UploadButtonProps> = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    await onFileChange(file);
  };

  return (
    <div>
      <input type="file" ref={inputRef} hidden onChange={handleFileChange} />
      <Button onClick={() => inputRef.current?.click()}>Upload files</Button>
    </div>
  );
};
