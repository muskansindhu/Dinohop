import { SPEED } from "../config/constants";
import { k } from "../main";

export function spawnGround() {
  const scaleFactor = 4;

  const temp = k.add([
    k.sprite("ground"),
    k.scale(scaleFactor),
    k.opacity(0),
    k.pos(-9999, -9999),
  ]);

  const groundWidth = temp.width;
  const groundHeight = temp.height;
  temp.destroy();

  const groundOffset = 40;
  const groundY = k.height() - groundHeight - groundOffset;

  const totalPieces = Math.ceil(k.width() / groundWidth) + 2;
  const pieces = [];

  for (let i = 0; i < totalPieces; i++) {
    const g = k.add([
      k.sprite("ground"),
      k.scale(scaleFactor),
      k.anchor("topleft"),
      k.pos(i * groundWidth, groundY),
      k.area({
        shape: new k.Rect(k.vec2(0, 20), groundWidth, groundHeight - 20),
      }),
      k.body({ isStatic: true }),
      k.z(1),
      "ground",
    ]);
    pieces.push(g);
  }

  k.onUpdate(() => {
    for (const g of pieces) {
      g.move(-SPEED, 0);
      if (g.pos.x <= -groundWidth) {
        g.pos.x += groundWidth * totalPieces;
      }
    }
  });

  return groundY;
}
