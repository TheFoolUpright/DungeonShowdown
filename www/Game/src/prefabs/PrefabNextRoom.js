
// You can write more code here

/* START OF COMPILED CODE */

class PrefabNextRoom extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? null, y ?? null);

		// confirm___End_Turn_Button_1
		const confirm___End_Turn_Button_1 = scene.add.image(0, 0, "Confirm & End Turn Button");
		confirm___End_Turn_Button_1.scaleX = 0.5;
		confirm___End_Turn_Button_1.scaleY = 0.5;
		this.add(confirm___End_Turn_Button_1);

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(this);

		// pushActionScript
		new PushActionScript(onPointerDownScript);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// nextRoom
		const nextRoom = scene.add.text(null, -12, "", {});
		nextRoom.setOrigin(0.5, 0);
		nextRoom.text = "Onward!";
		nextRoom.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Rockey" });
		this.add(nextRoom);

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "RIGHT";

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
