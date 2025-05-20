
// You can write more code here

/* START OF COMPILED CODE */

class PrefabInfo extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// playerName
		const playerName = scene.add.text(0, 100, "", {});
		playerName.setOrigin(0.5, 0);
		playerName.text = "Username";
		playerName.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff", "strokeThickness":10});
		this.add(playerName);

		// phaseName
		const phaseName = scene.add.text(0, 0, "", {});
		phaseName.setOrigin(0.5, 0);
		phaseName.text = "DUNGEON";
		phaseName.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Rockey", "fontSize": "32px", "stroke": "#000000ff", "strokeThickness":10});
		this.add(phaseName);

		// roomOrTurn
		const roomOrTurn = scene.add.text(0, 40, "", {});
		roomOrTurn.setOrigin(0.5, 0);
		roomOrTurn.text = "Room 1";
		roomOrTurn.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff", "strokeThickness":10});
		this.add(roomOrTurn);

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
