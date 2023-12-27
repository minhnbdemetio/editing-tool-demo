'use client';

import { Accordion, AccordionItem, Button, Spinner } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, Search } from '../icons';
import { TemplateList } from '../molecules/TemplateList';
import { TemplateCategory } from '../services/templates/types/category';
import {
  getCategories,
  getCategoryTemplates,
} from '../services/templates/category';
import { Template } from '../services/templates/types';
import './template-selector.scss';

export const TemplateSelector: FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

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

  const fetchCategoryTemplates = async () => {
    try {
      setShowTemplates(true);
      setLoadingTemplates(true);
      const response = await getCategoryTemplates();
      setTemplates(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const toggleSelector = () => {
    setSearchOpen(!searchOpen);
    setShowTemplates(!showTemplates);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="h-full">
      <div className="flex items-center gap-3">
        {showTemplates && (
          <Button className="border-1 border-gray-100 w-[28px] bg-transparent">
            <ChevronLeft />
          </Button>
        )}
        <Button
          className="rounded-[4px] border-1 border-gray-100 h-[40px] px-3 w-full bg-transparent"
          onClick={toggleSelector}
        >
          <div className="flex justify-between items-center w-full">
            <span>All templates</span>
            <ChevronDown />
          </div>
        </Button>
      </div>

      {!showTemplates && (
        <div className="">
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
            <Accordion className="px-0 overflow-auto h-full">
              {categories.map(category => (
                <AccordionItem
                  className="accordion__item"
                  key={category.title}
                  title={category.title}
                >
                  <ul>
                    {category.subCategories.map(subCategory => (
                      <li key={subCategory.title}>
                        <button
                          className="w-full text-left h-10"
                          onClick={fetchCategoryTemplates}
                        >
                          {subCategory.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}

      {showTemplates && (
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
