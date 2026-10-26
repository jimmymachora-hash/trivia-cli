
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

const questions = [
  {
    question: "Which language is used to add interactivity to web pages?",
    options: ["A. HTML", "B. CSS", "C. JavaScript", "D. SQL"],
    answer: "C"
  },
  {
    question: "Which keyword declares a block-scoped variable?",
    options: ["A. var", "B. let", "C. print", "D. echo"],
    answer: "B"
  },
  {
    question: "Which array method creates a new array by transforming elements?",
    options: ["A. map()", "B. push()", "C. pop()", "D. findIndex()"],
    answer: "A"
  },
  {
    question: "What does API stand for?",
    options: [
      "A. Application Programming Interface",
      "B. Advanced Program Internet",
      "C. Applied Processing Input",
      "D. Application Page Integration"
    ],
    answer: "A"
  },
  {
    question: "Which method selects elements that pass a condition?",
    options: ["A. map()", "B. filter()", "C. join()", "D. push()"],
    answer: "B"
  }
];
function questionTimer(seconds) {
  return new Promise((resolve) => {
    let finished = false;
    let timer;

    const finish = (answer) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      rl.removeListener("line", handleLine);
      resolve(answer);
    };

    const handleLine = (line) => {
      finish(line.trim());
    };

    timer = setTimeout(() => {
      console.log("\n⏰ Time is up! Moving to the next question.");
      finish(null);
    }, seconds * 1000);

    rl.on("line", handleLine);
    rl.setPrompt(`Your answer (${seconds} seconds): `);
    rl.prompt();
  });
}
async function startQuiz() {
  let score = 0;
const startTime = Date.now();
  console.log("\n================================");
  console.log("       WELCOME TO TRIVIA CLI");
  console.log("================================");
  console.log("Answer each question by typing A, B, C, or D.\n");

  for (let i = 0; i < questions.length; i++) {
    const current = questions[i];

    console.log(`\nQuestion ${i + 1}: ${current.question}`);

    current.options.forEach((option) => {
      console.log(option);
    });

    const answer = await questionTimer(10);

if (answer === null) {
  
  continue;
}

const normalizedAnswer = answer.toUpperCase();

    if (normalizedAnswer === current.answer) {
      console.log("Correct! 🎉");
      score++;
    } else {
      console.log(`Incorrect! The correct answer is ${current.answer}.`);
    }
  }

  console.log("\n================================");
  console.log("           GAME OVER");
  console.log("================================");
  console.log(`Your score: ${score}/${questions.length}`);
const endTime = Date.now();
const timeTaken = Math.floor((endTime - startTime) / 1000);
console.log(`Time taken: ${timeTaken} seconds`);
  rl.close();
}

async function main() {
  console.log("\nWelcome to the Trivia Challenge!");
  const choice = await askQuestion("Type START to begin the quiz: ");

  if (choice.toUpperCase() === "START") {
    await startQuiz();
  } else {
    console.log("Thanks for visiting. Run the game again when you're ready!");
    rl.close();
  }
}

main();
