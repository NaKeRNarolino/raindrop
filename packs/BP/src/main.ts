import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import * as rd from "raindrop/mod";

mc.system.afterEvents.scriptEventReceive.subscribe((data) => {
  if (data.id == "rd:start") {
    mc.system.run(() => {
      let loc = { x: 116, y: 68, z: -18 };
      let display = new rd.Display(
        2,
        1,
        16,
        mc.world.getDimension("overworld"),
        loc
      );
      let data: mc.RGBA[][][] = Array(5);

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

      let vp = new rd.RectangleDrop({ x: 0, y: 0 }, DataStorage, 1, {
        x: 2,
        y: 2,
      });

      display.startDrawing();

      mc.system.runTimeout(() => {
        let it = 0;
        mc.system.runInterval(() => {
          if (it < 1) {
            vp.move({ x: 2, y: 0 });
          }
          it++;
        }, 5);
      }, 60);
    });
  }
});
