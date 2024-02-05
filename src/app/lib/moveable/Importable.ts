export interface Importable {
  createElementFromJSON: (jsonString: string) => void;
  loadFromJSON: (jsonString: string) => void;
  createElementFromHtml: (htmlString: string) => void;
}
