import { Scene } from "./scene";
import VirtualJoyStickPlugin from "../plugin/rex-virtual-joystick-plugin";

export class MainScene extends Scene {

  constructor(options = { key: "MainScene" }) {
    super({options})
  }

  preload() { 
      this.load.plugin('rex-virtual-joystick-plugin"', VirtualJoyStickPlugin, true);
      this.load.spritesheet("player", "./assets/image/player.png", {
          frameWidth: 64,
          frameHeight: 64,
          startFrame: 0,
          endFrame: 36
      });
  }

  create() {
      
      this.physics.world.bounds.width = 800;
      this.physics.world.bounds.height = 600;

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

      this.player = this.add.sprite(-100, 100, 'player', 1);
      this.physics.add.existing(this.player);
      this.player.body.setCollideWorldBounds(true);
      
      this.joyStick = this.plugins.get('rex-virtual-joystick-plugin"').add(this, {
              x: 175,
              y: 475,
              radius: 50,
              base: this.add.graphics().fillStyle(0x888888).fillCircle(0, 0, 100),
              thumb: this.add.graphics().fillStyle(0xcccccc).fillCircle(0, 0,50),                enabled: true
          }).on('update', this.dumpJoyStickState, this);
  
      this.text = this.add.text(0, 0);
      this.dumpJoyStickState();
  }

  update() {
     this.dumpJoyStickState();
  }

  stopAnims() {
      this.player.anims.stop('walking-left');
      this.player.anims.stop('walking-right');
      this.player.anims.stop('walking-up');
      this.player.anims.stop('walking-down');
  }

  dumpJoyStickState() {
      var cursorKeys = this.joyStick.createCursorKeys();
      var s = '';
      for (var name in cursorKeys) {
          if (cursorKeys[name].isDown) {
              s += name + ' ';
          }
      }

      const playerSpeed = 1;
      const position = s.trim();
      if(position.length === 0) { 
          this.stopAnims();
          return;
      }
      if (this.lastPos !== position) {
          this.stopAnims();
      }
      this.lastPos = position;
      if (position === "up") {
          this.player.y -= playerSpeed;
          if (!this.player.anims.isPlaying)
              this.player.anims.play('walking-up');
      } else if (position === "down") {
          this.player.y += playerSpeed;
          if (!this.player.anims.isPlaying)
              this.player.anims.play('walking-down');
      } else if(position === "right") {
          this.player.x += playerSpeed;
          if (!this.player.anims.isPlaying)
              this.player.anims.play('walking-right');
      } else if (position === "left") {
          this.player.x -= playerSpeed;
          if (!this.player.anims.isPlaying)
              this.player.anims.play('walking-left');
      } else if (position === "up right") {
          this.player.x += playerSpeed;
          this.player.y -= playerSpeed;
          if (!this.player.anims.isPlaying)
          this.player.anims.play('walking-right');
      } else if (position === "down right") {
          this.player.x += playerSpeed;
          this.player.y += playerSpeed;
          if (!this.player.anims.isPlaying)
          this.player.anims.play('walking-right');
      } else if (position === "down left") {
          this.player.x -= playerSpeed;
          this.player.y += playerSpeed;
          if (!this.player.anims.isPlaying)
          this.player.anims.play('walking-left');
      } else if (position === "up left") {
          this.player.x -= playerSpeed;
          this.player.y -= playerSpeed;
          if (!this.player.anims.isPlaying)
          this.player.anims.play('walking-left');
      } else {
          this.stopAnims();
      }
      s += ('\nForce: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
      s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
      this.text.setText(s);
  }
}
