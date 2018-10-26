/**
 * declare inital params
 */
const quizForm = document.getElementById('quizForm'),
    progressbarWidth = document.getElementById('progressbar') != null ? document.getElementById('progressbar').offsetWidth : 0,
    answers = document.getElementsByClassName('item') != null ? document.getElementsByClassName('item') : '',
    questionCount = 7;
// let activeProgressBarWidth = document.getElementById('progressbar-active') != null ? document.getElementById('progressbar-active').offsetWidth : 0,
//     questionStep = 1;

let activeProgressBarWidth = Math.floor(progressbarWidth/questionCount) ,
    questionStep = 0,
    selectedVariant = -1,
    userAnswers = [];

// if (activeProgressBarWidth) {
//     document.getElementById('progressbar-active').style.width = activeProgressBarWidth + 'px';
// }

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
        startQuiz(username.value, quizType.value);
    }

    return false;
}

/**
 * start testing process
 */
startQuiz = (username, quizType) => {
    alert(`Welcome ${username}, test topic is: ${quizType}`);
    window.location.href = '/tests';
}

nextQuestion = () => {
    resetAnswers();
    if (selectedVariant != -1) {
        questionStep++;
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
            'question_id': questionStep, 
            'answer': selectedVariant
        });      
    } else {
        alert('choose at least one answer');
    }
    selectedVariant = - 1;

    console.log('user ans:', userAnswers);
}

showResult = () => window.location.href = 'result';
/**
 * answer the test
 */
function answerQuestion(e) {
    selectedVariant = e.getAttribute('data-answer'),
    answer = answers[selectedVariant];
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