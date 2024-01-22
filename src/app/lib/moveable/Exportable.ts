export interface Exportable {
  toJSON: () => Object;
  toHtmlString: () => string;
}
