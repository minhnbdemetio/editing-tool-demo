import { useCopyActiveObject, useDeleteActiveObject } from '../useActiveObject';

import { useExecuteCommand } from './useCommand';

export const useCopyActiveObjectCommand = () => {
  const copyObjectFunction = useCopyActiveObject();
  const execute = useExecuteCommand(copyObjectFunction);

  return execute;
};

export const useDeleteActiveObjectCommand = () => {
  const deleteObjectFunction = useDeleteActiveObject();
  const execute = useExecuteCommand(deleteObjectFunction);

  return execute;
};
