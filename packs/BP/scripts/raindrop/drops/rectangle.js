export class RectangleDrop {
    constructor(position, pairedData, layer, size) {
        this.position = position;
        this.data = pairedData;
        this.layer = layer;
        this.size = size;
        this._getView();
    }
    _getView() {
        const pd = this.data.access();
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
    move(vector) {
        const pd = this.data.access();
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
            pd[this.layer][this.position.y + this.view[i].coordinates.y][this.position.x + this.view[i].coordinates.x] = this.view[i].color;
        }
        this.data.write(pd);
    }
}
