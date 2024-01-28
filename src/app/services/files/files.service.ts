import { apiInstance } from '../axios-instances';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);
  return apiInstance.post('/files', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getFiles = () => {
  return apiInstance.get('/files');
};

export const deleteFile = (fileId: string) =>
  apiInstance.delete(`/files/${fileId}`);
