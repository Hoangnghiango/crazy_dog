//Player State js file is used to:
//It will be easier to see our code is doing .We will be passing values around between javascript modules and classes and I can imagine 
const states =
{
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
}
class State {
    constructor(state) {
        this.state = state;
    }
}
export class Sitting extends State {
    constructor(player) {
        super("SITTING");
        this.player = player;

    }
    enter() {
        this.player.frameX = 0;

        this.player.frameY = 5;
        this.player.maxFrame = 4;

    }
    handleInput(input) {
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
            this.player.setState(states.RUNNING);
        }else if(input.includes("Enter")){
            this.player.setState(states.ROLLING);

        }

    }
}
export class Running extends State {
    constructor(player) {
        super("RUNNING");
        this.player = player;

    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 6;


    }
    handleInput(input) {
        if (input.includes('ArrowDown')) {
            this.player.setState(states.SITTING);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING)
        }else if(input.includes("Enter")){
            this.player.setState(states.ROLLING);

        }

    }
}
export class Jumping extends State {
    constructor(player) {
        super("JUMPING");
        this.player = player;

    }
    enter() {
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 6;


    }
    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING);
        }else if(input.includes("Enter")){
            this.player.setState(states.ROLLING);

        }

    }
}

export class Falling extends State {
    constructor(player) {
        super("FALLING");
        this.player = player;

    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;


    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
        }

    }
}
export class Rolling extends State {
    constructor(player) {
        super("ROLLING");
        this.player = player;

    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.maxFrame = 6;


    }
    handleInput(input) {
        if (!input.includes("Enter") && this.player.onGround()) {
            this.player.setState(states.RUNNING);
        }else if(!input.includes("Enter") && !this.player.onGround()){
            this.player.setState(states.FALLING);

        }

    }
}