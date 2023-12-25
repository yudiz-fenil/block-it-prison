
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {

	constructor() {
		super("Home");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bg
		this.add.image(960, 540, "bg");

		// wall
		this.add.image(960, 1057, "wall");

		// btn_play
		const btn_play = this.add.image(960, 804, "btn_play");
		btn_play.scaleX = 0.5;
		btn_play.scaleY = 0.5;

		// logo
		const logo = this.add.image(960, 350, "logo");
		logo.scaleX = 0.5;
		logo.scaleY = 0.5;

		this.btn_play = btn_play;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	btn_play;
	/** @type {Phaser.GameObjects.Image} */
	logo;

	/* START-USER-CODE */

	// Write your code here
	pointerOver = (btn, scale) => {
		this.input.setDefaultCursor('pointer');
		this.tweens.add({
			targets: btn,
			scaleX: scale + 0.04,
			scaleY: scale + 0.04,
			duration: 100
		})
	}
	pointerOut = (btn, scale) => {
		this.input.setDefaultCursor('default');
		this.tweens.add({
			targets: btn,
			scaleX: scale,
			scaleY: scale,
			duration: 100,
			onComplete: () => {
				btn.setScale(scale);
			}
		})
	}
	create() {

		this.editorCreate();

		this.btn_play.setInteractive();

		this.tweens.add({
			targets: this.logo,
			scaleX: 0.55,
			scaleY: 0.55,
			duration: 800,
			ease: 'Sine.easeInOut',
			repeat: -1,
			yoyo: true,
		});

		this.btn_play.on("pointerup", () => {
			this.scene.stop("Home");
			this.scene.start("Level");
		}, this);
		this.btn_play.on('pointerover', () => this.pointerOver(this.btn_play, 0.5));
		this.btn_play.on('pointerout', () => this.pointerOut(this.btn_play, 0.5));
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
