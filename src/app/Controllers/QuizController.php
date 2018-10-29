<?php

namespace Printful\Controllers;

use Printful\Models\Quiz;

class QuizController
{
    private $model;

    public function __construct(Quiz $model)
    {
        $this->model = $model;
    }

    public function getQuizList(): array
    {
        return $this->model->getQuizList();
    }

    /**
     * retrieve Quiz questions
     * @param $quizId integer
     */
    public function getQuizQuestions(int $quizId): array
    {
        return [
            'status' => 1,
            'data' => $this->model->getQuizQuestions($quizId)
        ];
    }
}