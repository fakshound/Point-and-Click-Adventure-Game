//Globals
        //Title 
    var ekareAscii,
        //the poems object from php
        ourAnecdote,
        //picks the poem
        lvlArray=[],
        
        r = 0,
        //unit
        unitCoordinates = [100, 100],
        //point
        pointCoordinates = [200,300],
        //pointer moves
        moves = 0,
        //canvas
        cnv,
        //reset button
        button;

function preload() {
    //getAnecdote(r);
    getStoryArray();
    
    ekareAscii = loadImage('./images/ekareDarkAscii.png');
    //generate random story array
    a= round(random(3,5));
    for (let i=1; i<=8; i++) {
        lvlArray.push((i+1*a)%8);
    }
    myFont = loadFont('./font/Courier-New-Bold.ttf');
    hitCrunchAudio = [createAudio('./audio/hit.mp3'), createAudio('./audio/hit2.mp3'), createAudio('./audio/hit3.mp3')];
    nxtLvlAudio = [createAudio('./audio/nxtLvl.mp3')];
}

function setup() {
    frameRate(10);
    textFont(myFont);
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("#sketch"); 
    cnv.style('display', 'block');
    cursor(CROSS);  
    
}

function draw() {
    background(30);
    titleImage();
    if(r >= lvlArray.length) {
        newGame();
        noLoop();
    } else {
        readAnecdote(r);
        theWalls();
        
        theUnit();
    }
    
}

function readAnecdote(i) {
    let story = ourAnecdote[lvlArray[i]],
        randText = [random(5,12), random(-3,3)];
        
        if (moves < story.length) {
            thePoint();
            strokeWeight(1);
            stroke(204, 255, 204);
            textSize(16);
            if(frameCount*random([43,773]) % random([53,109,7919,307]) == 0 ) {
                let r = round(random(0, story.length));
                text(story[r%story.length],pointCoordinates[0] + randText[0], pointCoordinates[1] +randText[1]);
                frameRate(3);
            } else {
                text(story[moves%story.length],pointCoordinates[0] + randText[0], pointCoordinates[1] +randText[1]);
                frameRate(10)
            }

            //mirror
            stroke(100);
            textSize(20);
            
            if(frameCount*random([43,863]) % random([53,109,7919,307]) == 0 ) {
                let r = round(random(0, story.length));
                text(story[r%story.length], pointCoordinates[0] +500, pointCoordinates[1]+5);
                frameRate(3);
            } else {
                text(story[moves%story.length], pointCoordinates[0] +500, pointCoordinates[1]+5);
            }
        
        } else {
            nxtLvlAudio[0].play();
            setTimeout(levelButton, 200);
            setTimeout(noLoop(), 150);
        }

}

//Buttons
    function levelButton() {
        textSize(16);
        nxtLvlImg = createButton("Next Level");
        nxtLvlImg.position(0.5*windowWidth, 0.67*windowHeight);
        nxtLvlImg.mousePressed(nextLevel);
    }
    function newGame() {
        textSize(16);
        newGameButton = createButton("NEW GAME");
        newGameButton.position(0.5*windowWidth, 0.67*windowHeight);
        newGameButton.id("resetGame");numberOfStories
    }

function nextLevel() {
    moves = 0;
    removeElements();
    readAnecdote(r++);
    loop();

}
    
function moveUnit(x,y) {
    unitCoordinates = [x, y];
    //hit crunch sound
    if(dist(unitCoordinates[0],unitCoordinates[1],pointCoordinates[0],pointCoordinates[1]) < 40) {
        random(hitCrunchAudio).play();
    }
    //move goal
    if(dist(unitCoordinates[0],unitCoordinates[1],pointCoordinates[0],pointCoordinates[1]) < 30) {
        let xy = unitCoordinates;
        //put new point further away from old position
        do {
            xY = [random(100, 400),random(5, windowHeight-5)];
        }
        while (dist(xY[0], xY[1],unitCoordinates[0], unitCoordinates[1]) < 100);
        pointCoordinates[0] = xY[0];
        pointCoordinates[1] = xY[1];
        moves++;
        
    }
}

function traverse() {
    let d = dist(unitCoordinates[0], unitCoordinates[1], mouseX, mouseY,),
    v = 5,
    t = d/v,
    step = ceil(d/v);
    for (i=1;i<step;i++){
        let traverseCoordinates = [lerp(unitCoordinates[0], mouseX, (1/step)*i), lerp(unitCoordinates[1], mouseY, (1/step)*i)]
        if (traverseCoordinates[0]>100 && traverseCoordinates[0] <400) {
        setTimeout(moveUnit, t*i, traverseCoordinates[0], traverseCoordinates[1]);
        }
    }
        
}

function theUnit () {
    noStroke()
    fill(230);
    ellipse (unitCoordinates[0], unitCoordinates[1], 10, 10);
        //mirror
    fill(90)
    ellipse(unitCoordinates[0] + 500, unitCoordinates[1], 10, 10);
       cnv.mouseClicked(traverse);
}
function thePoint () {
    stroke(255, 173, 153); 
    strokeWeight(5);
    point(pointCoordinates[0], pointCoordinates[1]);
    
}
function theWalls () {
    stroke(220);
    line (75, 0, 75, windowHeight);
    line (425, 0, 425, windowHeight);
        //mirror
    stroke(80);    
    line (575, 0, 575, windowHeight);
    line (925, 0, 925, windowHeight);
}
//game background and background functions

    function titleImage () {
        let x = random(-5, 5);
        let y = random(-4, 4);
        image(ekareAscii, x, y, 811, 197);
        fill(140);
        stroke(150);
        strokeWeight(1);
        textSize(8);
        let myWords = ["Coffee", "Email", "Funding", "Death", "Speed", "Despair", "Success"];
        let word = random(myWords);
        text(word, x + 5, y + 195);
    }

    //poems
    
    function getStoryArray () {
        let poem1 = ["You", "live", "on", "through", "muscle memories"],
            poem2 = ["I felt", "the shaking", "but later", "realised", "it was only a train"],
            poem3 = ["When", "she", "said", "sometimes if I", "close my eyes tight", "I can still feel him there"],
            poem4 = ["Causeing", "an", "indescribable", "feeling", "to", "well up", "within"],
            poem5 = ["The", "potency", "of the", "smell of", "your", "sweat", "and cum"],
            poem6 = ["Primal", "quick", "moving", "minds"],
            poem7 = ["Now", "we", "run", "from", "our feelings"],
            poem8 = ["A", "quiet", "moment", "to stretch", "our minds", "together"];

            ourAnecdote = [poem1, poem2, poem3, poem4, poem5, poem6, poem7, poem8];
        return ourAnecdote;    
    }
    //fullscreen
    function keyPressed() {
        if (keyCode === 32) {
            let fs = fullscreen();
            fullscreen(!fs);    } 
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }





