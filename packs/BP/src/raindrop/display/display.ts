import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import { JSONStorage, MassiveJSONStorage } from "raindrop/mod";
import { FlattenRGBA3DMatrix } from "raindrop/utils/flatten";

export class Display {
  width: number;
  height: number;
  ppb: number;
  dimension: mc.Dimension;
  location: mc.Vector3;
  isDrawing: boolean = false;
  data: MassiveJSONStorage;
  constructor(
    width: number,
    height: number,
    ppb: number,
    dimension: mc.Dimension,
    location: mc.Vector3
  ) {
    this.width = width;
    this.height = height;
    this.ppb = ppb;
    this.dimension = dimension;
    this.location = location;
    this.mainTick();
  }

  startDrawing() {
    this.isDrawing = true;
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  draw() {
    let startLoc = this.location;
    const size = 1 / this.ppb;

    let molang = new mc.MolangVariableMap();
    molang.setFloat("variable.size", size);
    const dat = FlattenRGBA3DMatrix(
      this.data.access() as mc.RGBA[][][],
      this.ppb * this.width,
      this.ppb * this.height
    );

    for (let i = 0; i < this.height * this.ppb; i++) {
      for (let j = 0; j < this.width * this.ppb; j++) {
        molang.setColorRGBA("variable.color", dat[i][j]);

        let loc = {
          x: startLoc.x,
          y: startLoc.y + i * size * 2,
          z: startLoc.z + j * size * 2,
        };
        this.dimension.spawnParticle("rd:pixel_x", loc, molang);
      }
    }
  }

  mainTick() {
    let run = mc.system.runInterval(() => {
      if (this.isDrawing && mc.world.getAllPlayers()[0]) {
        this.draw();
      }
    });
  }

  fillWithColor(
    color: mc.RGBA,
    position: mc.Vector2,
    size: mc.Vector2,
    layer: number
  ) {
    let pd = this.data.access() as mc.RGBA[][][];
    for (let i = position.y; i < size.y; i++) {
      for (let j = position.x; j < size.x; j++) {
        pd[layer][i][j] = color;
      }
    }
    this.data.write(pd);
  }
}
