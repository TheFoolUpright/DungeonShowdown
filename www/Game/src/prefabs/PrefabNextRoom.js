
// You can write more code here

/* START OF COMPILED CODE */

class PrefabNextRoom extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.setInteractive(new Phaser.Geom.Rectangle(-125, -75, 250, 150), Phaser.Geom.Rectangle.Contains);

		// confirm___End_Turn_Button_1
		const confirm___End_Turn_Button_1 = scene.add.image(0, 0, "Confirm & End Turn Button");
		this.add(confirm___End_Turn_Button_1);

		// nextRoom
		const nextRoom = scene.add.text(0, 0, "", {});
		nextRoom.setOrigin(0.5, 0.5);
		nextRoom.text = "Onward!";
		nextRoom.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "32px" });
		this.add(nextRoom);

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

		this.confirm___End_Turn_Button_1 = confirm___End_Turn_Button_1;
		this.nextRoom = nextRoom;
		this.pushActionScript = pushActionScript;
		this.onPointerDownScript = onPointerDownScript;
		this.moveInSceneActionScript = moveInSceneActionScript;
		this.onAwakeScript = onAwakeScript;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	confirm___End_Turn_Button_1;
	/** @type {Phaser.GameObjects.Text} */
	nextRoom;
	/** @type {PushActionScript} */
	pushActionScript;
	/** @type {OnPointerDownScript} */
	onPointerDownScript;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript;
	/** @type {OnAwakeScript} */
	onAwakeScript;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
