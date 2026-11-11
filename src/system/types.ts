export interface SpatialObject {
  id: string;
  spatialProperties: {
    pos: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
}