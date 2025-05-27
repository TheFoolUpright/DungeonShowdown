
// You can write more code here

/* START OF COMPILED CODE */

class PrefabCard extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.setInteractive(new Phaser.Geom.Rectangle(-150, -218, 300, 436.4214080647836), Phaser.Geom.Rectangle.Contains);

		// cardDescription
		const cardDescription = scene.add.text(0, -260, "", {});
		cardDescription.setOrigin(0.5, 1);
		cardDescription.visible = false;
		cardDescription.text = "Take no damage from one of the opponent's attacks and hit them back for half of their _";
		cardDescription.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Rockey", "fontSize": "32px", "stroke": "#000000ff", "strokeThickness":12});
		cardDescription.setPadding({"left":5,"top":5,"right":5,"bottom":5});
		cardDescription.setWordWrapWidth(324);
		this.add(cardDescription);

		// empty_Card
		const empty_Card = scene.add.image(0, 0, "Empty Card_1");
		this.add(empty_Card);

		// cardGlow
		const cardGlow = empty_Card.preFX.addGlow(16777215, 10, 0, false);

		// cardName
		const cardName = scene.add.text(0, -175, "", {});
		cardName.setOrigin(0.5, 0.5);
		cardName.text = "Normal Attack";
		cardName.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff", "strokeThickness":10});
		this.add(cardName);

		// cardBorder
		const cardBorder = scene.add.image(0, 0, "CardBorder");
		this.add(cardBorder);

		// opponentContainer
		const opponentContainer = scene.add.container(0, 0);
		opponentContainer.visible = false;
		this.add(opponentContainer);

		// option1RewardIcon
		const option1RewardIcon = scene.add.image(0, 130, "HiddenDraft");
		option1RewardIcon.scaleX = 0.3;
		option1RewardIcon.scaleY = 0.3;
		opponentContainer.add(option1RewardIcon);

		// option1Container
		const option1Container = scene.add.container(0, 0);
		option1Container.visible = false;
		this.add(option1Container);

		// option1RewardIcon1
		const option1RewardIcon1 = scene.add.image(-15, 130, "HiddenDraft");
		option1Container.add(option1RewardIcon1);

		// option1RewardText1
		const option1RewardText1 = scene.add.text(15, 130, "", {});
		option1RewardText1.setOrigin(0.5, 0.5);
		option1RewardText1.text = "+ 5";
		option1RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1Container.add(option1RewardText1);

		// option2Container
		const option2Container = scene.add.container(0, 0);
		option2Container.visible = false;
		this.add(option2Container);

		// option2RewardIcon1
		const option2RewardIcon1 = scene.add.image(-50, 130, "HiddenDraft");
		option2Container.add(option2RewardIcon1);

		// option2RewardText2
		const option2RewardText2 = scene.add.text(60, 130, "", {});
		option2RewardText2.setOrigin(0.5, 0.5);
		option2RewardText2.text = "+ 5";
		option2RewardText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2Container.add(option2RewardText2);

		// option2RewardIcon2
		const option2RewardIcon2 = scene.add.image(30, 130, "HiddenDraft");
		option2Container.add(option2RewardIcon2);

		// option2RewardText1
		const option2RewardText1 = scene.add.text(-20, 130, "", {});
		option2RewardText1.setOrigin(0.5, 0.5);
		option2RewardText1.text = "+ 5";
		option2RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2Container.add(option2RewardText1);

		// option1_1Container
		const option1_1Container = scene.add.container(0, 0);
		option1_1Container.visible = false;
		this.add(option1_1Container);

		// option1_1CostText1
		const option1_1CostText1 = scene.add.text(15, 100, "", {});
		option1_1CostText1.setOrigin(0.5, 0.5);
		option1_1CostText1.text = "- 5";
		option1_1CostText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_1Container.add(option1_1CostText1);

		// option1_1CostIcon1
		const option1_1CostIcon1 = scene.add.image(-15, 100, "HiddenDraft");
		option1_1Container.add(option1_1CostIcon1);

		// option1_1RewardIcon1
		const option1_1RewardIcon1 = scene.add.image(-15, 160, "HiddenDraft");
		option1_1Container.add(option1_1RewardIcon1);

		// option1_1RewardText1
		const option1_1RewardText1 = scene.add.text(15, 160, "", {});
		option1_1RewardText1.setOrigin(0.5, 0.5);
		option1_1RewardText1.text = "+ 5";
		option1_1RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_1Container.add(option1_1RewardText1);

		// option1_2Container
		const option1_2Container = scene.add.container(0, 0);
		option1_2Container.visible = false;
		this.add(option1_2Container);

		// option1_2CostText1
		const option1_2CostText1 = scene.add.text(15, 100, "", {});
		option1_2CostText1.setOrigin(0.5, 0.5);
		option1_2CostText1.text = "- 5";
		option1_2CostText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_2Container.add(option1_2CostText1);

		// option1_2CostIcon1
		const option1_2CostIcon1 = scene.add.image(-15, 100, "HiddenDraft");
		option1_2Container.add(option1_2CostIcon1);

		// option1_2RewardIcon1
		const option1_2RewardIcon1 = scene.add.image(-50, 160, "HiddenDraft");
		option1_2Container.add(option1_2RewardIcon1);

		// option1_2RewardText1
		const option1_2RewardText1 = scene.add.text(-20, 160, "", {});
		option1_2RewardText1.setOrigin(0.5, 0.5);
		option1_2RewardText1.text = "+ 5";
		option1_2RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_2Container.add(option1_2RewardText1);

		// option1_2RewardIcon2
		const option1_2RewardIcon2 = scene.add.image(30, 160, "HiddenDraft");
		option1_2Container.add(option1_2RewardIcon2);

		// option1_2RewardText2
		const option1_2RewardText2 = scene.add.text(60, 160, "", {});
		option1_2RewardText2.setOrigin(0.5, 0.5);
		option1_2RewardText2.text = "+ 5";
		option1_2RewardText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_2Container.add(option1_2RewardText2);

		// option2_1Container
		const option2_1Container = scene.add.container(0, 0);
		option2_1Container.visible = false;
		this.add(option2_1Container);

		// option2_1RewardText1
		const option2_1RewardText1 = scene.add.text(15, 160, "", {});
		option2_1RewardText1.setOrigin(0.5, 0.5);
		option2_1RewardText1.text = "+ 5";
		option2_1RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_1Container.add(option2_1RewardText1);

		// option2_1RewardIcon1
		const option2_1RewardIcon1 = scene.add.image(-15, 160, "HiddenDraft");
		option2_1Container.add(option2_1RewardIcon1);

		// option2_1CostIcon1
		const option2_1CostIcon1 = scene.add.image(-50, 100, "HiddenDraft");
		option2_1Container.add(option2_1CostIcon1);

		// option2_1CostText1
		const option2_1CostText1 = scene.add.text(-20, 100, "", {});
		option2_1CostText1.setOrigin(0.5, 0.5);
		option2_1CostText1.text = "- 5";
		option2_1CostText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_1Container.add(option2_1CostText1);

		// option2_1CostIcon2
		const option2_1CostIcon2 = scene.add.image(30, 100, "HiddenDraft");
		option2_1Container.add(option2_1CostIcon2);

		// option2_1CostText2
		const option2_1CostText2 = scene.add.text(60, 100, "", {});
		option2_1CostText2.setOrigin(0.5, 0.5);
		option2_1CostText2.text = "- 5";
		option2_1CostText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_1Container.add(option2_1CostText2);

		// option1_3Container
		const option1_3Container = scene.add.container(0, 0);
		option1_3Container.visible = false;
		this.add(option1_3Container);

		// option1_3RewardIcon1
		const option1_3RewardIcon1 = scene.add.image(-95, 160, "HiddenDraft");
		option1_3Container.add(option1_3RewardIcon1);

		// option1_3RewardText1
		const option1_3RewardText1 = scene.add.text(-65, 160, "", {});
		option1_3RewardText1.setOrigin(0.5, 0.5);
		option1_3RewardText1.text = "+ 5";
		option1_3RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_3Container.add(option1_3RewardText1);

		// option1_3RewardText2
		const option1_3RewardText2 = scene.add.text(15, 160, "", {});
		option1_3RewardText2.setOrigin(0.5, 0.5);
		option1_3RewardText2.text = "+ 5";
		option1_3RewardText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_3Container.add(option1_3RewardText2);

		// option1_3RewardIcon2
		const option1_3RewardIcon2 = scene.add.image(-15, 160, "HiddenDraft");
		option1_3Container.add(option1_3RewardIcon2);

		// option1_3RewardIcon3
		const option1_3RewardIcon3 = scene.add.image(65, 160, "HiddenDraft");
		option1_3Container.add(option1_3RewardIcon3);

		// option1_3RewardText3
		const option1_3RewardText3 = scene.add.text(95, 160, "", {});
		option1_3RewardText3.setOrigin(0.5, 0.5);
		option1_3RewardText3.text = "+ 5";
		option1_3RewardText3.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_3Container.add(option1_3RewardText3);

		// option1_3CostIcon1
		const option1_3CostIcon1 = scene.add.image(-15, 100, "HiddenDraft");
		option1_3Container.add(option1_3CostIcon1);

		// option1_3CostText1
		const option1_3CostText1 = scene.add.text(15, 100, "", {});
		option1_3CostText1.setOrigin(0.5, 0.5);
		option1_3CostText1.text = "- 5";
		option1_3CostText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option1_3Container.add(option1_3CostText1);

		// option2_2Container
		const option2_2Container = scene.add.container(0, 0);
		option2_2Container.visible = false;
		this.add(option2_2Container);

		// option2_2CostIcon1
		const option2_2CostIcon1 = scene.add.image(-50, 100, "HiddenDraft");
		option2_2Container.add(option2_2CostIcon1);

		// option2_2CostText1
		const option2_2CostText1 = scene.add.text(-20, 100, "", {});
		option2_2CostText1.setOrigin(0.5, 0.5);
		option2_2CostText1.text = "- 5";
		option2_2CostText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_2Container.add(option2_2CostText1);

		// option2_2CostIcon2
		const option2_2CostIcon2 = scene.add.image(30, 100, "HiddenDraft");
		option2_2Container.add(option2_2CostIcon2);

		// option2_2CostText2
		const option2_2CostText2 = scene.add.text(62, 100, "", {});
		option2_2CostText2.setOrigin(0.5, 0.5);
		option2_2CostText2.text = "- 5";
		option2_2CostText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_2Container.add(option2_2CostText2);

		// option2_2RewardIcon1
		const option2_2RewardIcon1 = scene.add.image(-50, 160, "HiddenDraft");
		option2_2Container.add(option2_2RewardIcon1);

		// option2_2RewardText2
		const option2_2RewardText2 = scene.add.text(60, 160, "", {});
		option2_2RewardText2.setOrigin(0.5, 0.5);
		option2_2RewardText2.text = "+ 5";
		option2_2RewardText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_2Container.add(option2_2RewardText2);

		// option2_2RewardIcon2
		const option2_2RewardIcon2 = scene.add.image(30, 160, "HiddenDraft");
		option2_2Container.add(option2_2RewardIcon2);

		// option2_2RewardText1
		const option2_2RewardText1 = scene.add.text(-20, 160, "", {});
		option2_2RewardText1.setOrigin(0.5, 0.5);
		option2_2RewardText1.text = "+ 5";
		option2_2RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_2Container.add(option2_2RewardText1);

		// option2_3Container
		const option2_3Container = scene.add.container(0, 1);
		option2_3Container.visible = false;
		this.add(option2_3Container);

		// option2_3RewardIcon1
		const option2_3RewardIcon1 = scene.add.image(-95, 160, "HiddenDraft");
		option2_3Container.add(option2_3RewardIcon1);

		// option2_3RewardText1
		const option2_3RewardText1 = scene.add.text(-65, 160, "", {});
		option2_3RewardText1.setOrigin(0.5, 0.5);
		option2_3RewardText1.text = "+ 5";
		option2_3RewardText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_3Container.add(option2_3RewardText1);

		// option2_3RewardText2
		const option2_3RewardText2 = scene.add.text(15, 160, "", {});
		option2_3RewardText2.setOrigin(0.5, 0.5);
		option2_3RewardText2.text = "+ 5";
		option2_3RewardText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_3Container.add(option2_3RewardText2);

		// option2_3RewardIcon2
		const option2_3RewardIcon2 = scene.add.image(-15, 160, "HiddenDraft");
		option2_3Container.add(option2_3RewardIcon2);

		// option2_3RewardIcon3
		const option2_3RewardIcon3 = scene.add.image(65, 160, "HiddenDraft");
		option2_3Container.add(option2_3RewardIcon3);

		// option2_3RewardText3
		const option2_3RewardText3 = scene.add.text(95, 160, "", {});
		option2_3RewardText3.setOrigin(0.5, 0.5);
		option2_3RewardText3.text = "+ 5";
		option2_3RewardText3.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_3Container.add(option2_3RewardText3);

		// option2_3CostIcon1
		const option2_3CostIcon1 = scene.add.image(-50, 100, "HiddenDraft");
		option2_3Container.add(option2_3CostIcon1);

		// option2_3CostText1
		const option2_3CostText1 = scene.add.text(-20, 100, "", {});
		option2_3CostText1.setOrigin(0.5, 0.5);
		option2_3CostText1.text = "- 5";
		option2_3CostText1.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_3Container.add(option2_3CostText1);

		// option2_3CostIcon2
		const option2_3CostIcon2 = scene.add.image(30, 100, "HiddenDraft");
		option2_3Container.add(option2_3CostIcon2);

		// option2_3CostText2
		const option2_3CostText2 = scene.add.text(60, 100, "", {});
		option2_3CostText2.setOrigin(0.5, 0.5);
		option2_3CostText2.text = "- 5";
		option2_3CostText2.setStyle({ "color": "#000000ff", "fontFamily": "Rockey", "fontSize": "24px", "stroke": "#000000ff" });
		option2_3Container.add(option2_3CostText2);

		// cardImage
		const cardImage = scene.add.image(0, -37, "_MISSING");
		this.add(cardImage);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		this.cardDescription = cardDescription;
		this.cardGlow = cardGlow;
		this.empty_Card = empty_Card;
		this.cardName = cardName;
		this.cardBorder = cardBorder;
		this.option1RewardIcon = option1RewardIcon;
		this.opponentContainer = opponentContainer;
		this.option1RewardIcon1 = option1RewardIcon1;
		this.option1RewardText1 = option1RewardText1;
		this.option1Container = option1Container;
		this.option2RewardIcon1 = option2RewardIcon1;
		this.option2RewardText2 = option2RewardText2;
		this.option2RewardIcon2 = option2RewardIcon2;
		this.option2RewardText1 = option2RewardText1;
		this.option2Container = option2Container;
		this.option1_1CostText1 = option1_1CostText1;
		this.option1_1CostIcon1 = option1_1CostIcon1;
		this.option1_1RewardIcon1 = option1_1RewardIcon1;
		this.option1_1RewardText1 = option1_1RewardText1;
		this.option1_1Container = option1_1Container;
		this.option1_2CostText1 = option1_2CostText1;
		this.option1_2CostIcon1 = option1_2CostIcon1;
		this.option1_2RewardIcon1 = option1_2RewardIcon1;
		this.option1_2RewardText1 = option1_2RewardText1;
		this.option1_2RewardIcon2 = option1_2RewardIcon2;
		this.option1_2RewardText2 = option1_2RewardText2;
		this.option1_2Container = option1_2Container;
		this.option2_1RewardText1 = option2_1RewardText1;
		this.option2_1RewardIcon1 = option2_1RewardIcon1;
		this.option2_1CostIcon1 = option2_1CostIcon1;
		this.option2_1CostText1 = option2_1CostText1;
		this.option2_1CostIcon2 = option2_1CostIcon2;
		this.option2_1CostText2 = option2_1CostText2;
		this.option2_1Container = option2_1Container;
		this.option1_3RewardIcon1 = option1_3RewardIcon1;
		this.option1_3RewardText1 = option1_3RewardText1;
		this.option1_3RewardText2 = option1_3RewardText2;
		this.option1_3RewardIcon2 = option1_3RewardIcon2;
		this.option1_3RewardIcon3 = option1_3RewardIcon3;
		this.option1_3RewardText3 = option1_3RewardText3;
		this.option1_3CostIcon1 = option1_3CostIcon1;
		this.option1_3CostText1 = option1_3CostText1;
		this.option1_3Container = option1_3Container;
		this.option2_2CostIcon1 = option2_2CostIcon1;
		this.option2_2CostText1 = option2_2CostText1;
		this.option2_2CostIcon2 = option2_2CostIcon2;
		this.option2_2CostText2 = option2_2CostText2;
		this.option2_2RewardIcon1 = option2_2RewardIcon1;
		this.option2_2RewardText2 = option2_2RewardText2;
		this.option2_2RewardIcon2 = option2_2RewardIcon2;
		this.option2_2RewardText1 = option2_2RewardText1;
		this.option2_2Container = option2_2Container;
		this.option2_3RewardIcon1 = option2_3RewardIcon1;
		this.option2_3RewardText1 = option2_3RewardText1;
		this.option2_3RewardText2 = option2_3RewardText2;
		this.option2_3RewardIcon2 = option2_3RewardIcon2;
		this.option2_3RewardIcon3 = option2_3RewardIcon3;
		this.option2_3RewardText3 = option2_3RewardText3;
		this.option2_3CostIcon1 = option2_3CostIcon1;
		this.option2_3CostText1 = option2_3CostText1;
		this.option2_3CostIcon2 = option2_3CostIcon2;
		this.option2_3CostText2 = option2_3CostText2;
		this.option2_3Container = option2_3Container;
		this.cardImage = cardImage;
		this.onAwakeScript = onAwakeScript;

		/* START-USER-CTR-CODE */
		// Write your code here.

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	cardDescription;
	/** @type {Phaser.FX.Glow} */
	cardGlow;
	/** @type {Phaser.GameObjects.Image} */
	empty_Card;
	/** @type {Phaser.GameObjects.Text} */
	cardName;
	/** @type {Phaser.GameObjects.Image} */
	cardBorder;
	/** @type {Phaser.GameObjects.Image} */
	option1RewardIcon;
	/** @type {Phaser.GameObjects.Container} */
	opponentContainer;
	/** @type {Phaser.GameObjects.Image} */
	option1RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option1RewardText1;
	/** @type {Phaser.GameObjects.Container} */
	option1Container;
	/** @type {Phaser.GameObjects.Image} */
	option2RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option2RewardText2;
	/** @type {Phaser.GameObjects.Image} */
	option2RewardIcon2;
	/** @type {Phaser.GameObjects.Text} */
	option2RewardText1;
	/** @type {Phaser.GameObjects.Container} */
	option2Container;
	/** @type {Phaser.GameObjects.Text} */
	option1_1CostText1;
	/** @type {Phaser.GameObjects.Image} */
	option1_1CostIcon1;
	/** @type {Phaser.GameObjects.Image} */
	option1_1RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option1_1RewardText1;
	/** @type {Phaser.GameObjects.Container} */
	option1_1Container;
	/** @type {Phaser.GameObjects.Text} */
	option1_2CostText1;
	/** @type {Phaser.GameObjects.Image} */
	option1_2CostIcon1;
	/** @type {Phaser.GameObjects.Image} */
	option1_2RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option1_2RewardText1;
	/** @type {Phaser.GameObjects.Image} */
	option1_2RewardIcon2;
	/** @type {Phaser.GameObjects.Text} */
	option1_2RewardText2;
	/** @type {Phaser.GameObjects.Container} */
	option1_2Container;
	/** @type {Phaser.GameObjects.Text} */
	option2_1RewardText1;
	/** @type {Phaser.GameObjects.Image} */
	option2_1RewardIcon1;
	/** @type {Phaser.GameObjects.Image} */
	option2_1CostIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option2_1CostText1;
	/** @type {Phaser.GameObjects.Image} */
	option2_1CostIcon2;
	/** @type {Phaser.GameObjects.Text} */
	option2_1CostText2;
	/** @type {Phaser.GameObjects.Container} */
	option2_1Container;
	/** @type {Phaser.GameObjects.Image} */
	option1_3RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option1_3RewardText1;
	/** @type {Phaser.GameObjects.Text} */
	option1_3RewardText2;
	/** @type {Phaser.GameObjects.Image} */
	option1_3RewardIcon2;
	/** @type {Phaser.GameObjects.Image} */
	option1_3RewardIcon3;
	/** @type {Phaser.GameObjects.Text} */
	option1_3RewardText3;
	/** @type {Phaser.GameObjects.Image} */
	option1_3CostIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option1_3CostText1;
	/** @type {Phaser.GameObjects.Container} */
	option1_3Container;
	/** @type {Phaser.GameObjects.Image} */
	option2_2CostIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option2_2CostText1;
	/** @type {Phaser.GameObjects.Image} */
	option2_2CostIcon2;
	/** @type {Phaser.GameObjects.Text} */
	option2_2CostText2;
	/** @type {Phaser.GameObjects.Image} */
	option2_2RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option2_2RewardText2;
	/** @type {Phaser.GameObjects.Image} */
	option2_2RewardIcon2;
	/** @type {Phaser.GameObjects.Text} */
	option2_2RewardText1;
	/** @type {Phaser.GameObjects.Container} */
	option2_2Container;
	/** @type {Phaser.GameObjects.Image} */
	option2_3RewardIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option2_3RewardText1;
	/** @type {Phaser.GameObjects.Text} */
	option2_3RewardText2;
	/** @type {Phaser.GameObjects.Image} */
	option2_3RewardIcon2;
	/** @type {Phaser.GameObjects.Image} */
	option2_3RewardIcon3;
	/** @type {Phaser.GameObjects.Text} */
	option2_3RewardText3;
	/** @type {Phaser.GameObjects.Image} */
	option2_3CostIcon1;
	/** @type {Phaser.GameObjects.Text} */
	option2_3CostText1;
	/** @type {Phaser.GameObjects.Image} */
	option2_3CostIcon2;
	/** @type {Phaser.GameObjects.Text} */
	option2_3CostText2;
	/** @type {Phaser.GameObjects.Container} */
	option2_3Container;
	/** @type {Phaser.GameObjects.Image} */
	cardImage;
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
	/** @type {boolean} */
	isTinted = false;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
