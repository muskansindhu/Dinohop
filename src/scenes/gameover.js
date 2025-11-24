import { k } from "../main";

export default function gameOverScene(score) {
  k.add([k.sprite("bg"), k.scale(2.4), k.pos(0, 0), k.fixed(), k.z(0)]);

  k.add([
    k.text("GAME OVER", { size: 64 }),
    k.pos(k.width() / 2, k.height() / 2 - 80),
    k.anchor("center"),
    k.z(1),
  ]);

  k.add([
    k.text(`Score: ${score}`, { size: 48 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
    k.z(1),
  ]);

  k.add([
    k.text("Press ENTER to Restart", { size: 32 }),
    k.pos(k.width() / 2, k.height() / 2 + 80),
    k.anchor("center"),
    k.z(1),
  ]);

  k.onKeyPress("enter", () => {
    k.go("game");
  });
}
