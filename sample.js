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




function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}




// function setCurrentScreen(){
//     if (getCookie('currentState')){
//         console.log('quiz', 'score')
//         if (getCurrentState() == 'quiz'){
//             console.log('quiz')
//             startQuiz()
//         }else if (getCurrentState() == 'result') {
//             console.log('result')
//             quizOver()
//         }
//     }else{
//         setCurrentState()
//         console.log('login')
//     }

    
// }
// setCurrentScreen()

  

// function startQuiz() {
//     if (usernameInput.value === '' || email.value === '') {
//         alert('Please provide both username and email.');
//         return;
//     }
//     if (usernameInput)
//         user.username = usernameInput.value;
//     user.email = email.value;
//     userDisplay.textContent = usernameInput.value;


//     const emailInput = email.value.trim();
//     const emailPattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

//     if (!emailPattern.test(emailInput)) {
//         alert('Please enter a valid email');
//         email.value = '';
//         email.focus();
//         return;
//     }
//     localStorage.setItem('user', JSON.stringify(user));
//     const userEmail = user.email
//     if (Object.keys(userScores).length > maxUserCount) {
//         alert('max user login limit reached.')
//         localStorage.clear();
//         location.reload()
//     }
//     if (userScores.hasOwnProperty(userEmail) && userScores[userEmail].scores.length > 0) {
//         document.getElementById('box').style.display = 'none';
//         document.getElementById('boxquiz').style.display = 'none';
//         document.getElementById('scorePage').style.display = 'block';
//         displayScores();
//     } else {

//         document.getElementById('box').style.display = 'none';
//         document.getElementById('boxquiz').style.display = 'block';
//         document.getElementById('scorePage').style.display = 'none';
//         showQuestion(currentQuestionIndex);
//     }
//     setCookie('username', user.username);
//     setCookie('email', user.email);
//     setCookie('currentState', 'quiz');
//     setCurrentState('quiz');

// }

// function setCurrentState(states='login'){
//     setCookie('currentState', states)
// }

// function getCurrentState(){
//     return getCookie('currentState')
// }

// function setCurrentScreen() {
//     const currentState = getCookie('currentState');
  
//     if (currentState === 'quiz') {
//       // Load user data from cookies if available
//       const username = getCookie('username');
//       const email = getCookie('email');
  
//       if (username && email) {
//         user.username = username;
//         user.email = email;
//         userDisplay.textContent = username;
//         startQuiz();
//       } else {
//         // Redirect to login if user data is not available in cookies
//         setCurrentState('login');
//       }
//     } else if (currentState === 'result') {
//       displayScores();
//     } else {
//       setCurrentState('login');
//     }
//   }
//   setCurrentScreen();
// ... (Your existing code)

function setCurrentState(states = 'login') {
    setCookie('currentState', states);
  }
  
  function getCurrentState() {
    return getCookie('currentState');
  }
//   function setCurrentScreen() {
//     const currentState = getCurrentState();
  
//     if (currentState === 'quiz') {
//       const usernameCookie = getCookie('username');
//       const emailCookie = getCookie('email');
  
//       if (usernameCookie && emailCookie) {
//         user.username = usernameCookie;
//         user.email = emailCookie;
//         userDisplay.textContent = user.username;
  
//         const userEmailString = user.email.toString();
//         const userScoreData = userScores[userEmailString];
  
//         if (userScoreData && userScoreData.scores.length > 0) {
//           document.getElementById('box').style.display = 'none';
//           document.getElementById('boxquiz').style.display = 'none';
//           document.getElementById('scorePage').style.display = 'block';
//           displayScores();
//         } else {
//           document.getElementById('box').style.display = 'none';
//           document.getElementById('boxquiz').style.display = 'block';
//           document.getElementById('scorePage').style.display = 'none';
  
//           // Check if there are saved cookies for question index and selected options
//           const savedQuestionIndex = getCurrentQuestionIndexCookie();
//           const savedSelectedOptions = getSelectedOptionsCookie();
  
//           if (savedQuestionIndex && Object.keys(savedSelectedOptions).length > 0) {
//             currentQuestionIndex = parseInt(savedQuestionIndex);
//             selectedOptions = savedSelectedOptions;
//           }
  
//           showQuestion(currentQuestionIndex);
//         }
//       } else {
//         setCurrentState('login');
//       }
//     } else if (currentState === 'result') {
//       const usernameCookie = getCookie('username');
//       const emailCookie = getCookie('email');
  
//       if (usernameCookie && emailCookie) {
//         user.username = usernameCookie;
//         user.email = emailCookie;
//         userDisplay.textContent = user.username;
  
//         document.getElementById('box').style.display = 'none';
//         document.getElementById('boxquiz').style.display = 'none';
//         document.getElementById('scorePage').style.display = 'block';
//         displayScores();
//       } else {
//         setCurrentState('login');
//       }
//     } else {
//       document.getElementById('box').style.display = 'block';
//       document.getElementById('boxquiz').style.display = 'none';
//       document.getElementById('scorePage').style.display = 'none';
//     }
//   }
  // ... (Your existing code)

function saveProgressToLocalStorage() {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  }
  
  function saveProgressToCookies() {
    setCookie('currentQuestionIndex', currentQuestionIndex.toString());
    setCookie('selectedOptions', JSON.stringify(selectedOptions));
  }
  
  function loadProgressFromLocalStorage() {
    const storedQuestionIndex = localStorage.getItem('currentQuestionIndex');
    const storedSelectedOptions = localStorage.getItem('selectedOptions');
  
    if (storedQuestionIndex && storedSelectedOptions) {
      currentQuestionIndex = parseInt(storedQuestionIndex);
      selectedOptions = JSON.parse(storedSelectedOptions);
    }
  }
  
  function loadProgressFromCookies() {
    const storedQuestionIndex = getCookie('currentQuestionIndex');
    const storedSelectedOptions = getCookie('selectedOptions');
  
    if (storedQuestionIndex && storedSelectedOptions) {
      currentQuestionIndex = parseInt(storedQuestionIndex);
      selectedOptions = JSON.parse(storedSelectedOptions);
    }
  }
  
  function setCurrentScreen() {
    const currentState = getCurrentState();
    const usernameCookie = getCookie('username');
    const emailCookie = getCookie('email');
  
    if (currentState === 'quiz') {
      if (usernameCookie && emailCookie) {
        user.username = usernameCookie;
        user.email = emailCookie;
        userDisplay.textContent = user.username;
  
        const userEmailString = user.email.toString();
        const userScoreData = userScores[userEmailString];
  
        if (userScoreData && userScoreData.scores.length > 0) {
          document.getElementById('box').style.display = 'none';
          document.getElementById('boxquiz').style.display = 'none';
          document.getElementById('scorePage').style.display = 'block';
          displayScores();
        } else {
          document.getElementById('box').style.display = 'none';
          document.getElementById('boxquiz').style.display = 'block';
          document.getElementById('scorePage').style.display = 'none';
  
          // Load the progress from localStorage, if available, otherwise from cookies
          loadProgressFromLocalStorage();
          if (Object.keys(selectedOptions).length === 0) {
            loadProgressFromCookies();
          }
  
          showQuestion(currentQuestionIndex);
        }
      } else {
        setCurrentState('login');
      }
    } else if (currentState === 'result') {
      if (usernameCookie && emailCookie) {
        user.username = usernameCookie;
        user.email = emailCookie;
        userDisplay.textContent = user.username;
  
        document.getElementById('box').style.display = 'none';
        document.getElementById('boxquiz').style.display = 'none';
        document.getElementById('scorePage').style.display = 'block';
        displayScores();
      } else {
        setCurrentState('login');
      }
    } else {
      document.getElementById('box').style.display = 'block';
      document.getElementById('boxquiz').style.display = 'none';
      document.getElementById('scorePage').style.display = 'none';
    }
  }
  
//   / Save user data to cookies
function saveUserDataToCookies() {
  setCookie('username', user.username);
  setCookie('email', user.email);
}

// Load user data from cookies
function loadUserDataFromCookies() {
  const username = getCookie('username');
  const email = getCookie('email');
  if (username && email) {
    user.username = username;
    user.email = email;
    userDisplay.textContent = username;
  }
}

  
  // ... (Your existing code)

//   function setCurrentScreen() {
//     const currentState = getCurrentState();
//     const usernameCookie = getCookie('username');
//     const emailCookie = getCookie('email');
  
//     if (currentState === 'quiz') {
//       if (usernameCookie && emailCookie) {
//         user.username = usernameCookie;
//         user.email = emailCookie;
//         userDisplay.textContent = user.username;
  
//         const userEmailString = user.email.toString();
//         const userScoreData = userScores[userEmailString];
  
//         if (userScoreData && userScoreData.scores.length > 0) {
//           document.getElementById('box').style.display = 'none';
//           document.getElementById('boxquiz').style.display = 'none';
//           document.getElementById('scorePage').style.display = 'block';
//           displayScores();
//         } else {
//           document.getElementById('box').style.display = 'none';
//           document.getElementById('boxquiz').style.display = 'block';
//           document.getElementById('scorePage').style.display = 'none';
//           showQuestion(currentQuestionIndex);
//         }
//       } else {
//         setCurrentState('login');
//       }
//     } else if (currentState === 'result') {
//       if (usernameCookie && emailCookie) {
//         user.username = usernameCookie;
//         user.email = emailCookie;
//         userDisplay.textContent = user.username;
  
//         document.getElementById('box').style.display = 'none';
//         document.getElementById('boxquiz').style.display = 'none';
//         document.getElementById('scorePage').style.display = 'block';
//         displayScores();
//       } else {
//         setCurrentState('login');
//       }
//     } else {
//       document.getElementById('box').style.display = 'block';
//       document.getElementById('boxquiz').style.display = 'none';
//       document.getElementById('scorePage').style.display = 'none';
//     }
//   }
//   window.addEventListener("load", setCurrentScreen);
// Save progress before the page is reloaded
window.addEventListener('beforeunload', () => {
  saveProgressToLocalStorage();
  saveProgressToCookies();
});

window.addEventListener('load', () => {
  loadProgressFromLocalStorage();
  if (Object.keys(selectedOptions).length === 0) {
    loadProgressFromCookies();
  }
  loadUserDataFromCookies(); // Load user data from cookies
  setCurrentScreen();
});
// With these changes, the user data will be stored and retrieved from cookies, and it should persist even after a page refresh.







  
  
  
  function startQuiz() {
    saveUserDataToCookies();
    if (usernameInput.value === '' || email.value === '') {
      alert('Please provide both username and email.');
      return;
    }
    if (usernameInput) user.username = usernameInput.value;
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
    const userEmail = user.email;
    if (Object.keys(userScores).length > maxUserCount) {
      alert('max user login limit reached.');
      localStorage.clear();
      location.reload();
    }
    if (userScores.hasOwnProperty(userEmail) && userScores[userEmail].scores.length > 0) {
      document.getElementById('box').style.display = 'none';
      document.getElementById('boxquiz').style.display = 'none';
      document.getElementById('scorePage').style.display = 'block';
      displayScores();
      setCurrentState('result'); // Set currentState to 'result' after showing scores
    } else {
      document.getElementById('box').style.display = 'none';
      document.getElementById('boxquiz').style.display = 'block';
      document.getElementById('scorePage').style.display = 'none';
      showQuestion(currentQuestionIndex);
      setCurrentState('quiz'); // Set currentState to 'quiz' after starting the quiz
    }
  }
  
  // ... (Your existing code)
  
  // Remove the setCurrentState('login') call from the startQuiz() function
  // This will prevent resetting the currentState to 'login' after starting the quiz
  
  // ... (Your existing code)
  

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
    setCurrentState('result');
    saveProgressToLocalStorage();
    saveProgressToCookies();
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
    setCurrentState('result');
}

const reloadButton = document.createElement('button');
reloadButton.textContent = 'Reload';
reloadButton.onclick = () => window.location.reload();
document.getElementById('scorePage').appendChild(reloadButton);
