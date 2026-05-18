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

const lettersContainer = document.getElementById("letters-container")
const lettersContainerFinal = document.getElementById("letters-container-final")
const lettersContainerPuzzle = document.getElementById("letters-container-puzzle")

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

const questions = [

  {
    text: `Which member was born in Yongin?`,
    type: "photo",
    answers: [
      {
        text: "Bang Chan",
        image: "images/bangchan2.jpg"
      },
      {
        text: "Felix",
        image: "images/felix2.jpg"
      },
      {
        text: "Hyunjin",
        image: "images/hyunjin2.jpg"
      },
      {
        text: "Changbin",
        image: "images/changbin2.jpg"
      }
    ],
    correct: "Changbin"
  },

  {
  text: `The album has its quirks. So don't be afraid of them even if the album has them.`,
  type: "photo",
  answers: [
    {
      text: "ODDINARY",
      image: "images/ODDINARY3.jpg"
    },
    {
      text: "ROCK-STAR",
      image: "images/ROCKSTAR3.jpg"
    },
    {
      text: "GO LIVE",
      image: "images/GOLIVE3.jpg"
    },
    {
      text: "THE SOUND",
      image: "images/THESOUND3.jpg"
    }
  ],
  correct: "ODDINARY"
},

  {
  text: `Which Stray Kids member is part of the dance line and known for sharp performance style?`,
  type: "photo",
  layout: "wide",

  answers: [

    {
      text: "Seungmin",
      image: "images/seungmin4.jpg"
    },

    {
      text: "I.N",
      image: "images/in4.jpg"
    },

    {
      text: "Lee Know",
      image: "images/leeknow4.jpg"
    },

    {
      text: "Changbin",
      image: "images/changbin4.jpg"
    },

    {
      text: "Bang Chan",
      image: "images/bangchan4.jpg"
    },

    {
      text: "Hyunjin",
      image: "images/hyunjin4.jpg"
    },

    {
      text: "Han",
      image: "images/han4.jpg"
    },

    {
      text: "Felix",
      image: "images/felix4.jpg"
    }

  ],
  correct: "Lee Know"
},

  {
    text: `Continue lyric:
We're gonna go our way
To places still unknown...`,
    flip: true,
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
  type: "photo",
  layout: "wide",
  answers: [
    {
      text: "The View",
      image: "images/theview.jpg"
    },
    {
      text: "SSICK",
      image: "images/ssick.jpg"
    },
    {
      text: "DOMINO",
      image: "images/domino.jpg"
    },
    {
      text: "Star Lost",
      image: "images/starlost.jpg"
    },
    {
      text: "Awaken",
      image: "images/awaken.jpg"
    },
    {
      text: "Red Lights",
      image: "images/redlights.jpg"
    },
    {
      text: "WOLFGANG",
      image: "images/wolfgang.jpg"
    },
    {
      text: "Silent Cry",
      image: "images/silentcry.jpg"
    }
  ],
  correct: "Awaken"
},

  {
  text: `In which Japanese city did Stray Kids start perform 5-Star dome concerts?`,
  type: "photo",
  answers: [
    {
      text: "Kyoto",
      image: "images/kyoto.jpg"
    },
    {
      text: "Tokyo",
      image: "images/tokyo.jpg"
    },
    {
      text: "Fukuoka",
      image: "images/fukuoka.jpg"
    },
    {
      text: "Osaka",
      image: "images/osaka.jpg"
    }
  ],
  correct: "Fukuoka"
},

  {
  text: `Which word best describes Stray Kids storytelling style in music videos?`,
  type: "photo",
  answers: [
    {
      text: "Linear",
      image: "images/linear.jpg"
    },
    {
      text: "Predictable",
      image: "images/predictable.jpg"
    },
    {
      text: "Simple",
      image: "images/simple.jpg"
    },
    {
      text: "Nonlinear",
      image: "images/nonlinear.jpg"
    }
  ],
  correct: "Nonlinear"
}

]

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

startButton.onclick = () => {

  welcomeScreen.classList.add("hidden")

  questionScreen.classList.remove("hidden")

  updateLetters()

  loadQuestion()
}

function loadQuestion() {

  selected = false

  nextBtn.classList.add("hidden")

  nextBtn.classList.remove(
    "btn-success",
    "btn-fail"
  )

  const q = questions[currentQuestion]
  questionScreen.classList.remove("wide-question")

if (q.layout === "wide") {
  questionScreen.classList.add("wide-question")
}

  questionNumber.textContent =
    `Question ${currentQuestion + 1} / ${questions.length}`

  questionText.innerText = q.text

  answersContainer.innerHTML = ""

q.answers.forEach(answer => {

  const btn = document.createElement("button")

  btn.classList.add("answer-button")

  let answerText = ""

  if (q.type === "photo") {

    answerText = answer.text

    btn.classList.add("photo-card")

    btn.innerHTML = `
      <img src="${answer.image}" alt="${answer.text}">
      <span>${answer.text}</span>
    `

  } else if (q.flip === true) {

    answerText = answer

    btn.classList.add("flip-card")

    btn.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front">
          ${answer}
        </div>
        <div class="flip-back"></div>
      </div>
    `

  } else {

    answerText = answer

    btn.textContent = answer
  }

  btn.onclick = () => {

    if (selected) return

    selected = true

    const correct = answerText === q.correct

    if (q.flip === true) {

      const backSide = btn.querySelector(".flip-back")

      if (correct) {

        backSide.textContent = "Correct, go next"
        backSide.classList.add("correct-back")

        unlockedLetters.push(true)
        updateLetters()

        btn.onclick = () => {
          currentQuestion++

          if (currentQuestion < questions.length) {
            loadQuestion()
          } else {
            questionScreen.classList.add("hidden")
            finalScreen.classList.remove("hidden")
            updateLetters()
          }
        }

      } else {

        backSide.textContent = "Wrong, restart"
        backSide.classList.add("wrong-back")

        btn.onclick = () => {
          location.reload()
        }
      }

      btn.classList.add("flipped")

      return
    }

    if (correct) {

      btn.classList.add("correct")

      unlockedLetters.push(true)
      updateLetters()

      nextBtn.textContent = "Correct, go next"
      nextBtn.classList.add("btn-success")

    } else {

      btn.classList.add("wrong")

      nextBtn.textContent = "Wrong, restart"
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
