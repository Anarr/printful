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

    /**
     * retrieve Quiz list
     */
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

    /**
     * add Quiz results
     */

     public function addQuizResults(int $userId, array $answers): array
     {
        $status = 1;
        $correctAnswerCount = 0;
        $wrongAnswerCount = 0;

        if (is_array($answers['content']) && !empty($answers['quiz_id'])) {

            // get qiz question asnwers
            $quizAnswers = $this->model->getQuizAnswers($answers['quiz_id']);

            // compare quiz question answers with user answers
            foreach($quizAnswers as $key => $value) {

                if ($answers['content'][$key]['question_id'] == $value['id'] && $answers['content'][$key]['answer'] == $value['answer']) {
                    $correctAnswerCount++;
                } elseif ($answers['content'][$key]['question_id'] == $value['id'] && $answers['content'][$key]['answer'] != $value['answer']) {
                    $wrongAnswerCount++;
                }

            }

            $quizResult = [
                'quiz_id' => $answers['quiz_id'],
                'correct_answer' => $correctAnswerCount,
                'wrong_answer' => $wrongAnswerCount
            ];

            $result = $this->model->addQuizResults($userId, $quizResult);
        }

        return json_encode([
            'status' => $status,
            'data' => $result ?: []
        ]);
    }

    public function getUserQuizResult(int $userId, int $quizId): array
    {
        $result = $this->model->getUserQuizResult($userId, $quizId);
        return $result ?: [];
    }
}