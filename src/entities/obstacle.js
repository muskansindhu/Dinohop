import { SPEED, OBSTACLE_INTERVAL } from "../config/constants";
import { k } from "../main";

export function spawnObstacles(groundY) {
  const loopHandle = k.loop(OBSTACLE_INTERVAL, () => {
    const temp = k.add([
      k.sprite("cactus"),
      k.scale(5),
      k.opacity(0),
      k.pos(-9999, -9999),
    ]);

    const cactusWidth = temp.width;
    const cactusHeight = temp.height;
    temp.destroy();

    const colliderShape = new k.Rect(
      k.vec2(8, 12),
      cactusWidth - 16,
      cactusHeight - 20
    );

    const obs = k.add([
      k.sprite("cactus"),
      k.scale(5),
      k.anchor("botleft"),
      k.pos(k.width() + 50, groundY),
      k.area({ shape: colliderShape }),
      k.body({ isStatic: true }),
      k.z(2),
      "obstacle",
    ]);

    obs.onUpdate(() => {
      obs.move(-SPEED, 0);
      if (obs.pos.x < -200) obs.destroy();
    });
  });

  k.onSceneLeave(() => {
    loopHandle.cancel();
  });
}
