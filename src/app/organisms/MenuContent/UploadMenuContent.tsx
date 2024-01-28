import { FC, useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import RemoteSources from '@uppy/remote-sources';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/file-input/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import { UploadButton } from '@/app/atoms/UploadButton';
import { uploadFile } from '@/app/services/files/files.service';

export const UploadMenuContent: FC = () => {
  const [uppy] = useState(() =>
    new Uppy({ id: 'file-uploader', autoProceed: true, debug: true }).use(
      RemoteSources,
      {
        companionUrl: 'https://companion.uppy.io',
        sources: ['GoogleDrive'],
      },
    ),
  );

  useEffect(() => {
    () => {
      uppy.close({ reason: 'unmount' });
    };
  }, [uppy]);

  const handleUploadFile = async (file: File) => {
    try {
      const uploadResponse = await uploadFile(file);
      console.log(uploadResponse);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full h-full">
      <UploadButton onFileChange={handleUploadFile} />
      <Dashboard uppy={uppy} />
    </div>
  );
};
