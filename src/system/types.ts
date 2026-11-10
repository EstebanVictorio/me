export interface SpatialObject {
  id: string;
  spatialProperties: {
    pos: {
      x: number;
      y: number;
    };
    coordinates: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
}