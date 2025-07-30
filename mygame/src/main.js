import kaboom from "kaboom";

const k = kaboom({
  width: 960,
  height: 540,
  canvas: document.createElement("canvas"),
  background: [134, 135, 247],
});

document.getElementById("game-container").appendChild(k.canvas);

loadSound("bgmusic", "sounds/bg.mp3");

loadSprite("bg", "sprites/bg.png");
loadSprite("tile_1", "sprites/tile_1.png");
loadSprite("tile_2", "sprites/tile_2.png");
loadSprite("tile_3", "sprites/tile_3.png");
loadSprite("tile_4", "sprites/tile_4.png");
loadSprite("tile_6", "sprites/tile_6.png");
loadSprite("stone", "sprites/stone_1.png");
loadSprite("mushroom", "sprites/mushroom_2.png");
loadSprite("dino", "sprites/dino.png", {
  sliceX: 10,
  sliceY: 3,
  anims: {
    idle: { from: 0, to: 5, loop: true, speed: 10 },
    walk: { from: 11, to: 15, loop: true, speed: 10 },
    jump: { from: 21, to: 29, speed: 7 },
  },
});

const TILE_SIZE = 32;
const TILE_SCALE = 4;
const SPEED = 200;

const LEVELS = [
  [
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "                                                                                                                     ",
    "= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =",
  ],
  [
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!                                                                                                                   !",
    "!              M                   s                                |   #             M                             !",
    "= = = = = = = = = = = = = = = = = = = = = ==    = = = = = = = = = = = = = = ==    = = = = = = = = = = = = = = = = =",
  ],
];

const levelConf = {
  tileWidth: 64,
  tileHeight: 64,
  pos: vec2(-10, height() - 820),
  tiles: {
    "=": () => [
      sprite("tile_3"),
      anchor("botleft"),
      scale(TILE_SCALE),
      area({ scale: 0.5 }),
      body({ isStatic: true }),
      "ground",
    ],
    "!": () => [
      sprite("tile_6"),
      anchor("botleft"),
      scale(TILE_SCALE),
      area({ scale: 0.5 }),
      body({ isStatic: true }),
      pos(-30, 200),
      "beigeTile",
    ],
    "|": () => [
      sprite("tile_4"),
      anchor("botleft"),
      scale(TILE_SCALE),
      area({ scale: 0.1 }),
      body({ isStatic: true }),
      pos(0, -TILE_SIZE * 0.001),
      "singleTile",
    ],
    "#": () => [
      sprite("tile_1"),
      anchor("botleft"),
      scale(TILE_SCALE),
      area({ scale: 0.1 }),
      body({ isStatic: true }),
      pos(0, 100),
      "singleBigTile",
    ],
    M: () => [
      sprite("mushroom"),
      anchor("botleft"),
      scale(TILE_SCALE),
      area({ scale: 0.1 }),
      body({ isStatic: true }),
      "mushroom",
      pos(0, -TILE_SIZE * 0.001),
    ],
    s: () => [
      sprite("stone"),
      anchor("botleft"),
      scale(TILE_SCALE),
      area({ scale: 0.1 }),
      body({ isStatic: true }),
      "smallStone",
      pos(0, -TILE_SIZE * 0.001),
    ],
  },
};

scene("start", () => {
  add([
    text("Press Enter to Start", { size: 50 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    color(255, 255, 255),
  ]);

  onKeyRelease("enter", () => {
    go("game");
  });
});

scene("game", () => {
  const music = play("bgmusic", {
    volume: 0.2,
    loop: true,
  });

  setGravity(1600);

  const background = add([sprite("bg"), scale(2.4), pos(0, 0)]);
  const level = addLevel(LEVELS[1], levelConf);
  level.use(z(1));

  const dino = add([
    sprite("dino", { anim: "idle" }),
    anchor("botleft"),
    pos(0, height()),
    scale(4),
    area(),
    body(),
    z(2),
  ]);

  onKeyPress("space", () => {
    if (dino.isGrounded()) {
      dino.jump();
      dino.play("jump");
    }
  });

  onKeyDown("left", () => {
    dino.move(-SPEED, 0);
    dino.flipX = true;
    if (dino.curAnim() !== "walk" && dino.isGrounded()) {
      dino.play("walk");
    }
  });

  onKeyDown("right", () => {
    dino.move(SPEED, 0);
    dino.flipX = false;
    if (dino.curAnim() !== "walk" && dino.isGrounded()) {
      dino.play("walk");
    }
  });

  onKeyRelease(["left", "right"], () => {
    if (dino.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
      dino.play("idle");
    }
  });

  onUpdate(() => {
    const camX = Math.max(dino.pos.x, width() / 2);
    camPos(vec2(camX, height() - height() / 2));

    background.pos = vec2(camPos().x - width() / 2, camPos().y - height() / 2);

    if (!dino.isGrounded()) {
      if (dino.curAnim() !== "jump") dino.play("jump");
    } else if (isKeyDown("left") || isKeyDown("right")) {
      if (dino.curAnim() !== "walk") dino.play("walk");
    } else {
      if (dino.curAnim() !== "idle") dino.play("idle");
    }
  });
});

go("start");
