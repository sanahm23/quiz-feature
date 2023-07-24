let user = {
    username: '',
    email: ''
};
let maxUserCount = 10;
let currentQuestionIndex = 0;
let selectedOptions = {};
let userScores = JSON.parse(localStorage.getItem('userScores')) || {};
let quizForm = document.getElementById('btn')
let usernameInput = document.getElementById('username');
let email = document.getElementById('email');
let questionElement = document.getElementById('question');
let optionsElement = document.getElementById('options');
let prev = document.getElementById("prevB");
let loginBtn = document.getElementById("loginbtn");
let userDisplay = document.getElementById('userDisplay')

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
    if (usernameInput.value === '' || email.value === '') {
        alert('Please provide both username and email.');
        return;
    }
    if (usernameInput)
        user.username = usernameInput.value;
    user.email = email.value;
    userDisplay.textContent = usernameInput.value;


    const emailInput = email.value.trim();
    const emailPattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

    if (!emailPattern.test(emailInput)) {
        alert('Please enter a valid email');
        email.value = '';
        email.focus();
        return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    const userEmail = user.email
    if (Object.keys(userScores).length > maxUserCount) {
        alert('max user login limit reached.')
        localStorage.clear();
        location.reload()
    }
    if (userScores.hasOwnProperty(userEmail) && userScores[userEmail].scores.length > 0) {
        document.getElementById('box').style.display = 'none';
        document.getElementById('boxquiz').style.display = 'none';
        document.getElementById('scorePage').style.display = 'block';
        displayScores();
    } else {

        document.getElementById('box').style.display = 'none';
        document.getElementById('boxquiz').style.display = 'block';
        document.getElementById('scorePage').style.display = 'none';
        showQuestion(currentQuestionIndex);
    }

}

function validateEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

function showQuestion(questionIndex) {

    let questionData = quizData[questionIndex];

    if (questionIndex == 0) {
        prev.style.display = "none"

    }
    else {
        prev.style.display = "block"
    }

    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = '';

    questionData.options.forEach((option, index) => {
        let optionElement = document.createElement('div');
        optionElement.className = 'option';

        let inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.name = 'option';
        inputElement.value = index;
        inputElement.id = `option${index}`;

        let labelElement = document.createElement('label');
        labelElement.textContent = option;
        labelElement.setAttribute('for', `option${index}`);

        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);

        if (selectedOptions[questionIndex] !== undefined && selectedOptions[questionIndex] === index) {
            inputElement.checked = true;
        }

        inputElement.addEventListener('change', () => {
            selectedOptions[questionIndex] = index;
            updateOptions();
        });

        optionsElement.appendChild(optionElement);
    });

    updateOptions();

}
loginBtn.addEventListener("click", startQuiz)


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
    if (currentQuestionIndex === quizData.length - 1) {
        document.getElementById('boxquiz').style.display = 'none';
        document.getElementById('scorePage').style.display = 'block';

    } else {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const userEmail = currentUser.email;
    const userEmailString = userEmail.toString();
    const score = calculateScore(selectedOptions);
    userScores[userEmailString] = { username: currentUser.username, scores: [score], totalScore: null };

    const totalScore = calculateScore(userScores[userEmailString].scores);
    userScores[userEmailString].totalScore = totalScore;

    localStorage.setItem('userScores', JSON.stringify(userScores));
    displayScores();

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
        const selectedOption = selectedOptions[index];
        if (selectedOption === questionData.answer) {
            score++;
        }
    });

    return score;
}


function displayScores() {
    const scoreTable = document.getElementById('scoreTable');
    scoreTable.innerHTML = `
      <tr>
        <th>Email</th>
        <th>Username</th>
        <th>Total Score</th>
      </tr>
    `;

    for (const userEmail in userScores) {
        const userData = userScores[userEmail];
        const newRow = scoreTable.insertRow(-1);
        const emailCell = newRow.insertCell(0);
        const usernameCell = newRow.insertCell(1);
        const totalScoreCell = newRow.insertCell(2);
        emailCell.textContent = userEmail;
        usernameCell.textContent = userData.username;
        totalScoreCell.textContent = userData.totalScore;
    }
}

const reloadButton = document.createElement('button');
reloadButton.textContent = 'Reload';
reloadButton.onclick = () => window.location.reload();
document.getElementById('scorePage').appendChild(reloadButton);
