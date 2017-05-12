var streams = [];
var symbolSize = 20;
var track;

function preload() { 
   track = loadSound("sound/track.mp3");
}

function setup () {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    track.setVolume(0.2);
    track.play();
    background(0);
    var x = 0;
    var y = random(-500,0);
    for (var i = 0; i < width/symbolSize ; i++) {
        stream = new Stream();
        stream.generateSymbols(x, y);
        streams.push(stream);
        x += symbolSize;
    }
    textSize(symbolSize);
}

function draw() {
    background(0, 100);
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
    this.value;
    this.switchInterval = round(random(2, 20));

    this.setToRandomSymbol = function() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        }
    }

    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream () {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5,15);

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