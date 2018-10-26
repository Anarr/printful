<?php

require_once __DIR__ . '/app/start.php';

use Printful\Models\User as User;


$user = new User();

$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
$twig = new Twig_Environment($loader, array(
    'cache' => __DIR__ . '/templates_cache',
));

echo $twig->render('index.html', array('name' => 'Fabien'));