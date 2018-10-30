/**
 * declare inital params
 */
let quizForm = document.getElementById('quizForm'),
    progressbarWidth = document.getElementById('progressbar') != null ? document.getElementById('progressbar').offsetWidth : 0,
    answers = document.getElementsByClassName('item') != null ? document.getElementsByClassName('item') : '',
    questionCount = 0,
    questionStep = 0,
    questionId = 0,
    selectedVariant = -1,
    userAnswers = [];


/**
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
        username.style.border = "2px solid #fff";
        errors.username = true;
        username.nextElementSibling.style.display = 'block';
    } else {
        username.style.border = "0px solid #fff";
        errors.username = false;
        username.nextElementSibling.style.display = 'none';
    }

    if (parseInt(quizType.value) == 0) {
        quizType.style.border = "2px solid #fff";
        errors.quiz_type = true;
        quizType.nextElementSibling.style.display = 'block';

    } else {
        quizType.style.border = "0px solid #fff";
        errors.quiz_type = false;
        quizType.nextElementSibling.style.display = 'none';
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
    
    // resetAnswers();
    if (selectedVariant != -1) {
        questionStep++;
        
        if (questionCount != questionStep) {
            loadQuizContent(questionStep);
        }
        
        let activeProgressBarCurrentWidth = activeProgressBarWidth*questionStep;
    
        if (activeProgressBarCurrentWidth <= progressbarWidth) {
            document.getElementById('progressbar-active').style.width = activeProgressBarCurrentWidth + 'px';
        }
    
        // check has next question or not
        if (activeProgressBarCurrentWidth + activeProgressBarWidth > progressbarWidth) {
            document.getElementById('progressbar-active').style.width = progressbarWidth-2 + 'px';
            document.getElementById('next').innerText = "Finish";
            document.getElementById('next').removeEventListener('click', nextQuestion);     
            document.getElementById('next').addEventListener('click', showResult);
        }
    
        userAnswers.push({
            'question_id': parseInt(questionId), 
            'answer': parseInt(selectedVariant)
        });   
        console.log(userAnswers);   
    } else if(questionCount != questionStep) {
        alert('choose at least one answer');
    }
    selectedVariant = - 1;
}

/**
 * display quiz results
 */
showResult = () => {
    postData('/questions', {'content': userAnswers})
    .then(() => window.location.href='result')
    .catch(error => console.error(error));   
}

/**
 * answer the test
 * @param {object} e
 */
function answerQuestion(e) {
    selectedVariant = e.getAttribute('data-answer'),
    answer = answers[selectedVariant-1];
    console.log(answer);
    resetAnswers();
    answer.style.backgroundColor = "#02A9F5";
}

/**
 * reset previous test answers
 */
resetAnswers = () => {
    for (element of answers) {
        // element.style.backgroundColor = "#fefefe";
        element.removeAttribute('style');
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
 * @param {int} questionStep
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
    document.getElementsByClassName('quiz_question')[0].innerHTML = `<h1>${content[questionStep].title}</h1>`;
    document.getElementsByClassName('quiz_options')[0].innerHTML = quizItem;
}


/**
 * call inital
 */
loadQuizContent(0);

/**
 * post data
 * @param {string} url 
 * @param {object} data 
 */
function postData(url = ``, data = {}) {
    console.log(data);
    return fetch(url, {
        method: "POST", 
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        redirect: "follow", 
        referrer: "no-referrer", 
        body: JSON.stringify(data) 
    })
    .then(response => console.log(response));
}