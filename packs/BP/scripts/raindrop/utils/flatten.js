export function FlattenRGBA3DMatrix(matrix, width, height) {
    let fmatrix = Array(height);
    for (let i = 0; i < height; i++) {
        fmatrix[i] = Array(width);
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let color = { red: 0, green: 0, blue: 0, alpha: 0 };
            for (let z = 0; z < matrix.length; z++) {
                if (matrix[z][y][x].alpha != 1 && z != 0) {
                    color = {
                        red: Math.min(1, color.red + matrix[z][y][x].red),
                        green: Math.min(1, color.green + matrix[z][y][x].green),
                        blue: Math.min(1, color.blue + matrix[z][y][x].blue),
                        alpha: Math.min(1, color.alpha + matrix[z][y][x].alpha),
                    };
                }
                else if (matrix[z][y][x].alpha == 1 && z != 0) {
                    color = {
                        red: color.red + matrix[z][y][x].red,
                        green: color.green + matrix[z][y][x].green,
                        blue: color.blue + matrix[z][y][x].blue,
                        alpha: color.alpha + matrix[z][y][x].alpha,
                    };
                }
            }
            fmatrix[y][x] = color;
        }
    }
    return fmatrix;
}
export function SliceJSONAt32K(json) {
    let str = JSON.stringify(json);
    let idx = Math.ceil(str.length / 32000);
    let strings = [];
    for (let i = 0; i < idx; i++) {
        strings.push(str.slice(i * 32000, (i + 1) * 32000));
    }
    return { strings, idx };
}
