
// You can write more code here
import Phaser from "phaser";
let gameOptions = {
	wallDuration: 100,
	ballStartSpeed: 300, //300
	ballSpeedIncrease: 20,
	localStorageName: "blockitscore",
}

/* START OF COMPILED CODE */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// container_body
		const container_body = this.add.container(0, 0);

		// bg
		const bg = this.add.image(960, 540, "bg");
		container_body.add(bg);

		// txt_score
		const txt_score = this.add.text(959, 540, "", {});
		txt_score.setOrigin(0.5, 0.5);
		txt_score.alpha = 0.6;
		txt_score.alphaTopLeft = 0.6;
		txt_score.alphaTopRight = 0.6;
		txt_score.alphaBottomLeft = 0.6;
		txt_score.alphaBottomRight = 0.6;
		txt_score.text = "0";
		txt_score.setStyle({ "align": "center", "color": "#eff0f2", "fontFamily": "Arial", "fontSize": "400px", "fontStyle": "bold" });
		container_body.add(txt_score);

		// container_lights
		const container_lights = this.add.container(0, 0);
		container_body.add(container_lights);

		// light_1
		const light_1 = this.add.sprite(960, 44, "light_1");
		container_lights.add(light_1);

		// light_2
		const light_2 = this.add.sprite(810, 44, "light_1");
		container_lights.add(light_2);

		// light_3
		const light_3 = this.add.sprite(1110, 44, "light_1");
		container_lights.add(light_3);

		// btn_pause
		const btn_pause = this.add.image(736, 92, "btn_pause");
		btn_pause.visible = false;
		container_body.add(btn_pause);

		// container_popup
		const container_popup = this.add.container(0, 0);

		// container_popup_body
		const container_popup_body = this.add.container(0, 710);
		container_popup.add(container_popup_body);

		// popup_bg
		const popup_bg = this.add.image(960, 575, "popup-bg");
		popup_bg.scaleX = 0.5;
		popup_bg.scaleY = 0.5;
		container_popup_body.add(popup_bg);

		// btn_home
		const btn_home = this.add.image(1050, 684, "btn_home");
		btn_home.scaleX = 0.5;
		btn_home.scaleY = 0.5;
		container_popup_body.add(btn_home);

		// btn_replay
		const btn_replay = this.add.image(885, 684, "btn_replay");
		btn_replay.scaleX = 0.5;
		btn_replay.scaleY = 0.5;
		container_popup_body.add(btn_replay);

		// txt_high_score
		const txt_high_score = this.add.text(883, 595, "", {});
		txt_high_score.setOrigin(0.5, 0.5);
		txt_high_score.text = "0";
		txt_high_score.setStyle({ "align": "center", "color": "#3b4f80", "fontFamily": "Arial", "fontSize": "55px", "fontStyle": "bold" });
		container_popup_body.add(txt_high_score);

		// txt_current_score
		const txt_current_score = this.add.text(1033, 595, "", {});
		txt_current_score.setOrigin(0.5, 0.5);
		txt_current_score.text = "0";
		txt_current_score.setStyle({ "align": "center", "color": "#3b4f80", "fontFamily": "Arial", "fontSize": "55px", "fontStyle": "bold" });
		container_popup_body.add(txt_current_score);

		// popup_man
		const popup_man = this.add.image(960, -130, "popup-man");
		popup_man.scaleX = 0.5;
		popup_man.scaleY = 0.5;
		container_popup.add(popup_man);

		this.txt_score = txt_score;
		this.container_lights = container_lights;
		this.btn_pause = btn_pause;
		this.container_popup = container_popup;
		this.container_popup_body = container_popup_body;
		this.btn_home = btn_home;
		this.btn_replay = btn_replay;
		this.txt_high_score = txt_high_score;
		this.txt_current_score = txt_current_score;
		this.popup_man = popup_man;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	txt_score;
	/** @type {Phaser.GameObjects.Container} */
	container_lights;
	/** @type {Phaser.GameObjects.Image} */
	btn_pause;
	/** @type {Phaser.GameObjects.Container} */
	container_popup;
	/** @type {Phaser.GameObjects.Container} */
	container_popup_body;
	/** @type {Phaser.GameObjects.Image} */
	btn_home;
	/** @type {Phaser.GameObjects.Image} */
	btn_replay;
	/** @type {Phaser.GameObjects.Text} */
	txt_high_score;
	/** @type {Phaser.GameObjects.Text} */
	txt_current_score;
	/** @type {Phaser.GameObjects.Image} */
	popup_man;

	/* START-USER-CODE */

	// Write your code here
	pointerOver = (btn, scale) => {
		this.input.setDefaultCursor('pointer');
		this.tweens.add({
			targets: btn,
			scaleX: scale + 0.05,
			scaleY: scale + 0.05,
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
	updateScore = () => {
		this.score++;
		this.txt_score.setText(this.score);
	}
	lightsAnimation = () => {
		this.container_lights.each(light => {
			light.anims.play('lights');
		})
	}
	popupBodyAnimation = () => {
		this.tweens.add({
			targets: this.container_popup_body,
			y: 0,
			duration: 300,
			ease: 'Power2',
			onComplete: () => {
				this.popupManAnimation();
			}
		})
	}
	popupManAnimation = () => {
		this.tweens.add({
			targets: this.popup_man,
			y: 370,
			duration: 500,
			ease: 'Bounce',
		});
	}
	showPopup = () => {
		this.btn_pause.setVisible(false);
		localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
		this.txt_current_score.setText(this.score);
		this.txt_high_score.setText(Math.max(this.score, this.topScore));
		this.container_popup.setVisible(true);
		this.lightsAnimation();
		this.popupBodyAnimation();
	}
	handleReplay = () => {
		this.scene.restart("Level");
	}
	backToHome = () => {
		this.scene.stop("Level");
		this.scene.start("Home");
	}
	create() {
		this.editorCreate();
		this.score = 0;
		this.isGameOver = false;
		this.isGameStart = false;
		this.canActivateWall = true;
		this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
		this.txt_high_score.setText(this.topScore);

		this.ballSpeed = gameOptions.ballStartSpeed;
		this.wallGroup = this.physics.add.group();

		this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height * 4 / 5, "p01");
		this.player.setScale(0.5);
		this.player.setSize(220, 150);
		// this.player.setCircle(80)
		// this.player.setOffset(0, 80)
		this.player.setBounce(1);
		this.player.setAngle(180);

		this.createWall(690, this.game.config.height / 2, "wall-v"); // Left wall
		this.createWall(1230, this.game.config.height / 2, "wall-v"); // Right wall
		this.createWall(this.game.config.width / 2, 75, "wall-h"); // Top wall
		this.lowerWall = this.createWall(960, 1057, "wall");
		this.lowerWall.alpha = 1;

		this.btn_replay.setInteractive()
			.on("pointerup", this.handleReplay, this)
			.on('pointerover', () => this.pointerOver(this.btn_replay, 0.5))
			.on('pointerout', () => this.pointerOut(this.btn_replay, 0.5));

		this.btn_home.setInteractive()
			.on("pointerup", this.backToHome, this)
			.on('pointerover', () => this.pointerOver(this.btn_home, 0.5))
			.on('pointerout', () => this.pointerOut(this.btn_home, 0.5));

		this.isGamePaused = false;
		this.btn_pause.setInteractive()
			.on("pointerover", () => this.pointerOver(this.btn_pause, 1))
			.on("pointerout", () => this.pointerOut(this.btn_pause, 1))
			.on("pointerup", () => {
				if (this.isGamePaused) {
					this.physics.resume();
					this.player.anims.play('walk', true);
					this.btn_pause.setTexture("btn_pause");
				} else {
					this.btn_pause.setTexture("btn_resume");
					this.physics.pause();
					this.player.anims.pause(Phaser.Animations.AnimationFrame(0));
				}
				this.isGamePaused = !this.isGamePaused;
			});

		this.physics.add.collider(this.player, this.wallGroup, (ball, wall) => {
			this.canActivateWall = true;
			if (wall.x == this.lowerWall.x && wall.y == this.lowerWall.y) {
				this.ballSpeed += gameOptions.ballSpeedIncrease;
				let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(220, 320), this.ballSpeed);
				this.player.setVelocity(ballVelocity.x, ballVelocity.y);
				this.updateScore();
			}
		}, null, this);

		this.txt_info = this.add.text(this.game.config.width / 2, 250, "TAP TO PLAY", {
			"color": "#FFFFFF",
			"fontFamily": "Arial",
			"fontSize": "44px",
			"align": "center",
		}).setOrigin(0.5);

		this.input.on("pointerdown", (p, g) => {
			if (!g.length) {
				this.txt_info.setVisible(false);
				!this.isGameOver && this.activateWall();
			}
		}, this);
	}
	createWall(posX, posY, texture) {
		let wall = this.physics.add.image(posX, posY, texture);
		this.wallGroup.add(wall);
		wall.setImmovable();
		wall.setAlpha(0);
		return wall;
	}
	activateWall() {
		this.isGameStart = true;
		this.btn_pause.setVisible(true);
		if (this.player.body.speed == 0) {
			let ballVelocity = this.physics.velocityFromAngle(Phaser.Math.Between(220, 320), this.ballSpeed)
			this.player.setVelocity(ballVelocity.x, ballVelocity.y);
			this.player.anims.play('walk', true);
			this.lowerWall.alpha = 0.1;
			this.lowerWall.body.checkCollision.none = true;
			return;
		}
		if (this.canActivateWall) {
			this.canActivateWall = false;
			this.lowerWall.alpha = 1;
			this.lowerWall.body.checkCollision.none = false;
			let wallEvent = this.time.addEvent({
				delay: gameOptions.wallDuration,
				callbackScope: this,
				callback: () => {
					this.lowerWall.alpha = 0.1;
					this.lowerWall.body.checkCollision.none = true;
				}
			});
		}
	}
	update() {
		let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(0, 0, this.player.body.velocity.x, this.player.body.velocity.y));
		this.isGameStart && this.player.setRotation(Phaser.Math.DegToRad(angle - 90));
		if ((this.player.y > this.game.config.height || this.player.y < 0) && !this.isGameOver) {
			this.isGameOver = true;
			this.time.addEvent({
				delay: 800,
				callbackScope: this,
				callback: () => {
					this.showPopup();
				}
			});
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
