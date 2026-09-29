const questions = [
    {
        mode: "GLB",
        question:
            "Mobil bergerak dengan kecepatan tetap 10 m/s selama 6 detik. Berapa jarak yang ditempuh?",

        options: [
            "16 m",
            "60 m",
            "1,67 m",
            "600 m"
        ],

        answer: 1,

        explanation:
            "s = v × t = 10 × 6 = 60 m."
    },

    {
        mode: "GLB",
        question:
            "Pada GLB, besaran yang tetap adalah...",

        options: [
            "Percepatan",
            "Kecepatan",
            "Jarak",
            "Waktu"
        ],

        answer: 1,

        explanation:
            "GLB memiliki kecepatan tetap dan percepatan = 0."
    },

    {
        mode: "GLBB",
        question:
            "Motor mula-mula diam. Jika percepatannya 2 m/s², berapa kecepatannya setelah 5 detik?",

        options: [
            "2 m/s",
            "5 m/s",
            "10 m/s",
            "25 m/s"
        ],

        answer: 2,

        explanation:
            "v = v₀ + at = 0 + (2 × 5) = 10 m/s."
    },

    {
        mode: "GLBB",
        question:
            "Benda memiliki kecepatan awal 4 m/s dan percepatan 3 m/s² selama 2 detik. Kecepatan akhirnya?",

        options: [
            "6 m/s",
            "7 m/s",
            "10 m/s",
            "12 m/s"
        ],

        answer: 2,

        explanation:
            "v = v₀ + at = 4 + (3 × 2) = 10 m/s."
    },

    {
        mode: "GLBB",
        question:
            "Benda mula-mula diam dan memiliki percepatan 4 m/s² selama 3 detik. Berapa jaraknya?",

        options: [
            "6 m",
            "12 m",
            "18 m",
            "36 m"
        ],

        answer: 2,

        explanation:
            "s = ½at² = ½ × 4 × 3² = 18 m."
    },

    {
        mode: "GLB",
        question:
            "Kereta menempuh jarak 200 m dalam waktu 10 detik dengan kecepatan tetap. Berapa kecepatannya?",

        options: [
            "10 m/s",
            "20 m/s",
            "100 m/s",
            "2000 m/s"
        ],

        answer: 1,

        explanation:
            "v = s/t = 200/10 = 20 m/s."
    },

    {
        mode: "GLBB",
        question:
            "Kecepatan sebuah benda berubah dari 5 m/s menjadi 17 m/s dalam 4 detik. Berapa percepatannya?",

        options: [
            "2 m/s²",
            "3 m/s²",
            "4 m/s²",
            "12 m/s²"
        ],

        answer: 1,

        explanation:
            "a = (v - v₀) / t = (17 - 5) / 4 = 3 m/s²."
    },

    {
        mode: "GLB",
        question:
            "Grafik posisi terhadap waktu pada GLB berbentuk...",

        options: [
            "Garis lurus",
            "Parabola",
            "Lingkaran",
            "Gelombang"
        ],

        answer: 0,

        explanation:
            "Pada GLB, posisi berubah secara linear terhadap waktu."
    }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const levelElement = document.getElementById("level");

const modeElement = document.getElementById("mode");
const progressElement = document.getElementById("progress");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");

const carElement = document.getElementById("car");
const restartButton = document.getElementById("restart");


function showQuestion() {

    const question = questions[currentQuestion];

    modeElement.textContent =
        `MODE: ${question.mode}`;

    progressElement.textContent =
        `Soal ${currentQuestion + 1} / ${questions.length}`;

    levelElement.textContent =
        Math.floor(currentQuestion / 2) + 1;

    questionElement.textContent =
        question.question;

    optionsElement.innerHTML = "";

    feedbackElement.textContent = "";

    const carPosition =
        7 + (currentQuestion * 86 / (questions.length - 1));

    carElement.style.left =
        `${carPosition}%`;

    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.classList.add("option");

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener(
            "click",
            () => checkAnswer(index, button)
        );

        optionsElement.appendChild(button);
    });
}


function checkAnswer(selectedAnswer, selectedButton) {

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".option");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer === question.answer) {

        score += 100;

        scoreElement.textContent =
            score;

        selectedButton.classList.add("correct");

        feedbackElement.textContent =
            `✅ Benar! ${question.explanation}`;

    } else {

        lives--;

        selectedButton.classList.add("wrong");

        buttons[question.answer]
            .classList.add("correct");

        livesElement.textContent =
            "❤️".repeat(lives) +
            "🖤".repeat(3 - lives);

        feedbackElement.textContent =
            `❌ Salah. ${question.explanation}`;
    }


    // GAME OVER

    if (lives <= 0) {

        setTimeout(() => {

            questionElement.textContent =
                `💀 GAME OVER — Skor: ${score}`;

            optionsElement.innerHTML = "";

            feedbackElement.textContent =
                "Tekan Restart untuk mencoba lagi.";

        }, 1000);

        return;
    }


    // WIN

    if (currentQuestion === questions.length - 1) {

        setTimeout(() => {

            questionElement.textContent =
                `🏆 FINISH! Skor akhir: ${score}`;

            optionsElement.innerHTML = "";

            feedbackElement.textContent =
                "Kamu berhasil menyelesaikan Physics Race!";

        }, 1000);

        return;
    }


    // NEXT QUESTION

    setTimeout(() => {

        currentQuestion++;

        showQuestion();

    }, 1200);
}


function restartGame() {

    currentQuestion = 0;

    score = 0;

    lives = 3;

    scoreElement.textContent = "0";

    livesElement.textContent =
        "❤️❤️❤️";

    showQuestion();
}


restartButton.addEventListener(
    "click",
    restartGame
);


// Start game

showQuestion();