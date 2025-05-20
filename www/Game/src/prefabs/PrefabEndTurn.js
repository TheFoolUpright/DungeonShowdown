
// You can write more code here

/* START OF COMPILED CODE */

class PrefabEndTurn extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.setInteractive(new Phaser.Geom.Rectangle(-68.75, -41.25, 137.5, 82.5), Phaser.Geom.Rectangle.Contains);

		// confirm___End_Turn_Button
		const confirm___End_Turn_Button = scene.add.image(0, 0, "Confirm & End Turn Button");
		this.add(confirm___End_Turn_Button);

		// endTurn
		const endTurn = scene.add.text(0, -16, "", {});
		endTurn.setOrigin(0.5, 0);
		endTurn.text = "Rip and Tear!";
		endTurn.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "32px" });
		this.add(endTurn);

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(this);

		// pushActionScript
		new PushActionScript(onPointerDownScript);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

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
