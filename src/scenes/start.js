export default function startScene() {
  add([
    text("Press Enter to Start", { size: 42 }),
    pos(width() / 2, height() / 2),
    anchor("center"),
  ]);

  onKeyPress("enter", () => go("game"));
}
