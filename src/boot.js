import { Game } from "phaser";
import GameConfig from "./game/game-config";

try {
        window.onload = () => {
            const game = new Game(GameConfig);
            setInterval(() => {
                document.getElementById('debug').innerText = `FPS: ${game.loop.actualFps}`;
            }),50;
        };
} catch(err) {
    throw err;
}
