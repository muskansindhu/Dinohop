import { GRAVITY } from "../config/constants";
import { k } from "../main";

export function spawnDino(groundY) {
  k.setGravity(GRAVITY);

  const fixedX = 150;

  const temp = k.add([
    k.sprite("dino"),
    k.scale(4),
    k.opacity(0),
    k.pos(-9999, -9999),
  ]);

  const dinoHeight = temp.height;
  temp.destroy();

  const dino = k.add([
    k.sprite("dino", { anim: "run" }),
    k.pos(fixedX, groundY - dinoHeight - 50),
    k.scale(4),
    k.area({
      shape: new k.Rect(k.vec2(10, 20), 30, dinoHeight - 11),
    }),
    k.body(),
    k.z(2),
    "dino",
  ]);

  k.onKeyPress("space", () => {
    if (dino.isGrounded()) {
      dino.jump();
      dino.play("jump");
    }
  });

  k.onUpdate(() => {
    dino.pos.x = fixedX;

    if (!dino.isGrounded()) {
      dino.play("jump");
    } else if (dino.curAnim() !== "run") {
      dino.play("run");
    }
  });

  return dino;
}
