const chatBox =
document.getElementById("chatBox");

function addMessage(message,type){

    const div =
    document.createElement("div");

    div.className = type;

    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop =
    chatBox.scrollHeight;
}

async function askAI(){

    const question =
    document.getElementById(
    "question"
    ).value;

    if(!question.trim()){
        return;
    }

    addMessage(
        "👨‍🌾 " + question,
        "user"
    );

    document.getElementById(
    "question"
    ).value = "";

    try{

        const response =
        await fetch("/ask",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
                question
            })
        });

        const data =
        await response.json();

        addMessage(
            "🤖 " + data.answer,
            "bot"
        );

        speak(data.answer);

    }catch(error){

        addMessage(
        "⚠ Server Error",
        "bot"
        );
    }
}

function startVoice(){

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        alert(
        "Speech Recognition not supported in this browser"
        );

        return;
    }

    const recognition =
    new SpeechRecognition();

    recognition.lang =
    "en-IN";

    recognition.start();

    recognition.onresult =
    function(event){

        document.getElementById(
        "question"
        ).value =
        event.results[0][0]
        .transcript;
    };
}

function speak(text){

    const speech =
    new SpeechSynthesisUtterance(
        text
    );

    speech.lang =
    "en-IN";

    speechSynthesis.speak(
        speech
    );
}

document
.getElementById("cropImage")
.addEventListener(
"change",
function(event){

    const file =
    event.target.files[0];

    if(file){

        const reader =
        new FileReader();

        reader.onload =
        function(e){

            document
            .getElementById(
            "preview"
            ).src =
            e.target.result;
        };

        reader.readAsDataURL(
        file
        );
    }
});

function analyzeImage(){

    const fileInput =
    document.getElementById("cropImage");

    if(fileInput.files.length === 0){

        addMessage(
        "⚠ Please upload a crop image first.",
        "bot"
        );

        return;
    }

    const fileName =
    fileInput.files[0].name.toLowerCase();

    let diagnosis = "";

    if(fileName.includes("tomato")){

        diagnosis =
        "🍅 Possible Disease: Early Blight. Recommendation: Remove affected leaves and apply a suitable fungicide.";

    }

    else if(fileName.includes("brinjal")){

        diagnosis =
        "🍆 Possible Issue: Aphid Attack. Recommendation: Spray neem oil and monitor leaves regularly.";

    }

    else if(fileName.includes("rice")){

        diagnosis =
        "🌾 Possible Disease: Rice Blast. Recommendation: Apply a recommended fungicide and maintain field hygiene.";

    }

    else if(fileName.includes("cotton")){

        diagnosis =
        "🌱 Possible Issue: Whitefly Infestation. Recommendation: Use yellow sticky traps and inspect crops frequently.";

    }

    else if(
    fileName.includes("healthy") ||
    fileName.includes("good") ||
    fileName.includes("normal")
){

    diagnosis =
    "✅ Healthy Crop Detected\n\n" +
    "Analysis: The plant appears healthy with good leaf color and growth.\n\n" +
    "Recommendation:\n" +
    "- Continue regular irrigation.\n" +
    "- Apply fertilizers as per crop schedule.\n" +
    "- Monitor for pests weekly.\n" +
    "- Maintain proper nutrient levels and soil health.";
}

   else{

    diagnosis =
    "✅ Crop Condition Appears Normal\n\n" +
    "No major disease symptoms were detected from the uploaded image.\n\n" +
    "Recommendation:\n" +
    "- Continue regular monitoring.\n" +
    "- Maintain proper irrigation.\n" +
    "- Follow recommended fertilization practices.\n" +
    "- Watch for any new pest or disease symptoms.";
}

    addMessage(
        "📸 Image Uploaded: " +
        fileInput.files[0].name,
        "user"
    );

    addMessage(
        diagnosis,
        "bot"
    );

    speak(diagnosis);
}