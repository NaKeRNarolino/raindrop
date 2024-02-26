export * from "./rectangle";
export class Drop {
    constructor(position, pairedData, layer) {
        this.position = position;
        this.data = pairedData;
        this.layer = layer;
        this.view = this.data.access()[this.layer][this.position.y][this.position.x];
    }
    move(vector) {
        let pairedData = this.data.access();
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
        pairedData[this.layer][this.position.y][this.position.x] = this.view;
        this.data.write(pairedData);
    }
    setView(rgba) {
        this.view = rgba;
        let pairedData = this.data.access();
        pairedData[this.layer][this.position.y][this.position.x] = this.view;
        this.data.write(pairedData);
    }
    collidesWithLayer(layer) {
        let pairedData = this.data.access();
        return pairedData[layer][this.position.y][this.position.x].alpha != 0;
    }
    teleport(vector) {
        let pairedData = this.data.access();
        pairedData[this.layer][this.position.y][this.position.x] = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
        };
        this.position = vector;
        pairedData[this.layer][this.position.y][this.position.x] = this.view;
        this.data.write(pairedData);
    }
}
