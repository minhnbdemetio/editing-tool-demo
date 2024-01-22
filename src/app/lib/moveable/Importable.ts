export interface Importable {
  createElementFromJSON: (jsonString: string) => void;
  createElementFromHtml: (htmlString: string) => void;
}
