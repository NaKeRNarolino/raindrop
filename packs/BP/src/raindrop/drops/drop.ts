import * as mc from "@minecraft/server";
import { JSONStorage, MassiveJSONStorage } from "raindrop/mod";
export * from "./rectangle";

export class Drop {
  position: mc.Vector2;
  data: MassiveJSONStorage;
  layer: number;
  constructor(
    position: mc.Vector2,
    pairedData: MassiveJSONStorage,
    layer: number
  ) {
    this.position = position;
    this.data = pairedData;
    this.layer = layer;
  }

  move(vector: mc.Vector2): void {
    const oldColor: mc.RGBA = (this.data.access() as mc.RGBA[][][])[this.layer][
      this.position.y
    ][this.position.x];
    let pairedData = this.data.access() as mc.RGBA[][][];
    pairedData[this.layer][this.position.y][this.position.x] = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    };
    this.position = {
      x: this.position.x + vector.x,
      y: this.position.y + vector.y,
    };
    pairedData[this.layer][this.position.y][this.position.x] = oldColor;
    this.data.write(pairedData);
  }
}
