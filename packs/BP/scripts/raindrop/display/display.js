import * as mc from "@minecraft/server";
import { FlattenRGBA3DMatrix } from "raindrop/utils/flatten";
export class Display {
    constructor(width, height, ppb, dimension, location) {
        this.isDrawing = false;
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
        const dat = FlattenRGBA3DMatrix(this.data.access(), this.ppb * this.width, this.ppb * this.height);
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
}
