import kaboom from "kaboom";
import { loadAssets } from "./config/loader";
import { GAME_WIDTH, GAME_HEIGHT } from "./config/constants";
import startScene from "./scenes/start";
import gameScene from "./scenes/game";
import gameOverScene from "./scenes/gameover";

export const k = kaboom({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  background: [134, 135, 247],
  canvas: document.getElementById("game-canvas"),
});

loadAssets(k);

k.scene("start", startScene);
k.scene("game", gameScene);
k.scene("gameover", gameOverScene);

k.go("start");
