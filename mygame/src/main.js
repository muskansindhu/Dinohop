import kaboom from "kaboom";

kaboom();

loadSprite("bg", "sprites/bg.png");
loadSprite("tile", "sprites/obstacle.png", {
  sliceX: 3,
  sliceY: 4,
});
loadSprite("rock", "sprites/obstacle1.png", {
  sliceX: 6,
  sliceY: 3,
});
loadSprite("dino", "sprites/dino.png", {
  sliceX: 10,
  sliceY: 3,
  anims: {
    idle: {
      from: 0,
      to: 5,
      loop: true,
      speed: 10,
    },
    walk: {
      from: 11,
      to: 15,
      speed: 10,
    },
    jump: {
      from: 21,
      to: 29,
      speed: 7,
    },
  },
});

const FLOOR_HEIGHT = 150;
const TILE_SCALE = 4;
const TILE_FRAME = 0;
const TILE_WIDTH = 16 * TILE_SCALE;
const TILE_FLOOR_Y = height() + FLOOR_HEIGHT - 15;
const TILE_LEFT_OFFSET = -70;
const SPEED = 200;

setGravity(1600);
add([sprite("bg", { width: width(), height: height() })]);

const dino = add([
  sprite("dino", { anim: "idle" }),
  pos(0, height() - FLOOR_HEIGHT),
  scale(4),
  area(),
  body(),
]);

for (let x = TILE_LEFT_OFFSET; x < width(); x += TILE_WIDTH) {
  add([
    sprite("tile", { frame: TILE_FRAME }),
    pos(x, TILE_FLOOR_Y),
    scale(TILE_SCALE),
    anchor("botleft"),
    area({ scale: 0.5 }),
    body({ isStatic: true }),
  ]);
}

onKeyPress("space", () => {
  if (dino.isGrounded()) {
    dino.jump();
    dino.play("jump");
  }
});

onKeyDown("left", () => {
  if (dino.isGrounded()) {
    dino.move(-SPEED, 0);
    dino.flipX = true;
    if (dino.curAnim() !== "walk") {
      dino.play("walk");
    }
  }
});

onKeyDown("right", () => {
  if (dino.isGrounded()) {
    dino.move(SPEED, 0);
    dino.flipX = false;
    if (dino.curAnim() !== "walk") {
      dino.play("walk");
    }
  }
});

onKeyRelease(["left", "right"], () => {
  if (dino.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
    dino.play("idle");
  }
});

onUpdate(() => {
  if (!dino.isGrounded()) return;

  if (isKeyDown("left") || isKeyDown("right")) {
    if (dino.curAnim() !== "walk") {
      dino.play("walk");
    }
  } else {
    if (dino.curAnim() !== "idle") {
      dino.play("idle");
    }
  }
});
