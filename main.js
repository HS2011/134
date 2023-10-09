objects = [];
status = "";
sound = ""
function preload(){
    sound = loadSound("alarm.mp3")
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  video = createCapture(VIDEO)
  video.hide()
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  
  document.getElementById("status").innerHTML = "Status : Detecting Baby";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 640, 420);
  console.log(objects);


      if(status != "")
      {
        objectDetector.detect(video, gotResult);
         a = random(1, 254)
         b = random(1, 254)
         c = random(1, 255)
        for (i = 0; i < objects.length; i++) {
          document.getElementById("Name").innerHTML = "Number of Objects Detected are " + objects.length;

         // noStroke();
          fill(a, b, c);

          percent = floor(objects[i].confidence * 100);
         mytext= objects[i].label + " " + percent + "%"

         // textSize(40); // giving text your choice of size
          text(mytext, objects[i].x+15 , objects[i].y+10);  //text("", x,y)

          noFill();
         // strokeWeight(12);
          stroke(a, b, c);
          rect(objects[i].x, objects[i].y-20, objects[i].width, objects[i].height);
        
        if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Status : Baby Detected"; 
            sound.stop()
        }
        else{
            sound.play()
            document.getElementById("status").innerHTML = "Status : Baby Not Detected";
        }
        }
        

      }
      if(objects.length == 0){
        sound.play()
        document.getElementById("status").innerHTML = "Status : Baby Not Detected";
      }
}
