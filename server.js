const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/ask", (req, res) => {

    const question =
    req.body.question.toLowerCase();

    let answer = "";

    if(question.includes("tomato")){

        answer =
        "Tomato yellow leaves may be caused by overwatering, nutrient deficiency, fungal infection, or poor drainage. Apply balanced NPK fertilizer and inspect for pests.";

    }

    else if(
        question.includes("brinjal") ||
        question.includes("eggplant")
    ){

        answer =
        "Brinjal crops are commonly affected by fruit borers, aphids, and whiteflies. Neem oil spray and regular monitoring can help control infestations.";

    }

    else if(
        question.includes("cotton")
    ){

        answer =
        "Cotton crops can suffer from bollworms and whiteflies. Use pheromone traps and recommended pesticides according to local agricultural guidelines.";

    }

    else if(
        question.includes("rice") ||
        question.includes("paddy")
    ){

        answer =
        "To improve paddy yield, use certified seeds, maintain proper irrigation, apply balanced fertilizers, and control weeds regularly.";

    }

    else if(
        question.includes("wheat")
    ){

        answer =
        "For higher wheat yield, use quality seeds, proper spacing, timely irrigation, and nitrogen-rich fertilizers.";

    }

    else if(
        question.includes("fertilizer")
    ){

        answer =
        "The best fertilizer depends on your crop and soil condition. Organic manure along with balanced NPK fertilizer is generally recommended.";

    }

    else if(
        question.includes("pest") ||
        question.includes("insect")
    ){

        answer =
        "Monitor crops regularly, remove infected leaves, use neem-based sprays, and follow integrated pest management techniques.";

    }

    else if(
        question.includes("irrigation") ||
        question.includes("water")
    ){

        answer =
        "Efficient irrigation depends on the crop. Drip irrigation helps save water and improves nutrient delivery.";
    }

    else if(
        question.includes("scheme") ||
        question.includes("government")
    ){

        answer =
        "Important farmer schemes include PM-KISAN, PMFBY Crop Insurance, Soil Health Card Scheme, and Kisan Credit Card.";
    }

    else{

        answer =
        "Please provide more details such as crop name, symptoms, affected area, and duration of the problem for better guidance.";
    }

    res.json({
        answer
    });

});

app.listen(5000, () => {

    console.log(
        "✅ Server running on http://localhost:5000"
    );

});