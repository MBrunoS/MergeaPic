export type Preview = {
  src: string;
  name: string;
};

export enum Steps {
  Home = 1,
  Preview,
  Overlay,
  Confirm,
  Merge,
}
