import { create } from 'zustand';
import { TemplateFilterType } from '../types';

export const useTemplateFilters = create<{
  loading: boolean;
  templates: TemplateFilterType[];
  setTemplates: (templates: TemplateFilterType[]) => void;
}>(set => ({
  templates: [],
  loading: true,
  setTemplates: templates =>
    set(_ => ({
      templates,
      loading: false,
    })),
}));
