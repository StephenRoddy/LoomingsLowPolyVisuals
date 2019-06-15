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
  amplitude = new p5.Amplitude();

    toggleBtn = createButton("Play/Stop");
    toggleBtn.addClass("toggle-btn");
    toggleBtn.mousePressed(toggleAudio);

}

function draw() {
frameRate(10);   //set frame rate


fft.analyze();
level = amplitude.getLevel();

     bass = fft.getEnergy("bass");
     lowMid = fft.getEnergy("lowMid");
     mid = fft.getEnergy("mid");
     highMid = fft.getEnergy("highMid");
     treble = fft.getEnergy("treble");

     bassMap = map(bass,   0, 255, 0, 1);
     midMap  =  map(lowMid+mid,    0, 510, 0, 1);
     trebMap = map(highMid+treble, 0, 510, 0, 1);

  //   levelMap255 = map(level, 0, 1, 0, 255);

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

pattern = Trianglify({variance: 1*midMap,cell_size: 50-(20*midMap), color_space: 'hsl', stroke_width: 1.75+(3.25*trebMap), seed: 'stardust', x_colors:"random",color_function: colorFunc});
//console.log(bassMap,midMap,trebMap);

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

//colors = ['rgb(255,0,0)','rgb(100,200,75)','rgb(38,57,143)'];

var colorFunc = function(x, y) { // colors individual polygons
//	return 'rgb('+Math.floor(Math.abs(x*y)*(94+((161-94)*bassMap)))+','+Math.floor(Math.abs(x*y)*(157-((157-76)*midMap)))+','+Math.floor(Math.abs(x*y)*(181+((183-181)*trebMap)))+')';
//  rgb1= [94,157,183];
//  rgb2= [161,76,181];

//rgb = 'rgb('+Math.floor(Math.abs(x*y)*((Math.abs(rgb1[0]-rgb2[0]))*level)+rgb1[0])+','+Math.floor(Math.abs(x*y)*((Math.abs(rgb1[1]-rgb2[1]))*level)+rgb1[1])+','+Math.floor(Math.abs(x*y)*((Math.abs(rgb1[2]-rgb2[2]))*level)+rgb1[2])+')';
//rgb = 'rgb('+Math.floor(Math.abs(x*y)*(161+((177-161)*bassMap)))+','+Math.floor(Math.abs(x*y)*(76-((76-31)*trebMap)))+','+Math.floor(Math.abs(x*y)*(181-((181-52)*midMap)))+')';
//Colors above ar actual colors

//rgb = 'rgb(177,31,52)';


//rgb = 'rgb('+(161+(Math.floor(Math.abs(x*y)*((177-161)*bassMap))))+','+(31+(Math.floor(Math.abs(x*y)*((76-31)*trebMap))))+','+(52+(Math.floor(Math.abs(x*y)*((181-52)*midMap))))+')';

hsl = 'hsl('+(260+(Math.floor(Math.abs((x*y)+(x*y))*110)*bassMap))+','+(60+((20*midMap*level))*(x+y))+'%,'+(50+((30*trebMap*level))*(x*y))+'%)';

//rgb = 'rgb('+(161+(Math.floor(Math.abs(x*y)*((177-161)*bassMap))))+','+(31+(Math.floor(Math.abs(x*y)*((76-31)*trebMap))))+','+(52+(Math.floor(Math.abs(x*y)*((181-52)*midMap))))+')';


//console.log('x ='+x+'y= '+y);
//rgb = 'rgb('+(161+((177-161)*bassMap))+','+(31+((76-31)*trebMap))+','+(52+((181-52)*midMap))+')';

// x = scael from 0 to 1 0 = left ahdn of screen and 1= right.
// y = scale from 0 to 1 where 1 = bottom of screen and 0 = top

return hsl;



};

// rgb(161,76,181) // Stardust Sonata Purple
// rgb(94,157,183) // Stardust Sonata Blue
// 177,31,52 //SS red


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
