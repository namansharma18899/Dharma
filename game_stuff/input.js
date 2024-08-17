export class InputHandler {
    constructor(movement_key_override){
        this.keys = []
        window.addEventListener('keydown', (e)=>{
            console.log("preseed -> ",this.keys, movement_key_override['up'])
            if ((e.key == movement_key_override['up'] ||
                 e.key == movement_key_override['left'] ||
                 e.key == movement_key_override['down'] || 
                 e.key == movement_key_override['right'] ||
                 e.key == movement_key_override['special'] ||
                 e.key == 'Enter'
            ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup',(e)=>{
            if (e.key == movement_key_override['up'] ||
                e.key == movement_key_override['left'] ||
                e.key == movement_key_override['down'] || 
                e.key == movement_key_override['right'] ||
                e.key == movement_key_override['special'] ||
                e.key == 'Enter'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
        })
    }
}