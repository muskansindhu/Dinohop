import kaboom from "kaboom"

kaboom({
	background: [74, 48, 82]
})

loadSprite("bean", "sprites/bean.png")

const FLOOR_HEIGHT = 100;
const JUMP_FORCE = 700;
const SPEED = 480;


scene("game", () => {

	setGravity(1000)

	const bean = add([
		sprite("bean"),
		pos(80, 710),
		area(),
		body(),
	])
	
	add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);
	
	function spawnTree() {
		add([
			rect(48, rand(24, 64)),
			area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			anchor("botleft"),
			color(255, 180, 255),
			move(LEFT, SPEED),
			"tree", 
		]);
		wait(rand(1.25, 1.75), () => {
			spawnTree();
		});
	}

	function jump() {
        if (bean.isGrounded()) {
            bean.jump(JUMP_FORCE);
        }
    }

    onKeyPress("space", jump);
    onClick(jump);
	
	spawnTree();

	
	bean.onCollide("tree", () => {
		shake();
		go("lose", score);
	});

	let score = 0;
	const scoreLabel = add([
		text(score),
		pos(24, 24)
	])

	onUpdate(() => {
		score++;
		scoreLabel.text = score;
	});

});


scene("lose", (score) => {

    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});

go("game")
