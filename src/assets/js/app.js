/**
 * declare inital params
 */
let quizForm = document.getElementById('quizForm'),
    progressbarWidth = document.getElementById('progressbar') != null ? document.getElementById('progressbar').offsetWidth : 0,
    answers = document.getElementsByClassName('item') != null ? document.getElementsByClassName('item') : '',
    questionCount = 0;


let activeProgressBarWidth = Math.floor(progressbarWidth/questionCount) ,
    questionStep = 0,
    questionId = 0,
    selectedVariant = -1,
    userAnswers = [];


/**
 * @param username display current user name
 * @param quizType display selected quiz type
 * start quiz after start button click
 */

validateQuizForm = () => {
    let errors = {
        username: false,
        quiz_type: false
    },
    username = document.getElementById('username'),
    quizType = document.getElementById('quiz_type');

    
    if (username.value.length === 0 || username.value.length < 4) {
        username.style.border = "4px solid red";
        errors.username = true;
    } else {
        username.style.border = "0px solid red";
        errors.username = false;
    }

    if (parseInt(quizType.value) == 0) {
        quizType.style.border = "4px solid red";
        errors.quiz_type = true;
    } else {
        quizType.style.border = "0px solid red";
        errors.quiz_type = false;
    }

    // execute if quiz form pass validation step
    if (errors.quiz_type === false && errors.quiz_type === false) {
        startQuiz();
    }

    return false;
}

/**
 * start testing process
 */
startQuiz = () => {
    document.getElementById('quizForm').submit();
}

nextQuestion = () => {
    progressbarWidth = document.getElementById('progressbar') != null ? document.getElementById('progressbar').offsetWidth : 0,
    answers = document.getElementsByClassName('item') != null ? document.getElementsByClassName('item') : '';
    activeProgressBarWidth = Math.floor(progressbarWidth/questionCount)
    
    resetAnswers();
    if (selectedVariant != -1) {
        questionStep++;
        loadQuizContent(questionStep);
        let activeProgressBarCurrentWidth = activeProgressBarWidth*questionStep;
    
        if (activeProgressBarCurrentWidth <= progressbarWidth) {
            document.getElementById('progressbar-active').style.width = activeProgressBarCurrentWidth + 'px';
        }
    
        // check has next question or not
        if (activeProgressBarCurrentWidth + activeProgressBarWidth > progressbarWidth) {
            selectedVariant = 1;
            document.getElementById('progressbar-active').style.width = progressbarWidth-2 + 'px';
            document.getElementById('next').innerText = "Finish";
            document.getElementById('next').removeEventListener('click', nextQuestion);     
            document.getElementById('next').addEventListener('click', showResult);
        }
    
        userAnswers.push({
            'question_id': questionId, 
            'answer': selectedVariant
        });      
    } else if(questionCount != questionStep) {
        alert('choose at least one answer');
    }
    selectedVariant = - 1;
}

showResult = () => {
    console.log('aa', userAnswers);
    // window.location.href = 'result';
    postData('/questions', {answer: userAnswers})
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));   
}
/**
 * answer the test
 */
function answerQuestion(e) {
    selectedVariant = e.getAttribute('data-answer'),
    answer = answers[selectedVariant-1];
    resetAnswers();
    answer.style.backgroundColor = "#02A9F5";
}

/**
 * reset previous test answers
 */
resetAnswers = () => {
    for (element of answers) {
        element.style.backgroundColor = "#fefefe";
    }
}

/**
 * make ajax get request
 */
function getData() {
    return fetch('/questions')
    .then(function(response) {
        return response.json();
    });
}

/**
 * load each question options
 * @param {*} questionStep 
 */
async function loadQuizContent(questionStep) {
    let content = await getData();
    content = content.data;
    questionCount = content.length,
    questionId = content[questionStep].id;
    
    let options = content[questionStep]['options'],
        quizItem = '';

    options.forEach(element => {
        quizItem+= `
            <div class="item" onclick="answerQuestion(this)" data-answer="${element.option_order}">a) ${element.answer}</div>
        `;
    });    
    document.getElementsByClassName('quiz_question')[0].innerHTML = content[questionStep].title;
    document.getElementsByClassName('quiz_options')[0].innerHTML = quizItem;
}


/**
 * call inital
 */
loadQuizContent(0);


function postData(url = ``, data = {}) {

    return fetch(url, {
        method: "POST", 
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            // "Content-Type": "application/json; charset=utf-8",
            "Content-Type": "application/x-www-form-urlencoded",
            // "Content-Type": "application/form-data"
        },
        redirect: "follow", 
        referrer: "no-referrer", 
        body: JSON.stringify(data), 
    })
    .then(response => response.json()); // parses response to JSON
}