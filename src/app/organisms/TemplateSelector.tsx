'use client';

import { Button, Spinner } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, Search } from '../icons';
import { TemplateList } from '../molecules/TemplateList';
import { TemplateCategory } from '../services/template/types/category';
import {
  getCategories,
  getCategoryTemplates,
} from '../services/template/template.service';
import { Template } from '../services/template/types';
import './template-selector.scss';
import { TemplateCategorySelector } from '../molecules/TemplateCategoriesSelector';
import { TemplateCategories } from '../molecules/TemplateCategories';

export const TemplateSelector: FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showTemplatesSearchResult, setShowTemplatesSearchResult] =
    useState(false);

  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getCategories();
      setCategories(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchCategoryTemplates = async (categoryName: string) => {
    try {
      setShowTemplatesSearchResult(true);
      setLoadingTemplates(true);
      setSelectedCategory(categoryName);

      const response = await getCategoryTemplates();
      setTemplates(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const toggleSelector = () => {
    setSelectedCategory('all');
    if (!showTemplatesSearchResult) {
      setSearchOpen(!searchOpen);
    } else {
      setSearchOpen(true);
      setShowTemplatesSearchResult(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0 mt-3">
      <div className="flex items-center gap-3 mb-3">
        {showTemplatesSearchResult && (
          <Button
            onClick={() => {
              setSelectedCategory('all');
              setShowTemplatesSearchResult(false);
            }}
            className="border-1 border-gray-100 w-[28px] min-w-0 bg-transparent p-0"
          >
            <ChevronLeft className="w-[28px]" />
          </Button>
        )}
        <Button
          className="rounded-[4px] border-1 border-gray-100 h-[40px] px-3 w-full bg-transparent"
          onClick={toggleSelector}
        >
          <div className="flex justify-between items-center w-full">
            <span>
              {selectedCategory === 'all' ? 'All templates' : selectedCategory}
            </span>
            <ChevronDown />
          </div>
        </Button>
      </div>

      {searchOpen && !showTemplatesSearchResult && (
        <div className="flex flex-col gap-3 h-full min-h-0">
          <div className="flex h-12 items-center gap-3">
            <Search />
            <input
              className="h-12 w-full focus:border-none"
              placeholder={`Are you looking for "business card"?`}
            />
          </div>
          {loadingCategories ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <TemplateCategorySelector
              categories={categories}
              onSelectCategory={fetchCategoryTemplates}
            />
          )}
        </div>
      )}

      {!searchOpen && !showTemplatesSearchResult && (
        <TemplateCategories showAllCategoryTemplates={fetchCategoryTemplates} />
      )}

      {showTemplatesSearchResult && (
        <>
          {loadingTemplates ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <TemplateList templates={templates} />
          )}
        </>
      )}
    </div>
  );
};
