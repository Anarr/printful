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
            <div class="item" onclick="answerQuestion(this)" data-answer="${element.option_order}">${element.answer}</div>
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