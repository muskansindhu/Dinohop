import { k } from "../main";
import { spawnDino } from "../entities/dino";
import { spawnGround } from "../entities/ground";
import { spawnObstacles } from "../entities/obstacle";

export default function gameScene() {
  const music = play("bgmusic", { volume: 0.2, loop: true });

  k.add([k.sprite("bg"), k.scale(2.4), k.pos(0, 0), k.fixed(), k.z(0)]);

  k.camPos(k.width() / 2, k.height() / 2);

  const groundY = spawnGround();
  spawnDino(groundY);
  spawnObstacles(groundY);

  let score = 0;
  const scoreText = k.add([
    k.text("Score: 0", { size: 32 }),
    k.pos(20, 20),
    k.fixed(),
    k.z(10),
  ]);

  k.onUpdate(() => {
    score += k.dt() * 10;
    scoreText.text = `Score: ${Math.floor(score)}`;
  });

  k.onCollide("dino", "obstacle", () => {
    k.go("gameover", Math.floor(score));
  });

  k.onSceneLeave(() => {
    music.stop();
  });
}
