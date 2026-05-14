const startButton = document.getElementById("start-button")

const welcomeScreen = document.getElementById("welcome-screen")
const questionScreen = document.getElementById("question-screen")
const finalScreen = document.getElementById("final-screen")
const puzzleScreen = document.getElementById("puzzle-screen")
const winScreen = document.getElementById("win-screen")

const questionNumber = document.getElementById("question-number")
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")

const nextBtn = document.getElementById("next-btn")

const finalInput = document.getElementById("final-input")
const finalSubmit = document.getElementById("final-submit")
const finalNext = document.getElementById("final-next")

const input1 = document.getElementById("input-1")
const input2 = document.getElementById("input-2")

const submitPuzzle = document.getElementById("submit-puzzle")
const attemptsText = document.getElementById("attempts-text")
const restartBtn = document.getElementById("restart-btn")

/* LETTERS */
const lettersContainer =
  document.getElementById("letters-container")

const lettersContainerFinal =
  document.getElementById("letters-container-final")

const lettersContainerPuzzle =
  document.getElementById("letters-container-puzzle")

const collectedLetters = [
  "C",
  "O",
  "L",
  "W",
  "A",
  "F",
  "N",
  "H"
]

let unlockedLetters = []

let currentQuestion = 0
let selected = false
let attempts = 3

/* QUESTIONS */
const questions = [

  {
    text: `Which member was born in Yongin?`,
    answers: ["Bang Chan","Felix","Hyunjin","Changbin"],
    correct: "Changbin"
  },

  {
    text: `The album has its quirks. So don't be afraid of them even if the album has them.`,
    answers: ["ODDINARY","ROCK-STAR","GO LIVE","THE SOUND"],
    correct: "ODDINARY"
  },

  {
    text: `Which Stray Kids member is part of the dance line and known for sharp performance style?`,
    answers: [
      "Seungmin",
      "I.N",
      "Lee Know",
      "Changbin",
      "Bang Chan",
      "Hyunjin",
      "Han",
      "Felix"
    ],
    correct: "Lee Know"
  },

  {
    text: `Continue lyric:
We're gonna go our way
To places still unknown...`,
    answers: [
      "We're gonna show the way",
      "Come feel the rush, don't make a fuss",
      "I just wanna see me run under",
      "No matter how hard I try to run"
    ],
    correct: "We're gonna show the way"
  },

  {
    text: `Find the incorrect option
The album NOEASY includes songs such as-`,
    answers: [
      "The View",
      "SSICK",
      "DOMINO",
      "Star Lost",
      "Awaken",
      "Red Lights",
      "WOLFGANG",
      "Silent Cry"
    ],
    correct: "Awaken"
  },

  {
    text: `In which Japanese city did Stray Kids start perform 5-Star dome concerts?`,
    answers: [
      "Kyoto",
      "Tokyo",
      "Fukuoka",
      "Osaka"
    ],
    correct: "Fukuoka"
  },

  {
    text: `Which word best describes Stray Kids storytelling style in music videos?`,
    answers: [
      "Linear",
      "Predictable",
      "Simple",
      "Nonlinear"
    ],
    correct: "Nonlinear"
  }

]

/* LETTER UPDATE */
function updateLetters() {

  let display = ""

  for (let i = 0; i < collectedLetters.length; i++) {

    if (unlockedLetters[i]) {

      display += collectedLetters[i] + " "

    } else {

      display += "_ "
    }
  }

  if (lettersContainer) {
    lettersContainer.textContent = display
  }

  if (lettersContainerFinal) {
    lettersContainerFinal.textContent = display
  }

  if (lettersContainerPuzzle) {
    lettersContainerPuzzle.textContent = display
  }
}

/* START */
startButton.onclick = () => {

  welcomeScreen.classList.add("hidden")

  questionScreen.classList.remove("hidden")

  updateLetters()

  loadQuestion()
}

/* LOAD QUESTION */
function loadQuestion() {

  selected = false

  nextBtn.classList.add("hidden")

  nextBtn.classList.remove(
    "btn-success",
    "btn-fail"
  )

  const q = questions[currentQuestion]

  questionNumber.textContent =
    `Question ${currentQuestion + 1} / ${questions.length}`

  questionText.innerText = q.text

  answersContainer.innerHTML = ""

  q.answers.forEach(answer => {

    const btn = document.createElement("button")

    btn.classList.add("answer-button")

    btn.textContent = answer

    btn.onclick = () => {

      if (selected) return

      selected = true

      const correct = answer === q.correct

      if (correct) {

        btn.classList.add("correct")

        unlockedLetters.push(true)

        updateLetters()

        nextBtn.textContent =
          "Correct, go next"

        nextBtn.classList.add("btn-success")

      } else {

        btn.classList.add("wrong")

        nextBtn.textContent =
          "Wrong, restart"

        nextBtn.classList.add("btn-fail")
      }

      nextBtn.classList.remove("hidden")

      nextBtn.onclick = () => {

        if (correct) {

          currentQuestion++

          if (currentQuestion < questions.length) {

            loadQuestion()

          } else {

            questionScreen.classList.add("hidden")

            finalScreen.classList.remove("hidden")

            updateLetters()
          }

        } else {

          location.reload()
        }
      }
    }

    answersContainer.appendChild(btn)
  })
}

/* HAN QUESTION */
finalSubmit.onclick = () => {

  const value =
    finalInput.value.trim().toLowerCase()

  const correct = value === "han"

  finalInput.classList.add("hidden")

  finalSubmit.classList.add("hidden")

  finalNext.classList.remove("hidden")

  if (correct) {

    unlockedLetters.push(true)

    updateLetters()

    finalNext.textContent =
      "Correct, go next"

    finalNext.classList.add("btn-success")

    finalNext.onclick = () => {

      finalScreen.classList.add("hidden")

      puzzleScreen.classList.remove("hidden")

      updateLetters()
    }

  } else {

    finalNext.textContent =
      "Wrong, restart"

    finalNext.classList.add("btn-fail")

    finalNext.onclick = () => {
      location.reload()
    }
  }
}

/* WOLF CHAN PUZZLE */
submitPuzzle.onclick = () => {

  const v1 =
    input1.value.trim().toLowerCase()

  const v2 =
    input2.value.trim().toLowerCase()

  const ok1 = v1 === "wolf"
  const ok2 = v2 === "chan"

  if (ok1 && ok2) {

    input1.classList.add("hidden")
    input2.classList.add("hidden")

    submitPuzzle.classList.add("hidden")

    restartBtn.classList.remove("hidden")

    restartBtn.textContent =
      "Correct, go next"

    restartBtn.classList.add("btn-success")

    restartBtn.onclick = () => {

      puzzleScreen.classList.add("hidden")

      winScreen.classList.remove("hidden")
    }

    return
  }

  attempts--

  attemptsText.textContent =
    `Attempts left: ${attempts}`

  input1.value = ""
  input2.value = ""

  if (attempts <= 0) {

    input1.classList.add("hidden")
    input2.classList.add("hidden")

    submitPuzzle.classList.add("hidden")

    restartBtn.classList.remove("hidden")

    restartBtn.textContent =
      "Wrong, restart"

    restartBtn.classList.add("btn-fail")

    restartBtn.onclick = () => {
      location.reload()
    }
  }
}