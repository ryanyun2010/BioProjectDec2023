let gameObjects = [];

const settings = {
    "GameHasBegun": false,
    "CompletedStep1:ATP": false,
    "CompletedStep2:NADP++ADP": false,
    "CompletedStep3:NAD":false,
    "CompletedStep4:CoA":false
}
const EnvironmentalValues = {
    "Gravity": 0.28
}

let curDialogueBox;

let zone = 0;
let GameY = 0;
let RealGameY = 0;
let held = 0;
var adp = 0;
var nadp = 0;
var mostrecent = "N/A";

let Images = {};
let DialogueBoxes = {};

function preload() {
    curDialogueBox = loadImage("./dialoguestart.png");
    Images.glucose = loadImage("./glucose.png");
    Images.background = loadImage("./background.png");
    Images.atp = loadImage("./atp.png");
    Images.fructose = loadImage("./fructose.png");
    Images.adp = loadImage("./adp.png");
    Images.acoa = loadImage("./acoa.png");
    Images.nadp = loadImage("./nadp+.png");
    Images.nadph = loadImage("./nadph.png");
    Images.pyruvate = loadImage("./pyruvate.png");
    Images.floor = loadImage("./floor.png");
    Images.floor2 = loadImage("./floor2.png");
    Images.wall = loadImage("./wall.png");
    Images.tpup = loadImage("./tpup.png");
    Images.tpdown = loadImage("./tpdown.png");
    Images.CO2 = loadImage("./CO2.png");
    Images.nad = loadImage("./nad.png");
    Images.nadh = loadImage("./nadh.png");
    Images.acetyl = loadImage("./acetyl.png");
    Images.coa = loadImage("./coa.png");


    DialogueBoxes.atp1 = loadImage("./dialogue1atp.png");
    DialogueBoxes.atp2 = loadImage("./dialogue2atp.png");
    DialogueBoxes.step1done = loadImage("./dialoguestep2.png");

    DialogueBoxes.nadp0adp1 = loadImage("./dialogue0nadp1adp.png");
    DialogueBoxes.nadp1adp0 = loadImage("./dialogue1nadp0adp.png");

    DialogueBoxes.nadp2adp0 = loadImage("./dialogue2nadp0adp.png");
    DialogueBoxes.nadp0adp2 = loadImage("./dialogue0nadp2adp.png");
    DialogueBoxes.nadp1adp1adp = loadImage("./dialogue1nadp1adp-adp.png");
    DialogueBoxes.nadp1adp1nadp = loadImage("./dialogue1nadp1adp-nadp.png");

    DialogueBoxes.nadp2adp1adp = loadImage("./dialogue2nadp1adp-adp.png"); 
    DialogueBoxes.nadp2adp1nadp = loadImage("./dialogue2nadp1adp-nadp.png"); 
    DialogueBoxes.nadp1adp2adp = loadImage("./dialogue1nadp2adp-adp.png"); 
    DialogueBoxes.nadp1adp2nadp = loadImage("./dialogue1nadp2adp-nadp.png"); 

    DialogueBoxes.nadp2adp2adp = loadImage("./dialogue2nadp2adp-adp.png"); 
    DialogueBoxes.nadp2adp2nadp = loadImage("./dialogue2nadp2adp-nadp.png")


    DialogueBoxes.adp0nadp1 = loadImage("./dialogue1nadp0adp.png");
    DialogueBoxes.adp1nadp0 = loadImage("./dialogue0nadp1adp.png");

    DialogueBoxes.adp2nadp0 = loadImage("./dialogue0nadp2adp.png");
    DialogueBoxes.adp0nadp2 = loadImage("./dialogue2nadp0adp.png");
    DialogueBoxes.adp1nadp1adp = loadImage("./dialogue1nadp1adp-adp.png");
    DialogueBoxes.adp1nadp1nadp = loadImage("./dialogue1nadp1adp-nadp.png");

    DialogueBoxes.adp2nadp1adp = loadImage("./dialogue1nadp2adp-adp.png"); 
    DialogueBoxes.adp2nadp1nadp = loadImage("./dialogue1nadp2adp-nadp.png"); 
    DialogueBoxes.adp1nadp2adp = loadImage("./dialogue2nadp1adp-adp.png"); 
    DialogueBoxes.adp1nadp2nadp = loadImage("./dialogue2nadp1adp-nadp.png"); 

    DialogueBoxes.adp2nadp2adp = loadImage("./dialogue2nadp2adp-adp.png"); 
    DialogueBoxes.adp2nadp2nadp = loadImage("./dialogue2nadp2adp-nadp.png");

    DialogueBoxes.SnipCarbon = loadImage("./dialogueSnipCarbon.png");
    DialogueBoxes.step3start = loadImage("./dialoguestep3start.png");
    DialogueBoxes.nad1 = loadImage("./dialogue1nad.png");
    DialogueBoxes.step3done = loadImage("./dialoguestep3done.png");
    DialogueBoxes.step4start = loadImage("./dialoguestep4start.png");
    DialogueBoxes.CoA1 = loadImage("./dialogue1CoA.png");
    DialogueBoxes.step4done = loadImage("./dialoguestep4done.png");
    DialogueBoxes.complete = loadImage("./dialoguecomplete.png");


    Images["112x32"] = [loadImage("./112x32type1.png"),loadImage("./112x32type2.png"),loadImage("./112x32type3.png"),loadImage("./112x32type4.png")]
    Images["96x32"] = [loadImage("./96x32type1.png"),loadImage("./96x32type2.png"),loadImage("./96x32type3.png"),loadImage("./96x32type4.png")]
    Images["384x32"] = loadImage("./384x32.png")
    Images["256x32"] = loadImage("./256x32.png")
    Images["32x32"] = loadImage("./32x32.png")
    Images["304x32"] = loadImage("./304x32.png")
    Images["64x32"] = loadImage("./64x32.png")
    Images["64x608airflow"] = loadImage("./64x608airflow.png")
    Images["64x1216airflow"] = loadImage("./64x1216airflow.png")
    Images["144x32"] = [loadImage("./144x32type1.png"),loadImage("./144x32type2.png"),loadImage("./144x32type3.png"),loadImage("./144x32type4.png"),loadImage("./144x32type5.png"),loadImage("./144x32type6.png")]
}
class GameObject {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.type = "basic";
        this.w = 0;
        this.h = 0;
        this.yAccl = 0;
        this.maxYAccl = 10;
        this.baseX = 0;
        this.baseY = 0;
        this.settings = {
            "gravity": false,
            "collision": false,
            "imageSprite": false,
            "image": undefined,
            "maxJumps": 0,
            "moveLeftRight": 0,
            "moveSpeed":0,
            "collisionSizeIsSpriteSize":false
        };
        this.values = {
            "jumps": 0,
            "timeSinceLastJump": 0,
            "movingLeft": false
        };
        this.drawValues = {
            "fill": "white",
            "stroke": "none",
            "strokeWeight": 0
        }
        this.zone = 0;
    }
    setZone(zone) {
        this.zone = zone;
        return this;
    }
    setMaxJumps(jumps) {
        this.settings.maxJumps = jumps;
        return this;
    }
    enableCollision() {
        this.settings.collision = true;
        return this;
    }
    disableCollision() {
        this.settings.collision = false;
        return this;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        return this;
    }
    enableCollisionSizeIsSpriteSize(){
        this.settings.collisionSizeIsSpriteSize = true;
        return this;
    }
    enableImageSprite() {
        this.settings.imageSprite = true;
        return this;
    }
    disableImageSprite() {
        this.settings.imageSprite = false;
        return this;
    }
    setImage(image) {
        if (this.settings.imageSprite) {
            this.settings.image = image;
        } else {
            console.error("Cannot set image without enabling image sprite setting, Perhaps you forgot to enableImageSprite()");
        }
        return this;
    }
    setSize(w, h) {
        this.w = w;
        this.h = h;
        return this;
    }
    enableGravity() {
        this.settings.gravity = true;
        return this;
    }
    disableGravity() {
        this.settings.gravity = false;
        return this;
    }
    setStroke(color, weight) {
        this.drawValues.stroke = color;
        this.drawValues.strokeWeight = weight;
        return this;
    }
    setFill(color) {
        this.drawValues.fill = color;
        return this;
    }
    draw() {
        if (this.w == 0 || this.h == 0) {
            console.error("Invalid Size, Perhaps you forgot to setSize")
        }
        if (this.settings.imageSprite) {
            imageMode(CENTER);
            try {
                if(this.settings.collisionSizeIsSpriteSize){
                    image(this.settings.image, this.x, this.y + RealGameY,this.w,this.h); 
                }else{
                    image(this.settings.image, this.x, this.y + RealGameY);
                }
            } catch {
                console.error("Invalid Image Settings, Perhaps you forgot to setImage");
            }
        } else {
            try {
                fill(this.drawValues.fill);
                if (this.drawValues.stroke == "none") {
                    noStroke();
                } else {
                    stroke(this.drawValues.stroke);
                }
                strokeWeight(this.drawValues.strokeWeight)
            } catch {
                console.error("Invalid Draw Values")
            }
            rectMode(CENTER);
            rect(this.x, this.y + RealGameY, this.w, this.h);
        }
        return this;


    }
    update() {
        this.values.timeSinceLastJump += deltaTime;
        if (this.settings.gravity) {
            if (this.checkCollision(this.x, this.y + 0.1) && this.yAccl > 0) {
                if (this.yAccl > 0) {
                    this.yAccl = 0;
                    this.values.jumps = 0;
                }
            } else {
                this.yAccl += EnvironmentalValues.Gravity;
            }
        }
        // console.log(this.yAccl);
        if (this.yAccl < -1 * this.maxYAccl) {
            this.yAccl = -1 * this.maxYAccl
        }
        if (this.yAccl > this.maxYAccl) {
            this.yAccl = this.maxYAccl
        }
        if (this.settings.collision) {
            this.attemptMove(this.x, this.y + this.yAccl);
        } else {
            this.y += this.yAccl;
        }
        if (this.settings.moveLeftRight > 0) {
        if(this.settings.moveSpeed == 0){
            console.error("Move speed is set to zero, Perhaps you forgot to setMoveSpeed")
        }
            if (this.values.movingLeft) {
                this.attemptMove(this.x - 0.5 * this.settings.moveSpeed, this.y);
                if(this.checkPlayerCollision(this.x,this.y - 0.1)){
                    for(var player of gameObjects){
                        if(player.type == "player"){
                            player.attemptMove(player.x - 0.5 * this.settings.moveSpeed, player.y);
                        }
                    }
                }
            } else {
                this.attemptMove(this.x + 0.5 * this.settings.moveSpeed, this.y);
                if(this.checkPlayerCollision(this.x,this.y - 0.1)){
                    for(var player of gameObjects){
                        if(player.type == "player"){
                            player.attemptMove(player.x + 0.5 * this.settings.moveSpeed, player.y);
                        }
                    }
                }
            }
            if (this.x > this.baseX) {
                if (this.x - this.baseX >= this.settings.moveLeftRight) {
                    this.values.movingLeft = true;
                }
            }
            if (this.x < this.baseX) {
                if (this.baseX - this.x >= this.settings.moveLeftRight) {
                    this.values.movingLeft = false;
                }
            }
        }
        return this;
    }
    setMoveLeftRight(distance) {
        this.settings.moveLeftRight = distance;
        this.x += Math.random() * this.settings.moveLeftRight;
        return this;
    }
    setMoveSpeed(speed){
        this.settings.moveSpeed = speed;
        return this;
    }
    attemptMove(x, y) {
        //move X
        if (this.x > x) {
            for (var i = this.x - x; i >= 0; i -= 0.1) {
                if (this.checkCollision(this.x - i, this.y)) {} else {
                    this.x -= i;
                }
            }
        } else {
            for (var i = x - this.x; i >= 0; i -= 0.1) {
                if (this.checkCollision(this.x + i, this.y)) {} else {
                    this.x += i;
                }
            }
        }

        if (this.y > y) {
            for (var i = this.y - y; i >= 0; i -= 0.1) {
                if (this.checkCollision(this.x, this.y - i)) {} else {
                    this.y -= i;
                }
            }
        } else {
            for (var i = y - this.y; i >= 0; i -= 0.1) {
                if (this.checkCollision(this.x, this.y + i)) {} else {
                    this.y += i;
                }
            }
        }
        return this;
    }
    checkCollision(x, y) {
        var id = gameObjects.indexOf(this);
        var smallx = x - this.w / 2;
        var bigx = x + this.w / 2;
        var smally = y - this.h / 2;
        var bigy = y + this.h / 2;
        for (var gameObject of gameObjects) {
            if (gameObjects.indexOf(gameObject) == id) {
                continue;
            }
            if (gameObject.zone != this.zone) {
                continue;
            }
            if (gameObject.settings.collision) {} else {
                continue;
            }
            var Gsmallx = gameObject.x - gameObject.w / 2;
            var Gbigx = gameObject.x + gameObject.w / 2;
            var Gsmally = gameObject.y - gameObject.h / 2;
            var Gbigy = gameObject.y + gameObject.h / 2;;
            if (bigx > Gsmallx && smallx < Gbigx) {
                if (bigy > Gsmally && smally < Gbigy) {
                    return true;
                }
            }
        }
        return false;
    }
    checkPlayerCollision(x, y) {
        var id = gameObjects.indexOf(this);
        var smallx = x - this.w / 2;
        var bigx = x + this.w / 2;
        var smally = y - this.h / 2;
        var bigy = y + this.h / 2;
        for (var gameObject of gameObjects) {
            if (gameObject.type != "player") {
                continue;
            }
            if (gameObject.zone != this.zone) {
                continue;
            }
            if (gameObjects.indexOf(gameObject) == id) {
                continue;
            }
            if (gameObject.settings.collision) {} else {
                continue;
            }
            var Gsmallx = gameObject.x - gameObject.w / 2;
            var Gbigx = gameObject.x + gameObject.w / 2;
            var Gsmally = gameObject.y - gameObject.h / 2;
            var Gbigy = gameObject.y + gameObject.h / 2;;
            if (bigx > Gsmallx && smallx < Gbigx) {
                if (bigy > Gsmally && smally < Gbigy) {
                    return true;
                }
            }
        }
        return false;
    }
    setType(type) {
        this.type = type;
        return this;
    }
}

function setup() {
    gameObjects.push(new GameObject().setType("player").setPosition(704, 640).setSize(32, 32).setFill("red").enableCollision().enableGravity().setMaxJumps(2));
    // gameObjects.push(new GameObject().setType("player").setPosition(700,680).setSize(50,50).setFill("red").enableCollision().setMaxJumps(2));
    // ZONE 0
    gameObjects.push(new GameObject().setPosition(704, 704).setSize(1408, 48).enableImageSprite().setImage(Images.floor).enableCollision())
    gameObjects.push(new GameObject().setPosition(512, 656).setSize(80, 64).enableImageSprite().setImage(Images.glucose).enableCollision().setType("glucose").enableCollisionSizeIsSpriteSize())

    // EASY PART
    gameObjects.push(new GameObject().setPosition(512, -192).setSize(112, 32).enableImageSprite().setImage(Images["112x32"][0]).enableCollision())
    gameObjects.push(new GameObject().setPosition(512, -416).setSize(384, 32).enableImageSprite().setImage(Images["384x32"]).enableCollision())
    gameObjects.push(new GameObject().setPosition(976, -336).setSize(112, 32).enableImageSprite().setImage(Images["112x32"][3]).enableCollision())
    // FALL AND JUMP PART
    gameObjects.push(new GameObject().setPosition(512, 400).setSize(112, 32).enableImageSprite().setImage(Images["112x32"][1]).enableCollision())
    gameObjects.push(new GameObject().setPosition(688, 208).setSize(112, 32).enableImageSprite().setImage(Images["112x32"][2]).enableCollision())
    gameObjects.push(new GameObject().setPosition(560, 96).setSize(32, 32).enableImageSprite().setImage(Images["32x32"]).enableCollision())
    // MOVING PART
    gameObjects.push(new GameObject().setPosition(944, -656).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][3]).enableCollision().setMoveLeftRight(300).setMoveSpeed(1.1))
    gameObjects.push(new GameObject().setPosition(1344, -656).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][2]).enableCollision())
    gameObjects.push(new GameObject().setPosition(1344, -688).setSize(64, 64).enableImageSprite().setImage(Images.atp).setType("ATP2").enableCollisionSizeIsSpriteSize());
    gameObjects.push(new GameObject().setPosition(144, -656).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][0]).enableCollision())
    gameObjects.push(new GameObject().setPosition(144, -688).setSize(64, 64).enableImageSprite().setImage(Images.atp).setType("ATP1").enableCollisionSizeIsSpriteSize());

    // FLOOR ZONE 1
    gameObjects.push(new GameObject().setPosition(704, 704).setSize(1408, 48).enableImageSprite().setImage(Images.floor).enableCollision().setZone(1))
    gameObjects.push(new GameObject().setPosition(96, -9360).setSize(16, 20000).enableImageSprite().setImage(Images.wall).enableCollision().setZone(1));
    
    // FLOOR ZONE 2
    gameObjects.push(new GameObject().setPosition(704, 704).setSize(1408, 48).enableImageSprite().setImage(Images.floor).enableCollision().setZone(2))
    gameObjects.push(new GameObject().setPosition(96, -9360).setSize(16, 20000).enableImageSprite().setImage(Images.wall).enableCollision().setZone(2));
    // FLOOR ZONE -2
    gameObjects.push(new GameObject().setPosition(704, 704).setSize(1408, 48).enableImageSprite().setImage(Images.floor).enableCollision().setZone(-2))
    gameObjects.push(new GameObject().setPosition(96, -9360).setSize(16, 20000).enableImageSprite().setImage(Images.wall).enableCollision().setZone(-2));

    // MOVING SECTION 1 - ZONE 1
    gameObjects.push(new GameObject().setPosition(608, 448).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][0]).enableCollision().setMoveLeftRight(128).setMoveSpeed(1.9).setZone(1))
    gameObjects.push(new GameObject().setPosition(496, 208).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][5]).enableCollision().setMoveLeftRight(144).setMoveSpeed(1).setZone(1))
    gameObjects.push(new GameObject().setPosition(400, -48).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][3]).enableCollision().setMoveLeftRight(208).setMoveSpeed(1.9).setZone(1))
    gameObjects.push(new GameObject().setPosition(800, -384).setSize(1408, 32).enableImageSprite().setImage(Images.floor2).enableCollision().setZone(1))
    gameObjects.push(new GameObject().setPosition(800, -272).setSize(144, 32).enableImageSprite().setImage(Images.tpup).enableCollision().setZone(1).setType("TPUP160"))
    gameObjects.push(new GameObject().setPosition(1200, -384).setSize(144, 32).enableImageSprite().setImage(Images.tpdown).enableCollision().setZone(1).setType("TPDOWN160"))

    // MOVING SECTION 2
    gameObjects.push(new GameObject().setPosition(608, -544).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][1]).enableCollision().setMoveLeftRight(128).setMoveSpeed(1).setZone(1))
    gameObjects.push(new GameObject().setPosition(496, -800).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][2]).enableCollision().setMoveLeftRight(144).setMoveSpeed(1).setZone(1))
    gameObjects.push(new GameObject().setPosition(400, -1056).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][3]).enableCollision().setMoveLeftRight(208).setMoveSpeed(2).setZone(1))
    gameObjects.push(new GameObject().setPosition(304, -1296).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][5]).enableCollision().setZone(1))

    // ADP
    gameObjects.push(new GameObject().setPosition(704, -1504).setSize(256, 32).enableImageSprite().setImage(Images["256x32"]).enableCollision().setMoveLeftRight(400).setMoveSpeed(1.9).setZone(1))
    gameObjects.push(new GameObject().setPosition(800, -1744).setSize(64, 48).enableImageSprite().setImage(Images.adp).setZone(1).setType("ADP1").enableCollisionSizeIsSpriteSize());
    gameObjects.push(new GameObject().setPosition(1200, -1744).setSize(64, 48).enableImageSprite().setImage(Images.adp).setZone(1).setType("ADP2").enableCollisionSizeIsSpriteSize());

    // ZONE -1
    gameObjects.push(new GameObject().setPosition(704, 704).setSize(1408, 48).enableImageSprite().setImage(Images.floor).enableCollision().setZone(-1))
    gameObjects.push(new GameObject().setPosition(1296, -9360).setSize(16, 20000).enableImageSprite().setImage(Images.wall).enableCollision().setZone(-1));
    gameObjects.push(new GameObject().setPosition(704, 380).setSize(64, 608).enableImageSprite().setImage(Images["64x608airflow"]).setType("airflowup").setZone(-1));
    gameObjects.push(new GameObject().setPosition(496, -208).setSize(64, 32).enableImageSprite().setImage(Images["64x32"]).setZone(-1).enableCollision());
    gameObjects.push(new GameObject().setPosition(208, -608).setSize(64, 608).enableImageSprite().setImage(Images["64x608airflow"]).setType("airflowup").setZone(-1));
    gameObjects.push(new GameObject().setPosition(704, -976).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][2]).setZone(-1).setMoveSpeed(1).setMoveLeftRight(304).enableCollision());

    // LEFT SIDE
    gameObjects.push(new GameObject().setPosition(96, -1392).setSize(64, 608).enableImageSprite().enableImageSprite().setImage(Images["64x608airflow"]).setType("airflowup").setZone(-1));
    gameObjects.push(new GameObject().setPosition(400, -1744).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][3]).setZone(-1).enableCollision());
    gameObjects.push(new GameObject().setPosition(544, -1952).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][1]).setZone(-1).enableCollision());
    gameObjects.push(new GameObject().setPosition(288, -2304).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][0]).setZone(-1).enableCollision());
    gameObjects.push(new GameObject().setPosition(800, -2304).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][2]).setZone(-1).enableCollision());

    // RIGHT SIDE
    gameObjects.push(new GameObject().setPosition(1200, -1800).setSize(64, 1216).enableImageSprite().setImage(Images["64x1216airflow"]).setType("airflowup").setZone(-1));
    gameObjects.push(new GameObject().setPosition(704, -2496).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][1]).enableCollision().setMoveSpeed(1.5).setMoveLeftRight(300).setZone(-1));
    gameObjects.push(new GameObject().setPosition(544, -2752).setSize(304, 32).enableImageSprite().setImage(Images["304x32"]).enableCollision().setZone(-1));

    // NADP
    gameObjects.push(new GameObject().setPosition(704, -2880).setSize(64, 48).enableImageSprite().setImage(Images.nadp).setZone(-1).setType("NADP1").enableCollisionSizeIsSpriteSize());
    gameObjects.push(new GameObject().setPosition(400, -2880).setSize(64, 48).enableImageSprite().setImage(Images.nadp).setZone(-1).setType("NADP2").enableCollisionSizeIsSpriteSize());
    
    // ZONE 2 

    gameObjects.push(new GameObject().setPosition(496, 496).setSize(64, 32).enableImageSprite().setImage(Images["64x32"]).setZone(2).enableCollision());
    gameObjects.push(new GameObject().setPosition(704, 304).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][2]).setZone(2).setMoveSpeed(1).setMoveLeftRight(304).enableCollision());
    gameObjects.push(new GameObject().setPosition(896, 96).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][2]).setZone(2).enableCollision());
    gameObjects.push(new GameObject().setPosition(704, -432).setSize(64, 608).enableImageSprite().setImage(Images["64x608airflow"]).setType("airflowup").setZone(2));
    gameObjects.push(new GameObject().setPosition(496, -928).setSize(64, 32).enableImageSprite().setImage(Images["64x32"]).setZone(2).enableCollision());
    gameObjects.push(new GameObject().setPosition(256, -1248).setSize(64, 48).enableImageSprite().setImage(Images.nad).setZone(2).setType("NAD1").enableCollisionSizeIsSpriteSize());
    gameObjects.push(new GameObject().setPosition(768, -1216).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][2]).setZone(2).enableCollision());
    gameObjects.push(new GameObject().setPosition(992, -1472).setSize(64, 48).enableImageSprite().setImage(Images.nad).setZone(2).setType("NAD2").enableCollisionSizeIsSpriteSize());

    // ZONE -2 

    gameObjects.push(new GameObject().setPosition(704, 496).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][2]).setZone(-2).enableCollision());
    gameObjects.push(new GameObject().setPosition(512, 304).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][5]).setZone(-2).setMoveSpeed(1.2).setMoveLeftRight(100).enableCollision());
    gameObjects.push(new GameObject().setPosition(896, 96).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][1]).setZone(-2).enableCollision());
    gameObjects.push(new GameObject().setPosition(464, -96).setSize(96, 32).enableImageSprite().setImage(Images["96x32"][3]).setZone(-2).enableCollision());
    gameObjects.push(new GameObject().setPosition(704, -400).setSize(144, 32).enableImageSprite().setImage(Images["144x32"][3]).setZone(-2).enableCollision());
    gameObjects.push(new GameObject().setPosition(928, -592).setSize(64, 32).enableImageSprite().setImage(Images["64x32"]).setZone(-2).enableCollision());
    gameObjects.push(new GameObject().setPosition(480, -592).setSize(64, 32).enableImageSprite().setImage(Images["64x32"]).setZone(-2).enableCollision());
    gameObjects.push(new GameObject().setPosition(352, -848).setSize(64, 48).enableImageSprite().setImage(Images.coa).setZone(-2).setType("CoA1").enableCollisionSizeIsSpriteSize());
    gameObjects.push(new GameObject().setPosition(1056, -848).setSize(64, 48).enableImageSprite().setImage(Images.coa).setZone(-2).setType("CoA2").enableCollisionSizeIsSpriteSize());
    createCanvas(1400, 740);
    settings.gameHasBegun = true;

}

function draw() {
    console.log(held);
    background("#1dcfdb");
    // image(Images.background,700,-300 + RealGameY,1400,2000);
    // image(Images.map,700,-60 + GameY,1408,1600);
    if (!settings.gameHasBegun) {
        return;
    }
    
   
    for (var gameObject of gameObjects) {
        if(gameObject.type == "player"){continue;};
        if (gameObject.y - gameObject.h / 2 < 740 - RealGameY && gameObject.y + gameObject.h / 2 > -RealGameY && gameObject.zone == zone) {
            gameObject.draw().update();
        } else {
            gameObject.update();
        }
    }
    for(var gameObject of gameObjects){
        if(gameObject.type == "player"){
            gameObject.draw().update();
            gameObject.setMaxJumps(2);
        }
    }
    for(var gameObject of gameObjects){
        if(gameObject.type == "TPUP160"){
            if(gameObject.checkPlayerCollision(gameObject.x,gameObject.y - 1)){
                for(var player of gameObjects){
                    if(player.type == "player"){
                        player.y -= 160; 
                    }
                }
            }
        }
        if(gameObject.type == "TPDOWN160"){
            if(gameObject.checkPlayerCollision(gameObject.x,gameObject.y - 1)){
                for(var player of gameObjects){
                    if(player.type == "player"){
                        player.y += 160; 
                    }
                }
            }
        }
        if(gameObject.type == "airflowup"){
            if(gameObject.checkPlayerCollision(gameObject.x,gameObject.y)){
                for(var player of gameObjects){
                    if(player.type == "player"){
                        player.setMaxJumps(0);
                        player.values.jumps= 0;
                        // player.values.jumps = 0;
                        if(player.yAccl > -1){
                            player.yAccl = -1;
                        }
                        // if(player.y + 3 > gameObject.y && player.y < gameObject.y){
                            // player.yAccl = 0;
                        // }
                    }
                }
            }
        }
    }
    for (var gameObject of gameObjects) {
        if (gameObject.type == "ATP1") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower1";
                    }
                }
            }
        }
        if (gameObject.type == "ATP2") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower2";
                    }
                }
            }
        }
        if (gameObject.type == "ADP1") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower1";
                        mostrecent = "ADP";
                    }
                }
            }
        }
        if (gameObject.type == "ADP2") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower2";
                        mostrecent = "ADP";
                    }
                }
            }
        }
        if (gameObject.type == "NADP1") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower1";
                        mostrecent = "NADP";
                    }
                }
            }
        }
        if (gameObject.type == "NADP2") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower2";
                        mostrecent = "NADP";
                    }
                }
            }
        }
        if (gameObject.type == "NAD1") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower1";
                    }
                }
            }
        }
        if (gameObject.type == "NAD2") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower2";
                    }
                }
            }
        }
        if (gameObject.type == "CoA1") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower1";
                    }
                }
            }
        }
        if (gameObject.type == "CoA2") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    if (Math.hypot(gameObject.x - player.x, gameObject.y - player.y) < 50 && gameObject.zone == zone) {
                        gameObject.type = "follower2";
                    }
                }
            }
        }
    }
    for (var gameObject of gameObjects) {
        if (gameObject.type == "player") {
            gameObject.zone = zone;
        }
    }
    for (var gameObject of gameObjects) {
        if (gameObject.type == "follower1") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    var x = player.x + player.zone * 1400;
                    var myx = gameObject.x + gameObject.zone * 1400;
                    // gameObject.x = player.x;
                    // gameObject.y = player.y;
                    if (Math.abs(x + 50 - myx) > 7) {
                        if (x + 50 > myx) {
                            gameObject.x += 7;
                        } else {
                            gameObject.x -= 7;
                        }
                    } else {
                        // gameObject.x = player.x;
                    }
                    if (Math.abs(player.y - gameObject.y) > 10) {
                        if (player.y > gameObject.y) {
                            gameObject.y += 10;
                        } else {
                            gameObject.y -= 10;
                        }
                    } else {
                        //    gameObject.y = player.y;
                    }
                }
            }
        }
        if (gameObject.type == "follower2") {
            for (var player of gameObjects) {
                if (player.type == "player") {
                    var x = player.x + player.zone * 1400;
                    var myx = gameObject.x + gameObject.zone * 1400;
                    // gameObject.x = player.x;
                    // gameObject.y = player.y;
                    if (Math.abs(x - 50 - myx) > 7) {
                        if (x - 50 > myx) {
                            gameObject.x += 7;
                        } else {
                            gameObject.x -= 7;
                        }
                    } else {
                        // gameObject.x = player.x;
                    }
                    if (Math.abs(player.y - gameObject.y) > 10) {
                        if (player.y > gameObject.y) {
                            gameObject.y += 10;
                        } else {
                            gameObject.y -= 10;
                        }
                    } else {
                        //    gameObject.y = player.y;
                    }
                }
            }
        }
    }
    for (var gameObject of gameObjects) {
        if (gameObject.type == "follower1" || gameObject.type == "follower2") {
            for (var glucose of gameObjects) {
                if ((glucose.type == "glucose" || glucose.type == "fructose-1" || glucose.type == "pyruvate1" || glucose.type == "pyruvate2" || glucose.type == "Acetyl") && glucose.zone == gameObject.zone) {
                    if (Math.hypot(glucose.x - gameObject.x, glucose.y - gameObject.y) < 150) {
                        gameObject.type = "glucosefollower"
                    }
                }
            }
        }
    }
    for (var gameObject of gameObjects) {
        if (gameObject.type == "glucosefollower") {
            for (var glucose of gameObjects) {
                if ((glucose.type == "glucose" || glucose.type == "fructose-1" || glucose.type == "pyruvate1" || glucose.type == "pyruvate2" || glucose.type == "Acetyl") && glucose.zone == gameObject.zone) {
                    // gameObject.x = player.x;
                    // gameObject.y = player.y;
                    if (Math.abs(glucose.x - gameObject.x) > 3) {
                        if (glucose.x > gameObject.x) {
                            gameObject.x += 3;
                        } else {
                            gameObject.x -= 3;
                        }
                    } else {
                        // gameObject.x = player.x;
                    }
                    if (Math.abs(glucose.y - gameObject.y) > 4) {
                        if (glucose.y > gameObject.y) {
                            gameObject.y += 4;
                        } else {
                            gameObject.y -= 4;
                        }
                    } else {
                        //    gameObject.y = player.y;
                    }
                }
            }
        }
    }
    for (var gameObject of gameObjects) {
        if (gameObject.type == "glucosefollower") {
            for (var glucose of gameObjects) {
                if (glucose.type == "glucose" || glucose.type == "fructose-1" || glucose.type == "pyruvate1" || glucose.type == "pyruvate2" || glucose.type == "Acetyl") {
                    console.log("test");
                    if (Math.hypot(gameObject.x - glucose.x, gameObject.y - glucose.y) < 50) {
                        held++;
                        if(gameObject.settings.image == Images.adp){
                            adp++
                        }
                        if(gameObject.settings.image == Images.nadp){
                            nadp++;
                        }
                        if(held == 1 && settings["CompletedStep1:ATP"] == false){
                            curDialogueBox = DialogueBoxes.atp1;
                        }

                        gameObjects.splice(gameObjects.indexOf(gameObject), 1);
                    }
                }
            }
        }
    }
    if (held == 2 && settings["CompletedStep1:ATP"] == false) {
        for (var glucose of gameObjects) {
            if (glucose.type == "glucose") {
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.adp).setType("glucosefollower").setPosition(glucose.x - 150, glucose.y).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.adp).setType("glucosefollower").setPosition(glucose.x + 150, glucose.y).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                glucose.setImage(Images.fructose).setType("fructose-1").setSize(70, 70);
                settings["CompletedStep1:ATP"] = true;
                curDialogueBox = DialogueBoxes.atp2;
                held = 0;
            }
        }
    }
    if (held == 2 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"]){
        curDialogueBox = DialogueBoxes.step1done;
    }
    if (held == 3 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && adp == 3){
        curDialogueBox = DialogueBoxes.adp1nadp0;
    }
    if (held == 3 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 1){
        curDialogueBox = DialogueBoxes.adp0nadp1;
    }
    if (held == 4 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && adp == 4){
        curDialogueBox = DialogueBoxes.adp2nadp0;
    }
    if (held == 4 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 2){
        curDialogueBox = DialogueBoxes.adp0nadp2;
    }
    if (held == 4 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 1 && adp == 3 && mostrecent == "NADP"){
        curDialogueBox = DialogueBoxes.adp1nadp1nadp;
    }
    if (held == 4 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 1 && adp == 3 && mostrecent == "ADP"){
        curDialogueBox = DialogueBoxes.adp1nadp1adp;
    }
    if (held == 5 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 2 && adp == 3 && mostrecent == "ADP"){
        curDialogueBox = DialogueBoxes.adp1nadp2adp;
    }
    if (held == 5 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 2 && adp == 3 && mostrecent == "NADP"){
        curDialogueBox = DialogueBoxes.adp1nadp2nadp;
    }
    if (held == 5 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 1 && adp == 4 && mostrecent == "ADP"){
        curDialogueBox = DialogueBoxes.adp2nadp1adp;
    }
    if (held == 5 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 1 && adp == 4 && mostrecent == "NADP"){
        curDialogueBox = DialogueBoxes.adp2nadp1nadp;
    }
    if (held == 6 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 2 && adp == 4 && mostrecent == "ADP"){
        curDialogueBox = DialogueBoxes.adp2nadp2adp;
    }
    if (held == 6 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"] && nadp == 2 && adp == 4 && mostrecent == "NADP"){
        curDialogueBox = DialogueBoxes.adp2nadp2nadp;
    }
    if (held == 6 && settings["CompletedStep1:ATP"] && !settings["CompletedStep2:NADP++ADP"]) {

        for (var glucose of gameObjects) {
            if (glucose.type == "fructose-1") {
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.atp).setType("ATPDONE").setPosition(glucose.x - 50, glucose.y).setSize(70, 70).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.atp).setType("ATPDONE").setPosition(glucose.x + 50, glucose.y).setSize(70, 70).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.atp).setType("ATPDONE").setPosition(glucose.x - 50, glucose.y - 100).setSize(70, 70).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.atp).setType("ATPDONE").setPosition(glucose.x + 50, glucose.y - 100).setSize(70, 70).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.nadph).setType("NADPH").setPosition(glucose.x - 50, glucose.y - 50).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.nadph).setType("NADPH").setPosition(glucose.x + 50, glucose.y - 50).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                gameObjects.push(new GameObject().enableImageSprite().setImage(Images.pyruvate).setType("pyruvate2").setPosition(glucose.x, glucose.y - 50).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                glucose.setImage(Images.pyruvate).setType("pyruvate1").setSize(70, 57);
                curDialogueBox = DialogueBoxes.SnipCarbon;
                settings["CompletedStep2:NADP++ADP"] = true;
                held = 0;
            }
        }
    }
    if(settings["CompletedStep2:NADP++ADP"] && held == 0 && !settings["CompletedStep3:NAD"]){
                setTimeout(function(){
        for (var glucose of gameObjects) {
            if (glucose.type == "pyruvate1") {
                    gameObjects.push(new GameObject().enableImageSprite().setImage(Images.CO2).setType("CO2").setPosition(glucose.x - 50, glucose.y - 150).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                    gameObjects.push(new GameObject().enableImageSprite().setImage(Images.CO2).setType("CO2").setPosition(glucose.x + 50, glucose.y - 150).setSize(70, 57).enableCollisionSizeIsSpriteSize());
            }
        }
                },1000)
                setTimeout(function(){
                    held = 2;
                },2000);
    }
    if(settings["CompletedStep2:NADP++ADP"] && held == 2 && !settings["CompletedStep3:NAD"]){
        // for (var glucose of gameObjects) {
            // if (glucose.type == "pyruvate1") {
                curDialogueBox = DialogueBoxes.step3start;
            // }
        // }
    }
    if(settings["CompletedStep2:NADP++ADP"] && held == 3 && !settings["CompletedStep3:NAD"]){
        // for (var glucose of gameObjects) {
            // if (glucose.type == "pyruvate1") {
                curDialogueBox = DialogueBoxes.nad1;
            // }
        // }
    }
    if(settings["CompletedStep2:NADP++ADP"] && held == 4 && !settings["CompletedStep3:NAD"]){
        // for (var glucose of gameObjects) {
            // if (glucose.type == "pyruvate1") {
                curDialogueBox = DialogueBoxes.step3done;
                held = 0;
                setTimeout(function(){

        for (var glucose of gameObjects) {
            if (glucose.type == "pyruvate1") {
                    gameObjects.push(new GameObject().enableImageSprite().setImage(Images.nadh).setType("NADH").setPosition(glucose.x - 50, glucose.y - 200).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                    gameObjects.push(new GameObject().enableImageSprite().setImage(Images.nadh).setType("NADH").setPosition(glucose.x + 50, glucose.y - 200).setSize(70, 57).enableCollisionSizeIsSpriteSize());
                    glucose.setImage(Images.acetyl).setType("Acetyl");
            }
        }
        for (var glucose2 of gameObjects) {
            if (glucose2.type == "pyruvate2") {
                    glucose2.setImage(Images.acetyl).setType("Acetyl");
            }
        }
        curDialogueBox = DialogueBoxes.step4start;

                },1000)
                settings["CompletedStep3:NAD"] = true;
            // }
        // }
    }
    if(settings["CompletedStep3:NAD"] && !settings["CompletedStep4:CoA"] && held == 2){
        // for (var glucose of gameObjects) {
            // if (glucose.type == "pyruvate1") {
                curDialogueBox = DialogueBoxes.step4done;
                held = 0;
                setTimeout(function(){

        for (var glucose of gameObjects) {
            if (glucose.type == "Acetyl") {
                    glucose.setImage(Images.acoa).setType("Acetyl CoA");
            }
        }
        curDialogueBox = DialogueBoxes.complete;

                },1000)
                settings["CompletedStep4:CoA"] = true;
            // }
    }

    for (var gameObject of gameObjects) {
        if (gameObject.type == "player") {
            GameY = 680 - gameObject.y - 280;
            if (GameY < 0) {
                GameY = 0;
            }
            if (GameY > RealGameY) {
                if (Math.abs(GameY - RealGameY) > 6) {
                    RealGameY += 4;
                } else {
                    // RealGameY = GameY;
                }
            } else {
                if (Math.abs(GameY - RealGameY) > 12) {
                    RealGameY -= 12;
                } else {
                    // RealGameY = GameY;
                }
            }

        }
    }
    if (settings["CompletedStep1:ATP"]) {
        for (var gameObject of gameObjects) {
            if (gameObject.x > 1400 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == 0) {
                gameObject.zone = 1;
                if (gameObject.type == "player") {
                    zone = 1;
                }
                gameObject.x -= 1400;
            }
        }
        for (var gameObject of gameObjects) {
            if (gameObject.x < 0 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == 1) {
                gameObject.zone = 0;
                if (gameObject.type == "player") {
                    zone = 0;
                }
                gameObject.x += 1400;
            }
        }
        if(settings["CompletedStep2:NADP++ADP"]){
            for (var gameObject of gameObjects) {
                if (gameObject.x > 1400 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == 1) {
                    gameObject.zone = 2;
                    if (gameObject.type == "player") {
                        zone = 2;
                    }
                    gameObject.x -= 1400;
                }
            }
            for (var gameObject of gameObjects) {
                if (gameObject.x < 0 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == 2) {
                    gameObject.zone = 1;
                    if (gameObject.type == "player") {
                        zone = 1;
                    }
                    gameObject.x += 1400;
                }
            }
            if(settings["CompletedStep3:NAD"]){
            for (var gameObject of gameObjects) {
                if (gameObject.x < 0 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == -1) {
                    gameObject.zone = -2;
                    if (gameObject.type == "player") {
                        zone = -2;
                    }
                    gameObject.x += 1400;
                }
            }
            for (var gameObject of gameObjects) {
                if (gameObject.x < 25 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == -2) {
                    gameObject.x = 1375;
                }
            }
            for (var gameObject of gameObjects) {
                if (gameObject.x > 1400 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == -2) {
                    gameObject.zone = -1;
                    if (gameObject.type == "player") {
                        zone = -1;
                    }
                    gameObject.x -= 1400;
                }
            }
        }
        }else{
            for (var gameObject of gameObjects) {
                if (gameObject.x >= 1375 && gameObject.type == "player" && zone == 1) {
                    gameObject.x = 1375;
                }
            }
        }
        for (var gameObject of gameObjects) {
            if (gameObject.x >= 1375 && gameObject.type == "player" && zone == 2) {
                gameObject.x = 1375;
            }
        }
        for (var gameObject of gameObjects) {
            if (gameObject.x < 0 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == 0) {
                gameObject.zone = -1;
                if (gameObject.type == "player") {
                    zone = -1;
                }
                gameObject.x += 1400;
            }
        }
        for (var gameObject of gameObjects) {
            if (gameObject.x > 1400 && (gameObject.type == "player" || gameObject.type == "follower1" || gameObject.type == "follower2") && gameObject.zone == -1) {
                gameObject.zone = 0;
                if (gameObject.type == "player") {
                    zone = 0;
                }
                gameObject.x -= 1400;
            }
        }
    } else {
        for (var gameObject of gameObjects) {
            if (gameObject.x >= 1375 && gameObject.type == "player" && zone == 0) {
                gameObject.x = 1375;
            }
        }
        for (var gameObject of gameObjects) {
            if (gameObject.x <= 25 && gameObject.type == "player" && zone == 0) {
                gameObject.x = 25;
            }
        }
    }
    if(!settings["CompletedStep3:NAD"]){for (var gameObject of gameObjects) {
        if (gameObject.x <= 25 && gameObject.type == "player" && zone == -1) {
            gameObject.x = 25;
        }
    }}


    if (keyIsDown(LEFT_ARROW)) {
        for (var gameObject of gameObjects) {
            if (gameObject.type == "player") {
                gameObject.attemptMove(gameObject.x - 1.3, gameObject.y)
            }
        }
    }
    if (keyIsDown(RIGHT_ARROW)) {
        for (var gameObject of gameObjects) {
            if (gameObject.type == "player") {
                gameObject.attemptMove(gameObject.x + 1.3, gameObject.y)
            }
        }
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(UP_ARROW)) {
        for (var gameObject of gameObjects) {
            if (gameObject.type == "player" && gameObject.values.jumps < gameObject.settings.maxJumps && gameObject.values.timeSinceLastJump > 150) {
                if (gameObject.values.jumps == 0) {
                    gameObject.yAccl = -3.3;
                } else if (gameObject.values.jumps == 1) {
                    gameObject.yAccl /= 2;
                    gameObject.yAccl -= 2.8;
                } else {
                    gameObject.yAccl /= 2;
                    gameObject.yAccl -= 2.3;
                }
                gameObject.values.jumps++;
                gameObject.values.timeSinceLastJump = 0;
            }
        }
    }
    if (keyIsDown(32)) {
        for (var gameObject of gameObjects) {
            if (gameObject.type == "player") {
                gameObject.y -= 12;
                gameObject.yAccl = 0;
            }
        }
    }
    if(zone == 0){
        image(curDialogueBox,750,550 + RealGameY,250,150)
    }
    frameRate(60);
}
