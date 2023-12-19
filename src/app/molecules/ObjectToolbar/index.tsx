import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from '../../atoms/IconButton';
import {
  useCopyActiveObject,
  useDeleteActiveObject,
} from '@/app/hooks/active-object/useActiveObject';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';

interface ObjectToolbarProps extends HTMLAttributes<HTMLDivElement> {}

export const ObjectToolbar = forwardRef<HTMLDivElement, ObjectToolbarProps>(
  (props, ref) => {
    const handleCopyObject = useCopyActiveObject();

    const handleDeleteObject = useDeleteActiveObject();

    return (
      <div ref={ref} className={twMerge('flex', props.className)} {...props}>
        <IconButton onClick={handleCopyObject}>Copy</IconButton>
        <IconButton onClick={handleDeleteObject}>Delete</IconButton>
        <Dropdown>
          <DropdownTrigger>
            <IconButton>Dots</IconButton>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Actions" showDivider>
              <DropdownItem
                key="new"
                shortcut="⌘N"
                description="Create a new file"
              >
                New file
              </DropdownItem>
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                description="Copy the file link"
              >
                Copy link
              </DropdownItem>
              <DropdownItem
                key="edit"
                shortcut="⌘⇧E"
                description="Allows you to edit the file"
              >
                Edit file
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                shortcut="⌘⇧D"
                description="Permanently delete the file"
              >
                Delete file
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  },
);

ObjectToolbar.displayName = 'ObjectToolbar';
