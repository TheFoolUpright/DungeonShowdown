
// You can write more code here

/* START OF COMPILED CODE */

class PrefabCard extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.setInteractive(new Phaser.Geom.Rectangle(-79.75, -118.525, 159.5, 237.05), Phaser.Geom.Rectangle.Contains);

		// empty_Card
		const empty_Card = scene.add.image(0, 0, "Empty Card_1");
		this.add(empty_Card);

		// glowFx
		empty_Card.preFX.addGlow(16777215, 0, 0, false);

		// cardName
		const cardName = scene.add.text(0, -190, "", {});
		cardName.setOrigin(0.5, 0);
		cardName.text = "Normal Attack\n";
		cardName.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px" });
		this.add(cardName);

		// cardDescription
		const cardDescription = scene.add.text(0, 80, "", {});
		cardDescription.setOrigin(0.5, 0);
		cardDescription.text = "Take no damage from one of the opponent's attacks and hit them back for half of their _";
		cardDescription.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px" });
		cardDescription.setWordWrapWidth(248);
		this.add(cardDescription);

		// cardBorder
		const cardBorder = scene.add.image(0, 0, "CardBorder");
		cardBorder.tintFill = true;
		cardBorder.tintTopLeft = 15075336;
		cardBorder.tintTopRight = 15075336;
		cardBorder.tintBottomLeft = 15075336;
		cardBorder.tintBottomRight = 15075336;
		this.add(cardBorder);

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

		this.cardName = cardName;
		this.cardDescription = cardDescription;
		this.pushActionScript = pushActionScript;
		this.onPointerDownScript = onPointerDownScript;
		this.moveInSceneActionScript = moveInSceneActionScript;
		this.onAwakeScript = onAwakeScript;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	cardName;
	/** @type {Phaser.GameObjects.Text} */
	cardDescription;
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
	/** @type {boolean} */
	isSelected = 0;
	/** @type {boolean} */
	isDisabled = false;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
