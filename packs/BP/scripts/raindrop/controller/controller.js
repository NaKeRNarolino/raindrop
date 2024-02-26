export function getControlOnPlayer(position, player) {
    let vel = player.getVelocity();
    player.teleport(position);
    return {
        x: vel.x * 2,
        y: vel.y * 2,
        z: vel.z * 2,
    };
}
