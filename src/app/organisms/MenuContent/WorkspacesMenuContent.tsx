import { FC } from 'react';
import { Close, CountTemplates, ImageIcon } from '@/app/icons';

interface WorkspacesMenuContentProps {
  setOpen: (val: boolean) => void;
}
export type Template = {
  key: string;
  url: '';
};
export type Workspace = {
  title: string;
  description: string;
  templates?: Template[];
};

export const WorkspacesMenuContent: FC<WorkspacesMenuContentProps> = ({
  setOpen,
}) => {
  const dataDefault: Workspace[] = [
    {
      title: 'My WorkspaceMy WorkspaceMy Workspace',
      description: 'This is your personal workspace',
      templates: [
        { key: '1', url: '' },
        { key: '2', url: '' },
        { key: '3', url: '' },
      ],
    },
    {
      title: 'Client Workspace',
      description: 'This is your client workspace',
      templates: [
        { key: '1', url: '' },
        { key: '2', url: '' },
      ],
    },
    {
      title: 'Team Workspace',
      description: 'This is your team workspace',
      templates: [{ key: '1', url: '' }],
    },
    {
      title: 'Shared Workspace',
      description: 'This is your shared workspace',
      templates: [{ key: '1', url: '' }],
    },
    {
      title: 'Company Workspace',
      description: 'This is your company workspace',
      templates: [{ key: '1', url: '' }],
    },
    {
      title: 'Team Workspace',
      description: 'This is your team workspace',
      templates: [{ key: '1', url: '' }],
    },
    {
      title: 'Shared Workspace',
      description: 'This is your shared workspace',
      templates: [{ key: '1', url: '' }],
    },
    {
      title: 'Company Workspace',
      description: 'This is your company workspace',
      templates: [{ key: '1', url: '' }],
    },
  ];
  return (
    <div className="w-full h-full py-6 flex flex-col">
      <div className="text-default8 text-center text-md font-bold leading-normal mb-2 relative mx-6">
        Workspaces
        <div
          className="w-5 h-5 rounded-[50%] cursor-pointer bg-default2 hover:bg-default3 flex items-center justify-center absolute top-0 right-0"
          onClick={() => setOpen(false)}
        >
          <Close className="w-3 h-3" />
        </div>
      </div>
      <div className="w-full flex-1 overflow-scroll items grid grid-cols-2 gap-2 px-6">
        {dataDefault.map((workspace, index) => (
          <div
            key={index}
            className="w-full h-34 bg-default1 rounded-md mb-2 flex flex-col justify-between cursor-pointer hover:bg-default2 transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              <div className="text-default8 text-md font-bold whitespace-nowrap overflow-hidden overflow-ellipsis pr-6">
                {workspace.title}
              </div>
              <div className="text-default8 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis pr-6">
                {workspace.description}
              </div>
              <div className="flex h-24 w-full bg-[#82828226] rounded-lg relative items-center justify-center">
                <ImageIcon className="text-default6" />
                <div className="w-8 h-8 rounded-[50%] bg-white absolute bottom-2 left-2 flex items-center justify-center border border-[#82828226]">
                  <CountTemplates />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
