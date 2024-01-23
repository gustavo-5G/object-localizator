som = ""
statusOne = ""
objects = []
video = ""

function setup() {
    canvas = createCanvas(270, 270)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(270, 270)
    video.hide()
    synth = window.speechSynthesis
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (statusOne != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objeto(s) Detectado(s)";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == objeto) { 

                synth.lang = "pt-BR"
                fala = "O objeto ou qualquer outro item pedido (" + objeto + ") foi identificado foi um prazer ajudar"
                utterThis = new SpeechSynthesisUtterance(fala)
                synth.speak(utterThis)

                console.log("objeto detectado")
            }
            if (objects[i].label != objeto) {
                console.log("algo foi detectado")
            }
        }
    }
}

function modelLoaded() {
    console.log("modelo iniciado")
    statusOne = true
}

function start() {
    objeto = ""
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detectando objetos"
    objeto = document.getElementById("textoObjeto").value
}



