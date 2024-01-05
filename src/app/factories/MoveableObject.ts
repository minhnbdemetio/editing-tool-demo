import { v4 as uuidv4 } from 'uuid';

export abstract class MoveableObject {
  id: string;
  type?: string;
  htmlString: string;
  constructor() {
    this.id = uuidv4();
    this.htmlString = '';
  }

  setId(id: string) {
    this.id = id;
  }
  setHtmlString(htmlString: string) {
    this.htmlString = htmlString;
  }
  abstract createElement(...params: any): any;
  copy() {}
  clone() {}
  delete() {}
  getElement() {
    return document.getElementById(this.id);
  }
  createElementFromString() {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(this.htmlString, 'text/html');

    return parsedDocument.body.firstChild;
  }
  exportString() {
    const element = document.getElementById(this.id);
    if (element) {
      this.htmlString = element.outerHTML;
      return element.outerHTML;
    }
    return '';
  }
}
