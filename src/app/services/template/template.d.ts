export declare type Template = {
  thumbnail: string;
  data: CanvasData;
};

export declare type TemplateCategory = {
  title: string;

  subCategories?: TemplateCategory[];
  templates?: Template[];
};
