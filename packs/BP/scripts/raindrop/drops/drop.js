export * from "./rectangle";
export class Drop {
    constructor(position, pairedData, layer) {
        this.position = position;
        this.data = pairedData;
        this.layer = layer;
    }
    move(vector) {
        const oldColor = this.data.access()[this.layer][this.position.y][this.position.x];
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
        pairedData[this.layer][this.position.y][this.position.x] = oldColor;
        this.data.write(pairedData);
    }
}
