import { Game } from "phaser";
import GameConfig from "./game/game-config";

try {
        window.onload = () => {
            const game = new Game(GameConfig);
        };
} catch(err) {
    throw err;
}
