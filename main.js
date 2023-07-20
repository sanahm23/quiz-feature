let user = {
    username: '',
    email: ''
  };
  
  
  let currentQuestion = 0;
  let userChoices = [];
  let selectedChoice= -1;
  
  let questions = [
    {
      question: "When was javascript invented?",
      choices: ["1995", "1994", "1996", "None of above"],
      answer: 0
    },
    {
      question: "What does HTML stand for?",
      choices: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "None"],
      answer: 0
    },
    {
      question: "Which is the full form of CSS?",
      choices: ["Central style sheets", "Cascading style sheets", "Central simple sheets", "None"],
      answer: 1
    },
    {
      question: "What language runs in a web browser?",
      choices: ["Java", "C", "C++", "Javacript"],
      answer: 3
    }
  ];
  
  let formSubmit = document.getElementById('formsubmit')
  let box = document.getElementById('box')
  let boxQuiz = document.getElementById('box-quiz')
  let usernameInput = document.getElementById("username");
  let userEmail = document.getElementById("emailId");
  let prev = document.getElementById("prevB");
  let userDisplay = document.getElementById("userDisplay")
  
  let userScores = JSON.parse(localStorage.getItem('userScores')) || [];
  
  
  
  formSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
  
    for (let i = 0; i < localStorage.length; i++) {
      let email = userEmail.value;
      if (email == localStorage.key(i)) {
        let a = localStorage.getItem(email)
  
        quiz.innerHTML = `<h2>You answered ${a} out of ${questions.length} correctly!!</h2>
        <button onclick = "location.reload()">Reload</button>`;
      }
    }
  
    let username = usernameInput.value;
   
    userDisplay.textContent = username;
    box.style.display = "none";
    boxQuiz.style.display = "block";
  });
  
  
  let submit = document.getElementById('submit')
  function loadQuestion() {
    let questionElement = document.getElementById("question");
    let choiceElements = document.getElementsByTagName("span");
  
    questionElement.textContent = questions[currentQuestion].question;
    var previousAnswer = userChoices[currentQuestion];
    if (previousAnswer !== undefined) {
      var choices = document.getElementsByName("choice");
      choices[previousAnswer].checked = true;
    }
  
    for (let i = 0; i < choiceElements.length; i++) {
      choiceElements[i].textContent = questions[currentQuestion].choices[i];
    }
  
    if (currentQuestion == 0) {
      prev.style.display = "none";
    } else {
      prev.style.display = "inline-flex";
    }
  
  }
  function choiceSelected(){
    let choices = document.getElementsByName("choice")
    
    for(var i=0; i<choices.length; i++){
      if(choices[i].checked){
        selectedChoice = parseInt(choices[i].value);
        for(var i = 0; i<choices.length; i++ ){
          choices[i].checked=false;
        }
        break;
      }
    }
    if(selectedChoice ==-1){
      alert('Please select option!!!');
      return;
    }
    userChoices[currentQuestion]=selectedChoice;
    sessionStorage.setItem(currentQuestion, selectedChoice);
    currentQuestion++;
  
  
    if(currentQuestion===questions.length){
      displayTotalScore();
      calculateScore();
    }else{
      loadQuestion();
    }
  }
  function displayTotalScore() {
    const totalScore = calculateScore();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const userScore = { username: savedUser.username, score: totalScore };
  
    // Check if the user's score is already present in the array
    const existingUserScoreIndex = userScores.findIndex((score) => score.username === userScore.username);
  
    if (existingUserScoreIndex !== -1) {
      // Update the user's score if already present in the array
      userScores[existingUserScoreIndex] = userScore;
    } else {
      // Add the user's score to the array if not present
      userScores.push(userScore);
    }
  
    localStorage.setItem('userScores', JSON.stringify(userScore));
  
    const scoreElement = document.getElementById('totalScore');
    scoreElement.textContent = `Total Score: ${totalScore}`;
    displayScores();
  }
  
  submit.addEventListener("click", choiceSelected)
  
  // submit.addEventListener("click", () => {
  
  //   let choices = document.getElementsByName("choice");
  //   var selectedChoice = -1;
  
  //   for (let i = 0; i < choices.length; i++) {
  //     if (choices[i].checked) {
  //       selectedChoice = parseInt(choices[i].value);
  //       break;
  //     }
  //   }
  
  
  //   if (selectedChoice == -1) {
  //     alert("Please select an option.");
  //     return;
  //   }
  
  //   if (selectedChoice == questions[currentQuestion].answer) {
  //     score++;
  
  
  //   }
  //   userChoices[currentQuestion] = selectedChoice;
  
  //   currentQuestion++;
  
  
  //   if (currentQuestion === questions.length) {
  //     let email = userEmail.value
  //     localStorage.setItem(email, score)
  //     quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly!!</h2>
  //       <button onclick = "location.reload()">Reload</button>`;
  //   } else {
  //     loadQuestion();
  //   }
  
  //   for (let i = 0; i < choices.length; i++) {
  //     choices[i].checked = false
     
  
  //   }
  
  
  // });
  
  function calculateScore() {
    let score = 0;
  
    questions.forEach((questionElement, index) => {
      if (selectedChoice[index] === questionElement.answer) {
        score++;
      }
    });
  
    return score;
  }
  
  function showPreviousQuestion() {
    currentQuestion--;
    loadQuestion();
  }
  if (currentQuestion === questions.length) {
    
  
    quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly</h2>
      <button onclick = "location.reload()">Reload</button>`
  }
  
  else {
  
    loadQuestion();
  }
  
  prev.addEventListener("click", showPreviousQuestion)
  
  
  function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = questions[i];
      questions[i] = questions[j];
      questions[j] = temp;
    }
  }
  
  shuffleQuestions();
  loadQuestion();
  
  