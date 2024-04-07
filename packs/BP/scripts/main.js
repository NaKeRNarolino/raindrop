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
mc.system.afterEvents.scriptEventReceive.subscribe((evdata) => {
    if (evdata.id == "rd:start") {
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
                        data[z][y][x] = { red: 0, green: 0, blue: 0, alpha: 0 };
                    }
                }
            }
            const v = { red: 1, green: 0, blue: 1, alpha: 1 };
            const w = { red: 1, green: 1, blue: 1, alpha: 1 };
            const DataStorage = new rd.MassiveJSONStorage("rd:screen_data");
            DataStorage.write(data);
            display.data = DataStorage;
            data[3][14][29] = w;
            DataStorage.write(data);
            display.startDrawing();
            let player = new rd.Drop({ x: 29, y: 14 }, DataStorage, 3);
            let playerGravity = 0;
            let loca = evdata.sourceEntity.location;
            display.fillWithColor({ red: 0, green: 1, blue: 0, alpha: 1 }, { x: 0, y: 0 }, { x: 1, y: 16 }, 2);
            display.fillWithColor({ red: 1, green: 0, blue: 0, alpha: 1 }, { x: 3 + Math.ceil(Math.random() * 15), y: 0 }, { x: 1, y: Math.ceil(Math.random() * 4) }, 1);
            mc.system.runTimeout(() => {
                mc.system.runInterval(() => {
                    // let vel = rd.getControlOnPlayer(
                    //   loca,
                    //   evdata.sourceEntity as mc.Player
                    // );
                    if (playerGravity <= 0) {
                        if (player.position.y + playerGravity > 0) {
                            player.move({ x: 0, y: playerGravity });
                            playerGravity -= 1;
                        }
                        else {
                            player.move({ x: 0, y: 0 - player.position.y });
                        }
                    }
                    else {
                        if (player.position.y + playerGravity < 15) {
                            player.move({ x: 0, y: playerGravity });
                        }
                        else {
                            player.move({ x: 0, y: 15 - player.position.y });
                        }
                        playerGravity -= 1;
                    }
                    mc.world.afterEvents.itemUse.subscribe((ida) => {
                        if (ida.itemStack.typeId == "minecraft:bamboo")
                            playerGravity += -playerGravity + 2;
                    });
                    if (player.collidesWithLayer(2)) {
                        player.teleport({ x: 29, y: 14 });
                        playerGravity = 0;
                        display.fillWithColor({ red: 0, green: 0, blue: 0, alpha: 0 }, { x: 1, y: 0 }, { x: 14, y: 15 }, 1);
                        display.fillWithColor({ red: 0.2, green: 0, blue: 0, alpha: 0.1 }, { x: 1, y: 0 }, { x: 32, y: 1 }, 1);
                        let height = Math.random() * 8;
                        display.fillWithColor({ red: 1, green: 1, blue: 0, alpha: 1 }, { x: 5, y: 0 }, { x: 1, y: height }, 4);
                        height = Math.random() * 8;
                        display.fillWithColor({ red: 1, green: 1, blue: 0, alpha: 1 }, { x: 9, y: 0 }, { x: 1, y: height }, 4);
                        height = Math.random() * 8;
                        display.fillWithColor({ red: 1, green: 1, blue: 0, alpha: 1 }, { x: 14, y: 0 }, { x: 1, y: height }, 4);
                    }
                    if (player.collidesWithLayer(1)) {
                        display.fillWithColor({ red: 1, green: 1, blue: 1, alpha: 1 }, { x: 0, y: 0 }, { x: 32, y: 16 }, 1);
                    }
                }, 1);
                mc.system.runInterval(() => {
                    player.move({ x: -1, y: 0 });
                }, 4);
            }, 60);
        });
    }
});
