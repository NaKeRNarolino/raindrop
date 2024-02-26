import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";

export function getControlOnPlayer(
  position: mc.Vector3,
  player: mc.Player
): mc.Vector3 {
  let vel = player.getVelocity();
  player.teleport(position);
  return {
    x: vel.x * 2,
    y: vel.y * 2,
    z: vel.z * 2,
  };
}
