export class RectangleDrop {
    constructor(position, pairedData, layer, size) {
        this.position = position;
        this.data = pairedData;
        this.layer = layer;
        this.size = size;
    }
    move(vector) {
        const pd = this.data.access();
        let oc = Array(pd.length).fill(Array(this.size.y).fill(Array(this.size.x)));
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
