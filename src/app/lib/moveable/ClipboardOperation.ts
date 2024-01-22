export interface ClipboardOperation {
  clone: () => any;
  copy: () => any;
  delete: () => any;
  cloneData: () => any;
}
