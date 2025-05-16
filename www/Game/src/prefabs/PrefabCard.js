
// You can write more code here

/* START OF COMPILED CODE */

class PrefabCard extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.setInteractive(new Phaser.Geom.Rectangle(-79.75, -118.525, 159.5, 237.05), Phaser.Geom.Rectangle.Contains);

		// empty_Card
		const empty_Card = scene.add.image(0, 0, "Empty Card");
		empty_Card.scaleX = 0.55;
		empty_Card.scaleY = 0.55;
		this.add(empty_Card);

		// cardName
		const cardName = scene.add.text(0, -108, "", {});
		cardName.setOrigin(0.5, 0);
		cardName.text = "Normal Attack\n";
		cardName.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth":128,"fontFamily": "Rockey" });
		this.add(cardName);

		// cardDescription
		const cardDescription = scene.add.text(0, 40, "", {});
		cardDescription.setOrigin(0.5, 0);
		cardDescription.text = "Take no damage from one of the opponent's attacks and hit them back for half of their _";
		cardDescription.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth":128,"fontFamily": "Rockey", "fontSize": "13px" });
		cardDescription.setWordWrapWidth(128);
		this.add(cardDescription);

		// cardImage
		const cardImage = scene.add.image(0, -20, "_MISSING");
		this.add(cardImage);

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(this);

		// pushActionScript
		const pushActionScript = new PushActionScript(onPointerDownScript);

		// setYActionScript
		const setYActionScript = new SetYActionScript(onPointerDownScript);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// setYActionScript (prefab fields)
		setYActionScript.y = 400;

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "BOTTOM";

		this.pushActionScript = pushActionScript;
		this.onPointerDownScript = onPointerDownScript;
		this.moveInSceneActionScript = moveInSceneActionScript;
		this.onAwakeScript = onAwakeScript;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {PushActionScript} */
	pushActionScript;
	/** @type {OnPointerDownScript} */
	onPointerDownScript;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript;
	/** @type {OnAwakeScript} */
	onAwakeScript;
	/** @type {number} */
	cardId = 0;
	/** @type {boolean} */
	isVisible = true;
	/** @type {number} */
	slotId = 0;
	/** @type {boolean} */
	isDisabled = false;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
