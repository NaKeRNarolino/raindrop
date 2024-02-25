export class RectangleDrop {
    constructor(position, pairedData, layer, size) {
        this.position = position;
        this.data = pairedData;
        this.layer = layer;
        this.size = size;
    }
    move(vector) {
        const pd = this.data.access();
        let oldcolor = Array(this.size.y).fill(Array(this.size.x));
        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                oldcolor[i][j] =
                    pd[this.layer][this.position.y + i][this.position.x + j];
            }
        }
        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                pd[this.layer][i][j] = { red: 0, green: 0, blue: 0, alpha: 0 };
            }
        }
        this.position = {
            x: this.position.x + vector.x,
            y: this.position.y + vector.y,
        };
        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                pd[this.layer][i][j] =
                    oldcolor[this.position.y + i][this.position.x + j];
            }
        }
    }
}
