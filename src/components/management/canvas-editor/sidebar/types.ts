export interface ShapeGraphic {
  id: string;
  type: 'rect' | 'circle' | 'triangle' | 'star' | 'pentagon' | 'line' | 'arrow' | 'double-arrow' | 'speech-bubble' | 'speech-bubble-rect';
  color: string;
}

export interface ImageGraphic {
  id: string;
  url: string;
  label: string;
}

export interface GraphicsData {
  shapes: ShapeGraphic[];
  images: ImageGraphic[];
  icons: ImageGraphic[];
  illustrations: ImageGraphic[];
}
