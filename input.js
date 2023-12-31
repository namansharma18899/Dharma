export class InputHandler {
    constructor(){
        this.keys = []
        window.addEventListener('keydown', (e)=>{
            if ((e.key == 'a' ||
                 e.key == 'w' ||
                 e.key == 's' || 
                 e.key == 'd' ||
                 e.key == 'x' ||
                 e.key == 'Enter'
            ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup',(e)=>{
            if (e.key == 'a' ||
                e.key == 'w' ||
                e.key == 's' || 
                e.key == 'd' ||
                e.key == 'x' ||
                e.key == 'Enter'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
        })
    }
}