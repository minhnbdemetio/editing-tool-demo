import React from 'react';
import { EditablePageProps } from '../organisms/EditablePage';

export const CurrentPageContext = React.createContext<EditablePageProps>({
  pageId: '',
});
