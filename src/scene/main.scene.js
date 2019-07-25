import { Scene } from "./scene";
import VirtualJoyStickPlugin from "../plugin/rex-virtual-joystick-plugin";

export class MainScene extends Scene {

  constructor(options = { key: "MainScene" }) {
    super(options)
  }

  init() {
      super.init();
      this.staticXJsPos = this.gameWidthMiddle;
      this.staticYJsPos = this.gameHeightMiddle + (this.gameHeightMiddle / 2) + (this.gameHeightMiddle / 4);
      this.playerSpeed = 1;
      this.lastCursorDirection = "center";
      this.joystickConfig = {
        x: this.staticXJsPos,
        y: this.staticYJsPos,
        enabled: true
    };
  }

  preload() { 
      this.load.image('background', './assets/image/background.jpg');
      this.load.image('base', './assets/image/base.png');
      this.load.image('thumb', './assets/image/thumb.png');
      this.load.plugin('rex-virtual-joystick-plugin"', VirtualJoyStickPlugin, true);
      this.load.spritesheet("player", "./assets/image/player.png", {
          frameWidth: 64,
          frameHeight: 64,
          startFrame: 0,
          endFrame: 36
      });
  }

  createAnimations() {
    this.anims.create({
        key: 'walking-left',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                9 , 11, 12, 13, 14, 15, 16, 17
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-right',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                27,28,29,30,31,32,33,34,35
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-up',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                0,1.2,3,4,5,6,7,8
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'walking-down',
        frames: this.anims.generateFrameNames('player', {
            frames: [
                18,19,20,21,22,23,24,25,26
            ]
        }),
        yoyo: true,
        frameRate: 12,
        repeat: -1
    });
  }

  createPlayer() {
    this.player = this.add.sprite(this.gameWidthMiddle, this.gameHeightMiddle, 'player', 1);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.player.setScale(1.25);
    this.player.setFrame(18);
  }

  createVirtualJoystick() {
    this.joyStick = this.plugins.get('rex-virtual-joystick-plugin"').add(
        this,
        Object.assign({}, this.joystickConfig, {
            radius: 32,
            base: this.add.image(0, 0, 'base').setDisplaySize(110, 110),
            thumb: this.add.image(0, 0, 'thumb').setDisplaySize(48, 48)
        })
    ).on('update', this.updateJoystickState, this);
    this.cursorKeys = this.joyStick.createCursorKeys();

    // Listener event to reposition virtual joystick
    // whatever place you click in game area
    this.input.on('pointerdown', pointer => {
        this.joyStick.x = pointer.x;
        this.joyStick.y = pointer.y;
        this.joyStick.base.x = pointer.x;
        this.joyStick.base.y = pointer.y;
        this.joyStick.thumb.x = pointer.x;
        this.joyStick.thumb.y = pointer.y;
    });

    // Listener event to return virtual 
    // joystick to its original position
    this.input.on('pointerup', pointer => {
        this.joyStick.x = this.staticXJsPos;
        this.joyStick.y = this.staticYJsPos;
        this.joyStick.base.x = this.staticXJsPos;
        this.joyStick.base.y = this.staticYJsPos;
        this.joyStick.thumb.x = this.staticXJsPos;
        this.joyStick.thumb.y = this.staticYJsPos;
        this.lastCursorDirection = "center";
        this.setCursorDebugInfo();
    });

  }

  setCursorDebugInfo() {
    const force = Math.floor(this.joyStick.force * 100) / 100;
    const angle = Math.floor(this.joyStick.angle * 100) / 100;
    let text = `Direction: ${this.lastCursorDirection}\n`;
    text += `Force: ${force}\n`;
    text += `Angle: ${angle}\n`;
    text += `FPS: ${this.sys.game.loop.actualFps}\n`;
    this.cursorDebugText.setText(text);
  }

  create() {
    this.physics.world.bounds.width = this.gameWidth;
    this.physics.world.bounds.height = this.gameHeight;
    this.background = this.add.sprite(0, 0, "background").setOrigin(0, 0);
    this.background.setDisplaySize(this.gameWidth, this.gameHeight);
    this.background.setDepth(-1);
    this.cursorDebugText = this.add.text(10, 10);
    this.createAnimations();
    this.createPlayer();
    this.createVirtualJoystick();
    this.setCursorDebugInfo();
    this.updateJoystickState();
  }

  update() {
     this.updateJoystickState();
  }

  stopPlayerAnimations() {
      this.player.anims.stop('walking-left');
      this.player.anims.stop('walking-right');
      this.player.anims.stop('walking-up');
      this.player.anims.stop('walking-down');
  }

  movePlayer() {
      if (this.lastCursorDirection === "up") {
        this.player.y -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-up');
    } else if (this.lastCursorDirection === "down") {
        this.player.y += this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-down');
    } else if(this.lastCursorDirection === "right") {
        this.player.x += this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-right');
    } else if (this.lastCursorDirection === "left") {
        this.player.x -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
            this.player.anims.play('walking-left');
    } else if (this.lastCursorDirection === "upright") {
        this.player.x += this.playerSpeed;
        this.player.y -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-right');
    } else if (this.lastCursorDirection === "downright") {
        this.player.x += this.playerSpeed;
        this.player.y += this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-right');
    } else if (this.lastCursorDirection === "downleft") {
        this.player.x -= this.playerSpeed;
        this.player.y += this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-left');
    } else if (this.lastCursorDirection === "upleft") {
        this.player.x -= this.playerSpeed;
        this.player.y -= this.playerSpeed;
        if (!this.player.anims.isPlaying)
        this.player.anims.play('walking-left');
    } else {
        this.stopPlayerAnimations();
    }
  }

  updateJoystickState() {
      let direction = '';
      for (let key in this.cursorKeys) {
          if (this.cursorKeys[key].isDown) {
            direction += key;
          }
      }

      // If no direction if provided then stop 
      // the player animations and exit the method
      if(direction.length === 0) { 
          this.stopPlayerAnimations();
          return;
      }

      // If last cursor direction is different
      //  the stop all player animations
      if (this.lastCursorDirection !== direction) {
          this.stopPlayerAnimations();
      }
      
      // Set the new cursor direction
      this.lastCursorDirection = direction;

      // Handle the player moving
      this.movePlayer();

      // Set debug info about the cursor
      this.setCursorDebugInfo();
  }
  
}
