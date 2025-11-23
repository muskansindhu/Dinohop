import { k } from "../main";
import { spawnDino } from "../entities/dino";
import { spawnGround } from "../entities/ground";
import { spawnObstacles } from "../entities/obstacle";

export default function gameScene() {
  // play("bgmusic", { volume: 0.2, loop: true });

  add([sprite("bg"), scale(2.4), pos(0, 0), fixed(), z(0)]);

  k.camPos(k.width() / 2, k.height() / 2);

  const groundY = spawnGround();
  spawnDino(groundY);
  spawnObstacles(groundY);
}
