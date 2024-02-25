import * as mc from "@minecraft/server";
import { Drop } from "./drop";
import { MassiveJSONStorage } from "raindrop/mod";

export class RectangleDrop {
  position: mc.Vector2;
  data: MassiveJSONStorage;
  layer: number;
  size: mc.Vector2;
  constructor(
    position: mc.Vector2,
    pairedData: MassiveJSONStorage,
    layer: number,
    size: mc.Vector2
  ) {
    this.position = position;
    this.data = pairedData;
    this.layer = layer;
    this.size = size;
  }

  move(vector: mc.Vector2): void {
    const pd: mc.RGBA[][][] = this.data.access() as mc.RGBA[][][];
    let oc: mc.RGBA[][][] = Array(pd.length).fill(
      Array(this.size.y).fill(Array(this.size.x))
    );
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        oc[this.layer][y][x] =
          pd[this.layer][this.position.y + y][this.position.x + x];
        console.warn(`${x} ${y} ${JSON.stringify(oc[this.layer][y][x])}`);
        pd[this.layer][this.position.y + y][this.position.x + x] = {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 0,
        };
      }
    }

    this.position = {
      x: this.position.x + vector.x,
      y: this.position.y + vector.y,
    };

    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        console.warn(`${y} ${x}`);
        pd[this.layer][this.position.y + y][this.position.x + x] =
          oc[this.layer][y][x];
      }
    }

    this.data.write(pd);
  }
}
