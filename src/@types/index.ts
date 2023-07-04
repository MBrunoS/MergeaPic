export enum Steps {
  Upload = 0,
  Overlay,
  Edit,
  Merge,
  Download,
}

export type ImageFile = {
  src: string;
  name: string;
};

export type CroppedImg = {
  zoom: number;
  crop: { x: number; y: number };
} & ImageFile;

export type PhotosPreview = {
  [key: string]: CroppedImg;
};
