export default class AudioHandler {
    constructor() {
        this.sounds = {
            jump: document.getElementById('jump'),
        };
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        sound.playbackRate = 2;
        sound.play();
    }
}
