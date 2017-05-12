var streams = [];
var symbolSize = 20;
var track;

function preload() { 
   track = loadSound("sound/track.mp3");
}

function setup () {
    createCanvas(window.innerWidth, window.innerHeight);
    track.setVolume(0.5);
    track.play();
    track.loop(330);
    background(0);
    var x = 0;  // Initializing x coordinate to the top left corner
    var y = random(-1000,0);

    // Creating Symbols
    for (var i = 0; i < width/symbolSize ; i++) {
        stream = new Stream();
        stream.generateSymbols(x, y);
        streams.push(stream);
        x += symbolSize + 5;    // Gradualling increasing the x-coordinate of the symbol
    }
    textSize(symbolSize);
}

function draw() {
    background(0, 100);     // White background with 100 opacity
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
    this.value;     // Character Value
    this.switchInterval = round(random(2, 20));     // Rate of change of value of the symbol

    this.setToRandomSymbol = function() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
        }
    }

    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream () {
    this.symbols = [];
    this.totalSymbols = round(random(10, 30));
    this.speed = random(10,25);

    // Creates an array of symbols
    this.generateSymbols = function(x, y) {
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i < this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first)
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol){
            (symbol.first) ? fill(180, 255, 180) : fill(0, 255, 70);
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}