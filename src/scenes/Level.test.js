import Level from "./Level"; // adjust the path according to your project structure

// rest of your code // adjust the path according to your project structure
const gameOptions = {
    localStorageName: 'myLocalStorageName', // Replace with your actual localStorage name
    ballStartSpeed: 10 // Replace with your actual ball start speed
};
describe("Level Scene", () => {
    it("should initialize variables and objects correctly", () => {
        const levelScene = new Level();
        levelScene.add = {
            container: jest.fn().mockReturnValue({ add: jest.fn() }),
            image: jest.fn().mockReturnValue({
                visible: true,
                setInteractive: jest.fn().mockReturnValue({
                    on: jest.fn().mockReturnValue({
                        on: jest.fn().mockReturnValue({
                            on: jest.fn() // Mock this.btn_replay.setInteractive().on().on().on
                        })
                    })
                })
            }),
            text: jest.fn().mockReturnValue({
                setOrigin: jest.fn(),
                setStyle: jest.fn(),
                setText: jest.fn()
            }),
            sprite: jest.fn().mockReturnValue({ // Mock this.add.sprite
                visible: true,
                setInteractive: jest.fn().mockReturnValue({
                    on: jest.fn().mockReturnValue({
                        on: jest.fn().mockReturnValue({
                            on: jest.fn() // Mock this.btn_replay.setInteractive().on().on().on
                        })
                    })
                })
            })
        }; // Mock this.add.container
        levelScene.events = { emit: jest.fn() }; // Mock this.events.emit
        levelScene.physics = {
            add: {
                group: jest.fn().mockReturnValue({ // Mock this.physics.add.group
                    add: jest.fn() // Mock this.wallGroup.add
                }),
                sprite: jest.fn().mockReturnValue({ // Mock this.physics.add.sprite
                    setScale: jest.fn(),
                    setSize: jest.fn(),
                    setBounce: jest.fn(), // Mock this.player.setBounce
                    setAngle: jest.fn()
                }),
                image: jest.fn().mockReturnValue({ // Mock this.physics.add.image
                    setImmovable: jest.fn(),
                    setAlpha: jest.fn()
                }),
                collider: jest.fn()
            },
            velocityFromAngle: jest.fn().mockReturnValue({ x: 0, y: 0 }) // Mock this.physics.velocityFromAngle
        };
        levelScene.input = {
            on: jest.fn() // Mock this.input.on
        };
        levelScene.game = { config: { width: 800, height: 600 } }; // Mock this.game.config
        levelScene.create();

        // Check if variables are initialized correctly
        expect(levelScene.score).toBe(0);
        expect(levelScene.isGameOver).toBe(false);
        expect(levelScene.isGameStart).toBe(false);
        expect(levelScene.canActivateWall).toBe(true);
        expect(levelScene.topScore).toBe(localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName));
        expect(levelScene.ballSpeed).toBe(gameOptions.ballStartSpeed * 30);

        // Check if objects are created correctly
        expect(levelScene.wallGroup).toBeDefined();
        expect(levelScene.player).toBeDefined();
        expect(levelScene.lowerWall).toBeDefined();
        expect(levelScene.btn_replay).toBeDefined();
        expect(levelScene.btn_home).toBeDefined();
        expect(levelScene.btn_pause).toBeDefined();
        // expect(levelScene.txt_info).toBeDefined();
    });
    it("should activate the wall correctly", () => {
        const levelScene = new Level();
        levelScene.isGameStart = false;
        levelScene.btn_pause = { setVisible: jest.fn() };
        levelScene.player = { body: { speed: 0 }, setVelocity: jest.fn(), anims: { play: jest.fn() } };
        levelScene.lowerWall = { alpha: 0, body: { checkCollision: { none: false } } };
        levelScene.canActivateWall = true;
        levelScene.time = { addEvent: jest.fn() };

        levelScene.activateWall();

        expect(levelScene.isGameStart).toBe(true);
        expect(levelScene.btn_pause.setVisible).toHaveBeenCalledWith(true);

        // Test when player's speed is 0
        expect(levelScene.player.setVelocity).toHaveBeenCalled();
        expect(levelScene.player.anims.play).toHaveBeenCalledWith('walk', true);
        expect(levelScene.lowerWall.alpha).toBe(0.1);
        expect(levelScene.lowerWall.body.checkCollision.none).toBe(true);

        // Test when canActivateWall is true
        expect(levelScene.canActivateWall).toBe(false);
        expect(levelScene.lowerWall.alpha).toBe(1);
        expect(levelScene.lowerWall.body.checkCollision.none).toBe(false);
        expect(levelScene.time.addEvent).toHaveBeenCalled();
    });
});
