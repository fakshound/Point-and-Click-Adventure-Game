//Globals
        //Title 
    var ekareAscii,
        //the poems object from php
        ourAnecdote,
        //picks the poem
        lvlArray=[],
        //where in the poem array user is
        r = 0,
        //unit
        unitCoordinates = [100, 100],
        //point
        pointCoordinates = [200,300],
        //pointer moves
        moves = 0,
        //canvas
        cnv;
        function generatePoemList () {
            //getAnecdote(r);
            getStoryArray();
            lvlArray = [];
            //generate random story array
            randomCeasar = round(random(0,7));
            let tA = [];
            for (let i=1; i<=8; i++) {
                a= (i+randomCeasar)%8;
                tA.push(a);
            }
            lvlArray = [tA[6],tA[4],tA[7],tA[0],tA[5],tA[2],tA[3],tA[1]];
            console.log(lvlArray);
        }
        
        function readAnecdote(i) {
            let story = ourAnecdote[lvlArray[i]],
                randText = [random(5,12), random(-3,3)];

                //r counter
                textSize(12);
                text("level:" + r, windowWidth - 100, windowHeight-15);
                
                if (moves < story.length) {
                    thePoint();
                    strokeWeight(1);
                    stroke(204, 255, 204);
                    textSize(20);
                    if(frameCount*random([43,773]) % random([53,109,7919,307]) == 0 ) {
                        let rN = round(random(0, story.length));
                        text(story[rN%story.length],pointCoordinates[0] + randText[0], pointCoordinates[1] +randText[1]);
                        frameRate(3);
                    } else {
                        text(story[moves%story.length],pointCoordinates[0] + randText[0], pointCoordinates[1] +randText[1]);
                        frameRate(10)
                    }
        
                    //mirror
                    stroke(100);
                    textSize(24);
                    
                    if(frameCount*random([43,863]) % random([53,109,7919,307]) == 0 ) {
                        let rM = round(random(0, story.length));
                        text(story[rM%story.length], pointCoordinates[0] +500, pointCoordinates[1]+5);
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
        
        //New level Buttons
        function levelButton() {
            textSize(20);
            if (r >= 5) {
                nxtLvlImg = createButton("Enjoy");
            }
            else{
                nxtLvlImg = createButton("Next Level");

            }
            nxtLvlImg.position(0.5*windowWidth, 0.67*windowHeight);
            nxtLvlImg.mousePressed(nextLevel);
        }
        //new game button for some reason
        function textFunc () {
            newGameAudio[0].play();
            textSize(20);
            newGameButton = createButton("NEW GAME");
            newGameButton.position(0.5*windowWidth, 0.67*windowHeight);
            r = 0;
            newGameButton.mousePressed(newGame);
        }

        //cues up the next level/poem
        function nextLevel() {
            moves = 0;
            removeElements();
            readAnecdote(r++);
            loop();
        
        }
        //sets up a new game
        function newGame () {
            moves = 0;
            r = 0;
            removeElements();
            preload();
            setup();
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
                let xY = unitCoordinates;
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
            v = 7,
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
    if (keyCode === 32 || keyCode === 70) {
        let fs = fullscreen();
        fullscreen(!fs);    
    } 
}
        
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
       
//p5 functions            

function preload() {
    ekareAscii = loadImage('./images/ekareDarkAscii.png');
    myFont = loadFont('./font/Courier-New-Bold.ttf');
    hitCrunchAudio = [createAudio('./audio/hit.mp3'), createAudio('./audio/hit2.mp3'), createAudio('./audio/hit3.mp3')];
    nxtLvlAudio = [createAudio('./audio/nxtLvl.mp3')];
    newGameAudio = [createAudio('./audio/newGame.mp3')];
}

function setup() {
    generatePoemList()
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
    //game over
    if(r == lvlArray.length-2) {
        //make new gamebutton
        textFunc();
        setTimeout(noLoop(), 150);  
    } else {
        readAnecdote(r);
        theWalls();
        theUnit();
    }
    
}





