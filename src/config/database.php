<?php

$dsn = "mysql:host=".constant('HOST').";dbname=".constant('DB').";charset=".constant('DB_CHARSET')."";

$option = [
    \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
    \PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $db = new \PDO($dsn, DB_USER, DB_PASS, $option);
} catch(\PDOException $e) {
    die($e->getMessage());
}