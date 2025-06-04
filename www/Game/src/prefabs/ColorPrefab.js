
// You can write more code here

/* START OF COMPILED CODE */

class ColorPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 129, y ?? 97);

		this.setInteractive(new Phaser.Geom.Rectangle(-30, -30, 60, 60), Phaser.Geom.Rectangle.Contains);

		// colorFill
		const colorFill = scene.add.image(0, 0, "ColorFill");
		colorFill.tintTopLeft = 12527913;
		this.add(colorFill);

		// glowFx
		const glowFx = colorFill.preFX.addGlow(16777215, 4, 0, false);

		// colorOutline
		const colorOutline = scene.add.image(0, 0, "ColorOutline");
		this.add(colorOutline);

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(this);

		// pushActionScript
		const pushActionScript = new PushActionScript(onPointerDownScript);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "RIGHT";

		this.glowFx = glowFx;
		this.colorFill = colorFill;
		this.colorOutline = colorOutline;
		this.pushActionScript = pushActionScript;
		this.onPointerDownScript = onPointerDownScript;
		this.moveInSceneActionScript = moveInSceneActionScript;
		this.onAwakeScript = onAwakeScript;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.FX.Glow} */
	glowFx;
	/** @type {Phaser.GameObjects.Image} */
	colorFill;
	/** @type {Phaser.GameObjects.Image} */
	colorOutline;
	/** @type {PushActionScript} */
	pushActionScript;
	/** @type {OnPointerDownScript} */
	onPointerDownScript;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript;
	/** @type {OnAwakeScript} */
	onAwakeScript;
	/** @type {boolean} */
	isSelected = false;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
