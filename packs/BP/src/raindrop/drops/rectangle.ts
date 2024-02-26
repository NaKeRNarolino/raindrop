import * as mc from "@minecraft/server";
import { Drop } from "./drop";
import { MassiveJSONStorage } from "raindrop/mod";

export class RectangleDrop {
  position: mc.Vector2;
  data: MassiveJSONStorage;
  layer: number;
  size: mc.Vector2;
  view: { coordinates: mc.Vector2; color: mc.RGBA }[];
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

    this._getView();
  }

  private _getView(): void {
    const pd: mc.RGBA[][][] = this.data.access() as mc.RGBA[][][];

    this.view = [];

    for (let i = 0; i < this.size.y; i++) {
      for (let j = 0; j < this.size.x; j++) {
        this.view.push({
          coordinates: {
            x: j,
            y: i,
          },
          color: pd[this.layer][this.position.y + i][this.position.x + j],
        });
      }
    }
  }

  move(vector: mc.Vector2): void {
    const pd: mc.RGBA[][][] = this.data.access() as mc.RGBA[][][];

    for (let i = 0; i < this.size.y; i++) {
      for (let j = 0; j < this.size.x; j++) {
        pd[this.layer][this.position.y + i][this.position.x + j] = {
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

    for (let i = 0; i < this.view.length; i++) {
      pd[this.layer][this.position.y + this.view[i].coordinates.y][
        this.position.x + this.view[i].coordinates.x
      ] = this.view[i].color;
    }

    this.data.write(pd);
  }
}
