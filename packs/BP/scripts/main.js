import * as mc from "@minecraft/server";
import * as rd from "raindrop/mod";
const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};
mc.system.afterEvents.scriptEventReceive.subscribe((data) => {
    if (data.id == "rd:start") {
        mc.system.run(() => {
            let loc = { x: 116, y: 68, z: -18 };
            let display = new rd.Display(2, 1, 16, mc.world.getDimension("overworld"), loc);
            let data = Array(5);
            for (let i = 0; i < data.length; i++) {
                data[i] = Array(16);
            }
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < 16; j++) {
                    data[i][j] = Array(32);
                }
            }
            for (let z = 0; z < data.length; z++) {
                for (let y = 0; y < data[0].length; y++) {
                    for (let x = 0; x < data[0][0].length; x++) {
                        data[z][y][x] = { red: 0, green: 0, blue: 0, alpha: 1 };
                    }
                }
            }
            const v = { red: 1, green: 0, blue: 1, alpha: 1 };
            const o = { red: 1, green: 0.5, blue: 0, alpha: 1 };
            const DataStorage = new rd.MassiveJSONStorage("rd:screen_data");
            data[1][0][0] = v;
            data[1][0][1] = { red: 0.5, green: 0, blue: 1, alpha: 1 };
            data[1][1][0] = { red: 0.5, green: 0, blue: 1, alpha: 1 };
            data[1][1][1] = { red: 0, green: 0, blue: 1, alpha: 1 };
            DataStorage.write(data);
            display.data = DataStorage;
            // let vp = new rd.RectangleDrop({ x: 0, y: 0 }, DataStorage, 1, {
            //   x: 2,
            //   y: 2,
            // });
            let vp = new rd.Drop({ x: 0, y: 0 }, DataStorage, 1);
            display.startDrawing();
            mc.system.runTimeout(() => {
                let it = 0;
                mc.system.runInterval(() => {
                    let color = HSLToRGB(it, 100, 50);
                    vp.setView({
                        red: color[0] / 255,
                        green: color[1] / 255,
                        blue: color[2] / 255,
                        alpha: 1,
                    });
                    it++;
                    if (it > 360) {
                        it = 0;
                    }
                });
            }, 60);
        });
    }
});
