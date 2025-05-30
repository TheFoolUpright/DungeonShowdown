
// You can write more code here

/* START OF COMPILED CODE */

class PrefabOpponent extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// container_1
		const container_1 = scene.add.container(0, 0);
		this.add(container_1);

		// character
		const character = scene.add.image(0, 30, "Character");
		character.scaleX = 0.6;
		character.scaleY = 0.6;
		character.setOrigin(0.56, 0.5);
		container_1.add(character);

		// opponentName
		const opponentName = scene.add.text(0, -450, "", {});
		opponentName.setOrigin(0.5, 0);
		opponentName.text = "Username";
		opponentName.setStyle({ "fontFamily": "Rockey", "fontSize": "48px", "stroke": "#000000ff", "strokeThickness":10});
		container_1.add(opponentName);

		this.character = character;
		this.opponentName = opponentName;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	character;
	/** @type {Phaser.GameObjects.Text} */
	opponentName;
	/** @type {boolean} */
	anger = false;
	/** @type {boolean} */
	rage = false;
	/** @type {boolean} */
	adrenaline = false;
	/** @type {boolean} */
	focus = false;
	/** @type {boolean} */
	heal = false;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
