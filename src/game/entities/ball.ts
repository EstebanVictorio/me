import type { GameObject } from "../types";

export class Ball implements GameObject {
  static OBJECT_TYPE = 'ball';
  id: Pick<GameObject, 'id'>['id'];
  spatialProperties: Pick<GameObject, 'spatialProperties'>['spatialProperties'];

  constructor({
    id,
    spatialProperties,
  }: GameObject) {
    this.id = id;
    this.spatialProperties = spatialProperties;
  };
}