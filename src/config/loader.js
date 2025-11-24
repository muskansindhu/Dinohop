export function loadAssets(k) {
  k.loadSound("bgmusic", "sounds/bg.mp3");

  k.loadSprite("bg", "sprites/bg.png");
  k.loadSprite("ground", "sprites/tile_3.png");
  k.loadSprite("stone", "sprites/stone_1.png");
  k.loadSprite("cactus", "sprites/cactus_1.png");
  k.loadSprite("mushroom", "sprites/mushroom_2.png");

  k.loadSprite("dino", "sprites/dino.png", {
    sliceX: 10,
    sliceY: 3,
    anims: {
      idle: { from: 0, to: 5, loop: true, speed: 10 },
      run: { from: 11, to: 15, loop: true, speed: 10 },
      jump: { from: 21, to: 29, speed: 7 },
    },
  });
}
