import { useActiveMoveableObject } from '../store/active-moveable-object';
import { useActivePage } from '../store/active-page';
import { usePageObjectsById } from './usePageObjects';

export const useDeleteActiveMoveableObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);
  return () => {
    if (!pageObjects || !setPageObjects || !activeMoveableObject) return false;

    const filteredObjects = pageObjects.filter(
      object => object.id !== activeMoveableObject.id,
    );
    activeMoveableObject?.destroy();
    setPageObjects(filteredObjects);

    return true;
  };
};

export const useCloneActiveMoveableObject = () => {
  const { activeMoveableObject } = useActiveMoveableObject();
  const { activePage } = useActivePage();
  const [pageObjects, setPageObjects] = usePageObjectsById(activePage);
  return () => {
    if (!pageObjects || !setPageObjects || !activeMoveableObject) return false;

    const clonedObject = activeMoveableObject.clone();

    setPageObjects([...pageObjects, clonedObject]);

    return true;
  };
};
