status = "";
object_name = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            object_name=document.getElementById("nameInput").value ;
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("statusFound").innerHTML = object_name + " found";
                var synth = window.speechSynthesis;
                speak_data =  objects[i].label+" Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis) ;
            }
            else{
                document.getElementById("statusFound").innerHTML = object_name + " not found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    name = document.getElementById("nameInput").value;
}

function modelLoaded() {
    console.log("Model is loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}