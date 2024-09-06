import kaboom from "kaboom"

kaboom({
	background: [74, 48, 82]
})

loadSprite("bean", "sprites/bean.png")

let currentIntensity = 0;

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function getAudioIntensity() {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      currentIntensity = Math.round((average / 255) * 100);
      requestAnimationFrame(getAudioIntensity);
    }

    getAudioIntensity();
  })
  .catch(function(error) {
    console.error("Error accessing audio stream:", error);
  });

const FLOOR_HEIGHT = 100;
const SPEED = 480;

scene("game", () => {
	setGravity(1600)

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
            const JUMP_FORCE = 400 + 10 * currentIntensity;  
            bean.jump(JUMP_FORCE);
        }
    }

    onUpdate(() => {
        if (currentIntensity > 30) { 
            jump();
        }
    });

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
