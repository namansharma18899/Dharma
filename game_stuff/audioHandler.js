const audioDir = '/home/namansh/personal/projects/Dharma/assets/audio/mixkit-player-jumping-in-a-video-game-2043.wav'
export default class AudioHandler{
    constructor(){
        this.audioSet = {
            'jump': document.getElementById('jump'),
        }
    }
    play(audio){
        var audioObj = this.audioSet[audio]
        audioObj.playbackRate= 2;
        audioObj.play()
    }
}