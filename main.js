video = "";
Status = "";
object = [];

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
 function draw()
 {
    image(video, 0, 0, 480, 380);

    if(Status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detecting objects";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            noFill();
            text(object[i].label + " " + percent + " %", object[i].x, object[i].y);
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[1].width, object[i].height);
        }
    }


 }

 function modelLoaded()
 {
    console.log("Model Loaded!");
    video.loop();
    video.volume(0);
    video.speed(1);
 }

 function gotResult(error, results)
 {
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    object = results;
 }

 