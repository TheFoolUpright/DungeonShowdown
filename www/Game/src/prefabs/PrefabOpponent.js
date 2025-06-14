
// You can write more code here

/* START OF COMPILED CODE */

class PrefabOpponent extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// character
		const character = scene.add.image(0, 30, "Character");
		character.setOrigin(0.56, 0.5);
		this.add(character);

		// characterRipped1
		const characterRipped1 = scene.add.image(0, 30, "Character Ripped 1");
		characterRipped1.setOrigin(0.56, 0.5);
		characterRipped1.visible = false;
		this.add(characterRipped1);

		// characterRipped2
		const characterRipped2 = scene.add.image(0, 30, "Character Ripped 2");
		characterRipped2.setOrigin(0.56, 0.5);
		characterRipped2.visible = false;
		this.add(characterRipped2);

		// characterColor
		const characterColor = scene.add.image(0, 30, "CharacterColor");
		characterColor.setOrigin(0.56, 0.5);
		this.add(characterColor);

		// opponentName
		const opponentName = scene.add.text(0, -450, "", {});
		opponentName.setOrigin(0.5, 0);
		opponentName.text = "Username";
		opponentName.setStyle({ "fontFamily": "Rockey", "fontSize": "48px", "stroke": "#000000ff", "strokeThickness":10});
		this.add(opponentName);

		this.character = character;
		this.characterRipped1 = characterRipped1;
		this.characterRipped2 = characterRipped2;
		this.characterColor = characterColor;
		this.opponentName = opponentName;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	character;
	/** @type {Phaser.GameObjects.Image} */
	characterRipped1;
	/** @type {Phaser.GameObjects.Image} */
	characterRipped2;
	/** @type {Phaser.GameObjects.Image} */
	characterColor;
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
