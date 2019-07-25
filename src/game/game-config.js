import Phaser from "phaser";
import { MainScene } from "../scene/main.scene";

export default {
    width: 600,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser3-virtual-joystick',
    parent: "game",
    scene: [
      MainScene
    ],
    pixelArt: false,
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
};;
