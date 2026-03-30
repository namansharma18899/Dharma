export class InputHandler {
    constructor(keyBindings) {
        this.keys = [];
        const validKeys = [
            keyBindings.up,
            keyBindings.left,
            keyBindings.down,
            keyBindings.right,
            keyBindings.special,
            'Enter',
        ];

        window.addEventListener('keydown', (e) => {
            if (validKeys.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            if (validKeys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}
