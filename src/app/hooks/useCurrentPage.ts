import { useContext } from 'react';
import { CurrentPageContext } from '../contexts/CurrentPage';

export const useCurrentPage = () => useContext(CurrentPageContext);
