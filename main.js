function setup() {
  canvas = createCanvas(297, 498);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded() {
  console.log("Model Loaded!");
}
function draw() {
  canvas.center();
  image(video, 0, 300, 297, 198);
  classifier.classify(video, gotResult);
}
function gotResult(error, results) {
  var previousResult = results[0].label;
  if(error) {
    console.error(error);
  } else {
    if((results[0].confidence > 0.8) && (previousResult != results[0].label)) {
      console.log(results);
      previousResult = results[0].label;
      var synth = window.speechSynthesis;
      speakData = 'Object detected is ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
      synth.speak(utterThis);

      document.getElementById("object").innerHTML = results[0].label;
      document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
  console.log(results);
  if (console.log(results) == true) {
    console.log("true");
  } else {
    console.log("false");
  }
}