export interface IMoveableObjectProperties {
  id: string;
  type?: ObjectType;
  htmlString?: string;
  pageId: string | null;
  isLocked: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  flipDirection: {
    x: boolean;
    y: boolean;
  };
}

export interface IMoveableObject extends IMoveableObjectProperties {
  toObject: () => IMoveableObjectProperties;
  setup: (properties: IMoveableObjectProperties) => void;
}
