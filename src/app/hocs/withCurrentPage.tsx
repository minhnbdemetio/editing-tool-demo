import { CurrentPageContext } from '../contexts/CurrentPage';
import { EditablePageProps } from '../organisms/EditablePage';

export const withCurrentPage = (Component: React.FC<EditablePageProps>) => {
  const EnhancedComponent: React.FC<EditablePageProps> = props => {
    return (
      <CurrentPageContext.Provider value={props}>
        <Component {...props} />
      </CurrentPageContext.Provider>
    );
  };

  return EnhancedComponent;
};
