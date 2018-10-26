<?php

require_once __DIR__ . '/app/start.php';

$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
$twig = new Twig_Environment($loader);

$requestUrl = $_SERVER['REQUEST_URI'];

switch($requestUrl) {
    case '/':
        $quizList = [
            [
                'id' => 1,
                'name' => 'Test_1'
            ],
            [
                'id' => 2,
                'name' => 'Test_2'
            ],
        ];
        
        
        echo $twig->render('index.html.twig', 
            [
                'quizList' => $quizList,
            ]
        );
        break;
    case '/start-quiz':
        break;
    case '/tests':
        echo $twig->render('tests.html.twig', []);
        break;
    case '/result':
        echo $twig->render('result.html.twig', []);
        break;
    default:
        echo 12;
        break;  
}