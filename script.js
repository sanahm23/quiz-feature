let user = {
    username: '',
    email: ''
};

let currentQuestionIndex = 0;
let selectedOptions = {};
let userScores = JSON.parse(localStorage.getItem('userScores')) || [];
let quizForm = document.getElementById('btn')
let usernameInput = document.getElementById('username');
let emailInput = document.getElementById('emailId');
let questionElement = document.getElementById('question');
let optionsElement = document.getElementById('options');
let prev = document.getElementById("prevB");
let loginBtn = document.getElementById("loginbtn")

let quizData = [
    {
        question: "When was javascript invented?",
        options: ["1995", "1994", "1996", "None of above"],
        answer: 0
    },
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "None"],
        answer: 0
    },
    {
        question: "Which is the full form of CSS?",
        options: ["Central style sheets", "Cascading style sheets", "Central simple sheets", "None"],
        answer: 1
    },
    {
        question: "What language runs in a web browser?",
        options: ["Java", "C", "C++", "Javacript"],
        answer: 3
    }
];

function startQuiz() {

    if (usernameInput.value.trim() === '' || emailInput.value.trim() === '') {
        alert('Please provide both username and email.');
        return;
    }
    if (usernameInput)
        user.username = usernameInput.value.trim();
    user.email = emailInput.value.trim();

    localStorage.setItem('user', JSON.stringify(user));

    document.getElementById('box').style.display = 'none';
    document.getElementById('boxquiz').style.display = 'block';
    showQuestion(currentQuestionIndex);
    if(user.username >= 2){
        alert('session time out')
        localStorage.clear()
        window.close()
    }
    validateEmail(emailInput)

}
function validateEmail(emailInput) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(emailInput);
}

loginBtn.addEventListener("click", startQuiz)


function showQuestion(questionIndex) {

    let questionData = quizData[questionIndex];
    // console.log(questionIndex)
    // localStorage.setItem(questionIndex)
    if (questionIndex == 0) {
        prev.style.display = "none"

    }
    else {
        prev.style.display = "block"
    }

    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = ''; //for choices

    questionData.options.forEach((option, index) => {
        let optionElement = document.createElement('div');
        optionElement.className = 'option';

        let inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.name = 'option';
        inputElement.value = index; //0,1,2,3 
        inputElement.id = `option${index}`; //option1, option2, option3... 

        let labelElement = document.createElement('label');
        labelElement.textContent = option;
        labelElement.setAttribute('for', `option${index}`);

        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);

        if (selectedOptions[questionIndex] !== undefined && selectedOptions[questionIndex] === index) {
            inputElement.checked = true; // Mark the previously selected option
            // inputElement.disabled = true;
        }

        inputElement.addEventListener('change', () => {
            selectedOptions[questionIndex] = index;
            updateOptions();
        });

        optionsElement.appendChild(optionElement);
    });

    updateOptions();
}


function updateOptions() {
    let options = document.querySelectorAll('.option');

    options.forEach((option, index) => {
        let questionIndex = currentQuestionIndex;
        let selectedOptionIndex = selectedOptions[questionIndex];

        if (selectedOptionIndex === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }

        if (selectedOptionIndex !== undefined && selectedOptionIndex !== index) {
            option.classList.add('disabled');
            option.removeEventListener('click', updateOptions);
        } else {
            option.classList.remove('disabled');
            option.addEventListener('click', updateOptions);
        }
    });
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
    //  inputElement.disabled = true;
}
prev.addEventListener("click", showPreviousQuestion)
function submitQuiz() {
    let selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        alert('Please select an option.');
        return;
    }

    let questionIndex = currentQuestionIndex;
    let selectedOptionIndex = parseInt(selectedOption.value);

    selectedOptions[questionIndex] = selectedOptionIndex;
    // console.log(selectedOptionIndex)

    if (currentQuestionIndex === quizData.length - 1) {
        document.getElementById('boxquiz').style.display = 'none';
        document.getElementById('scorePage').style.display = 'block';
        displayTotalScore();
    } else {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}
quizForm.addEventListener("click", submitQuiz)
function shuffleQuestions() {
    for (let i = quizData.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = quizData[i];
        quizData[i] = quizData[j];
        quizData[j] = temp;
    }
}
shuffleQuestions();


function calculateScore() {
    let score = 0;

    quizData.forEach((questionData, index) => {
        if (selectedOptions[index] === questionData.answer) {
            score++;
        }
    });
    return score;
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

    localStorage.setItem('userScores', JSON.stringify(userScores));

    const scoreElement = document.getElementById('totalScore');
    scoreElement.textContent = `Total Score: ${totalScore}`;
    displayScores();
}

function displayScores() {
    const scoreTable = document.getElementById('scoreTable');

    // Clear any previous rows in the table except for the header
    while (scoreTable.rows.length > 1) {
        scoreTable.deleteRow(-1);
    }

    // Add rows for each user's score
    userScores.forEach((userScore) => {
        const newRow = scoreTable.insertRow(-1);
        const usernameCell = newRow.insertCell(0);
        const scoreCell = newRow.insertCell(1);

        usernameCell.textContent = userScore.username;
        scoreCell.textContent = userScore.score;
    });
}

// // Restore previous state if available
// window.onload = function () {
//     const storedUserAnswers = JSON.parse(sessionStorage.getItem("selectedOptions"));
//     if (storedUserAnswers) {
//         userAnswers = storedUserAnswers;
//     }

//     const storedQuestionIndex = sessionStorage.getItem("currentQuestionIndex");
//     if (storedQuestionIndex) {
//         currentQuestionIndex = parseInt(storedQuestionIndex, 10);
//     }

//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//         usernameInput.value = storedUsername;
//     }

//     const storedUserEmail = localStorage.getItem("userEmail");
//     if (storedUserEmail) {
//         emailInput.value = storedUserEmail;
//     }

//     if (currentQuestionIndex >= 0 && currentQuestionIndex < quizData.length) {
//         box.classList.remove("show");
//         boxquiz.classList.add("show");
//         showQuestion(currentQuestionIndex);
//     }
// };

// // Save state in local storage and session storage on page unload
// window.onunload = function () {
//     sessionStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
//     sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex);
//     localStorage.setItem("username", usernameInput.value);
//     localStorage.setItem("userEmail", emailInput.value);
// };