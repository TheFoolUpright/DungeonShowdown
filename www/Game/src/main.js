
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1920,
		height: 1080,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("JoinMatch", JoinMatch);
	game.scene.add("WaitingForMatch", WaitingForMatch);
	game.scene.add("Dungeon", Dungeon);
	game.scene.add("DungeonWaitingOnOpponent", DungeonWaitingOnOpponent);
	game.scene.add("DungeonResult", DungeonResult);
	game.scene.add("Showdown", Showdown);
	game.scene.add("ShowdownWaitingOnOpponent", ShowdownWaitingOnOpponent);
	game.scene.add("ShowdownResult", ShowdownResult);

	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

		this.scene.start("Preload");
	}
}