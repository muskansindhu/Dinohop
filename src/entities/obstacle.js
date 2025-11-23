import { SPEED, OBSTACLE_INTERVAL } from "../config/constants";
import { k } from "../main";

export function spawnObstacles(groundY) {
  k.loop(OBSTACLE_INTERVAL, () => {
    const type = Math.random() < 0.5 ? "stone" : "mushroom";

    let colliderShape;

    if (type === "stone") {
      colliderShape = new k.Rect(k.vec2(15, 35), 20, 20);
    } else {
      colliderShape = new k.Rect(k.vec2(20, 25), 25, 28);
    }

    const obs = k.add([
      k.sprite(type),
      k.scale(4),
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
}
