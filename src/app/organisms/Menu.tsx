'use client';

import { FC, useState } from 'react';
import { MenuContent } from './MenuContent';
import { SideMenu } from './SideMenu';

export type MenuSection = 'templates' | 'photos';

export const Menu: FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<MenuSection>('templates');

  return (
    <>
      <SideMenu selectedSection={selectedSection} />
      <MenuContent section={selectedSection} />
    </>
  );
};
