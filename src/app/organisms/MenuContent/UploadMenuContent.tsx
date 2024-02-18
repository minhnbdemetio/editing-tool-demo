import { FC, useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import RemoteSources from '@uppy/remote-sources';
import XHR from '@uppy/xhr-upload';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/file-input/dist/style.css';
import '@uppy/progress-bar/dist/style.css';

export const UploadMenuContent: FC = () => {
  const [uppy] = useState(() =>
    new Uppy({
      id: 'file-uploader',
      autoProceed: true,
      debug: true,
      restrictions: {
        allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
      },
    })
      .use(RemoteSources, {
        companionUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/companion`,
        sources: ['GoogleDrive'],
      })
      .use(XHR, {
        endpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/files`,
        fieldName: 'files',
      }),
  );

  useEffect(() => {
    return () => {
      uppy.close({ reason: 'unmount' });
    };
  }, [uppy]);

  return (
    <div className="w-full h-full">
      <Dashboard uppy={uppy} />
    </div>
  );
};
