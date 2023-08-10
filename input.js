export class InputHandler { 
    constructor(){
        this.keys = []
        window.addEventListener('keydown', (e)=>{
            if ((e.key == 'w' ||
                 e.key == 'a' ||
                 e.key == 's' || 
                 e.key == 'd' ||
                 e.key == 'x' ||
                 e.key == 'Enter'
            ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            // console.log('KD -> ', e.key, this.keys)
        });
        window.addEventListener('keyup',(e)=>{
            if (e.key == 'w' ||
                e.key == 'a' ||
                e.key == 's' || 
                e.key == 'd' ||
                e.key == 'x' ||
                e.key == 'Enter'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            // console.log('k up -> ', e.key, this.keys)
        })
    }
}