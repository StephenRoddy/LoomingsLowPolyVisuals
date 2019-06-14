var audio,toggleBtn, pattern, amplitude, out,scrnClr, level, bass, bassMap, mid,lowMid, midMap, highMid, treble,trebMap;

function preload() {
    audio = loadSound("audio/Loomings.mp3"); 
}


function setup() {

pattern = Trianglify({
height: window.innerHeight,
width: window.innerWidth,
cell_size: 5, variance:1});

out = document.body.appendChild(pattern.canvas());
out.setAttribute("id","upDateCnv");


  fft = new p5.FFT(); // fft analysis

    toggleBtn = createButton("Play/Stop");
    toggleBtn.addClass("toggle-btn");
    toggleBtn.mousePressed(toggleAudio);

}

function draw() {
frameRate(10)   //set frame rate


fft.analyze();

     bass = fft.getEnergy("bass");
    
     lowMid = fft.getEnergy("lowMid");
     mid = fft.getEnergy("mid");
    
     highMid = fft.getEnergy("highMid");
     treble = fft.getEnergy("treble");


     bassMap = map(bass,   0, 255, 0, 1);
    
     midMap  =  map(lowMid+mid,    0, 510, 0, 1); 

     trebMap = map(highMid+treble, 0, 510, 0, 1);


//CANVAS UPDATE AREA
clearCnv();                           //clear the canvas
upDateCnv(bassMap,midMap,trebMap,level);   //draw to the canvas

}


function toggleAudio() {
  //  plyArr= plyArr;
    if (audio.isPlaying()) {
      audio.stop();
    } else {
      audio.play();
    }
}

function upDateCnv(bassMap,midMap,trebMap,level) {

pattern = Trianglify({variance: bassMap,cell_size: 50-(45*midMap), stroke_width: 10*trebMap, seed: 'wlren', x_colors: 'random'});
console.log(bassMap,midMap,trebMap);

out = document.body.appendChild(pattern.canvas());
out.setAttribute("id","upDateCnv");
}

/* //Options for Trianglify

var defaults = {
  cell_size: 75,
  variance: 0.75,
  x_colors: 'random',
  y_colors: 'match_x',
  palette: Trianglify.colorbrewer,
  color_space: 'lab',
  color_function: false,
  stroke_width: 1.51,
  width: 600,
  height: 400,
  seed: null
};
*/



function clearCnv() {

scrnClr = document.getElementById("upDateCnv");
scrnClr.remove(); // delete current canvas state

}


function fullScren() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
