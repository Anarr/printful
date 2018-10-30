<?php

require_once __DIR__ . '/app/start.php';

use Printful\Models\User as User;
use Printful\Models\Quiz as Quiz;
use Printful\Controllers\QuizController as QuizController;
use Printful\Controllers\UserController as UserController;


$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
$twig = new Twig_Environment($loader);

$requestUrl = $_SERVER['REQUEST_URI'];

// add $db as dependency into models
$user = new User($db);
$quiz = new Quiz($db);
$quizController = new QuizController($quiz);
$userController = new UserController($user);

switch($requestUrl) {
    case '/':   

        $currentUser = [];
        //check user credentials
        if (!empty($_POST['username']) && !empty($_POST['quiz_type'])) {
            
            $quizType = filter_var(intval($_POST['quiz_type']), FILTER_SANITIZE_NUMBER_INT);
            
            $getUser = $userController->getUser($_POST['username']);
            
            // redirect user quiz step if data valid
            if (count($getUser) >0) {
                $_SESSION['user'] = $getUser;
                $_SESSION['quiz']['id'] = $quizType;
                header('Location: /tests');
                exit;
            } else {
                $error['auth_error'] = 'Wrong username';
            }
        }
        echo $twig->render('index.html.twig', 
            [
                'quizList' => $quizController->getQuizList(),
                'error' => $error,
            ]
        );
        break;

    case '/tests':
        // check if authenticated user
        if (!$_SESSION['user']) {
            header('Location: /');
            exit;            
        }

        echo $twig->render('tests.html.twig', [
            'user' => $_SESSION['user'],
        ]);
        break;
    case '/result':
        // get current user result for selected quiz
        $result = $quizController->getUserQuizResult($_SESSION['user']['id'], $_SESSION['quiz']['id']);
        
        echo $twig->render('result.html.twig', [
            'user' => $_SESSION['user'],
            'result' => $result[0]
        ]);
        break;
    
    case '/questions':
        
        $quizId = $_SESSION['quiz']['id'];
        // determine request method
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {

            $questions = $quizController->getQuizQuestions($quizId);
            header('Content-Type: application/json');
            echo json_encode($questions);
            
        } elseif($_SERVER['REQUEST_METHOD'] == 'POST') {

            $jsonBody = json_decode(file_get_contents('php://input'), true);
            
            $answers = [
                'quiz_id' => $quizId,
                'content' => $jsonBody['content']
            ];

            $result = $quizController->addQuizResults($_SESSION['user']['id'], $answers);
            echo json_encode($answers);
        }
        break;
    default:
        //pass
        break;  
}